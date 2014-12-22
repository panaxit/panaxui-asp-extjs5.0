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