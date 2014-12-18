Ext.define('KitchenSink.model.tree.Country', {
    extend: 'Ext.data.TreeModel',
    idProperty: 'name',
    fields: [{
        name: "name",
        convert: undefined
    }]
});

Ext.define('KitchenSink.model.State', {
    extend: 'Ext.data.Model',

	fields: [
        'abbr',
        'state',
        'description',
        'country'
    ]
});

Ext.define('KitchenSink.store.Countries', {
    extend: 'Ext.data.Store',

    alias: 'store.table.field.countries',

    model: 'KitchenSink.model.tree.Country',
	// data: [
		// { name: 'USA' },
		// { name: 'Canada' }
	// ]
    autoLoad: true
	,sorters: [{
			property: 'name',
			direction: 'ASC'
		}
	]
	,proxy: {
        type: 'ajax'
        ,reader: {
			type:'json'
			,rootProperty: 'data'
		}
        // url: '/KitchenSink/app/store/Country'
		,url: 'app/store/Country.js'
    }
});

Ext.define('KitchenSink.store.CountryStates', {
    extend: 'Ext.data.Store',

    alias: ['store.country-states','store.states','store.billingStates'],

    model: 'KitchenSink.model.State',

    pageSize: 0,
	// data: [
		// { abbr: 'AL', country: 'USA', state: 'Alabama', 		description: 'The Heart of Dixie' },
		// { abbr: 'AK', country: 'USA', state: 'Alaska', 			description: 'The Land of the Midnight Sun' },
		// { abbr: 'AZ', country: 'USA', state: 'Arizona', 		description: 'The Grand Canyon State' },
		// { abbr: 'AR', country: 'USA', state: 'Arkansas', 		description: 'The Natural State' },
		// { abbr: 'CA', country: 'USA', state: 'California', 		description: 'The Golden State' },
		// { abbr: 'CO', country: 'USA', state: 'Colorado', 		description: 'The Mountain State' },
		// { abbr: 'CT', country: 'USA', state: 'Connecticut', 	description: 'The Constitution State' },
		// { abbr: 'DE', country: 'USA', state: 'Delaware', 		description: 'The First State' },
		// { abbr: 'DC', country: 'USA', state: 'District of Columbia', description: "The Nation's Capital" },
		// { abbr: 'FL', country: 'USA', state: 'Florida', 		description: 'The Sunshine State' },
		// { abbr: 'GA', country: 'USA', state: 'Georgia', 		description: 'The Peach State' },
		// { abbr: 'HI', country: 'USA', state: 'Hawaii', 			description: 'The Aloha State' },
		// { abbr: 'ID', country: 'USA', state: 'Idaho', 			description: 'Famous Potatoes' },
		// { abbr: 'IL', country: 'USA', state: 'Illinois', 		description: 'The Prairie State' },
		// { abbr: 'IN', country: 'USA', state: 'Indiana', 		description: 'The Hospitality State' },
		// { abbr: 'IA', country: 'USA', state: 'Iowa', 			description: 'The Corn State' },
		// { abbr: 'KS', country: 'USA', state: 'Kansas', 			description: 'The Sunflower State' },
		// { abbr: 'KY', country: 'USA', state: 'Kentucky', 		description: 'The Bluegrass State' },
		// { abbr: 'LA', country: 'USA', state: 'Louisiana', 		description: 'The Bayou State' },
		// { abbr: 'ME', country: 'USA', state: 'Maine', 			description: 'The Pine Tree State' },
		// { abbr: 'MD', country: 'USA', state: 'Maryland', 		description: 'Chesapeake State' },
		// { abbr: 'MA', country: 'USA', state: 'Massachusetts', 	description: 'The Spirit of America' },
		// { abbr: 'MI', country: 'USA', state: 'Michigan', 		description: 'Great Lakes State' },
		// { abbr: 'MN', country: 'USA', state: 'Minnesota', 		description: 'North Star State' },
		// { abbr: 'MS', country: 'USA', state: 'Mississippi', 	description: 'Magnolia State' },
		// { abbr: 'MO', country: 'USA', state: 'Missouri', 		description: 'Show Me State' },
		// { abbr: 'MT', country: 'USA', state: 'Montana', 		description: 'Big Sky Country' },
		// { abbr: 'NE', country: 'USA', state: 'Nebraska', 		description: 'Beef State' },
		// { abbr: 'NV', country: 'USA', state: 'Nevada', 			description: 'Silver State' },
		// { abbr: 'NH', country: 'USA', state: 'New Hampshire', 	description: 'Granite State' },
		// { abbr: 'NJ', country: 'USA', state: 'New Jersey', 		description: 'Garden State' },
		// { abbr: 'NM', country: 'USA', state: 'New Mexico', 		description: 'Land of Enchantment' },
		// { abbr: 'NY', country: 'USA', state: 'New York', 		description: 'Empire State' },
		// { abbr: 'NC', country: 'USA', state: 'North Carolina', 	description: 'First in Freedom' },
		// { abbr: 'ND', country: 'USA', state: 'North Dakota', 	description: 'Peace Garden State' },
		// { abbr: 'OH', country: 'USA', state: 'Ohio', 			description: 'The Heart of it All' },
		// { abbr: 'OK', country: 'USA', state: 'Oklahoma', 		description: 'Oklahoma is OK' },
		// { abbr: 'OR', country: 'USA', state: 'Oregon', 			description: 'Pacific Wonderland' },
		// { abbr: 'PA', country: 'USA', state: 'Pennsylvania', 	description: 'Keystone State' },
		// { abbr: 'RI', country: 'USA', state: 'Rhode Island', 	description: 'Ocean State' },
		// { abbr: 'SC', country: 'USA', state: 'South Carolina', 	description: 'Nothing Could be Finer' },
		// { abbr: 'SD', country: 'USA', state: 'South Dakota', 	description: 'Great Faces, Great Places' },
		// { abbr: 'TN', country: 'USA', state: 'Tennessee', 		description: 'Volunteer State' },
		// { abbr: 'TX', country: 'USA', state: 'Texas', 			description: 'Lone Star State' },
		// { abbr: 'UT', country: 'USA', state: 'Utah', 			description: 'Salt Lake State' },
		// { abbr: 'VT', country: 'USA', state: 'Vermont', 		description: 'Green Mountain State' },
		// { abbr: 'VA', country: 'USA', state: 'Virginia', 		description: 'Mother of States' },
		// { abbr: 'WA', country: 'USA', state: 'Washington', 		description: 'Green Tree State' },
		// { abbr: 'WV', country: 'USA', state: 'West Virginia', 	description: 'Mountain State' },
		// { abbr: 'WI', country: 'USA', state: 'Wisconsin', 		description: "America's Dairyland" },
		// { abbr: 'WY', country: 'USA', state: 'Wyoming', 		description: 'Like No Place on Earth' },

		// { abbr: 'ON', country: 'Canada', state: 'Ontario' },
		// { abbr: 'QC', country: 'Canada', state: 'Quebec' },
		// { abbr: 'NS', country: 'Canada', state: 'Nova Scotia' },
		// { abbr: 'NB', country: 'Canada', state: 'New Brunswick' },
		// { abbr: 'MB', country: 'Canada', state: 'Manitoba' },
		// { abbr: 'BC', country: 'Canada', state: 'British Columbia' },
		// { abbr: 'PE', country: 'Canada', state: 'Prince Edward Island' },
		// { abbr: 'SK', country: 'Canada', state: 'Saskatchewan' },
		// { abbr: 'AB', country: 'Canada', state: 'Alberta' },
		// { abbr: 'NL', country: 'Canada', state: 'Newfoundland and Labrador' }
	// ]
	autoLoad:true
	,sorters: [{
			property: 'state',
			direction: 'ASC'
		}
	]
	,proxy: {
        type: 'ajax'
        ,reader: {
			type:'json'
			,rootProperty: 'data'
		}
        // url: '/KitchenSink/app/store/CountryState'
		,url: 'app/store/State.js'
    }
});

