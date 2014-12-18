Ext.ns('Panax');

Ext.apply(Panax, {
	NEW: '<new>',
	REFRESH: '<refresh>'
});

Ext.ns('Panax.util');
Ext.ns('util');

Ext.ns('app');
Ext.Loader.setPath({
	'app': 'custom/scripts'
	//,'Px': 'app/cache'
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






Ext.define('Panax.model.SchemaBase', {
	extend: 'Ext.data.Model',

    schema: {
        namespace: 'Panax.model'
    }
});

Ext.define('Panax.model.Base', {
    extend: 'Panax.model.SchemaBase'
});

Ext.define('Panax.data.Proxy', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.panax_proxy'

    , timeout: 360000
    , api: {
          create: "Scripts/update.asp"
        , read: "request.asp"
        , update: "Scripts/update.asp"
        , destroy: "Scripts/update.asp"
    }
	, settings: {
		catalogName: undefined
		, lang: undefined
		, filters: undefined
		, identityKey: undefined
		, primaryKey: undefined
		, mode: undefined
		, view: undefined
		, identity: undefined
	}
	, constructor: function(configuration) {
        var me = this; 
		me.callParent(arguments);
		Ext.apply(me, {
			extraParams: {
				catalogName: me.config.settings.catalogName
				, lang: me.config.settings.lang
				, filters: me.config.settings.filters
				, identityKey: me.config.settings.identityKey
				, primaryKey: me.config.settings.primaryKey
				, mode: me.config.settings.mode
				, output: 'json'
			}
		});
	}
    ,writer: {
        type:'xml',
        successProperty: 'success',
        writeAllFields: false,
        rootProperty:'data'
        // , partialDataOptions: { // Se evita esta configuración porque recupera toda la información asociada y no solamente los cambios
            // associated: true
        // },
    }
    ,reader: {
    	type: 'json',
        rootProperty:'data',
        successProperty: 'success'
    }
    , pageParam: 'pageIndex'
    , limitParam: 'pageSize'
    , filterParam: 'filters'
    , sortParam: 'sorters'
    , encodeFilters: function(filters) {
	    filterOperator = function(filter) {
	    	var op = filter.getOperator(),
	    		val = Ext.XML.encodeValue(filter.getValue());

			switch(op) {
				case 'gt': 		return '> ' + val;
				case 'gte': 	return '>= ' + val;
				case 'lt': 		return '< ' + val;
				case 'lte': 	return '<= ' + val;
				case 'like': 	return "LIKE '%'+REPLACE("+val+",'','%')+'%'"
				case 'eq': 		return '= ' + val;
				default: 		return '= ' + val;
			}
	    };

        var a = [""], //["<values>"], 
            len = filters.length,
            i;

        //a.push('<filterGroup operator="AND">');
        for (i = 0; i < len; i += 1) {
            a.push(filters[i].getProperty());
            a.push(filterOperator(filters[i]));
        }
        //a.push('</filterGroup>');

    	return a.join(" ").trim();
    }
    , success: function(xhr) {
    	alert("success");
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
});

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












Ext.define('Panax.view.base.FileManager', { 
    extend: 'Ext.container.Container', 
    alias: 'widget.filemanager', 
 
    NO_IMAGE_FILE: 'Images/FileSystem/blank.png', 
    IMAGE_ERROR:  'Images/Advise/vbExclamation.gif', 
    UPLOAD_URL:     '/FilesRepository/', 
    CLEAR_URL:  '/ClearImage/', 
 
    width: 205, 
	layout: { type: 'table', columns: 2 },
	// src: '../../../../../Images/FileSystem/no_photo.gif',
	name: undefined,
	readOnly: false,
	title: undefined,//'Imagen',
	showPreview: false,
	showFileName: true,
	src: '',
	parentFolder: '',
	
	getFileExtension: function(filePath) {
		return "Images/FileSystem/"+filePath.replace(/.+\.(\w+)$/, '$1')+".png"
	},
		
	getFileName: function(filePath) {
		return filePath.replace(/.+[\/\\](.+?)$/, '$1')
	},
		
 	setValue: function(value) {
		var me = this;
		var fileName = me.down('[itemId=fileName]');
		fileName.setValue(value);
	},
		
 	getValue: function() {
		var me = this;
		var fileName = me.down('[itemId=fileName]');
		fileName.getValue();
		return value;
	},
		
    initComponent: function() { 
        var me = this; 
		var imageHolder = { 
			xtype: 'image', 
			itemId: 'image', 
			height: 100,
			maxWidth: 100, 
			maxHeight: 100 
		}
        Ext.apply(me, { 
            items: [{
			xtype: 'container',
			layout: { type: 'vbox' , flex: 1},
			itemId: 'progressBar',
			colspan: 2,
			hidden: true,
			items: [{
				xtype: 'progressbar',
				text:'Esperando...',
				itemId:'progressBar_bar',
				cls:'custom',
				width: '220', flex: 0
				}, {
					xtype: 'textfield',
					name: me.name,
					itemId: 'fileName',
					colspan: 2, 
					listeners: {
						change: function(el, val) {
							me.fileChange(el, val);
						}
					}
				}/* , {
				xtype: 'component',
				html: '<span id="p4text"></span>'
			}*/]
			}, /* {xtype:'textfield'}, */!(me.title)?imageHolder:{ 
                xtype: 'fieldset', 
                itemId: 'imageWrapper', 
                title: me.title, 
                width: 122, 
                height: 140, 
                margin: '0 0 0 0', 
                layout: 'anchor', 
                items: [imageHolder] 
            }, { 
                xtype: 'container', 
                margin: '4 0 0 5', 
                layout: {
					type:'vbox',
					padding:'5',
					pack:'end',
					align:'center'
				},
				defaults: { 
                    xtype: 'button', 
                    width: 70, 
                    margin: '0 0 5 0'
                }, 
                items: [{
						xtype:'fieldcontainer'
						, border: false
						, itemId: 'buttonsContainer'
                		, items:[{ 
							xtype: 'filefield', 
							name: 'test',
							buttonOnly: true, 
							hideLabel: true, 
							itemId: 'uploadButton', 
							buttonText: 'Explorar...', 
							buttonConfig: { width: 70 }, 
							hidden: true,
							listeners: { 
								change: function(el, value) {
									// this.up('window').fireEvent('uploadimage', fb, v); 
									if (value!='') {
										Ext.MessageBox.confirm('SUBIR ARCHIVO', 'Confirma que desea subir el archivo "'+value+'" al servidor?', function(result){
											if (result=="yes") me.uploadImage(el, value);
										})
									}
								}
							}
						}]
					}, { 
						itemId: 'clearButton', 
						text: 'Quitar', 
						hidden: true,
						handler: function() { 
							me.clearImage(); 
						} 
					}
					/*, { 
                    itemId: 'fullResButton', 
                    text: 'Download', 
                    hidden: me.readOnly,
                    handler: function() {  
                        window.open(me.fullImagePath); 
                    } 
                }*/]
            },
			{ 
				xtype: 'displayfield',
				itemId: 'label',
				colspan: 2,
				hidden: !(me.showFileName)
			}]
		}); 
		
        me.callParent(arguments); 
		me.loadImage(me.src);
    }, 
	
	showFileLabel: function(filePath) {
		var me = this, 
		label= me.down("[itemId=label]");
		label.setValue(me.getFileName(filePath))
	},
	
	fileChange: function(el, val) {
        var me = this, imagePath = val;
		me.showFileLabel(val);
		if (val!='' && !(me.showPreview)) imagePath=me.getFileExtension(imagePath)
		me.loadImage(imagePath);
	},
	
    success: function() { 
        var me = this, 
            fs = me.down('[itemId=imageWrapper]'), 
            b1 = me.down('[itemId=clearButton]'), 
            b2 = me.down('[itemId=fullResButton]'); 
 
        fs.enable(); 
        b1.enable(); 
        b2.enable(); 
    }, 

	renderButtons: function(val) {
        var me = this, 
			buttonsContainer = me.down('[itemId=buttonsContainer]'),
            uploadButton = me.down('[itemId=uploadButton]'), 
            clearButton = me.down('[itemId=clearButton]'), 
            img = me.down('image'); 

		if (me.readOnly) return false;
		
		if (val!='') {
			if (uploadButton && uploadButton.isVisible()) { 
				uploadButton.hide()
			}
			if (!me.readOnly && clearButton && !clearButton.isVisible()) {
				clearButton.show()
			}
		} else {
			if (clearButton && clearButton.isVisible()) {
				clearButton.hide()
			}
			if (!me.readOnly && uploadButton && !uploadButton.isVisible()) {
				uploadButton.show()
				// me.down('[itemId=buttonsContainer]').add({ 
						// xtype: 'fileuploadfield', 
						// buttonOnly: true, 
						// hideLabel: true, 
						// itemId: 'uploadButton', 
						// buttonText: 'Explorar...', 
						// buttonConfig: { width: 70 }, 
						// hidden: me.readOnly,
						// listeners: { 
							// change: function(el, value) {
								// // this.up('window').fireEvent('uploadimage', fb, v); 
								// if (value!='') {
									// Ext.MessageBox.confirm('SUBIR ARCHIVO', 'Confirma que desea subir el archivo "'+value+'" al servidor?', function(result){
										// if (result=="yes") me.uploadImage(el, value);
									// })
								// }
							// }
						// }
					// })
				// }
			}
		}
	},
	
    loadImage: function(val) { 
		var me = this,
		fileThumbnail = me.down('[itemId=image]');
		imagePath = val!=''? me.UPLOAD_URL + val : me.NO_IMAGE_FILE
		
		//img.getEl().on('load', me.success, me, { single: true }); 
		var imageEl = fileThumbnail.getEl()
		if (imageEl) {
			imageEl.on('error', function() {  
				//img.getEl().un('load', me.success, me); 
				//(Px.app.config.rootPath+'/' || '')+me.NO_IMAGE_FILE
				if (val!='') fileThumbnail.setSrc((Px.app.config.rootPath+'/' || '')+me.getFileExtension(val)); 
				//fs.enable(); 
			}, me, { single: true }); 
		}

		fileThumbnail.setSrc((Px.app.config.rootPath+'/' || '')+imagePath);
		
		me.renderButtons(val);
		

        /*me.fullImagePath = me.DOWNLOAD_URL + '/' +recordId; 
        me.imageRecordId = recordId; 
 
        fs.disable(); 
        b1.disable(); 
        b2.disable(); 
 
        img.getEl().on('load', me.success, me, { single: true }); 
        img.getEl().on('error', function() {  
 
            img.getEl().un('load', me.success, me); 
            img.setSrc(me.NO_IMAGE_FILE); 
            fs.enable(); 
 
        }, me, { single: true }); 
 
        img.setSrc(me.DOWNLOAD_URL + '/' +recordId); */
    }, 
 
    uploadImage: function(el, val) { 
		var clonedField = Ext.clone(el);
		clonedField.name="cloned-node";
		clonedField.id="cloned-node";
		clonedField.isFieldLabelable=false;
		el.isFieldLabelable=false;
		var me = this, 
            fm = Ext.create('Ext.form.Panel', { 
                items: [ clonedField ] 
            }), 
            f = fm.getForm()//el.up('form').getForm(); 
			clonedField.ownerCt=undefined; //esta línea es para que no marque error, ya que al clonar e insertar en el formulario, quita físicamente el botón y por lo tanto ya no existe el ownerCt.el
			
		var progressBar = me.down('[itemId=progressBar]')
		progressBar.show();
		//progressBar.show(true);
		var uploadID = Math.round(Math.random()*1000000000)
		if (f.isValid()) {
			f.errorReader={
				read: function(response) {
					return Ext.decode(response.responseText, true);
				}
			};
			f.submit({
				//method: 'POST',
				url: (Px.app.config.scriptsPath+'/' || '')+'fileUploader.asp?UploadID='+uploadID+'&parentFolder='+(Px.app.config.filesRepositoryPath+'/' || '')+me.parentFolder/*+'saveAs=image.png'*/,
				waitMsg: 'Subiendo archivo...',
				success: function(fp, o) {
					var fileName = me.down('[itemId=fileName]');
					fileName.setValue(o.result.files[1].file);
					Ext.Msg.alert('Completo', 'Fue procesado con éxito el archivo "' + (o.result.files?o.result.files[1].file:'') + '"', function(){ progressBar.hide(true); });
				},
				failure: function(fp, o) {
					var errorMessage;
					if (o.result.files) {
						errorMessage = 'El archivo "' + o.result.files[1].file + '" no pudo ser procesado en el servidor'
					} else {
						errorMessage = 'La carga del archivo no pudo ser completada. Revise los errores en la consola';
					}
					Ext.Msg.alert('Error', errorMessage, function(){ progressBar.hide(true); });
				},
				exception: function(fp, o) {
					console.log('upload failed', fp, o); 
					// Ext.TaskManager.stop(task);
				}
			});
		}
		task = { 
			run: function(){ 
				Ext.Ajax.request({
					url: (Px.app.config.scriptsPath+'/' || '')+'uploadFileManager.asp?UploadID='+uploadID,
					method: 'GET',
					success: function(xhr, r) {
						var result = Ext.JSON.decode(xhr.responseText)
						if (task && result.percent>=100) Ext.TaskManager.stop(task);
						progressBar.down('[itemId=progressBar_bar]').updateProgress(result.percent/100, Math.round(result.percent)+'% completado...');
					},
					failure: function() {
						//myMask.hide();
						Ext.TaskManager.stop(task);
						// Ext.MessageBox.show({
							// title: 'Error de comunicación',
							// msg: "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.",
							// icon: Ext.MessageBox.ERROR,
							// buttons: Ext.Msg.OK
						// });
					}
				});
			}, 
			interval: 1500
		} 
		Ext.TaskManager.start(task); 
        // f.submit({ 
            // method: 'POST', 
            // params: { 
                // recordId: me.imageRecordId  
            // }, 
            // url: me.UPLOAD_URL, 
            // waitMsg: 'Uploading your image...', 
            // success: function(fp, o) { 
                // me.loadImage(me.imageLocation, me.imageRecordId); 
            // }, 
            // failure: function(fp, o) { 
                // console.log('upload failed', fp, o); 
            // } 
        // }); 
    }, 
 
    clearImage: function() { 
        var me = this; 
		Ext.MessageBox.confirm('SUBIR ARCHIVO', 'Confirma que desea desasignar el archivo?', function(result) {
			if (result=="yes") {
				var fileName = me.down('[itemId=fileName]');
				fileName.setValue('');
				/*Ext.Ajax.request({ 
					method: 'GET', 
					url: me.CLEAR_URL + me.imageLocation + '/' + me.imageRecordId, 
					success: function(fp, o) { me.loadImage(me.imageLocation, me.imageRecordId); }, 
					failure: function(fp, o) { console.log('upload failed', fp, o); } 
				}); */
			}
		})
    } 
}); 

Ext.define('Panax.view.base.ImageContainer', { 
    extend: 'Panax.view.base.FileManager', 
    alias: 'widget.imagemanager', 
	
    NO_IMAGE_FILE:  'Images/FileSystem/no_photo.gif', 
    UPLOAD_URL:     '/FilesRepository/Test/', 
    
	fileChange: function(el, val) {
        var me = this, imagePath = val;
		me.showFileLabel(val);
		me.loadImage(imagePath);
	},
	showFileName: false,
	initComponent: function(){
		this.callParent();
	}
});

Ext.define('Ext.ux.form.CurrencyField', {
    extend: 'Ext.form.field.Number',//Extending the NumberField
    alias: 'widget.currencyfield',//Defining the xtype,
    currencySymbol: '$',
    useThousandSeparator: true,
    thousandSeparator: ',',
    alwaysDisplayDecimals: true,
    fieldStyle: 'text-align: right;',
	initComponent: function(){
        if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',') 
            this.thousandSeparator = '.';
        else 
            if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.') 
                this.decimalSeparator = ',';
        
        this.callParent(arguments);
    },
    setValue: function(value){
        Ext.ux.form.CurrencyField.superclass.setValue.call(this, value != null ? value.toString().replace('.', this.decimalSeparator) : value);
        
        this.setRawValue(this.getFormattedValue(this.getValue()));
    },
    getFormattedValue: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat()) 
            return value;
        else 
        {
            var neg = null;
            
            value = (neg = value < 0) ? value * -1 : value;
            value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;
            
            if (this.useThousandSeparator) 
            {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator)) 
                    throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
                
                if (this.thousandSeparator == this.decimalSeparator) 
                    throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
                
                value = value.toString();
                
                var ps = value.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];
                
                var r = /(\d+)(\d{3})/;
                
                var ts = this.thousandSeparator;
                
                while (r.test(whole)) 
                    whole = whole.replace(r, '$1' + ts + '$2');
                
                value = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
            }
            
            return Ext.String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), value);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(value){
        //Replace the currency symbol and thousand separator
        return Ext.ux.form.CurrencyField.superclass.parseValue.call(this, this.removeFormat(value));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} value
     */
    removeFormat: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat()) 
            return value;
        else 
        {
            value = value.toString().replace(this.currencySymbol + ' ', '');
            
            value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;
            
            return value;
        }
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} value
     */
    getErrors: function(value){
        return Ext.ux.form.CurrencyField.superclass.getErrors.call(this, this.removeFormat(value));
    },
    hasFormat: function(){
        return this.decimalSeparator != '.' || (this.useThousandSeparator == true && this.getRawValue() != null) || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
        this.setRawValue(this.removeFormat(this.getRawValue()));
        
        this.callParent(arguments);
    }
});

