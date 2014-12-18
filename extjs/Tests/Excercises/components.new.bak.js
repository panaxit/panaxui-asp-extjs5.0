Ext.define('Panax.view.base.FileManager', { 
    extend: 'Ext.container.Container', 
    alias: 'widget.filemanager', 
 
    NO_IMAGE_FILE: 'Images/FileSystem/blank.png', 
    IMAGE_ERROR:  'Images/Advise/vbExclamation.gif', 
    UPLOAD_URL:     '/UploadImage', 
    CLEAR_URL:  '/ClearImage/', 
 
    width: 205, 
	layout: { type: 'table', columns: 2 },
	// src: '../../../../Images/FileSystem/no_photo.gif',
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
					xtype: 'hiddenfield',
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
						  itemId: 'buttonsContainer'
                		, xtype:'fieldcontainer'
						, border: false
						, items:[]
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
			if (!me.readOnly && !uploadButton) {// && !uploadButton.isVisible()) {
				me.down('[itemId=buttonsContainer]').add({ 
		xtype: 'fileuploadfield', 
		buttonOnly: true, 
		hideLabel: true, 
		itemId: 'uploadButton', 
		buttonText: 'Explorar...', 
		buttonConfig: { width: 70 }, 
		hidden: this.readOnly,
		listeners: { 
			change: function(el, value) {
				// this.up('window').fireEvent('uploadimage', fb, v); 
				if (value!='') {
					Ext.MessageBox.confirm('SUBIR ARCHIVO', 'Confirma que desea subir el archivo "'+value+'" al servidor?', function(result){
						if (result=="yes") { 
							// // var clonedField = Ext.clone(el);
							// // clonedField.name="cloned-node";
							// // clonedField.id="cloned-node";
							// // clonedField.isFieldLabelable=false;
							// // el.isFieldLabelable=false;
							var fm = Ext.create('Ext.form.Panel', { 
									items: [ el ] 
								}), 
								f = fm.getForm()//el.up('form').getForm(); 
								// // clonedField.ownerCt=undefined; //esta línea es para que no marque error, ya que al clonar e insertar en el formulario, quita físicamente el botón y por lo tanto ya no existe el ownerCt.el
								
							var progressBar = me.down('[itemId=progressBar]')
							progressBar.show();
							//progressBar.show(true);
							var uploadID = Math.round(Math.random()*1000000000)
							if (f.isValid()) {
								f.submit({
									//method: 'POST',
									url: '../Scripts/fileUploader.asp?UploadID='+uploadID+'&parentFolder='+(KitchenSink.app.config.filesRepositoryPath+'/' || '')+me.parentFolder/*+'saveAs=image.png'*/,
									waitMsg: 'Subiendo archivo...',
									success: function(fp, o) {
										var fileName = me.down('[itemId=fileName]');
										fileName.setValue(o.result.files[1].file);
										Ext.Msg.alert('Completo', 'Archivo procesado "' + o.result.files[1].file + '" en el servidor', function(){ progressBar.hide(true); });
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
										url: '../Scripts/uploadFileManager.asp?UploadID='+uploadID,
										method: 'GET',
										success: function(xhr, r) {
											var result = Ext.JSON.decode(xhr.responseText)
											if (task && result.percent>=100) Ext.TaskManager.stop(task);
											progressBar.down('[itemId=progressBar_bar]').updateProgress(result.percent/100, Math.round(result.percent)+'% completado...');
										},
										failure: function() {
											//myMask.hide();
											Ext.MessageBox.show({
												title: 'Error de comunicación',
												msg: "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.",
												icon: Ext.MessageBox.ERROR,
												buttons: Ext.Msg.OK
											});
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
						}
					})
				}
			}
		}
	});
				uploadButton = me.down('[itemId=uploadButton]');
				uploadButton.show()
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
				//(KitchenSink.app.config.rootPath || '')+me.NO_IMAGE_FILE
				if (val!='') fileThumbnail.setSrc((KitchenSink.app.config.rootPath || '')+me.getFileExtension(val)); 
				//fs.enable(); 
			}, me, { single: true }); 
		}

		fileThumbnail.setSrc((KitchenSink.app.config.rootPath || '')+imagePath);
		
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
