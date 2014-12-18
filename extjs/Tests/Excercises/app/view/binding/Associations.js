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

Ext.define('KitchenSink.model.Order', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'customerId', type: 'int', reference: 'Customer' },
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'shipped'
    ],

    proxy: {
        type: 'rest',
        url: '/KitchenSink/Order'
    }
});

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

Ext.define('KitchenSink.data.Order', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var orders = [{
        id: 1,
        customerId: 2,
        date: '2012-04-03',
        shipped: true
    }, {
        id: 2,
        customerId: 3,
        date: '2012-04-05',
        shipped: true
    }, {
        id: 3,
        customerId: 3,
        date: '2012-04-06',
        shipped: false
    }, {
        id: 4,
        customerId: 1,
        date: '2012-04-09',
        shipped: true
    }, {
        id: 5,
        customerId: 4,
        date: '2012-04-13',
        shipped: false
    }, {
        id: 6,
        customerId: 4,
        date: '2012-04-19',
        shipped: false
    }, {
        id: 7,
        customerId: 4,
        date: '2012-05-02',
        shipped: true
    }, {
        id: 8,
        customerId: 2,
        date: '2012-05-06',
        shipped: false
    }, {
        id: 9,
        customerId: 3,
        date: '2012-05-10',
        shipped: false
    }, {
        id: 10,
        customerId: 4,
        date: '2012-05-13',
        shipped: true
    }, {
        id: 11,
        customerId: 1,
        date: '2012-05-17',
        shipped: true
    }, {
        id: 12,
        customerId: 1,
        date: '2012-05-22',
        shipped: true
    }, {
        id: 13,
        customerId: 3,
        date: '2012-05-25',
        shipped: false
    }, {
        id: 14,
        customerId: 4,
        date: '2012-06-01',
        shipped: true
    }, {
        id: 15,
        customerId: 2,
        date: '2012-06-05',
        shipped: true
    }];
    
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\/KitchenSink\/Order(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                filters = ctx.params.filter,
                id;
            
            if (idPart) {
                id = parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(orders, function(order) {
                    return order.id === id;
                });
            } else if (filters) {
                filters = Ext.decode(filters);
                id = filters[0].value;
                return Ext.Array.filter(orders, function(order) {
                    return order.customerId === id;
                });
            } else {
                return orders;
            }
        }
    });
});

Ext.define('KitchenSink.view.binding.Associations', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-associations',
    //<example>
    exampleDescription: [
        '<p>This example shows simple association binding. The orders grid is bound to the orders of the selected customer.',
        'The binding statement is able to interpret that orders is an association and can show the orders for our customer.</p>'
    ],
    //</example>
    
    width: 500,
    height: 400,
    referenceHolder: true,
    layout: 'hbox',

    viewModel: {
        stores: {
            customers: {
                model: 'KitchenSink.model.Customer',
                autoLoad: true
            }
        }
    },
    session: {},

    items: [{
        title: 'All Customers',
        xtype: 'grid',
        bind: '{customers}',
        reference: 'customerGrid',
        flex: 1,
        columns: [{
            text: 'Name', dataIndex: 'name', flex: 1
        }, {
            text: 'Phone', dataIndex: 'phone'
        }]
    }, {
        title: 'Orders',
        xtype: 'grid',
        bind: '{customerGrid.selection.orders}',
        flex: 1,
        margin: '0 0 0 10',
        columns: [{
            text: 'Date', xtype: 'datecolumn', dataIndex: 'date', flex: 1, format: 'Y-m-d'
        }, {
            text: 'Shipped', xtype: 'booleancolumn', dataIndex: 'shipped',
            trueText: '&#x2713;', falseText: '-'
        }],
        viewConfig: {
            emptyText: 'No orders',
            deferEmptyText: false
        }
    }]
});