Ext.define('Panax.view.dataview.MultiSort', {
    extend: 'Ext.panel.Panel',
    xtype: 'dataview-multisort',
    layout: 'fit',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated',
        'Ext.ux.BoxReorderer'
    ],

    initComponent: function() {
        this.tbar.plugins = {
            xclass: 'Ext.ux.BoxReorderer',
            listeners: {
                scope: this,
                drop: this.updateStoreSorters
            }
        };

        this.tbar.defaults = {
            xtype: 'dataview-multisort-sortbutton',
            listeners: {
                scope: this,
                changeDirection: this.updateStoreSorters
            }
        };

        this.callParent(arguments);
        this.updateStoreSorters();
    },

    /**
     * Returns the array of Ext.util.Sorters defined by the current toolbar button order
     * @return {Array} The sorters
     */
    getSorters: function() {
        var buttons = this.query('toolbar dataview-multisort-sortbutton'),
            sorters = [];
        Ext.Array.each(buttons, function(button) {
            sorters.push({
                property : button.getDataIndex(),
                direction: button.getDirection()
            });
        });

        return sorters;
    },

    /**
     * @private
     * Updates the DataView's Store's sorters based on the current Toolbar button configuration
     */
    updateStoreSorters: function() {
        var sorters = this.getSorters(),
            view = this.down('dataview');

        view.store.sort(sorters);
    }
});