Ext.define('KitchenSink.view.binding.CustomFormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.binding-two-way-formulas',

    formulas: {
        age: {
            get: function (data) {
                return this.getAge(data["birthDate"]);
            },

            set: function (age) {
                var date = this.getData().birthDate, //this.getData()["birthDate"] también funciona, considerar para campos que contienen espacios
                    now = new Date();

                if (!date) {
                    date = Ext.Date.add(now, Ext.Date.YEAR, -age);
                } else {
                    date = new Date(now.getFullYear() - age, date.getMonth(), date.getDate());
                    if (this.getAge(date) !== age) {
                        date = new Date(now.getFullYear() - age - 1, date.getMonth(), date.getDate());
                    }
                }

                this.set('birthDate', date);
            }
        },

        fullName: {
            get: function (data) {
                var ret = data.firstName || '';

                if (data.lastName) {
                    ret += ' ' +  data.lastName;
                }

                return ret;
            },

            // By providing the set method "fullName" is two-way bindable.
            set: function (value) {
                var space = value.indexOf(' '),
                    split = (space < 0) ? value.length : space;

                this.set({
                    firstName: value.substring(0, split),
                    lastName: value.substring(split + 1)
                });
            }
        }
    },

    getAge: function (date) {
        var now = new Date(),
            age, birth;

        if (date) {
            age = now.getFullYear() - date.getFullYear();
            now = now.getMonth() * 100 + now.getDate();
            birth = date.getMonth() * 100 + date.getDate();
            if (now < birth) {
                --age;
            }
        }
        return age || 0;
    }
});

