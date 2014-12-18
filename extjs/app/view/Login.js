Ext.define('Px.view.Login', { 
    extend: 'Ext.window.Window'
    , alias: 'widget.login'
    
	, title: 'Ingrese al sistema'
	, modal: true
	, logo: "../../../Images/logos/Panax.jpg"
	, width: 350//400
	, height:100//190
	, minWidth: 300
	, minHeight: 190
	, padding: 10
	, layout: 'border'
	, plain: true
	, border:false
	, caseSensitive: true
	, closeAction: 'hide'
	, defaults: {
		border:false
	}
	, items: [
		{
			region: 'center',
			items: [{
				xtype:'form',
				id: 'loginForm',
				border: false,
				defaultType: 'textfield',
				bodyPadding: 5,
				defaults: {
					labelPosition: 'left',
					labelAlign: 'right',
					labelWidth: 200
				},
				items: [{
					fieldLabel: 'Identificador del usuario',
					labelPosition: 'left',
					labelAlign: 'right',
					labelWidth: 200,
					itemId: 'username',
					name: 'username',
					cls: 'required',
					allowBlank: false,
					blankText: 'EL IDENTIFICADOR DEL USUARIO NO DEBE SER NULO',
					msgTarget: 'side',
					anchor: '100%'  // anchor width by percentage
				}, {
					fieldLabel: 'Clave de acceso',
					labelPosition: 'left',
					labelAlign: 'right',
					labelWidth: 200,
					inputType: 'password',
					itemId: 'password',
					name: 'password',
					cls: 'required',
					allowBlank: false,
					blankText: 'LA CLAVE DE ACCESO NO DEBE SER NULA',
					msgTarget: 'side',
					anchor: '100%'
				}]
			}]
		}
	]
	
	, buttons: [
		{
			text: 'Entrar',
			itemId: 'loginButton',
			handler: function() {
				var login = this.up('window');
				var form = login.down('#loginForm').getForm();
				login.onSubmitButton();
			}
		},{
			text: 'Cancelar',
			itemId: 'cancelButton',
			handler: function() {
				var login = this.up('window')
				login.onClose();
			}
		}
	]

	, initComponent: function(){
		this.callParent();
		Ext.apply(this.down("[itemId=logoImage]"), this.logo)
	}
	, listeners: {
		afterrender: function(thisForm, options) {
			this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
			  enter: this.onSubmitButton,
			  scope: this
			});
		}
		, beforeclose: function(panel, eOpts) {
			var continueScript
			if (this.onBeforeClose) continueScript=this.onBeforeClose(panel, eOpts)
			if (continueScript===false) return false
		}
		, close: function(panel, eOpts) {
			var login = this;
			var form = login.down('#loginForm').getForm();
			form.findField('password').setValue(''); //form.reset();
			if (this.onClose) this.onClose(panel, eOpts)
		}
	}
	, onClose: function(panel, eOpts) {}
	, onSubmitButton: function() {
		var login = this;
		var form = login.down('#loginForm').getForm();
		if (form.isValid()) {
			Ext.Ajax.request({
				url: 'Scripts/login.asp',
				method: 'POST',
				params: {
					username: form.findField('username').getValue(),
					password: calcMD5(!(login.caseSensitive)?form.findField('password').getValue().toUpperCase():form.findField('password').getValue())
				},
				async:false,
				success: function(xhr, r) {
					var result = Ext.JSON.decode(xhr.responseText)
					if (result.success) {
						login.close();
						location.hash='#home';
						window.location.reload();
						login.onSuccess();
					} else
					{
						Ext.MessageBox.show({
						title: 'Error',
						msg: result.message,
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK,
						fn: function(result) {
							//form.findField('password').setValue(''); //form.reset();
							form.findField('password').focus(true, 200);
							}
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
	},
	onSuccess: function() {
		// login.redirectTo('home');
		//login.redirectTo(login.getApplication().getDefaultToken());
	},
})