Ext.define('Panax.view.dataview.MultiSortItem', {
    extend: 'Ext.view.View',
    xtype: 'dataview-multisort-items',
    tpl: [
        '<tpl for=".">',
            '<div class="dataview-multisort-item" id="dataview-multisort-item-{id}">',
            '</div>',
        '</tpl>',
    ],
    emptyText: 'No hay registros',
    itemSelector: 'div.dataview-multisort-item',
});

Ext.define('Panax.view.dataview.MultiSortButton', {
    extend: 'Ext.button.Button',
    xtype: 'dataview-multisort-sortbutton',

    config: {
        direction: "ASC",
        dataIndex: undefined
    },

    /**
     * @event changeDirection
     * Fired whenever the user clicks this button to change its direction
     * @param {String} direction The new direction (ASC or DESC)
     */

    constructor: function(config) {
        this.initConfig(config);

        this.callParent(arguments);
    },

    handler: function() {
        this.toggleDirection();
    },

    /**
     * Updates the new direction of this button
     * @param {String} direction The new direction
     */
    updateDirection: function(direction) {
        this.setIconCls('sort-direction-' + direction.toLowerCase());
        this.fireEvent('changeDirection', this.getDirection());
    },

    /**
     * Toggles between ASC and DESC directions
     */
    toggleDirection: function() {
        this.setDirection(Ext.String.toggle(this.getDirection(), "ASC", "DESC"));
    }
});





