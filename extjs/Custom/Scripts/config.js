﻿app.config = {
	filesRepositoryPath: "FilesRepository",
	logo: {
		src: "../../../../Images/logos/Panax.jpg"
	},
	header: {
		height: 70,
		content: [{
			xtype: 'image',
			src: "../../../../Images/logos/Panax.jpg",
			height:60
			},'->',
			{
			text:'Ingresar',
			id: 'loginButton',
			height: 30,
			handler: function() {
				app.login.onSuccess = function() {
					location.href=location.href
				}
				app.login.show();
				app.login.down('#loginForm').getForm().findField('username').focus(true,200);
				}
			},'-',
			{
			text:'Salir',
			id: 'logoutButton',
			height: 30,
			handler: function() {
				Ext.MessageBox.confirm('Salir del sistema', '¿Confirma que desea salir del sistema?', function(result){
							if (result=="yes") {
								Ext.Ajax.request({
									url: '../Scripts/logout.asp',
									async:false,
									success: function(xhr, r) {
										var result = Ext.JSON.decode(xhr.responseText)
											if (result.success) {
												location.href=location.href;
										} else {
											Ext.MessageBox.show({
												title: 'Error',
												msg: "No se pudo salir del sistema en este momento, inténtelo nuevamente",
												icon: Ext.MessageBox.ERROR,
												buttons: Ext.Msg.OK
											});
										}
										// if (task && result.percent>=100) Ext.TaskManager.stop(task);
										// progressBar.down('[itemId=progressBar_bar]').updateProgress(result.percent/100, Math.round(result.percent)+'% completado...');
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
							}
						})
				}
			}
		]
	}
}