Ext.define('Panax.view.PanaxPanel', {
	extend: 'Ext.panel.Panel'
	, alias: 'widget.panaxpanel'
    , requires: [
		'Ext.form.field.Text'
		, 'Ext.ux.statusbar.StatusBar'
	]
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