// Panax.loadingMask = new Ext.LoadMask({
// 	msg: "Cargando...",
// 	//target: Ext.ComponentQuery.query('main-viewport')[0], /*main-viewport is xtype of my main viewport*/
// 	target: Ext.getBody(),
// 	alwaysOnTop: true
// });

Ext.define('Panax.view.PanaxPanel', {
	extend: 'Ext.panel.Panel'
	, alias: 'widget.panaxpanel'
    , requires: [
		'Ext.form.field.Text'
		, 'Ext.ux.statusbar.StatusBar'
	]
    , width: '100%'
    , height: '100%'
    , bodyPadding: 8
    , border: false
    , layout: 'fit'
	// , resizable: true
	, closable: false
	// , title: ""
	, close: function() {
		this.destroy();
		Ext.History.back();
	}
	, initComponent: function() {
		var me = this;

        console.info("PanaxPanel initiated: "+this.id);

        // if(this.mode!='fieldselector' && this.mode!='filters') {
		Ext.apply(this, {
			bbar: Ext.create('Ext.ux.StatusBar', {
				reference: 'win-statusbar'
				, defaultText: 'Listo'
				, ui: 'footer'
				, statusAlign: 'left'
				// , plugins: Ext.create('Ext.ValidationStatus', {form:me.id})
				, items: [{
						//ToDo: debugMode=1
				        text: '[Debug: STORE]',
	                    glyph: 42,
				        handler: 'onInspectStoreClick'
					}, {
						//ToDo: debugMode=1
				        text: '[Debug: SESSION]',
	                    glyph: 42,
				        handler: 'onSessionChangeClick',
					}, {
						text: 'Cancelar'
	                    , glyph: 115
						, handler: function() { 
							var oPanel = me.up('window') || me;
							oPanel.close();
						},
					}, {
						itemId: 'save'
						, text: (this.mode=='fieldselector' || this.mode=='filters')?'Filtrar':'Guardar'
	                    , glyph: 86
						, handler: (this.mode=='fieldselector' || this.mode=='filters')?'onFilter':'onSave',
			    }]
			})
		});

        this.callParent();
    }
});

