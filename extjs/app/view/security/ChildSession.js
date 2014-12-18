/*
* TODO: Corregir el error de la "session" cuando se edita el id (desde el formulario) y se ejecuta el método save marca error porque no encuentra el nuevo id (suponiendo que se utiliza un nuevo id, ya que si se utiliza uno existente sobreescribe ese registro y el anterior no lo borraría. 
Es necesario revisar el método save de la "Ext.data.session"

*/

Ext.define('Px.model.field.PhoneNumber', {
    extend: 'Ext.data.field.String',

    alias: 'data.field.phonenumber',

    validators: [
        { 
            type: 'format', 
            matcher: /^\d{3}-?\d{3}-?\d{4}$/,
            message: 'Must be in the format xxx-xxx-xxxx'
        }
    ]
    
    // , convert: function(value, record) {
        // value=value.replace(/[^\d]/ig,'')
        // return value.replace(/^(\d{3})-?(\d{3})-?(\d{4})$/ig, '($1) $2-$3')
    // }
    // , serialize: function(value, record) {
        // return value.replace(/[^\d]/ig,'')
    // }
});


Ext.define('Px.model.Customer', {
    extend: 'Px.model.Base',
    requires: [
        "Px.model.field.PhoneNumber"
    ],
    
    idProperty: 'id',
    fields: [
        { name: 'id', unique: true}
        ,{ name: 'name', type: 'string', defaultValue: 'Unknown' }
        ,{ name: 'foto', type: 'string', critical: true }
        ,{ name: 'phone', type: 'phonenumber', critical: true } //
        ,{ name: 'gastos', type: 'number' }
    ]

    // , associations: [
        // { type: 'hasMany', model: "Px.model.Address", name: "address",  tableName: 'PcD.ServiciosDomicilio' ,primaryKey: "IdPcD,IdServicio", identityKey: 'Id', foreignKey: "customerId", associationKey: "address"}
        // , { type: 'hasMany', model: "Px.model.Order", name: "orders",  tableName: 'PcD.ServiciosDomicilio' ,primaryKey: "IdPcD,IdServicio", identityKey: 'Id', foreignKey: "customerId", associationKey: "orders"}
    // ]
    

    , proxy: {
        type: 'ajax'
        ,url: '/Px/Customer'
        , timeout: 360000
        , api: {
              create: "updateCustomer.asp"
            , update: "updateCustomer.asp"
            , destroy: "updateCustomer.asp"
        }
        ,writer: {
            type:'xml'
            // , partialDataOptions: { // Se evita esta configuración porque recupera toda la información asociada y no solamente los cambios
                // associated: true
            // }
        }
        ,reader: {
            rootProperty:'data'
        }
        , pageParam: 'pageIndex'
        , limitParam: 'pageSize'
        , filterParam: 'filters'
        , sortParam: 'sorters'
        , extraParams: {
            catalogName: "dbo.Customer"
            , identityKey: "Id"
            , primaryKey: ["Id"]
            , mode: "insert"
            , lang: "es"
            , output: 'json'
        }
        , success: function(xhr) {
            var response=Ext.JSON.decode(xhr.responseText); 
            parameters["success"] = (response.success/* && confirm("Se reconstruyó el módulo, continuar?")*/);
                if (response.callback) {
                    response.callback();
                }                   
                else {
                    if (response.message) {
                        Ext.MessageBox.show({
                            title: 'MENSAJE DEL SISTEMA',
                            msg: response.message,
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            parameters = Ext.apply(parameters, response.catalog)
        }
        , failure: function() {
            Ext.Msg.alert("Error de comunicación", "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
            parameters["success"] = false;
        }
        , exception: function( me, request, operation, eOpts ){
            Ext.Msg.alert("Error en el script", "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
        }
    },

    validators: {
        name: 'presence'
    }
});

Ext.define('Px.data.Customer', {
    requires: [
        'Px.data.Init'
    ]}
    , function() {
    var customers = [{
        id: 'c1',
        name: 'Customer A',
        phone: '540-111-1234'
    }, {
        id: 'c2',
        name: 'Customer B',
        phone: ''
        , foto: '/FilesRepository/Test/voluntario1.jpg'
        , address: [{
            id: 'a1'
            , customerId: 'c2'
            , address:'Fake address'
        }]
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
        url: /\/Px\/Customer(\/\d+)?/,
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
    })
;
});

Ext.define('Px.model.Address', {
    extend: 'Px.model.Base',

    fields: [
        { 
            name: 'customerId',
            reference: {
                parent: 'Customer'
            }
        }
        // { name: 'customerId', type: 'string', reference: 'Customer' }//{ type: 'int' },
        , { name: 'address', type: 'string', critical: true },//{ type: 'int' },
    ]
    ,proxy: {
		type:'ajax'
		, api: {
			  create: "updateCustomer.asp"
			, update: "updateCustomer.asp"
			, destroy: "updateCustomer.asp"
		}
		,writer: {
			type:'xml'
			// , partialDataOptions: { // Se evita esta configuración porque recupera toda la información asociada y no solamente los cambios
				// associated: true
			// }
		}
		,reader: {
			rootProperty:'data'
		}
		, pageParam: 'pageIndex'
		, limitParam: 'pageSize'
		, filterParam: 'filters'
		, sortParam: 'sorters'
		, extraParams: {
			catalogName: "dbo.Address"
			, identityKey: "IdAddress"
			, primaryKey: ["IdAddress"]
			, mode: "insert"
			, lang: "es"
			, output: 'json'
		}
	}
});

Ext.define('Px.store.Address', {
    extend: 'Ext.data.Store',

    alias: 'store.address',

    model: 'Px.model.Address'
	// data: [
		// { name: 'USA' },
		// { name: 'Canada' }
	// ]
    // ,autoLoad: true
	// ,data: [{
        // customerId:'c2'
		// , address: 'Fake address'
    // }]
});

Ext.define('Px.model.Order', {
    extend: 'Px.model.Base',

    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', unique: true }
        
        ,{ name: 'date', type: 'date', dateFormat: 'Y-m-d', critical: true }
        ,'shipped'
        ,{ 
            name: 'customerId',
            reference: {
                parent: 'Customer'
            }
        }
    ]

    ,proxy: {
        type: 'ajax',
        url: '/Px/Order'
        , api: {
              create: "updateCustomer.asp"
            , update: "updateCustomer.asp"
            , destroy: "updateCustomer.asp"
        }
        ,writer: {
            type:'xml'
            // , partialDataOptions: { // Se evita esta configuración porque recupera toda la información asociada y no solamente los cambios
                // associated: true
            // }
        }
        ,reader: {
            rootProperty:'data'
        }
        , pageParam: 'pageIndex'
        , limitParam: 'pageSize'
        , filterParam: 'filters'
        , sortParam: 'sorters'
        , extraParams: {
            catalogName: "dbo.Order"
            // , identityKey: "IdOrder"
            // , primaryKey: ["IdOrder"]
            , mode: "insert"
            , lang: "es"
            , output: 'json'
        }
    }
});

Ext.define('Px.data.Order', {
    requires: [
        'Px.data.Init'
    ] }
    , function() {
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
        url: /\/Px\/Order(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                filters = ctx.params.filters,
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

/**
 * This controller manages the ChildSession view.
 */
Ext.define('Px.view.security.ChildSessionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.security.childsession',


	onSave: function () {
		//var model = this.getViewModel().data.customers;
       var session = this.getView().getSession(); //this.getView().getSession().getSchema().getEntity("Px.model.Customer").getProxy().update()
        var changes = session.getChanges();
        if (changes == null) {
			Ext.Msg.alert('No Changes', 'There are no changes to the session.');
		} else {
			session.getSaveBatch().start();
		}
	   // this.getViewModel().data["customers"].update()
		// //session.peekRecord('Customer','c1').store.update();
		// // //session.data.Customer["Customer-2"].record.store.update()
		// // //model.update();
		// // //var record = session.getRecord()
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

    createDialog: function(record) {
        var view = this.getView();

        this.isEdit = !!record;
        this.dialog = view.add({
            xtype: 'security-child-session-form',
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('name') : 'Add Customer'
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.
                links: {
                    theCustomer: record || {
                        type: 'Customer',
                        create: true
                    }
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true
        });

        this.dialog.show();
    },

    onAddCustomerClick: function() {
        this.createDialog(null);
    },

    onEditCustomerClick: function (button) {
        this.createDialog(button.getWidgetRecord());
    },

    onRemoveCustomerClick: function(button) {
        var customerGrid = this.lookupReference('customerGrid'),
            selection = customerGrid.getSelectionModel().getSelection()[0];

        selection.drop();
    },

    onAddOrderClick: function() {
        var orders = this.lookupReference('orders').getStore();
        orders.insert(0, {
            date: new Date(),
            shipped: false
        })
    },

    onRemoveOrderClick: function (button) {
        var orders = this.lookupReference('orders').getStore();
        orders.remove(button.getWidgetRecord());
    },

    onSaveClick: function () {
        // Save the changes pending in the dialog's child session back to the
        // parent session.
        var dialog = this.dialog,
            form = this.lookupReference('form'),
            isEdit = this.isEdit,
            id;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = dialog.getViewModel().get('theCustomer').id;
            }
            dialog.getSession().save();
            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session, 
                // we can then use it to insert the record into our store
                this.getStore('customers').add(this.getSession().getRecord('Customer', id));
            }
            this.onCancelClick();
        }
    },

    onCancelClick: function () {
        this.dialog = Ext.destroy(this.dialog);
    },

    renderOrderId: function(v) {
        if (String(v).indexOf('O') > -1) {
            v = v.replace('Order-', 'O');
        }
        return v;
    }
});

/**
 * This ViewModel provides data for the ChildSession view.
 */
Ext.define('Px.view.security.ChildSessionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.security.childsession',

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
Ext.define('Px.view.security.ChildSessionForm', {
    extend: 'Ext.window.Window',
    xtype: 'security-child-session-form',
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
        title: '{title}'
    },
    layout: 'fit',
    modal: true,
    width: 500,
    height: 480,
    closable: true,
	resizable: true,

    items: {
        xtype: 'panaxform',
        reference: 'form',
        bodyPadding: 10,
        border: false,
        // use the Model's validations for displaying form errors
        modelValidation: true
        , items: [{
				xtype:'tabpanel'
				, defaults: {
					bodyPadding: 10
					, autoShow: true
					, autoRender: true
				}
				, items:[
					{
						title: 'tab 1'
						, items:[{
								xtype: 'imagemanager'
								, itemId: 'fileImage'
								, name: 'Foto'
								, parentFolder: "Test"
								, reference: 'foto'
								, bind: {
									value: '{theCustomer.foto}'
								}
							}, {
								xtype:'textfield',
								fieldLabel: 'Name',
                                reference: 'nombre',
                                msgTarget: 'side',
                                bind: '{theCustomer.name}'
								// , allowBlank: false
								// , blankText: 'El primer nombre es requerido.'
							}
						]
					}, {
						title: 'tab 2'
						,layout: {
							type: 'vbox',
							align: 'stretch'
						},
						items: [{
								xtype: 'textfield',
								fieldLabel: 'Name',
								reference: 'name',
								msgTarget: 'side',
								bind: '{theCustomer.name}'
							}, {
								xtype: 'textfield',
								fieldLabel: 'Phone',
								reference: 'phone',
								msgTarget: 'side',
								bind: '{theCustomer.phone}'
							}, {
								xtype: 'grid',
								flex: 1,
								reference: 'orders',
								margin: '10 0 0 0',
								title: 'Orders',
								bind: '{theCustomer.orders}',
								tbar: [{
									text: 'Add Order',
									handler: 'onAddOrderClick'
								}],
								columns: [
									{
										text: 'Id',
										dataIndex: 'id',
										width: 50,
										renderer: 'renderOrderId'
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
											handler: 'onRemoveOrderClick'
										}
									}
								]
							}
						]
					}
				]
			}
		]
    }

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
Ext.define('Px.view.security.ChildSession', {
    extend: 'Ext.panel.Panel',
    xtype: 'security-child-session',
    //<example>
    // otherContent: [{
    //     type: 'ViewModel',
    //     path: 'app/view/security/ChildSessionModel.js'
    // }, {
    //     type: 'ViewController',
    //     path: 'app/view/security/ChildSessionController.js'
    // }, {
    //     type: 'View',
    //     path: 'app/view/security/ChildSessionForm.js'
    // }, {
    //     type: 'Model',
    //     path: 'app/model/Customer.js'
    // }, {
    //     type: 'Model',
    //     path: 'app/model/Order.js'
    // }],
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
        type: 'security.childsession'
    },

    controller: 'security.childsession',

    // Create a session for this view
    session: true,

    items: [{
        flex: 1,
        xtype: 'grid',
        reference: 'customerGrid',
        bind: '{customers}',
        columns: [{
            dataIndex: 'id',
            flex: 1,
            text: 'Id'
        }, {
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
                handler: 'onEditCustomerClick'
            }
        }]
    }],

    tbar: [{
        text: 'Add Customer',
        handler: 'onAddCustomerClick'
    }, {
        text: 'Remove Customer',
        handler: 'onRemoveCustomerClick',
        bind: {
            disabled: '{!customerGrid.selection}'
        }
    }],

    buttons: [{
        text: 'Show Changes',
        handler: 'onSessionChangeClick'
    }, {
        text: 'Save Changes',
        handler: 'onSave'
    }]
});