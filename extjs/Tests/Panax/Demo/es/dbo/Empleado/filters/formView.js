
Ext.define('Px.Demo.es.dbo.Empleado.filters.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Empleado.filters.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Nombre',fieldName:'Nombre',  mapping:'Nombre["value"]'
, useNull: true
}, {name:'PrimerApellido',fieldName:'PrimerApellido',  mapping:'PrimerApellido["value"]'
, useNull: true
}, {name:'FechaIngreso',fieldName:'FechaIngreso',  mapping:'FechaIngreso["value"]', type: 'date', dateFormat: 'd/m/Y'
, useNull: true
}, {name:'IngresoMensual',fieldName:'IngresoMensual',  mapping:'IngresoMensual["value"]', type: 'float', minValue: 0
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
	, model: "Demo.es.dbo.Empleado.filters.formView"
	
	, settings: {
		catalogName: "dbo.Empleado"
		, filters: me.filters?me.filters:(!me.identity?"0=0":"[Id]="+me.identity)
		, identityKey: "Id"
		, primaryKey: "Id"
		, mode: "filters"
		, lang: "es"
	}
	, undefined:undefined
	
})

	
	me.formView = Ext.create('Panax.Form', {
		store: store
		, mode: 'filters'
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
		xtype: "fieldcontainer", fieldLabel: 'Nombre'
		/*formField*/
		, itemId: "container_IDGWHXRLTAHP2TB41OHFYGKXPWGB"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFB, fieldName=Nombre, Column_Name=Nombre, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, headerText=Nombre, controlType=default, debug:fieldSet=8, nvarchar (default)
	fieldLabel: 'Nombre'

	, emptyText: 'Nombre'
	, name: 'Nombre'
	, itemId: "field_Nombre_IDRNANYYLSVQ0EEMGOUNRBBHDM1N"
, afterLabelTextTpl: '', style: {"white-space":'nowrap'}, beforeBodyEl: ' <select id="filter_{$name}"> <option>=</option><option value="LIKE" selected="selected">contiene</option><option value="STARTS-WITH">empieza con</option></select>'/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'Nombre'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Nombre'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Primer Apellido'
		/*formField*/
		, itemId: "container_ID34HHXXHGQROBJEUTFPTHS1E21C"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0ETB, fieldName=PrimerApellido, Column_Name=PrimerApellido, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, headerText=Primer Apellido, controlType=default, debug:fieldContainer=9, fieldContainer.Orientation=horizontal, debug:fieldContainer.Orientation=10, nvarchar (default)
	fieldLabel: 'Primer Apellido'

	, emptyText: 'Primer Apellido'
	, name: 'PrimerApellido'
	, itemId: "field_PrimerApellido_IDH123YLHXCO1SDCKNR3KUD5JVEK"
, afterLabelTextTpl: '', style: {"white-space":'nowrap'}, beforeBodyEl: ' <select id="filter_{$name}"> <option>=</option><option value="LIKE" selected="selected">contiene</option><option value="STARTS-WITH">empieza con</option></select>'/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'PrimerApellido'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Primer Apellido'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Fecha Ingreso'
		/*formField*/
		, itemId: "container_ID1TDVB0YVHGKFJ5ECZAFWUO1EMG"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0ESC, fieldName=FechaIngreso, Column_Name=FechaIngreso, isPrimaryKey=0, isIdentity=0, dataType=date, defaultValue=(getdate()), headerText=Fecha Ingreso, controlType=default, date (default)
	fieldLabel: 'Fecha Ingreso'

	, emptyText: 'Fecha Ingreso'
	, name: 'FechaIngreso'
	, itemId: "field_FechaIngreso_IDAQP1V3AY5FYOMYDZTV1FPDUYVN"
, afterLabelTextTpl: '', style: {"white-space":'nowrap'}, beforeBodyEl: ' <select id="filter_{$name}"> <option>=</option><option value="LIKE" selected="selected">contiene</option><option value="STARTS-WITH">empieza con</option></select>'/*dt: date; lw: 100; iw: 100*/
	, width: 100/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'datefield'

	, /*date*/undefined:null
	, emptyText: 'Fecha Ingreso'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Ingreso Mensual'
		/*formField*/
		, itemId: "container_ID3D52A0PSAEBRB1LNCEUHFHZTXC"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0E5C, fieldName=IngresoMensual, Column_Name=IngresoMensual, isPrimaryKey=0, isIdentity=0, dataType=money, headerText=Ingreso Mensual, controlType=default, money (default)
	fieldLabel: 'Ingreso Mensual'

	, emptyText: 'Ingreso Mensual'
	, name: 'IngresoMensual'
	, itemId: "field_IngresoMensual_IDCJE3Y1POHQNRD2GAH4K1XEHZAC"
, afterLabelTextTpl: '', style: {"white-space":'nowrap'}, beforeBodyEl: ' <select id="filter_{$name}"> <option>=</option><option value="LIKE" selected="selected">contiene</option><option value="STARTS-WITH">empieza con</option></select>'/*dt: money; lw: 100; iw: 306*/
	, width: 306/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'IngresoMensual'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*money*/undefined:null
	, emptyText: 'Ingreso Mensual'
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
				var newRecord = dbo.Empleado.load(currentRecord
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
	