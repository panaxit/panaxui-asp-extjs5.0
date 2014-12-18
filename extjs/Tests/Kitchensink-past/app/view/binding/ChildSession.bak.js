Ext.define('KitchenSink.model.Order', {
    extend: 'KitchenSink.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'customerId', type: 'string', reference: 'Customer' },//{ type: 'int' },
        { name: 'date', type: 'date', dateFormat: 'Y-m-d', critical: true },
        'shipped'
    ],

    proxy: {
        type: 'rest',
        url: 'KitchenSink/Order'
    }
});

Ext.define('KitchenSink.data.Order', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var ordersStore = [{
        id: 1,
        customerId: 'c2',
        date: '2012-04-03',
        shipped: true
    }, {
        id: 2,
        customerId: 'c3',
        date: '2012-04-05',
        shipped: true
    }, {
        id: 3,
        customerId: 'c3',
        date: '2012-04-06',
        shipped: false
    }, {
        id: 4,
        customerId: 'c1',
        date: '2012-04-09',
        shipped: true
    }, {
        id: 5,
        customerId: 'c4',
        date: '2012-04-13',
        shipped: false
    }, {
        id: 6,
        customerId: 'c4',
        date: '2012-04-19',
        shipped: false
    }, {
        id: 7,
        customerId: 'c4',
        date: '2012-05-02',
        shipped: true
    }, {
        id: 8,
        customerId: 'c2',
        date: '2012-05-06',
        shipped: false
    }, {
        id: 9,
        customerId: 'c3',
        date: '2012-05-10',
        shipped: false
    }, {
        id: 10,
        customerId: 'c4',
        date: '2012-05-13',
        shipped: true
    }, {
        id: 11,
        customerId: 'c1',
        date: '2012-05-17',
        shipped: true
    }, {
        id: 12,
        customerId: 'c1',
        date: '2012-05-22',
        shipped: true
    }, {
        id: 13,
        customerId: 'c3',
        date: '2012-05-25',
        shipped: false
    }, {
        id: 14,
        customerId: 'c4',
        date: '2012-06-01',
        shipped: true
    }, {
        id: 15,
        customerId: 'c2',
        date: '2012-06-05',
        shipped: true
    }];
    
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\KitchenSink\/Order(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                filters = ctx.params.filter,
                id;
            
            if (idPart) {
                id = parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(ordersStore, function(order) {
                    return order.id === id;
                });
            } else if (filters) {
                filters = Ext.decode(filters);
                id = filters[0].value;
                return Ext.Array.filter(ordersStore, function(order) {
                    return order.customerId === id;
                });
            } else {
                return ordersStore;
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
        { name: 'name', type: 'string', defaultValue: 'Unknown' }
        ,{ name: 'phone', type: 'phonenumber', critical: true } //
        ,{ name: 'gastos', type: 'number' }
    ],

    proxy: {
        type: 'rest'
        ,url: 'KitchenSink/Customer'
		,api:{
			update: "../Scripts/update.asp"
		}
		,writer: {
			type:'xml'
			, url:'test.asp'
		}
    },

    validators: {
        name: { type: 'length', min: 1 }
    }
});

Ext.define('KitchenSink.data.Customer', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var customers = [{
        id: 'c1',
        name: 'Customer A',
        phone: '540-111-1234'
    }, {
        id: 'c2',
        name: 'Customer B',
        phone: ''
    }, {
        id: 'c3',
        name: 'Customer C',
        phone: '412-333-3456'
    }, {
        id: 'c4',
        name: 'Customer D',
        phone: '861-444-4567'
    }];
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\KitchenSink\/Customer(\/c\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                id;
            if (idPart) {
                id = idPart //parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(customers, function(customer) {
                    return customer.id === id;
                });
            } else {
                return customers;
            }
        }
    });
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

	onSave: function () {
		var model = this.getViewModel().data.customers;
        var session = this.getView().getSession();
		session.data.Customer["c2"].record.store.update()
		//model.update();
		//var record = session.getRecord()
    },
	
    onSessionChangeClick: function () {
        var changes = this.getView().getSession().getChanges();
        if (changes !== null) {
            new Ext.window.Window({
                autoShow: true,
                title: 'Session Changes',
                modal: true,
				maximizable: true,
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
		var form = this.getView().down('form');
		if (form.isValid()) {
			this.dialog.getSession().save();
			this.onCancelClick();
		}
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
 * This form is a popup window used by the ChildSession view. This view is
 * added as a contained window so we use the same ViewController instance.
 */
Ext.define('KitchenSink.view.binding.ChildSessionForm', {
    extend: 'Ext.window.Window',
    xtype: 'binding-child-session-form',
    //<example>
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Fit',
        'Ext.form.field.Text',
        'Ext.grid.Panel'
    ],
    title: 'Edit', // needed for bind/title - should fix setTitle
    //</example>

    bind: {
        title: 'Edit {theCustomer.name}'
    },
    layout: 'fit',
    modal: true,
    width: 450,
    height: 350,
    closable: true,

    items: {
        xtype: 'panaxform'
        , bodyPadding: 10
        , border: false
        , items: [{
				xtype:'tabpanel'
				, defaults: {
					bodyPadding: 10
					, autoShow: true
					, autoRender: true
				}
				, items:[{
					title: 'tab 1'
					, items:[{
							xtype: 'imagemanager'
							, itemId: 'fileImage'
							, name: 'Foto'
							, parentFolder: "Test"
						}, {
							xtype:'textfield',
							fieldLabel: 'First Name',
							name: 'firstName',
							bind: {
								value: '{firstName}'
							}
							// , allowBlank: false
							// , blankText: 'El primer nombre es requerido.'
						}, {
							xtype:'textfield',
							fieldLabel: 'Last Name',
							name: 'lastName',
							bind: {
								value: '{lastName}'
							}
						}
					]
					}
					, {
					title: 'tab 2'
					, items: [
						{
							xtype: 'displayfield',
							fieldLabel: 'Id',
							bind: '{theCustomer.id}'
						}, {
							xtype: 'textfield'
							, fieldLabel: 'Name'
							, reference: 'name'
							, bind: '{theCustomer.name}'
							, allowBlank: false
							, blankText: 'El nombre es requerido.'
						}, {
							xtype: 'textfield',
							fieldLabel: 'Phone',
							reference: 'phone',
							bind: '{theCustomer.phone}'
							, allowBlank: false
							, blankText: 'El teléfono es requerido.'
						}, {
							xtype: 'currencyfield',
							fieldLabel: 'Expenses',
							reference: 'gastos',
							bind: '{theCustomer.expenses}'
							, allowBlank: true
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
						}
					]
				}
			]
		}]
    }
	// ,
    // buttons: [{
        // text: 'Save',
        // handler: 'onSaveClick'
    // }, {
        // text: 'Cancel',
        // handler: 'onCancelClick'
    // }]
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
    //<example>
    requires: [
        'KitchenSink.view.binding.ChildSessionModel',
        'KitchenSink.view.binding.ChildSessionController',
        'Ext.grid.Panel'
    ],
    otherContent: [{
        type: 'ViewModel',
        path: 'app/view/binding/ChildSessionModel.js'
    }, {
        type: 'ViewController',
        path: 'app/view/binding/ChildSessionController.js'
    }, {
        type: 'View',
        path: 'app/view/binding/ChildSessionForm.js'
    }],
    //</example>

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
    }, {
        text: 'Save Changes',
        handler: 'onSave'
    }]
});

