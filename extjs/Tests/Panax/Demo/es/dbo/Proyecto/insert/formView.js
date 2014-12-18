
Ext.define('Px.Demo.es.dbo.Proyecto.insert.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Proyecto.insert.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Proyecto',fieldName:'Proyecto',  mapping:'Proyecto["value"]'
, useNull: true
}]
	, validations: []
	
});


    var store = 
Ext.create('Panax.custom.AjaxStore', {
	autoLoad: true
	, autoSync: true
	, autoDestroy: true
	, pageSize: 1
	, defaultPageSize: 1
	, remoteSort: true
	, model: "Demo.es.dbo.Proyecto.insert.formView"
	
	, settings: {
		catalogName: "dbo.Proyecto"
		, filters: me.filters?me.filters:(!me.identity?"0=0":"[Id]="+me.identity)
		, identityKey: "Id"
		, primaryKey: "Id"
		, mode: "insert"
		, lang: "es"
	}
	, undefined:undefined
	
})

	
	me.formView = Ext.create('Panax.Form', {
		store: store
		, mode: 'insert'
		, 
defaults: {
	
	labelWidth: 100
	
}
, layout: {
	type: 'fit'
}
, frame: true

		, items: [
{
	xtype: 'panel'
	,frame: true
	,autoScroll: true
	,defaults: {
		anchor: 'none'
	}
	,items: [/**/{
		xtype: "fieldcontainer", fieldLabel: 'Proyecto'
		/*formField*/
		, itemId: "container_IDGOXX3YART32CL4GQQV53ODSXTK"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFB, fieldName=Proyecto, Column_Name=Proyecto, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Proyecto, controlType=default, nvarchar (default)
	fieldLabel: 'Proyecto'

	, emptyText: 'Proyecto'
	, name: 'Proyecto'
	, itemId: "field_Proyecto_ID0NSTI4ZI0PZVFL5VNM4KHE3GKN"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/*50*/
	, maxLength: 50
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'Proyecto'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Proyecto'
	/*dbconfig*//*dbconfig*/
}
]
	}
]
}
]
		, tipTpl: Ext.create('Ext.XTemplate', '{name}: {error}')
	});
	Ext.apply(me, { 
		layout: 'fit',
		items: [me.formView]
	});
	me.callParent(arguments); 
	}
	,loadRecord: function(currentRecord) {
		var me = this;
		if (!(currentRecord===undefined)) {
			var view = me.formView;
			view.mask = new Ext.LoadMask(view, {msg:"Cargando..."});
			view.mask.show();
			if (Ext.isObject(currentRecord)) {
				view.loadRecord(currentRecord);
				view.mask.hide();
				}
			else {
				var newRecord = dbo.Proyecto.load(currentRecord
				, {
					success: function(record) {
						view.loadRecord(record);
						view.mask.hide();
					}
					, failure: function() {
						view.mask.hide();
					}
				});
			}
		}
	}
});
	