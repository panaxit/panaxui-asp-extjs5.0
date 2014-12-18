Ext.define('KitchenSink.data.Customer', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var customers = [{
        id: 1,
        name: 'Customer A',
        phone: '540-111-1234'
    }, {
        id: 2,
        name: 'Customer B',
        phone: '650-222-2345'
    }, {
        id: 3,
        name: 'Customer C',
        phone: '412-333-3456'
    }, {
        id: 4,
        name: 'Customer D',
        phone: '861-444-4567'
    }];
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\/KitchenSink\/Customer(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                id;
            if (idPart) {
                id = parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(customers, function(customer) {
                    return customer.id === id;
                });
            } else {
                return customers;
            }
        }
    });
});

Ext.define('KitchenSink.model.Customer', {
    extend: 'Ext.data.Model',
    requires: [
        "KitchenSink.model.field.PhoneNumber"
    ],
    
    fields: [
        'name',
        { name: 'phone', type: 'phonenumber' }
    ],

    proxy: {
        type: 'rest',
        url: '/KitchenSink/Customer'
    },

    validators: {
        name: { type: 'length', min: 1 }
    }
});

/**
 * This form is a popup window used by the ChildSession view. This view is
 * added as a contained window so we use the same ViewController instance.
 */
Ext.define('KitchenSink.view.binding.ChildSessionForm', {
    extend: 'Ext.window.Window',
    xtype: 'binding-child-session-form',

    bind: {
        title: 'Edit {theCustomer.name}'
    },
    layout: 'fit',
    modal: true,
    width: 400,
    height: 350,
    closable: true,

    items: {
        xtype: 'form',
        bodyPadding: 10,
        border: false,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            reference: 'name',
            bind: '{theCustomer.name}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone',
            reference: 'phone',
            bind: '{theCustomer.phone}'
        }, {
            xtype: 'grid',
            reference: 'orders',
            margin: '10 0 0 0',
            title: 'Orders',
            bind: '{theCustomer.orders}',
            columns: [{
                text: 'Id',
                dataIndex: 'id',
                width: 30
            }, {
                xtype: 'datecolumn',
                text: 'Date',
                dataIndex: 'date',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'checkcolumn',
                text: 'Shipped', 
                dataIndex: 'shipped'
            }, {
               xtype: 'widgetcolumn',
                width: 90,
                widget: {
                    xtype: 'button',
                    text: 'Remove',
                    handler: 'onRemoveClick'
                }
            }]
        }]
    },

    buttons: [{
        text: 'Save',
        handler: 'onSaveClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});


/**
 * This controller manages the ChildSession view.
 */
Ext.define('KitchenSink.view.binding.ChildSessionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.childsession',

    requires: [
        'Ext.window.Window',
        'KitchenSink.view.binding.ChildSessionForm'
    ],

    onSessionChangeClick: function () {
        var changes = this.getView().getSession().getChanges();
        if (changes !== null) {
            new Ext.window.Window({
                autoShow: true,
                title: 'Session Changes',
                modal: true,
                width: 600,
                height: 400,
                layout: 'fit',
                items: {
                    xtype: 'textarea',
                    value: JSON.stringify(changes, null, 4)
                }
            });
        } else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    onRemoveClick: function (button) {
        var orders = this.lookupReference('orders').getStore();
        orders.remove(button.getWidgetRecord());
    },

    onEditClick: function (button) {
        var view = this.getView();

        this.dialog = view.add({
            xtype: 'binding-child-session-form',

            viewModel: {
                // This creates a copy in the child session. We use "links" here
                // instead of "data" because "data" would simply hold the record
                // but "links" creates a linked copy.
                links: {
                    theCustomer: button.getWidgetRecord()
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true
        });

        this.dialog.show();
    },

    onSaveClick: function () {
        // Save the changes pending in the dialog's child session back to the
        // parent session.
        this.dialog.getSession().save();

        this.onCancelClick();
    },

    onCancelClick: function () {
        this.getView().remove(this.dialog);
        this.dialog = null;
    }
});


/**
 * This ViewModel provides data for the ChildSession view.
 */
Ext.define('KitchenSink.view.binding.ChildSessionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding.childsession',

    stores: {
        // Define a store of Customer records that links to the Session.
        customers: {
            model: 'Customer',
            autoLoad: true,
            session: true
        }
    }
});


/**
 * This example demonstrates an isolated child session. When the dialog is
 * created, a child session is spawned from the parent. Any changes made to
 * data in this session do not affect the parent immediately. The changes
 * are kept separate from the parent and may then be saved to the parent or
 * alternatively discarded to leave the parent in its original state.
 */
Ext.define('KitchenSink.view.binding.ChildSession', {
    extend: 'Ext.panel.Panel',
    xtype: 'binding-child-session',
    exampleDescription: [
        '<p>This example shows data binding using formulas that can be edited. That is, ',
        '"virtual properties"!</p>'
    ],

    title: 'All Customers',
    frame: true,
    width: 420,
    height: 320,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        type: 'binding.childsession'
    },

    controller: 'binding.childsession',

    // Create a session for this view
    session: true,

    items: [{
        flex: 1,
        xtype: 'grid',
        bind: '{customers}',
        columns: [{
            dataIndex: 'name',
            flex: 1,
            text: 'Name'
        }, {
            dataIndex: 'phone',
            flex: 1,
            text: 'Phone'
        }, {
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                xtype: 'button',
                text: 'Edit',
                handler: 'onEditClick'
            }
        }]
    }],

    buttons: [{
        text: 'Show Changes',
        handler: 'onSessionChangeClick'
    }]
});