Ext.define('KitchenSink.view.binding.CustomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'binding-two-way-formulas',
	// requires: ['Ext.ux.GroupTabPanel'],
    //<example>
    exampleDescription: [
        '<p>This example shows data binding using formulas that can be edited. That is, ',
        '"virtual properties"!</p>'
    ],

	themes: {
        classic: {
            formWidth: 550,
            normalLabelWidth: 90,
            longLabelWidth: 90,
            phoneWidth: 200,
            phoneLabelWidth: 100,
            stateWidth: 115,
            postalCodeLabelWidth: 80,
            expirationMonthWidth: 100,
            expirationYearWidth: 70
        },
        neptune: {
            formWidth: 550,
            normalLabelWidth: 90,
            longLabelWidth: 110,
            phoneWidth: 200,
            phoneLabelWidth: 100,
            stateWidth: 115,
            postalCodeLabelWidth: 80,
            expirationMonthWidth: 100,
            expirationYearWidth: 70
        },
        'neptune-touch': {
            formWidth: 650,
            normalLabelWidth: 100,
            longLabelWidth: 130,
            phoneWidth: 230,
            phoneLabelWidth: 120,
            stateWidth: 125,
            postalCodeLabelWidth: 90,
            expirationMonthWidth: 120,
            expirationYearWidth: 110
        }
    },
	/*Este código hace que aparezca en los tabs de details en la aplicación*/
    // otherContent: [{
        // type: 'ViewModel',
        // path: 'app/view/binding/CustomFormModel.js'
    // }],
    bodyPadding: 10,
    //</example>

    title: 'Custom Form',

    autoScroll: true,
    width: 800,
	height: 500,
    frame: true,
    resizable: true,
	//maximizable: true,
    
    viewModel: {
        // Formulas are defined by the ViewModel:
        type: 'binding-two-way-formulas',

        data: {
            birthDate: new Date(1971, 4, 3),
            firstName: 'John',
            lastName: 'Doe'
        }
    }
	
	, doCancel: function(){
        this.getForm().reset();
    }
	
    , doSubmit: function(){
        var form = this.getForm();
        if (form.isValid()) {
			alert(form.getValues(true));
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));
        }
    }
	