Ext.define('Panax.view.PanaxGrid', {
    extend: 'Ext.grid.Panel'
    , alias: 'widget.panaxgrid'
    , plugins: [{
    	ptype: 'gridfilters',
    	menuFilterText: 'Filtros'
    }]
    , emptyText: 'No coincidieron registros'
    , loadMask: true
    , stateful: true
    , border: true
    , layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
    }
    // Set a stateId so that this grid's state is persisted.
    , stateId: 'stateful-filter-grid'
    , flex: 1
	, initComponent: function() {
		var me = this;

        console.info("PanaxGrid initiated: "+this.id);

        /*
        Toolbar
         */
	    this.tbar = [{
	        text: 'Nuevo Registro',
            glyph: 70,
	        handler: 'onAddRecordClick',
	        disabled: me.viewConfig.isReadonly
	    }, {
	        text: 'Borrar Registro',
            glyph: 116,
	        handler: 'onRemoveRecordClick',
	        disabled: me.viewConfig.isReadonly,
			// bind: {
			// 	disabled: '{!panaxformGrid.selection}'
			// }
	    }, {
		   	xtype: 'tbfill'
	    }, {
	       	text: 'Configurar Vista',
           	glyph: 42,
	        menu: [{
	        	text: 'Filtros',
       			//glyph: 83,
	        	menu: [{
		        	text: 'Remotos',
		        	checked: true
		        }, {
		        	text: 'Locales'
		        }, {
		            text:'Borrar',
		            handler: 'onClearFiltersClick'
	        	}],
	        }, {
	        	text: 'Paginacion',
       			//glyph: 83,
	        	menu: [{
		            text:'Mostrar',
		            checked: true,
		        	menu: [{
			            text:'10 Registros',
			            checked: true
			        },{
			            text:'25 Registros',
		            	checked: false
			        },{
			            text:'50 Registros',
		            	checked: false
			        },{
			            text:'100 Registros',
		            	checked: false
		        	}],
		        },{
		            text:'No Mostrar',
		            checked: false
	        	}],
	        }, {
		    	text: 'Funciones',
       			//glyph: 931,
	        	menu: [{
		            text:'Ninguna',
		            summaryType: null,
       				handler: 'onToggleSummary'
		        },{
		            text:'Sumatoria (SUM)',
		            summaryType: 'sum',
       				handler: 'onToggleSummary'
		        // },{
		        //     text:'Cuenta (COUNT)',
		        //     checked: false
		        // },{
		        //     text:'Promedio (AVG)',
		        //     checked: false
		        // },{
		        //     text:'Maximo (MAX)',
		        //     checked: false
		        // },{
		        //     text:'Minimo (MIN)',
		        //     checked: false
	        	}],
	        }, {
	        	text: 'Guardar',
       			glyph: 86
	        }, {
	        	text: 'Reestablecer',
       			glyph: 115
	        }]
	    }];

	    /*
	    Paging Toolbar
	     */
	    this.dockedItems = {
			xtype: 'pagingtoolbar',
			bind: {
				store: me.viewConfig.pagingToolbarStore
			},
			dock: 'bottom',
			hidden: !me.viewConfig.showPagingToolbar,
			displayInfo: true,
			displayMsg: 'Registros {0} - {1} de {2}',
			emptyMsg: "No hay registros",
			afterPageText: 'de {0}',
			beforePageText: 'Pagina',
			firstText: 'Primera pagina',
			lastText: 'Ultima pagina',
			nextText: 'Siguiente',
			prevText: 'Anterior',
			refreshText: 'Actualizar',
			items: []
	    };

	    /*
	    Summary Row
	     */
	    this.features = {
	        ftype: 'summary',
	        dock: 'bottom',
	        /*
	        BUG: showSummaryRow ignored: http://www.sencha.com/forum/showthread.php?261234-showSummaryRow-in-summary-feature&p=1080417#post1080417
	         */
	        showSummaryRow: me.viewConfig.showSummary
	    };
	    
	    /*
	    Super
	     */
        this.callParent();
    }
});

