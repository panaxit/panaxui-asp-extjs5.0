
Ext.define('Px.Demo.es.dbo.Sexo.insert.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Sexo.insert.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Sexo',fieldName:'Sexo',  mapping:'Sexo["value"]'
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
	, model: "Demo.es.dbo.Sexo.insert.formView"
	
	, settings: {
		catalogName: "dbo.Sexo"
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
		xtype: "fieldcontainer", fieldLabel: 'Sexo'
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
{ //fieldId=ID0EFB, fieldName=Sexo, Column_Name=Sexo, isPrimaryKey=0, isIdentity=0, dataType=nchar, length=10, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Sexo, controlType=default, nchar (default)
	fieldLabel: 'Sexo'

	, emptyText: 'Sexo'
	, name: 'Sexo'
	, itemId: "field_Sexo_ID0NSTI4ZI0PZVFL5VNM4KHE3GKN"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: nchar; lw: 100; iw: 130*/
	, width: 130/*10*/
	, maxLength: 10
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'Sexo'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, columns: 3, width: 400
	, emptyText: 'Sexo'
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
				var newRecord = dbo.Sexo.load(currentRecord
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
	