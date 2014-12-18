Ext.define('Panax.view.base.FileManager', { 
    extend: 'Ext.container.Container', 
    alias: 'widget.filemanager', 
 
    NO_IMAGE_FILE: 'Images/FileSystem/blank.png', 
    IMAGE_ERROR:  'Images/Advise/vbExclamation.gif', 
    UPLOAD_URL:     '/UploadImage', 
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
		imagePath = val!=''?val : me.NO_IMAGE_FILE
		
		//img.getEl().on('load', me.success, me, { single: true }); 
		var imageEl = fileThumbnail.getEl()
		if (imageEl) {
			imageEl.on('error', function() {  
				//img.getEl().un('load', me.success, me); 
				//(KitchenSink.app.config.rootPath+'/' || '')+me.NO_IMAGE_FILE
				if (val!='') fileThumbnail.setSrc((KitchenSink.app.config.rootPath+'/' || '')+me.getFileExtension(val)); 
				//fs.enable(); 
			}, me, { single: true }); 
		}

		fileThumbnail.setSrc((KitchenSink.app.config.rootPath+'/' || '')+imagePath);
		
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
				url: (KitchenSink.app.config.scriptsPath+'/' || '')+'fileUploader.asp?UploadID='+uploadID+'&parentFolder='+(KitchenSink.app.config.filesRepositoryPath+'/' || '')+me.parentFolder/*+'saveAs=image.png'*/,
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
					url: (KitchenSink.app.config.scriptsPath+'/' || '')+'uploadFileManager.asp?UploadID='+uploadID,
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

Ext.define('Panax.Form', {
    extend: 'Ext.form.Panel'
    , alias: 'widget.panaxform'
    , requires: [
		'Ext.form.field.Text'
		, 'Ext.ux.statusbar.StatusBar'
	]
	, resizable: true
	, autoscroll: true
	, create: function(form, data){
		this.store.insert(0, data);
	}
	, initComponent: function(){
		var me = this;
        //this.addEvents('create'); 
		
		// this.on({
			// create: function(form, data){
				// this.store.insert(0, data);
			// }
		// });

		Ext.apply(this, {
			activeRecord: null
			, width: 600
			, autoScroll: true
            , dockedItems: [{
                xtype: 'toolbar'
				, itemId: 'mainToolbar'
                , dock: 'top'
                , ui: 'header'
				, ignoreParentFrame: true
				, ignoreBorderManagement: true
                , items: []
				}]
			, bbar: Ext.create('Ext.ux.StatusBar', {
				reference: 'win-statusbar'
				, defaultText: 'Ready'
				, ui: 'footer'
				, statusAlign: 'right'
				, plugins: Ext.create('Ext.ValidationStatus', {form:me.id})
				, items: [{
					iconCls: (this.mode=='fieldselector' || this.mode=='filters')?'':'icon-save'
					, itemId: 'save'
					, text: (this.mode=='fieldselector' || this.mode=='filters')?'Continuar':'Guardar'
					, handler: 'onSaveClick'
				}, {
					text: 'Cancel',
					handler: 'onCancelClick'
				}]
			})
		});
			
		if (this.store) {
			if (!this.store.settings) this.store.settings = {}
			this.store.settings.view = me;
		}
        this.callParent();
		// if (this.store && this.mode!='readonly') {
			// this.down('#mainToolbar').add({
				// iconCls: (this.mode=='fieldselector' || this.mode=='filters')?'':'icon-save'
				// , itemId: 'save'
				// , text: (this.mode=='fieldselector' || this.mode=='filters')?'Continuar':'Guardar'
				// , handler: this.mode=='insert'?this.saveAndNew:this.save
				// //, formBind: true
				// //, disabled: true
				// , scope: this
			// });

			// this.down('#mainToolbar').add({
				// xtype: 'component',
				// itemId: 'formErrorState',
				// baseCls: 'form-error-state',
				// flex: 0,
				// validText: 'El formulario es válido',
				// invalidText: 'El formulario contiene errores',
				// tipTpl: Ext.create('Ext.XTemplate', '<ul class="' + Ext.plainListCls + '"><tpl for="."><li><span class="field-name link"><a href="#">{name}</a></span>: <span class="error">{error}</span></li></tpl></ul>'),

				// getTip: function() {
					// var tip = this.tip;
					// if (!tip) {
						// tip = this.tip = Ext.widget('tooltip', {
							// target: this.el,
							// title: 'Detalle de Errores:',
							// autoHide: false,
							// anchor: 'top',
							// mouseOffset: [-11, -2],
							// closable: true,
							// constrainPosition: false,
							// cls: 'errors-tip'
						// });
						// //tip.show();
					// }
					// return tip;
				// }
				
				// , setErrors: function(errors) {
					// var form = me
					// var baseCls = this.baseCls,
						// tip = this.getTip();
					// //tip.hide(); //si se está mostrando ocultarlo, esto se hace porque para las ventanas flotantes este tipo de objetos pueden quedar atrás y no mostrarse
					// if (!this.tipTpl) return;
					// errors = Ext.Array.from(errors);

					// // Update CSS class and tooltip content
					// if (errors.length) {
						// this.addCls(baseCls + '-invalid');
						// this.removeCls(baseCls + '-valid');
						// this.update(this.invalidText);
						// tip.setDisabled(false);
						// tip.update(this.tipTpl.apply(errors));
						// tip.show();
					// } else {
						// this.addCls(baseCls + '-valid');
						// this.removeCls(baseCls + '-invalid');
						// this.update(this.validText);
						// tip.setDisabled(true);
						// tip.hide();
					// }
				// }
			// });
		// }
		
		if (this.mode=='insert') {
			this.down('#mainToolbar').add({
				text: 'Limpiar'
				, itemId: 'resetButton'
				, handler: function() {
					var form = this.up('form').getForm();
					Ext.MessageBox.confirm('BORRAR FORMULARIO', 'Confirma que desea borrar el formulario?', function(result){
						if (result=="yes") me.onReset(); //form.reset();
					});
				}
			});
		}
		if (this.toolBarItems) this.down('#mainToolbar').add(this.toolBarItems);
    }
	
	/* , listeners: {
		fieldvaliditychange: function() {
			this.updateErrorState();
		},
		fielderrorchange: function() {
			this.updateErrorState();
		}
	} */

	, updateErrorState: function() {
		var me = this,
			errorCmp, fields, errors;

		if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
			errorCmp = me.down('#formErrorState');
			fields = me.getForm().getFields();
			errors = [];
			fields.items[1].isValid();
			fields.each(function(field) {
				Ext.Array.forEach(field.getErrors(), function(error) {
					if(!field.hideErrorText){
						errors.push({name: field.getFieldLabel(), error: error});
					}
				});
			});
			errorCmp.setErrors(errors);
			me.hasBeenDirty = true;
		}
	}
	
    , setActiveRecord: function(record){
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    }

    , save: function(){
			/* var active = this.activeRecord,
            form = this.getForm(); */

/*-         if (!active) {
//            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        } */
		var form = this.getForm(); // get the basic form
		/* var saveMask = new Ext.LoadMask(this, {msg:"Guardando..."});
		saveMask.show(); */
			record = form.getRecord();
		
		var store = record.store
		
		if (store.settings.mode=='fieldselector' || store.settings.mode=='filters') {
			store.getProxy().api.create='../Scripts/'+store.settings.mode+'.asp'
			store.getProxy().api.update='../Scripts/'+store.settings.mode+'.asp'
		}
		if (form.isValid()) {
			record.store.onSuccess = (store.settings.mode=='fieldselector')?record.store.OnFieldsSelected:(store.settings.mode=='filters'?record.store.OnFilters:record.store.OnSave)
			form.updateRecord(record);
			
			/* var me = this;
			record.save({
				success: function(record, args) {
					Ext.Msg.alert('Éxito', 'Datos guardados con éxito');
					var modalWindow = me.up('#modalWindow')
					if (modalWindow) modalWindow.close();
					saveMask.hide();
				},
				failure: function(record, args) {
					Ext.Msg.alert('Falló', args.error);
					saveMask.hide();
				}
			}); */
		}
		// this.updateErrorState();
    }

    , saveAndNew: function(){
		var form = this.getForm(); // get the basic form
		if (form.isValid()) {
			record = form.getRecord();
			record.store.onSuccess = this.onSucessSave
			form.updateRecord(record);
		}
		this.updateErrorState();
    }
	
	, onSucessSave: function(store, operation, eOpts, scope){
		var view = scope.settings.view;
		var modalWindow = view.up('#modalWindow')
		if(modalWindow)
		{
			Ext.MessageBox.confirm('Nuevo registro', 'Desea generar un nuevo registro?', function(result){
				if (result=="yes") store.load(null);
				else {
					if (modalWindow) {
						var opener = modalWindow.opener
						modalWindow.close();
						if (opener) {
							if (opener.refresh) opener.refresh()
							else if (opener.store) opener.store.reload()
						}
					}
				}
			})
		}
		else
		{
			store.load(null);
		}
	}

    , onCreate: function(){
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            this.onReset();
        }

    }

    , onReset: function(){
        var form = this.getForm();
		var record = form.getRecord();
		record.store.load(null);
    }
});



/*
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 *
 * http://www.gnu.org/licenses/lgpl.html
 *
 * @description: This class provide aditional format to numbers by extending Ext.form.field.Number
 *
 * @author: Greivin Britton
 * @email: brittongr@gmail.com
 * @version: 2 compatible with ExtJS 4
 */
Ext.define('Ext.ux.form.CurrencyField', 
{
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
