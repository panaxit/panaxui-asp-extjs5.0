
Ext.define('Px.Demo.es.dbo.Perfiles.insert.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Perfiles.insert.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'IdEmpleado,IdPerfil'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id'
, useNull: true
}, {name:'IdEmpleado',fieldName:'IdEmpleado',  mapping:'IdEmpleado["value"]', isAlwaysSubmitable: true
, useNull: true
}, {name:'IdPerfil',fieldName:'IdPerfil',  mapping:'IdPerfil["value"]', isAlwaysSubmitable: true
, useNull: true
}, {name:'Proyecto',fieldName:'Proyecto',  mapping:'Proyecto["value"]'
, useNull: true
}, {name:'Comentarios',fieldName:'Comentarios',  mapping:'Comentarios["value"]'
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
	, model: "Demo.es.dbo.Perfiles.insert.formView"
	
	, settings: {
		catalogName: "dbo.Perfiles"
		, filters: me.filters?me.filters:(!me.identity?"0=0":"[Id]="+me.identity)
		, identityKey: "Id"
		, primaryKey: "IdEmpleado,IdPerfil"
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
		xtype: "fieldcontainer", fieldLabel: 'Empleado'
		/*formField*/
		, itemId: "container_IDDZESI0MHT0EPL5DLEVTBASQWFK"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EHB, fieldName=IdEmpleado, Column_Name=IdEmpleado, isPrimaryKey=1, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Empleado, controlType=default, foreignKey (default)
	fieldLabel: 'Empleado'

	, emptyText: 'Empleado'
	, name: 'IdEmpleado'
	, itemId: "field_IdEmpleado_IDMJWKSUN5RAZ4M0G32T0VUJBZDM"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: foreignKey; lw: 100; iw: 300*/
	, width: 300/*10*/
	, onchange_event: undefined
	, /*default*/
	xtype: "cascadeddropdown"
	, layout: 'anchor'
	, defaults: { hideLabel: true, anchor: 'none', flex: 0, undefined:null }
	, width: 300
	, items: [
{ //fieldId=ID0EUB, fieldName=IdEmpleado, sortOrder=0, text=- -, dataText=RTRIM([Nombre]), dataValue=RTRIM([Id]), primaryKey=Id, headerText=Empleado, Table_Schema=dbo, Schema=dbo, Table_Name=Empleado, Name=Empleado, controlType=default, supportsInsert=1, supportsUpdate=1, supportsDelete=1, filtersBehavior=append,  (default)
	fieldLabel: 'Empleado'

	, emptyText: 'Empleado'
	, name: 'IdEmpleado'
	, itemId: "field_Empleado_IDDUZQUN2TDLQ0GU1ANEGXPFSQIJ"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: 150*/
	, width: 150/*10*/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'ajaxdropdown'
, mode: 'local'
, queryMode: 'local'
, triggerAction: 'all'

, typeAhead: true
, fieldLabel: 'Empleado'
, emptyText: 'Empleado'
//width: 400

//forceSelection: true 
, settings: {
	catalogName: "dbo.Empleado",
	filters: "",
	dataValue: "RTRIM([Id])",
	dataText: "RTRIM([Nombre])", 
	primaryKey: "Id",
	foreignKey: "",/*Empleado*/
	
	foreignTable: "",	
	foreignElement: "",
	dependants: [undefined],
	undefined:undefined
	}
, insertEnabled: true
, editEnabled: true
, deleteEnabled: true
, refreshEnabled: true
, store: Ext.create('Panax.ajaxDropDown', {model: "Panax.model.combobox"

})
, onSelect: undefined
	, /**/undefined:null
	, emptyText: 'Empleado'
	/*dbconfig*//*dbconfig*/
}
]

	, /*foreignKey*/undefined:null
	, emptyText: 'Empleado'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Perfil'
		/*formField*/
		, itemId: "container_ID0JHLYMMMZFXFGHHEPKTE3XFYKL"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EGE, fieldName=IdPerfil, Column_Name=IdPerfil, isPrimaryKey=1, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Perfil, controlType=default, foreignKey (default)
	fieldLabel: 'Perfil'

	, emptyText: 'Perfil'
	, name: 'IdPerfil'
	, itemId: "field_IdPerfil_IDFKDCEQENCZTJCWVLFWT1OQGBMC"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: foreignKey; lw: 100; iw: 300*/
	, width: 300/*10*/
	, onchange_event: undefined
	, /*default*/
	xtype: "cascadeddropdown"
	, layout: 'anchor'
	, defaults: { hideLabel: true, anchor: 'none', flex: 0, undefined:null }
	, width: 300
	, items: [
{ //fieldId=ID0ETE, fieldName=IdPerfil, sortOrder=0, text=- -, dataText=RTRIM([Perfil]), dataValue=RTRIM([Id]), primaryKey=Id, headerText=Perfil, Table_Schema=dbo, Schema=dbo, Table_Name=Perfil, Name=Perfil, controlType=default, supportsInsert=1, supportsUpdate=1, supportsDelete=1, filtersBehavior=append,  (default)
	fieldLabel: 'Perfil'

	, emptyText: 'Perfil'
	, name: 'IdPerfil'
	, itemId: "field_Perfil_ID3T3HXY3HMLHVBLP3BO3F3I5SRH"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: 150*/
	, width: 150/*10*/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'ajaxdropdown'
, mode: 'local'
, queryMode: 'local'
, triggerAction: 'all'

, typeAhead: true
, fieldLabel: 'Perfil'
, emptyText: 'Perfil'
//width: 400

//forceSelection: true 
, settings: {
	catalogName: "dbo.Perfil",
	filters: "",
	dataValue: "RTRIM([Id])",
	dataText: "RTRIM([Perfil])", 
	primaryKey: "Id",
	foreignKey: "",/*Perfil*/
	
	foreignTable: "",	
	foreignElement: "",
	dependants: [undefined],
	undefined:undefined
	}
, insertEnabled: true
, editEnabled: true
, deleteEnabled: true
, refreshEnabled: true
, store: Ext.create('Panax.ajaxDropDown', {model: "Panax.model.combobox"

})
, onSelect: undefined
	, /**/undefined:null
	, emptyText: 'Perfil'
	/*dbconfig*//*dbconfig*/
}
]

	, /*foreignKey*/undefined:null
	, emptyText: 'Perfil'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Proyecto'
		/*formField*/
		, itemId: "container_IDPXUJD50WZMBECKG5POY03Q13IH"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EBG, fieldName=Proyecto, Column_Name=Proyecto, isPrimaryKey=0, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Proyecto, controlType=default, foreignKey (default)
	fieldLabel: 'Proyecto'

	, emptyText: 'Proyecto'
	, name: 'Proyecto'
	, itemId: "field_Proyecto_ID2H43GJOBKTKKOH5VQQJ1GMXVPF"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: foreignKey; lw: 100; iw: 300*/
	, width: 300/*10*/
	, onchange_event: undefined
	, /*default*/
	xtype: "cascadeddropdown"
	, layout: 'anchor'
	, defaults: { hideLabel: true, anchor: 'none', flex: 0, undefined:null }
	, width: 300
	, items: [
{ //fieldId=ID0EOG, fieldName=Proyecto, sortOrder=0, text=- -, dataText=RTRIM([Proyecto]), dataValue=RTRIM([Id]), primaryKey=Id, headerText=Proyecto, Table_Schema=dbo, Schema=dbo, Table_Name=Proyecto, Name=Proyecto, controlType=default, supportsInsert=1, supportsUpdate=1, supportsDelete=1, filtersBehavior=append,  (default)
	fieldLabel: 'Proyecto'

	, emptyText: 'Proyecto'
	, name: 'Proyecto'
	, itemId: "field_Proyecto_IDIUZW2OSJWT1ELTTLLUP4QZEPPK"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: 150*/
	, width: 150/*10*/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
xtype: 'ajaxdropdown'
, mode: 'local'
, queryMode: 'local'
, triggerAction: 'all'

, typeAhead: true
, fieldLabel: 'Proyecto'
, emptyText: 'Proyecto'
//width: 400

//forceSelection: true 
, settings: {
	catalogName: "dbo.Proyecto",
	filters: "",
	dataValue: "RTRIM([Id])",
	dataText: "RTRIM([Proyecto])", 
	primaryKey: "Id",
	foreignKey: "",/*Proyecto*/
	
	foreignTable: "",	
	foreignElement: "",
	dependants: [undefined],
	undefined:undefined
	}
, insertEnabled: true
, editEnabled: true
, deleteEnabled: true
, refreshEnabled: true
, store: Ext.create('Panax.ajaxDropDown', {model: "Panax.model.combobox"

})
, onSelect: undefined
	, /**/undefined:null
	, emptyText: 'Proyecto'
	/*dbconfig*//*dbconfig*/
}
]

	, /*foreignKey*/undefined:null
	, emptyText: 'Proyecto'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Comentarios'
		/*formField*/
		, itemId: "container_IDWB3HQQIEIOXXEAGJ010SMIUWKH"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0E1G, fieldName=Comentarios, Column_Name=Comentarios, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=255, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Comentarios, controlType=default, nvarchar (default)
	fieldLabel: 'Comentarios'

	, emptyText: 'Comentarios'
	, name: 'Comentarios'
	, itemId: "field_Comentarios_ID3TAFNSJ5SR3EDJ0MK5NRAIPJQO"
, afterLabelTextTpl: ''/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/*255*/
	, maxLength: 255
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'Comentarios'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Comentarios'
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
				var newRecord = dbo.Perfiles.load(currentRecord
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
	