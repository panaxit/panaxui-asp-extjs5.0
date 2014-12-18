Ext.define('Ext.slider.Thumb', {
	override: 'Ext.slider.Thumb',
	
	constructor: function (config) {
		this.callParent(arguments);
	}
	
	,  destroy: function() {
		Ext.destroy(this.tracker);
		if (this.el) this.el.destroy();
		this.el = null;
	}
});