, initComponent: function(){
	Ext.apply(this, {
		buttons: [
			{
				text: 'Cancelar',
				scope: this,
				handler: this.doCancel
			},{
				text: 'Guardar',
				width: 150,
				scope: this,
				handler: this.doSubmit
			}
		]
		,items: [
			{
				xtype: 'tabpanel',
				// The form layout makes labelWidth automatic
				layout: 'anchor',

				//defaultType: 'textfield',
				// ui: 'navigation',
				height: 460,
				//width: 600,
				tabPosition: 'left',
				tabRotation: 0,
				titleRotation: 2,
				tabBar: {
					// turn off borders for classic theme.  neptune and crisp don't need this
					// because they are borderless by default
					border: false
				},
			
				defaults: {
					textAlign: 'left',
					bodyPadding: 10
				},

				items: [{
					title: 'Home',
					glyph: 72,
					items: [{
						xtype:'tabpanel'
						, defaults: {
							bodyPadding: 10
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
									xtype:'textfield',
									fieldLabel: 'Full Name (virtual)',
									bind: '{fullName}'
								}, {
									xtype: 'fieldcontainer',
									fieldLabel: 'Age',
									layout: {
										type: 'hbox',
										align: 'center'
									},
									items: [{
										xtype: 'numberfield',
										width: 100,
										bind: '{age}'
									}, {
										xtype: 'slider',
										width: 80,
										margin: '0 0 0 8',
										bind: '{age}'
									}, {
										xtype: 'slider',
										width: 80,
										publishOnComplete: true,
										margin: '0 0 0 8',
										bind: '{age}'
									}]
								}, {
									xtype: 'datefield',
									fieldLabel: 'Birth Date',
									bind: '{birthDate}'
								}
							]
							}
						]
					}]
				}, {
					title: 'Users',
					glyph: 117,
					// items: [
					// ]
					html: KitchenSink.DummyText.extraLongText
				}, {
					title: 'Groups'
					, glyph: 85
					, layout: 'column'
					, bodyPadding: 10
					, defaults: {
						labelWidth: 110
						, bodyPadding: 10
						}
					, items:[
						{
							xtype:'textfield'
							, columnWidth: .5
							, fieldLabel: 'First Name'
							, bind: {
								value: '{firstName}'
							}
						}, {
							xtype:'textfield'
							, columnWidth: .5
							, fieldLabel: 'Last Name'
							, bind: {
								value: '{lastName}'
							}
						}, {
							xtype:'displayfield'
							, columnWidth: .5
							, fieldLabel: 'Full Name'
							, bind: {
								value: '{calculatedName}'
							}
						}, {
							xtype: 'fieldcontainer'
							, fieldLabel: 'Ciudad de Nacimiento'
							, columnWidth: 1
							//
							, layout: 'vbox'
							, defaults: { labelAlign:'left', hideLabel: false, flex:0, labelWidth: 60, undefined:null}
							, items:[
								{
									xtype: 'combo',
									fieldLabel: 'Country',
									reference: 'field.country',
									displayField: 'name',
									valueField: 'name',
									publishes: 'value',
									queryMode: 'local',//'remote',//
									store: {
										type: 'table.field.countries'
									}
								},{
									xtype: 'combo',
									fieldLabel: 'State',
									displayField: 'state',
									valueField: 'abbr',
									queryMode: 'local',//'remote',
									bind: {
										//visible: '{field.country.value}',
										filters: {
											property: 'country',
											value: '{field.country.value}'
										}
									},
									store: {
										type: 'country-states'
									}
								}
							]
						}

					]
				}, {
					title: 'Settings'
					//,autoScroll: true
					,glyph: 42
					,items: [
						{
							xtype: 'fieldset',
							title: 'Your Contact Information',
							defaultType: 'textfield',
							layout: 'anchor',
							defaults: {
								anchor: '100%'
							},
							items: [{
								xtype: 'fieldcontainer',
								fieldLabel: 'Name',
								layout: 'hbox',
								combineErrors: true,
								defaultType: 'textfield',
								defaults: {
									hideLabel: 'true'
								},
								items: [{
									name: 'firstName',
									fieldLabel: 'First Name',
									flex: 2,
									emptyText: 'First',
									allowBlank: false,
									bind: {
										value: '{firstName}'
									}
								}, {
									name: 'lastName',
									fieldLabel: 'Last Name',
									flex: 3,
									margins: '0 0 0 6',
									emptyText: 'Last',
									allowBlank: false,
									bind: {
										value: '{lastName}'
									}
								}]
							}, {
								xtype: 'container',
								layout: 'hbox',
								defaultType: 'textfield',
								margin: '0 0 5 0',
								items: [{
									fieldLabel: 'Email Address',
									name: 'email',
									vtype: 'email',
									flex: 1,
									allowBlank: false
								}, {
									fieldLabel: 'Phone Number',
									labelWidth: 100,//this.themeInfo.phoneLabelWidth,
									name: 'phone',
									width: 200,//this.themeInfo.phoneWidth,
									emptyText: 'xxx-xxx-xxxx',
									maskRe: /[\d\-]/,
									regex: /^\d{3}-\d{3}-\d{4}$/,
									regexText: 'Must be in the format xxx-xxx-xxxx'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Mailing Address',
							defaultType: 'textfield',
							layout: 'anchor',
							defaults: {
								anchor: '100%'
							},
							items: [{
								labelWidth: 110,//this.themeInfo.longLabelWidth,
								fieldLabel: 'Street Address',
								name: 'mailingStreet',
								// listeners: {
									// scope: this,
									// change: this.onMailingAddrFieldChange
								// },
								billingFieldName: 'billingStreet',
								allowBlank: false
							}, {
								xtype: 'container',
								layout: 'hbox',
								margin: '0 0 5 0',
								items: [{
									labelWidth: 110,//this.themeInfo.longLabelWidth,
									xtype: 'textfield',
									fieldLabel: 'City',
									name: 'mailingCity',
									// listeners: {
										// scope: this,
										// change: this.onMailingAddrFieldChange
									// },
									billingFieldName: 'billingCity',
									flex: 1,
									allowBlank: false
								}, {
									xtype: 'combobox',
									name: 'mailingState',
									forceSelection: true,
									maxLength: 2,
									enforceMaxLength: true,
									// listeners: {
										// scope: this,
										// change: this.onMailingAddrFieldChange
									// },
									billingFieldName: 'billingState',
									fieldLabel: 'State',
									labelWidth: 50,
									width: 115,//this.themeInfo.stateWidth,
									listConfig: {
										minWidth: null
									},
									store: {
										type: 'country-states'
									},
									valueField: 'abbr',
									displayField: 'abbr',
									typeAhead: true,
									queryMode: 'local',
									allowBlank: false
								}, {
									xtype: 'textfield',
									fieldLabel: 'Postal Code',
									labelWidth: 80,//this.themeInfo.postalCodeLabelWidth,
									name: 'mailingPostalCode',
									// listeners: {
										// scope: this,
										// change: this.onMailingAddrFieldChange
									// },
									billingFieldName: 'billingPostalCode',
									width: 160,
									allowBlank: false,
									maxLength: 10,
									enforceMaxLength: true,
									maskRe: /[\d\-]/,
									regex: /^\d{5}(\-\d{4})?$/,
									regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Billing Address',
							layout: 'anchor',
							defaults: {
								anchor: '100%'
							},
							items: [{
								xtype: 'checkbox',
								name: 'billingSameAsMailing',
								boxLabel: 'Same as Mailing Address?',
								reference: 'billingSameAsMailing',
								hideLabel: true,
								checked: true,
								margin: '0 0 10 0',
								scope: this,
								// handler: this.onSameAddressChange
							}, {
								labelWidth: 110,//this.themeInfo.longLabelWidth,
								xtype: 'textfield',
								fieldLabel: 'Street Address',
								name: 'billingStreet',
								//style: 'opacity:.3',
								bind: {
									disabled: '{billingSameAsMailing.checked}'
									},
								allowBlank: false
							}, {
								xtype: 'container',
								layout: 'hbox',
								margin: '0 0 5 0',
								items: [{
									labelWidth: 110,//this.themeInfo.longLabelWidth,
									xtype: 'textfield',
									fieldLabel: 'City',
									name: 'billingCity',
									//style: 'opacity:.3',
									flex: 1,
									bind: {
										disabled: '{billingSameAsMailing.checked}'
										},
									allowBlank: false
								}, {
									xtype: 'combobox',
									name: 'billingState',
									maxLength: 2,
									enforceMaxLength: true,
									//style: 'opacity:.3',
									fieldLabel: 'State',
									labelWidth: 50,
									listConfig: {
										minWidth: null
									},
									width: 115,//this.themeInfo.stateWidth,
									store: {
										type: 'billingStates'
									},
									valueField: 'abbr',
									displayField: 'abbr',
									typeAhead: true,
									queryMode: 'local',
									bind: {
										disabled: '{billingSameAsMailing.checked}'
										},
									allowBlank: false,
									forceSelection: true
								}, {
									xtype: 'textfield',
									fieldLabel: 'Postal Code',
									labelWidth: 80,//this.themeInfo.postalCodeLabelWidth,
									name: 'billingPostalCode',
									//style: 'opacity:.3',
									width: 160,
									bind: {
										disabled: '{billingSameAsMailing.checked}'
										},
									allowBlank: false,
									maxLength: 10,
									enforceMaxLength: true,
									maskRe: /[\d\-]/,
									regex: /^\d{5}(\-\d{4})?$/,
									regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Payment',
							layout: 'anchor',
							defaults: {
								anchor: '100%'
							},
							items: [{
								xtype: 'radiogroup',
								anchor: 'none',
								layout: {
									autoFlex: false
								},
								defaults: {
									name: 'ccType',
									margin: '0 15 0 0'
								},
								items: [{
									inputValue: 'visa',
									boxLabel: 'VISA',
									checked: true
								}, {
									inputValue: 'mastercard',
									boxLabel: 'MasterCard'
								}, {
									inputValue: 'amex',
									boxLabel: 'American Express'
								}, {
									inputValue: 'discover',
									boxLabel: 'Discover'
								}]
							}, {
								xtype: 'textfield',
								name: 'ccName',
								fieldLabel: 'Name On Card',
								labelWidth: 110,
								allowBlank: false
							}, {
								xtype: 'container',
								layout: 'hbox',
								margin: '0 0 5 0',
								items: [{
									xtype: 'textfield',
									name: 'ccNumber',
									fieldLabel: 'Card Number',
									labelWidth: 110,
									flex: 1,
									allowBlank: false,
									minLength: 15,
									maxLength: 16,
									enforceMaxLength: true,
									maskRe: /\d/
								}, {
									xtype: 'fieldcontainer',
									fieldLabel: 'Expiration',
									labelWidth: 75,
									layout: 'hbox',
									items: [{
										xtype: 'combobox',
										name: 'ccExpireMonth',
										displayField: 'name',
										valueField: 'num',
										queryMode: 'local',
										emptyText: 'Month',
										hideLabel: true,
										margins: '0 6 0 0',
										store: new Ext.data.Store({
											fields: ['name', 'num'],
											data: (function() {
												var data = [];
													Ext.Array.forEach(Ext.Date.monthNames, function(name, i) {
													data[i] = {name: name, num: i + 1};
												});
												return data;
											})()
										}),
										width: 100,//this.themeInfo.expirationMonthWidth,
										allowBlank: false,
										forceSelection: true
									}, {
										xtype: 'numberfield',
										name: 'ccExpireYear',
										hideLabel: true,
										width: 70,//this.themeInfo.expirationYearWidth,
										value: new Date().getFullYear(),
										minValue: new Date().getFullYear(),
										allowBlank: false
									}]
								}]
							}]
						}
					]
				}]
				
				// items:[function() { var grouptabpanel = Ext.create('Ext.ux.GroupTabPanel', 
					// {
						// xtype: 'grouptabpanel',
						// activeGroup: 0,
						// items: [{
							// mainItem: 0,
							// items: [{
								// title: 'Tickets',
								// iconCls: 'x-icon-tickets',
								// tabTip: 'Tickets tabtip',
								// //border: false,
								// xtype: 'panel',
								// html:"To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed.",
								// margin: '10',
								// height: null
							// }, {
								// title: 'Subscriptions',
								// iconCls: 'x-icon-subscriptions',
								// tabTip: 'Subscriptions tabtip',
								// style: 'padding: 10px;',
								// border: false,
								// layout: 'fit',
								// items: [{
									// xtype: 'tabpanel',
									// activeTab: 0,
									// items: [{
										// title: 'Nested Tabs',
										// html:"To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed."
									// }]
								// }]
							// }, {
								// title: 'Users',
								// iconCls: 'x-icon-users',
								// tabTip: 'Users tabtip',
								// style: 'padding: 10px;',
								// html:"To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed."
							// }]
						// }, {
							// expanded: true,
							// items: [{
								// title: 'Configuration',
								// iconCls: 'x-icon-configuration',
								// tabTip: 'Configuration tabtip',
								// style: 'padding: 10px;',
								// html:"To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed."
							// }, {
								// title: 'Email Templates',
								// iconCls: 'x-icon-templates',
								// tabTip: 'Templates tabtip',
								// style: 'padding: 10px;',
								// border: false,
								// items: {
									// xtype: 'form',
									// // since we are not using the default 'panel' xtype, we must specify it
									// id: 'form-panel',
									// labelWidth: 75,
									// title: 'Form Layout',
									// bodyStyle: 'padding:15px',
									// labelPad: 20,
									// defaults: {
										// width: 230,
										// labelSeparator: '',
										// msgTarget: 'side'
									// },
									// defaultType: 'textfield',
									// items: [{
										// fieldLabel: 'First Name',
										// name: 'first',
										// allowBlank: false
									// }, {
										// fieldLabel: 'Last Name',
										// name: 'last'
									// }, {
										// fieldLabel: 'Company',
										// name: 'company'
									// }, {
										// fieldLabel: 'Email',
										// name: 'email',
										// vtype: 'email'
									// }],
									// buttons: [{
										// text: 'Save'
									// }, {
										// text: 'Cancel'
									// }]
								// }
							// }]
						// }, {
							// expanded: false,
							// items: {
								// title: 'Single item in third',
								// bodyPadding: 10,
								// html: '<h1>The third tab group only has a single entry.<br>This is to test the tab being tagged with both "first" and "last" classes to ensure rounded corners are applied top and bottom</h1>',
								// border: false
							// }
						// }]
					// })}()
				// ]
				// items: [{
					// xtype:'tabpanel'
					// , items:[{
						// title: 'tab 1'
						// , items:[{
								// xtype:'textfield',
								// fieldLabel: 'First Name',
								// bind: '{firstName}'
							// }, {
								// xtype:'textfield',
								// fieldLabel: 'Last Name',
								// bind: '{lastName}'
							// }
						// ]
						// }
						// , {
						// title: 'tab 2'
						// , items: [{
								// xtype:'textfield',
								// fieldLabel: 'Full Name (virtual)',
								// bind: '{fullName}'
							// }, {
								// xtype: 'fieldcontainer',
								// fieldLabel: 'Age',
								// layout: {
									// type: 'hbox',
									// align: 'center'
								// },
								// items: [{
									// xtype: 'numberfield',
									// width: 100,
									// bind: '{age}'
								// }, {
									// xtype: 'slider',
									// width: 80,
									// margin: '0 0 0 8',
									// bind: '{age}'
								// }, {
									// xtype: 'slider',
									// width: 80,
									// publishOnComplete: true,
									// margin: '0 0 0 8',
									// bind: '{age}'
								// }]
							// }, {
								// xtype: 'datefield',
								// fieldLabel: 'Birth Date',
								// bind: '{birthDate}'
							// }
						// ]
						// }
					// ]
				// }]
			}
		]
	});
	this.callParent();
	}
});
