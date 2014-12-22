Ext.ns('Panax');

Ext.apply(Panax, {
	NEW: '<new>',
	REFRESH: '<refresh>'
});

Ext.ns('Panax.util');
Ext.ns('util');

Ext.ns('app');
Ext.Loader.setPath({
    'Panax': 'app',
    'Px': 'app',
	'Ext.ux': '../../resources/ext-5.1.0/examples/ux',
	'app': 'custom/scripts'
});

Ext.require('app.config');


Panax.requestInstance = function(parameters, xmlData) {
	Ext.Ajax.request({
			url: 'request.asp'
			, timeout: 360000
			, method: xmlData?'POST':'GET'
			, async: false
			, xmlData: xmlData
			, params: parameters
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
		});
	return parameters
};

Panax.getInstance = function (model, configuration, xmlData) {
	var configuration = (configuration || {});
	if (model.rebuild==1) {
		model["output"]='json'
		model=Panax.requestInstance(model, xmlData);
	}
	else {
		model=Panax.requestInstance(function(){ 
				var params=model 
				params["getData"]=0
				params["getStructure"]=1
				params["output"]='json'
				return params;
				}(), xmlData);
	}
	if (!model.success/* && Panax.session.loginStatus!='Conected'*/) {
		return false;
	}
	try {
		var classObject = Ext.create('Cache.app.'+model.dbId+'.'+model.lang+'.'+model.catalogName+'.'+model.mode+'.'+model.controlType, configuration);
	} catch(e) {
		if ((e.type=="called_non_callable" || e.type===undefined) && (model.rebuild===undefined?0:model.rebuild)!=1) {
			//ToDo: debugMode=1
			model["rebuild"]=1
			classObject = Panax.getInstance(model, configuration, xmlData);
		} else {
			Ext.MessageBox.show({
				title: 'Error',
				msg: "Este módulo no está disponible en este momento",
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			Ext.log.error(e.stack);
		}
	}
	return classObject;
};

Panax.getPanaxComponent = function(model, configuration) {
	var className, cmp, ViewClass;

	className = (model.prefix+"."+model.dbId+"."+model.lang+"."+model.catalogName+"."+model.mode+"."+model.controlType || Ext.ClassManager.getNameByAlias(model.alias));

    ViewClass = (Ext.ClassManager.get(className));
    if (!ViewClass) {
        if (className) {
            cmp = Panax.getInstance({
                catalogName: model.catalogName
                , controlType: model.controlType
                , mode: model.mode
                //ToDo: Development only
                , rebuild: 1
                }, configuration);
        } else {
            Ext.log.warn('Class with alias "'+model.alias+(className?'" or name "'+className:"")+'" not found.');
            return;
        }
    } else {
    	cmp = Ext.create(className, configuration);
    }

    return cmp;
};

// Ext.define('Panax.data.Init', {
//     requires: [
//         'Ext.ux.ajax.JsonSimlet',
//         'Ext.ux.ajax.SimManager'
//     ],

//     singleton: true,

//     constructor: function() {
//         Ext.ux.ajax.SimManager.init({
//             defaultSimlet: null
//         });

//         Ext.ux.ajax.SimManager.register({
// 	        type: 'json',
// 	        url: /\/PX\/Request/,
// 	        data: Ext.Ajax.request({
// 	        	url: "request.asp",
// 			    success: function(response, opts) {
// 			    	alert("ajaxrequest success");
// 			    },
// 			    failure: function(response, opts) {
// 			    	alert("ajaxrequest FAIL");
// 			    }
// 	        })
// 	    });
//     }
// });

// Ext.define('Ext.ux.form.CurrencyField', {
//     extend: 'Ext.form.field.Number',//Extending the NumberField
//     alias: 'widget.currencyfield',//Defining the xtype,
//     currencySymbol: '$',
//     useThousandSeparator: true,
//     thousandSeparator: ',',
//     alwaysDisplayDecimals: true,
//     fieldStyle: 'text-align: right;',
// 	initComponent: function(){
//         if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',') 
//             this.thousandSeparator = '.';
//         else 
//             if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.') 
//                 this.decimalSeparator = ',';
        
//         this.callParent(arguments);
//     },
//     setValue: function(value){
//         Ext.ux.form.CurrencyField.superclass.setValue.call(this, value != null ? value.toString().replace('.', this.decimalSeparator) : value);
        
//         this.setRawValue(this.getFormattedValue(this.getValue()));
//     },
//     getFormattedValue: function(value){
//         if (Ext.isEmpty(value) || !this.hasFormat()) 
//             return value;
//         else 
//         {
//             var neg = null;
            
//             value = (neg = value < 0) ? value * -1 : value;
//             value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;
            
//             if (this.useThousandSeparator) 
//             {
//                 if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator)) 
//                     throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
                
//                 if (this.thousandSeparator == this.decimalSeparator) 
//                     throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
                
//                 value = value.toString();
                
//                 var ps = value.split('.');
//                 ps[1] = ps[1] ? ps[1] : null;
                
//                 var whole = ps[0];
                
//                 var r = /(\d+)(\d{3})/;
                
//                 var ts = this.thousandSeparator;
                
//                 while (r.test(whole)) 
//                     whole = whole.replace(r, '$1' + ts + '$2');
                
//                 value = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
//             }
            
//             return Ext.String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), value);
//         }
//     },
//     /**
//      * overrides parseValue to remove the format applied by this class
//      */
//     parseValue: function(value){
//         //Replace the currency symbol and thousand separator
//         return Ext.ux.form.CurrencyField.superclass.parseValue.call(this, this.removeFormat(value));
//     },
//     /**
//      * Remove only the format added by this class to let the superclass validate with it's rules.
//      * @param {Object} value
//      */
//     removeFormat: function(value){
//         if (Ext.isEmpty(value) || !this.hasFormat()) 
//             return value;
//         else 
//         {
//             value = value.toString().replace(this.currencySymbol + ' ', '');
            
//             value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;
            
//             return value;
//         }
//     },
//     /**
//      * Remove the format before validating the the value.
//      * @param {Number} value
//      */
//     getErrors: function(value){
//         return Ext.ux.form.CurrencyField.superclass.getErrors.call(this, this.removeFormat(value));
//     },
//     hasFormat: function(){
//         return this.decimalSeparator != '.' || (this.useThousandSeparator == true && this.getRawValue() != null) || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
//     },
//     /**
//      * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
//      * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
//      */
//     onFocus: function(){
//         this.setRawValue(this.removeFormat(this.getRawValue()));
        
//         this.callParent(arguments);
//     }
// });

// Panax.loadingMask = new Ext.LoadMask({
// 	msg: "Cargando...",
// 	//target: Ext.ComponentQuery.query('main-viewport')[0], /*main-viewport is xtype of my main viewport*/
// 	target: Ext.getBody(),
// 	alwaysOnTop: true
// });

// Ext.define('Panax.view.PanaxFiltersForm', {
//     extend: 'Panax.view.PanaxForm',
//     alias: 'widget.panaxfiltersform',
// 	initComponent: function() {
// 		var me = this;

// 		Ext.apply(this, {
// 			bbar: Ext.create('Ext.ux.StatusBar', {
// 				reference: 'filters-statusbar'
// 				, defaultText: 'Listo'
// 				, ui: 'filters-footer'
// 				, statusAlign: 'left'
// 				, items: [{
// 						itemId: 'filter'
// 						, text: 'Filtrar'
// 						, handler: 'onFilter'
// 			    }]
// 			})
// 		});

//         this.callParent();
//     }
// });

// Ext.define('Panax.controls.CascadedDropDown', { 
//     extend: 'Ext.form.FieldContainer',
//     // mixins: {
//     //     field: 'Ext.form.field.Base'
//     // },
//     alias: 'widget.cascadeddropdown', 
 
// 	layout: { type: 'table', columns: 1 },
// 	// src: '../../../../Images/FileSystem/no_photo.gif',
// 	// name: undefined,
// 	// submitValue: false,
// 	// readOnly: false,
	
//  //    initComponent: function() { 
// 	// 	var me = this;
// 	// 	// Set up a model to use in our Store
//  //        me.callParent(arguments);
//  //        Ext.Array.each(me.items.items, function(obj, index, thisArray) {
// 	// 		 if (obj.name==me.name) obj.name+='_internal'
// 	// 	 });
// 	// 	me.store=Ext.create('Ext.data.Store', {
// 	// 		model: "Panax.model.ajaxdropdown",
// 	// 		listeners: {
// 	// 			datachanged: function(store) {
// 	// 				if (me.items.get(0) && me.items.get(0).store) {

// 	// 					if (me.items.get(0).getStore().tree) {
// 	// 						me.items.get(0).setRootNode(store.raw);
// 	// 					}
// 	// 					else {
// 	// 						me.items.get(0).getStore().removeAll();
// 	// 						me.items.get(0).getStore().add(store.data.items);
// 	// 					}
// 	// 				}					// var childStore = record[association.storeName];
// 	// 				// childStore.each(function(childRecord) {


// 	// 					// //Recursively get the record data for children (depth first)
// 	// 					// var child = me.getRecordData.call(me, childRecord);

// 	// 					// /*
// 	// 					 // * If the child was marked dirty or phantom it must be added. If there was data returned that was neither
// 	// 					 // * dirty or phantom, this means that the depth first recursion has detected that it has a child which is
// 	// 					 // * either dirty or phantom. For this child to be put into the prepared data, it's parents must be in place whether
// 	// 					 // * they were modified or not.
// 	// 					 // */
// 	// 					// if (childRecord.dirty | childRecord.phantom | (child && child.records != null)){
// 	// 						// dataRow.associations[association.name].records.push(child);
// 	// 						// //record.setDirty();
// 	// 					// }
// 	// 				// }, me);
// 	// 			}
// 	// 		}
// 	// 	});
//  //    }
// 	// , cascadeStore: function(item, store) {
// 	// 	item.data=store
// 	// }
// 	// , getErrors: function (value){
// 	// 	var me = this, 
// 	// 		errors = [],
// 	// 		value = (value || me.getRawValue());
		
// 	// 	if(this.allowBlank==false  && !value){
// 	// 		errors.push("El campo es obligatorio");
// 	// 	}
// 	// 	return errors;
// 	// }
// 	// , setValue: function(value) {
// 	// 	var me = this;
// 	// 	var mainField = me.items.get(me.items.length-1)//.items.get(0)
// 	// 	if (mainField) mainField.setValue(value)
// 	// }
// 	// , getInputEl: function() {
// 	// 	var me = this;
// 	// 	return me.items.get(me.items.length-1)//.items.get(0).getValue()
// 	// }
// 	// // , getValue: function() {
// 	// 	var me = this;
// 	// 	var inputEl=me.getInputEl()
// 	// 	return inputEl.getValue()
// 	// }
// 	// , getRawValue: function() {
//  //        var me=this, 
// 	// 		inputEl=me.getInputEl()
// 	// 	var v = Ext.valueFrom((inputEl.getValue()||{})[inputEl.valueField],'');
//  //        me.rawValue = v;
//  //        return v;
//  //    }
// 	// , setReadOnly: function(bReadonly) {
// 	// 	var me = this;
// 	// 	Ext.apply(me, {readOnly: bReadonly});
// 	// 	Ext.Array.each(me.items.items, function(obj, index, thisArray) {
// 	// 		obj.setReadOnly(bReadonly);
// 	// 	});
// 	// }
// 	// , setRequired: function(required) {
// 	// 	this.allowBlank=!required;
// 	// 	// Ext.Array.each(this.items.items, function(obj, index, thisArray){
// 	// 		// obj.allowBlank=!required;
// 	// 	// });
// 	// 	if (required) {
// 	// 		this.addCls('required')
// 	// 	} else {
// 	// 		this.removeCls('required')
// 	// 	}
// 	// }
// }); 

// Ext.define("Panax.model.ajaxdropdown", {
//     extend: 'Panax.model.SchemaBase',

// 	//idProperty: 'id',
//     fields: [/*'id', */'text', 'fk', 'children', 'metaData'],
// 	validators: [],
//     initComponent: function(){
// 		this.callParent();
// 	}
// 	// associations: [],
// });


// Ext.define("Panax.controls.ajaxdropdown", {
//     extend: 'Ext.form.field.ComboBox',
// 	//model: 'Panax.model.ajaxdropdown',
// 	alias:'widget.ajaxdropdown',
// 	displayField: 'text',
// 	valueField: 'id',
// 	config: {
// 	}
// 	//OVERRIDE to support {Object} Values
//     /*setValue: function(value, doSelect) {
//         var me = this,
//             valueNotFoundText = me.valueNotFoundText,
//             store = me.getStore(),
//             inputEl = me.inputEl,
//             matchedRecords = [],
//             displayTplData = [],
//             processedValue = [],
//             autoLoadOnValue = me.autoLoadOnValue,
//             pendingLoad = store.hasPendingLoad(),
//             unloaded = autoLoadOnValue && store.loadCount === 0 && !pendingLoad,
//             i, len, record, dataObj;

//         if (value != null && (pendingLoad || unloaded || store.isEmptyStore)) {
            
            
//             me.value = value;
//             me.setHiddenValue(me.value);
//             if (unloaded && store.getProxy().isRemote) {
//                 store.load();
//             }
//             return me;
//         }

        
//         value = Ext.Array.from(value);

        
//         for (i = 0, len = value.length; i < len; i++) {
//             record = value[i];
//             if (!record || !record.isModel) {
//                 record = me.findRecordByValue(record);
//             }
            
//             if (record) {
//                 matchedRecords.push(record);
//                 displayTplData.push(record.data);
//                 processedValue.push(record.get(me.valueField));
//             }
            
            
//             else {
                
                
//                 if (!me.forceSelection) {
//                     processedValue.push(value[i]);
//                     dataObj = {};
//                     //original line
//                     dataObj[me.displayField] = value[i];
//                     //modified line
//                     //dataObj[me.displayField] = value[i][me.displayField];
//                     displayTplData.push(dataObj);
                    
//                 }
                
//                 else if (Ext.isDefined(valueNotFoundText)) {
//                     displayTplData.push(valueNotFoundText);
//                 }
//             }
//         }

        
//         me.setHiddenValue(processedValue);
//         me.value = me.multiSelect ? processedValue : processedValue[0] ;
//         if (!Ext.isDefined(me.value)) {
//             me.value = undefined;
//         }
//         me.displayTplData = displayTplData; 
//         me.lastSelection = me.valueModels = matchedRecords;

//         if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
//             inputEl.removeCls(me.emptyCls);
//         }

        
//         me.setRawValue(me.getDisplayValue());
//         me.checkChange();

//         if (doSelect !== false) {
//             me.syncSelection();
//         }
//         me.applyEmptyText();

//         return me;
//     },*/
//     //OVERRIDE to support remote String filters
//     // setFilters: function(filters) {
//     // 	if(Ext.isString(filters)) {
//     // 		this.getStore().getProxy().extraParams.filters = filters;
//     // 	} else {
//     // 		this.callParent(arguments);
//     // 	}
//     // },
//  //    initComponent: function(config){
// 	// 	config=Panax.util.updateWidth(this, config);
// 	// 	Ext.apply(this, config);
// 	// 	this.callParent([config]);
// 	// }
// 	// ,cls: 'ajaxdropdown'
// 	// , afterRender: function(){
// 	// 	var me = this;
// 	// 	this.configButton = this.getEl().down('.configbutton');
// 	// 	if(this.configButton){
// 	// 		this.configButton.on("contextmenu", function(e, t, eOps){ 
// 	// 			if(!this.menuContext){
// 	// 				this.menuContext = Ext.create('Panax.controls.ajaxDropdownContextMenu',{caller:me, insertEnabled: me.insertEnabled, editEnabled: me.editEnabled, deleteEnabled: me.deleteEnabled, refreshEnabled: me.refreshEnabled});
// 	// 			}
// 	// 			this.menuContext.showAt({x: e.browserEvent.x, y: e.browserEvent.y});
// 	// 		}, null, {preventDefault: true}); 
			
// 	// 		this.configButton.on("click", function(e, t, eOps){ 
// 	// 			if(!this.menuContext){
// 	// 				this.menuContext = Ext.create('Panax.controls.ajaxDropdownContextMenu',{caller:me, insertEnabled: me.insertEnabled, editEnabled: me.editEnabled, deleteEnabled: me.deleteEnabled, refreshEnabled: me.refreshEnabled});
// 	// 			}
// 	// 			this.menuContext.showAt({x: e.browserEvent.x, y: e.browserEvent.y});
// 	// 		}, null, {preventDefault: true}); 
// 	// 	}
// 	// }
// 	// ,afterSubTpl:'<div class="buttonsPanel"><span class="configbutton" style="margin-right:5px;"><a href="#" tabIndex="-1">&nbsp;CONFIG</a></span></div>'
// 	//<span class="deletebutton" style="margin-right:5px;" onclick="alert(1);"><a href="#">&nbsp;</a></span><span class="addbutton" style="margin-right:5px;" onclick="alert(1);"><a href="#">&nbsp;</a></span><span class="editbutton" style="margin-right:5px;" onclick="alert(1);"><a href="#">&nbsp;</a></span><span class="refreshbutton" style="margin-right:5px;" onclick="alert(1);"><a href="#">&nbsp;</a></span>
// 	// , fieldSubTpl: [
//  //        '<div class="{hiddenDataCls}" role="presentation"></div>',
//  //        '<input id="{id}" type="{type}" {inputAttrTpl} class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"',
//  //            '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
//  //            '<tpl if="name"> name="{name}"</tpl>',
//  //            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
//  //            '<tpl if="size"> size="{size}"</tpl>',
//  //            '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
//  //            '<tpl if="readOnly"> readonly="readonly"</tpl>',
//  //            '<tpl if="disabled"> disabled="disabled"</tpl>',
//  //            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
//  //            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
//  //            '/>',
//  //        {
//  //            compiled: true,
//  //            disableFormats: true
//  //        }
//  //    ]
// 	// ,newRecord: function() {
// 	// 	var combo = this;
// 	// 	var instance=combo.settings
// 	// 	instance["mode"]='insert'
// 	// 	var content = Panax.getInstance(instance);
// 	// 	if (content) {
// 	// 		var win = Ext.create('Panax.modalWindow',{title: 'Agregar nuevo registro', opener: combo});
// 	// 		var container=win;
// 	// 		container.add(content);
// 	// 		win.show();	
// 	// 		win.animateTarget=combo; // La animación tiene que hacerse después de que se abre, de lo contrario la máscara de "cargando" no se muestra correctamente. TODO: Corregir
// 	// 		win.on({
// 	// 			close: function(){
// 	// 				combo.refreshRecords();
// 	// 			}
// 	// 		});
// 	// 	}
// 	// }
	
// 	// ,editRecord: function() {
// 	// 	var combo = this;
// 	// 	var value = combo.getValue()
// 	// 	if (value && value.id) {
// 	// 		var instance=combo.settings
// 	// 		instance["mode"]='edit'
// 	// 		var content = Panax.getInstance(instance, {filters: "["+combo.settings.primaryKey+"]='"+value.id+"'"});
// 	// 		if (content) {
// 	// 			var win = Ext.create('Panax.modalWindow',{title: 'Agregar nuevo registro', opener: combo});
// 	// 			var container=win;
// 	// 			container.add(content);
// 	// 			win.show();	
// 	// 			win.animateTarget=combo; // La animación tiene que hacerse después de que se abre, de lo contrario la máscara de "cargando" no se muestra correctamente. TODO: Corregir
// 	// 			win.on({
// 	// 				close: function(){
// 	// 					combo.refreshRecords();
// 	// 				}
// 	// 			});
// 	// 		}
// 	// 	}
// 	// }

// 	// ,deleteRecord: function() {
// 	// 	var combo = this;
// 	// 	var value = combo.getValue()
// 	// 	if (value && value.id) {
// 	// 		var updateXML='<dataTable name="'+combo.settings.catalogName+'" primaryKey="'+combo.settings.primaryKey+'"><deleteRow primaryValue="'+value.id+'" sourceObjectId="'+combo.itemId+'"/></dataTable>'
			
// 	// 		Ext.Ajax.request({
// 	// 			url: '../Scripts/update.asp'
// 	// 			, timeout: 360000
// 	// 			, method: 'POST'
// 	// 			, async: false
// 	// 			, xmlData: updateXML
// 	// 			, success: function(xhr) {
// 	// 				var response=Ext.JSON.decode(xhr.responseText); 
// 	// 				// parameters["success"] = (response.success/* && confirm("Se reconstruyó el módulo, continuar?")*/);
// 	// 					if (response.callback) {
// 	// 						response.callback();
// 	// 					}					
// 	// 					else {
// 	// 						if (response.message) {
// 	// 							Ext.MessageBox.show({
// 	// 								title: 'MENSAJE DEL SISTEMA',
// 	// 								msg: response.message,
// 	// 								icon: response.success?Ext.MessageBox.INFO:Ext.MessageBox.ERROR,
// 	// 								buttons: Ext.Msg.OK
// 	// 							});
// 	// 						}
// 	// 					}
// 	// 					combo.refreshRecords();
// 	// 				// parameters = Ext.apply(parameters, response.catalog)
// 	// 			}
// 	// 			, failure: function() {
// 	// 				Ext.Msg.alert("Error de comunicación", "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
// 	// 				parameters["success"] = false;
// 	// 			}
// 	// 		});
			
// 	// 	}
// 	// }

// 	// ,refreshRecords: function() {
// 	// 	var combo = this;
// 	// 	combo.store.load({params: {
// 	// 		catalogName: combo.settings.catalogName,
// 	// 		lang: combo.settings.lang,
// 	// 		filters: function(){
// 	// 			var parentTable = combo.settings.foreignElement!=''?Ext.ComponentQuery.query('#'+combo.settings.foreignElement)[0]:undefined;
// 	// 			if (!parentTable) return;
// 	// 			var parentValue = parentTable.getValue();
// 	// 			parentValue = Ext.isObject(parentValue)?parentValue["id"]:parentValue;
// 	// 			return (combo.settings.foreignKey=='' || combo.settings.foreignTable=='')?"":
// 	// 			(' AND ['+combo.settings.foreignKey+']='+(parentValue && parentValue!='NULL'?"'"+parentValue+"'":'NULL' || 'NULL')+' AND ('+(combo.settings.filters || '1=1').replace(/^\s*AND\s*/gi, "")+' OR '+combo.settings.dataValue+'='+("'"+combo.getValue()+"'" || 'NULL')+') ')
// 	// 		}(),
// 	// 		orderBy: combo.settings.orderBy,
// 	// 		dataValue: combo.settings.dataValue,
// 	// 		dataText: combo.settings.dataText,
// 	// 		OptNew: String(combo.insertEnabled)
// 	// 	}});
// 	// }
// 	// ,
// 	// listeners: {
// 	// 	focus: function() { var element = this; 
// 	// 		if (this.store.data.length>0) return false;
// 	// 		this.store.load({params: {
// 	// 		catalogName: this.settings.catalogName,
// 	// 		lang: this.settings.lang,
// 	// 		filters: (this.settings.filters || '')+(function(){
// 	// 			var parentTable = element.settings.foreignElement!=''?Ext.ComponentQuery.query('#'+element.settings.foreignElement)[0]:undefined;
// 	// 			if (!parentTable) return;
// 	// 			var parentValue = parentTable.getValue();
// 	// 			parentValue = Ext.isObject(parentValue)?parentValue["id"]:parentValue;
// 	// 			return (element.settings.foreignKey=='' || element.settings.foreignTable=='')?"":
// 	// 			(' AND ['+element.settings.foreignKey+']='+(parentValue && parentValue!='NULL'?"'"+parentValue+"'":'NULL' || 'NULL')+' AND ('+(element.settings.filters || '1=1').replace(/^\s*AND\s*/gi, "")+' OR '+element.settings.dataValue+'='+("'"+element.getValue()+"'" || 'NULL')+') ')
// 	// 		}() || ''),
// 	// 		orderBy: this.settings.orderBy,
// 	// 		dataValue: this.settings.dataValue,
// 	// 		dataText: this.settings.dataText,
// 	// 		sortDirection: this.settings.sortDirection,
// 	// 		OptNew: String(this.insertEnabled)
// 	// 		}})
// 	// 	}
// 		/*beforeQuery: function(query) { 
//             parentId = Ext.getCmp(element.settings.foreignElement).value;
//             this.store.clearFilter();
//             this.store.filter( { property: element.settings.foreignKey, value: parentId, exactMatch: true } );
//         }*/
// 		// , change:  function(control, records, eOptions) {
// 		//	debugger;
// 		// 	if (control.loading) return;
// 		// 	if(control.value && control.value[control.displayField]) {
// 		// 		//control.setRawValue(control.value[control.displayField]);
// 		// 	}
// 		// 	var element = this;
// 		// 	var parentTable = element.settings.foreignElement!=''?Ext.ComponentQuery.query('#'+element.settings.foreignElement)[0]:undefined;
// 		// 	if (parentTable && control.value && control.value["fk"] && (!(parentTable.value) || parentTable.value["id"]!=control.value["fk"].id)) {
// 		// 		control.loading=true;
// 		// 		parentTable.setValue(control.value["fk"]);
// 		// 		}
// 		// 	control.forceSelection = (control.enforceConstraint!==undefined?control.enforceConstraint:true);
// 		// 	var selectHandler = this.onSelect
// 		// 	if (selectHandler && selectHandler(control, records, eOptions)==false) {
// 		// 		return true;
// 		// 	} else if (control.value && control.value["id"]==Panax.REFRESH) {
// 		// 		this.store.load({params: {
// 		// 			catalogName: this.settings.catalogName,
// 		// 			lang: this.settings.lang,
// 		// 			filters: function(){
// 		// 				var parentTable = element.settings.foreignElement!=''?Ext.ComponentQuery.query('#'+element.settings.foreignElement)[0]:undefined;
// 		// 				if (!parentTable) return;
// 		// 				var parentValue = parentTable.getValue();
// 		// 				parentValue = Ext.isObject(parentValue)?parentValue["id"]:parentValue;
// 		// 				return (element.settings.foreignKey=='' || element.settings.foreignTable=='')?"":
// 		// 				(' AND ['+element.settings.foreignKey+']='+(parentValue && parentValue!='NULL'?"'"+parentValue+"'":'NULL' || 'NULL')+' AND ('+(element.settings.filters || '1=1').replace(/^\s*AND\s*/gi, "")+' OR '+element.settings.dataValue+'='+("'"+element.getValue()+"'" || 'NULL')+') ')
// 		// 			}(),
// 		// 			orderBy: this.settings.orderBy,
// 		// 			dataValue: this.settings.dataValue,
// 		// 			dataText: this.settings.dataText,
// 		// 			OptNew: String(this.insertEnabled)
// 		// 			}});
// 		// 		control.select(control.getStore().data.items[0]);
// 		// 	} else if (control.value) {
// 		// 		comboManager(control, records, eOptions);
// 		// 	}
			
// 		// 	var dependants = this.settings.dependants;
// 		// 	if (dependants) {
// 		// 		for (var i=0; i<dependants.length; ++i) {
// 		// 			if (dependants[i]) {
// 		// 				var dependant=dependants[i]!=''?Ext.ComponentQuery.query('#'+dependants[i])[0]:undefined;
// 		// 				if (dependant && (control.value==null || !(dependant.loading) && (dependant.value && dependant.value.fk["id"])!=(control.value["id"] || control.value))) {
// 		// 					var record = control.value
// 		// 					dependant.store.removeAll(); dependant.clearValue(); 
// 		// 					if (record && record.children) {
// 		// 						dependant.store.loadData(record.children)
// 		// 					}
// 		// 				}
// 		// 			}
// 		// 		}
// 		// 	control.loading=undefined;
// 		// 	}
// 		// }
// 	// }
// });

// Panax.util.updateWidth=function(source, config) {
// 	var config = config || {}
// 	var width = (config.width || source.width);
// 	if (width) {
// 		var newWidth=width + (isNaN(width)?"":((config.hideLabel || source.hideLabel)!==true && (config.labelAlign || source.labelAlign)!='top'?(config.labelWidth || source.labelWidth || 100):0));
// 		if (newWidth && String(newWidth)!='NaN') config["width"]=newWidth
// 	}
// 	return config;
// }

// var comboManager = function(combo, records, eOptions) {
// 	if (combo.value==Panax.REFRESH) {
// 		combo.select(combo.getStore().data.items[0]);
// 		combo.store.reload();
// 		}
// 	else if (combo.value==Panax.NEW) {
// 		combo.select(combo.getStore().data.items[0]);
// 		/*here*/
// 		var instance=combo.settings
// 		instance["mode"]='insert'
// 		var content = Panax.getInstance(instance);
// 		// Ext.Ajax.request({
// 			// url: '../Templates/request.asp',
// 			// method: 'GET',
// 			// params: {
// 				// catalogName: combo.settings.catalogName,
// 				// mode: "insert",
// 				// output: 'extjs'
// 			// },
// 			// success: function(xhr) {
// 				// eval(xhr.responseText);
				
// 			// },
// 			// failure: function() {
// 				// myMask.hide();
// 				// Ext.Msg.alert("Error de comunicación: La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
// 			// }
// 		// });
// 		if (content) {
// 			var win = Ext.create('Panax.modalWindow',{title: 'Agregar nuevo registro', opener: combo});
// 			var container=win;
// 			container.add(content);
// 			win.show();	
// 			win.animateTarget=combo; // La animación tiene que hacerse después de que se abre, de lo contrario la máscara de "cargando" no se muestra correctamente. TODO: Corregir
// 		} else {
// 			Ext.Msg.alert("Error", "No se pudo abrir")
// 		}
// 	}
// }

// Ext.define("Panax.controls.ajaxDropdownContextMenu", {
//     extend: 'Ext.menu.Menu'
// 	,alias:'widget.ajaxdropdowncontextmenu'
// 	,insertEnabled: false
// 	,editEnabled: false
// 	,deleteEnabled: false
// 	,refreshEnabled: false
//     ,initComponent: function(config){
// 		this.callParent([config]);
// 	}
// 	, caller:undefined
// 	, listeners: {
// 		click: function(menu,item, e, eOpts){
// 			var combo = this.caller
// 			switch(item.itemId){
// 				case 'Actualizar':
// 					combo.refreshRecords();
// 				break;
// 				case 'Editar':
// 					combo.editRecord();
// 					break;
// 				case 'Nuevo':
// 					combo.newRecord();
// 					break;
// 				case 'Eliminar':
// 					combo.deleteRecord();
// 				break;
// 				default: 
// 			}
// 		}
// 		, beforeshow: function(menu, eOpts) {
// 			this.removeAll()
// 			var combo = this.caller;
// 			if (this.insertEnabled) this.add({itemId: 'Nuevo', text:'Nuevo'})
// 			if (this.editEnabled && combo.getValue() && combo.getValue().id) this.add({itemId: 'Editar', text:'Editar'})
// 			if (this.deleteEnabled && combo.getValue() && combo.getValue().id) this.add({itemId: 'Eliminar', text:'Eliminar'})
// 			if (this.refreshEnabled || this.insertEnabled || this.editEnabled || this.deleteEnabled) this.add({itemId: 'Actualizar', text:'Actualizar'})
// 		}
// 	}
// });