Ext.define('Panax.view.PanaxForm', {
    extend: 'Ext.form.Panel'
    , alias: 'widget.panaxform'
    , flex: 1
	, autoScroll: true
	, bodyPadding: 10
	, closable: false
    , border: true
    , layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
    }
	, autoScroll: true
	, initComponent: function() {
		var me = this;

        console.info("PanaxForm initiated: "+this.id);

        this.callParent();
    }
});

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

Ext.define('Panax.view.PanaxWindow', {
	extend: 'Ext.window.Window',
    alias: 'widget.panaxwindow',

    //autoShow: true,
    modal: true,
	maximizable: true,
	closable: false,
	layout: 'fit',
    autoScroll: true,
    width: 800,
    height: 600
});





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

Ext.define("Panax.store.ajaxdropdown", {
    extend: 'Ext.data.Store',
    alias: 'store.ajaxdropdown',
	//model : "Panax.model.ajaxdropdown",

	pageSize: 0,

	remoteFilter: true,

	proxy: {
		type: 'ajax',
		url: 'scripts/xmlCatalogOptions.asp',
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message',
			totalProperty: 'total'
		},
		pageParam: 'pageIndex',
		limitParam: 'pageSize',
		filterParam: 'filters',
		sortParam: 'sorters',
		extraParams: { 
			output: 'json' 
		},
		listeners: {
			exception: function(proxy, response, operation){
				//alert(response.responseText)
				var message = operation.getError();
				message = Ext.isObject(message)?message["error"]:message;
				Ext.MessageBox.show({
					title: 'ERROR!',
					msg: message,
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		}
	},

	constructor: function (configuration) {
         //Ext.apply(this.proxy, config);
         this.callParent(arguments);
    }
});

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

var comboManager = function(combo, records, eOptions) {
	if (combo.value==Panax.REFRESH) {
		combo.select(combo.getStore().data.items[0]);
		combo.store.reload();
		}
	else if (combo.value==Panax.NEW) {
		combo.select(combo.getStore().data.items[0]);
		/*here*/
		var instance=combo.settings
		instance["mode"]='insert'
		var content = Panax.getInstance(instance);
		// Ext.Ajax.request({
			// url: '../Templates/request.asp',
			// method: 'GET',
			// params: {
				// catalogName: combo.settings.catalogName,
				// mode: "insert",
				// output: 'extjs'
			// },
			// success: function(xhr) {
				// eval(xhr.responseText);
				
			// },
			// failure: function() {
				// myMask.hide();
				// Ext.Msg.alert("Error de comunicación: La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
			// }
		// });
		if (content) {
			var win = Ext.create('Panax.modalWindow',{title: 'Agregar nuevo registro', opener: combo});
			var container=win;
			container.add(content);
			win.show();	
			win.animateTarget=combo; // La animación tiene que hacerse después de que se abre, de lo contrario la máscara de "cargando" no se muestra correctamente. TODO: Corregir
		} /*else {
			Ext.Msg.alert("Error", "No se pudo abrir")
		}*/
	}
}

Ext.define("Panax.controls.ajaxDropdownContextMenu", {
    extend: 'Ext.menu.Menu'
	,alias:'widget.ajaxdropdowncontextmenu'
	,insertEnabled: false
	,editEnabled: false
	,deleteEnabled: false
	,refreshEnabled: false
    ,initComponent: function(config){
		this.callParent([config]);
	}
	, caller:undefined
	, listeners: {
		click: function(menu,item, e, eOpts){
			var combo = this.caller
			switch(item.itemId){
				case 'Actualizar':
					combo.refreshRecords();
				break;
				case 'Editar':
					combo.editRecord();
					break;
				case 'Nuevo':
					combo.newRecord();
					break;
				case 'Eliminar':
					combo.deleteRecord();
				break;
				default: 
			}
		}
		, beforeshow: function(menu, eOpts) {
			this.removeAll()
			var combo = this.caller;
			if (this.insertEnabled) this.add({itemId: 'Nuevo', text:'Nuevo'})
			if (this.editEnabled && combo.getValue() && combo.getValue().id) this.add({itemId: 'Editar', text:'Editar'})
			if (this.deleteEnabled && combo.getValue() && combo.getValue().id) this.add({itemId: 'Eliminar', text:'Eliminar'})
			if (this.refreshEnabled || this.insertEnabled || this.editEnabled || this.deleteEnabled) this.add({itemId: 'Actualizar', text:'Actualizar'})
		}
	}
});
