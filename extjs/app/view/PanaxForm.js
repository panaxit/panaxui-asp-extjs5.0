Ext.define('Panax.view.PanaxForm', {
    extend: 'Ext.form.Panel'
    , alias: 'widget.panaxform'
	, autoScroll: true
	, bodyPadding: 10
	, closable: false
    , border: true
	, autoScroll: true
	, initComponent: function() {
		var me = this;

        console.info("PanaxForm initiated: "+this.id);

        this.callParent();
    }
});