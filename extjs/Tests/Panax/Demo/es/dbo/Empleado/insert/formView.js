
Ext.define('Demo.es.dbo.Empleado.insert.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Empleado.insert.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Nombre',fieldName:'Nombre',  mapping:'Nombre["value"]'
, useNull: true
}, {name:'PrimerApellido',fieldName:'PrimerApellido',  mapping:'PrimerApellido["value"]'
, useNull: true
}, {name:'SegundoApellido',fieldName:'SegundoApellido',  mapping:'SegundoApellido["value"]'
, useNull: true
}, {name:'Foto',fieldName:'Foto',  mapping:'Foto["value"]'
, useNull: true
}, {name:'IdSexo',fieldName:'IdSexo',  mapping:'IdSexo["value"]'
, useNull: true
}, {name:'FechaIngreso',fieldName:'FechaIngreso',  mapping:'FechaIngreso["value"]', type: 'date', dateFormat: 'd/m/Y'
, useNull: true
}, {name:'IngresoMensual',fieldName:'IngresoMensual',  mapping:'IngresoMensual["value"]', type: 'float', minValue: 0
, useNull: true
}, {name:'ViveFueraEnMexico',fieldName:'ViveFueraEnMexico',  mapping:'ViveFueraEnMexico["value"]', type: 'boolean'
, useNull: true
}, {name:'DondeVive',fieldName:'DondeVive',  mapping:'DondeVive["value"]'
, useNull: true
}]
	, validations: []
	
	, associations: [
	{ type: 'hasMany', model: "Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Perfiles.insert.gridView", name: "Perfiles",  tableName: 'dbo.Perfiles' ,primaryKey: "IdEmpleado,IdPerfil", identityKey: 'Id', foreignKey: "IdEmpleado", associationKey: "Perfiles", reader: { type: 'json', root: 'data' }},
	{ type: 'hasMany', model: "Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Direcciones.insert.gridView", name: "Direcciones",  tableName: 'dbo.Direcciones' ,primaryKey: "Id", identityKey: 'Id', foreignKey: "IdEmpleado", associationKey: "Direcciones", reader: { type: 'json', root: 'data' }}]
});

Ext.define("Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Direcciones.insert.gridView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Direcciones.Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Direcciones.Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Direcciones.Direccion',fieldName:'Direccion',  mapping:'Direccion["value"]'
, useNull: true
}]
	, validations: []
	
	, belongsTo: "Demo.es.dbo.Empleado.insert.formView"
});

Ext.define("Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Perfiles.insert.gridView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Perfiles.Id'
    , primaryKeys: 'IdEmpleado,IdPerfil'
    , fields: [{ name:'checked', type: 'bool', submitValue: false },
{name:'Perfiles.Id',fieldName:'Id',  mapping:'Id'
, useNull: true
}, {name:'Perfiles.IdPerfil',fieldName:'IdPerfil',  mapping:'IdPerfil["value"]', isAlwaysSubmitable: true
, useNull: true
}, {name:'Perfiles.Proyecto',fieldName:'Proyecto',  mapping:'Proyecto["value"]'
, useNull: true
}, {name:'Perfiles.Comentarios',fieldName:'Comentarios',  mapping:'Comentarios["value"]'
, useNull: true
}]
	, validations: []
	
	, belongsTo: "Demo.es.dbo.Empleado.insert.formView"
});


    var store = 
Ext.create('Panax.custom.AjaxStore', {
	autoLoad: true
	, autoSync: true
	, autoDestroy: true
	, pageSize: 1
	, defaultPageSize: 1
	, remoteSort: true
	, model: "Demo.es.dbo.Empleado.insert.formView"
	
	, settings: {
		catalogName: "dbo.Empleado"
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

		, items: [function() { var grouptabpanel = Ext.create('Ext.ux.GroupTabPanel', {
	xtype: 'grouptabpanel',
	padding: '10 5 3 10',
	activeGroup: 0,
	items: [{
	mainItem: 0,
	items: [
	{
		xtype: 'portalpanel',
		title: 'Datos del Empleado',
		iconCls: 'x-icon-users',
		tabTip: '',
		//style: 'padding: 10px;',
		frame: true,
		border: false,
		layout: 'fit',
		items: [{
			flex: 1,
			items: [{
				xtype: 'panel',
				frame: true,
				border: false,
				defaults: {
					anchor: 'none'
				},
				items: [
					{
		xtype:'tabpanel'
		,itemId: 'container_IDVIOZ5NCJLYG5IY11WYKJ5IUYOP'
		,activeTab: 0
		,frame:true
		,defaults:{
			bodyPadding: 10
			//layout: 'anchor'
		}
		,undefined:null
		,items:[{
		xtype:'panel'
		,itemId: 'container_IDUVC0AMPB5X20CRXR1NAFTJMC3O'
		,frame:true
		,title:'Generales'
		,undefined:null
		,items:[/**/{
		xtype: "fieldcontainer", fieldLabel: 'Nombre'
		/*formField*/
		, itemId: "container_ID1NNDRAKZ1DVGDSW0VN2ZKKFEJJ"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EVB, fieldName=Nombre, Column_Name=Nombre, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=30, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Nombre, controlType=default, debug:tabPanel=11, debug:groupTabPanel=12, debug:tab=13, nvarchar (default)
	fieldLabel: 'Nombre'

	, emptyText: 'Nombre'
	, name: 'Nombre'
	, itemId: "field_Nombre_IDMJWKSUN5RAZ4M0G32T0VUJBZDM"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: nvarchar; lw: 100; iw: 185*/
	, width: 185/*30*/
	, maxLength: 30
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
,{
		xtype: 'fieldcontainer'/*px:fieldContainer*/
		, itemId: "container_IDXI3CMMUXQHZGJUC51SGFMBNVMO"
		, fieldLabel: 'Apellidos'
		
, afterLabelTextTpl: '*'
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		
		, defaults: { hideEmptyLabel:false, hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, items: [
{ //fieldId=ID0EHC, fieldName=PrimerApellido, Column_Name=PrimerApellido, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Primer Apellido, controlType=default, debug:fieldContainer=21, fieldContainer.Orientation=horizontal, debug:fieldContainer.Orientation=22, nvarchar (default)
	fieldLabel: 'Primer Apellido'

	, emptyText: 'Primer Apellido'
	, name: 'PrimerApellido'
	, itemId: "field_PrimerApellido_IDUIFNIHKJDKBFIG2X55OC0F5J5I"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/*50*/
	, maxLength: 50
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
,
{ //fieldId=ID0EXC, fieldName=SegundoApellido, Column_Name=SegundoApellido, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Segundo Apellido, controlType=default, debug:fieldContainer=23, nvarchar (default)
	fieldLabel: 'Segundo Apellido'

	, emptyText: 'Segundo Apellido'
	, name: 'SegundoApellido'
	, itemId: "field_SegundoApellido_IDLZSOV0IA3JD3LOOO2LMZCJBICL"
, afterLabelTextTpl: ''/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/*50*/
	, maxLength: 50
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'SegundoApellido'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Segundo Apellido'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Foto'
		/*formField*/
		, itemId: "container_IDUFWKATYYPWJZHGT4N0TIZMALH"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFB, fieldName=Foto, Column_Name=Foto, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=255, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Foto, controlType=picture, debug:tabPanel=7, debug:moveBefore=8, nvarchar (picture)
	fieldLabel: 'Foto'

	, emptyText: 'Foto'
	, name: 'Foto'
	, itemId: "field_Foto_ID34HHXXHGQROBJEUTFPTHS1E21C"
, afterLabelTextTpl: ''/*dt: nvarchar; lw: 100; iw: */
	
	, maxLength: 255
	, onchange_event: undefined
	, /*picture*/
xtype: "fieldcontainer"
, width: 350
, height: 130
, layout: {
	type: 'vbox'
	, align : 'stretch'
	, pack  : 'start'
}
, items: [{
	xtype: 'imagemanager'
	, itemId: 'fileImage'
	, name: 'Foto'
	, parentFolder: "Images/FileSystem"

}]

	, /*nvarchar*/undefined:null
	, emptyText: 'Foto'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Sexo'
		/*formField*/
		, itemId: "container_ID0C1LO5AVUCJWNVX1RGTV3ZCOMF"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EBE, fieldName=IdSexo, Column_Name=IdSexo, isPrimaryKey=0, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Sexo, debug:moveBefore=9, controlType=radiogroup, debug:controlType=10, foreignKey (radiogroup)
	fieldLabel: 'Sexo'

	, emptyText: 'Sexo'
	, name: 'IdSexo'
	, itemId: "field_IdSexo_IDWSPMVUDGZRWBHETXJ4QRA5DLZP"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: */
	
	, onchange_event: undefined
	, /*radiogroup*/
xtype: 'radiogroup'
, itemId: 'input_IdSexo_IDWSPMVUDGZRWBHETXJ4QRA5DLZP'
, defaults: {name: 'IdSexo', listeners: {
	check: function( control, eventObj, eOpts ) {
	}
}}
, columns: 1
, vertical: true
, layout: 'anchor'
, listeners: {
	change: function(control, newValue, oldValue, eOpts) {
		if (control.onchange_event) control.onchange_event(control, newValue, oldValue, eOpts)
	}
}
, items: [/*selector.option no está definido*/,{ boxLabel: 'Femenino', inputValue: '2' },{ boxLabel: 'Masculino', inputValue: '1' }
]

	, /*foreignKey*/undefined:null
	, emptyText: 'Sexo'
	/*dbconfig*//*dbconfig*/
}
]
	}
]
	}
,{
		xtype:'panel'
		,itemId: 'container_IDFYS5ULE0LYY5MUQ1XAUYQWSTZC'
		,frame:true
		,title:'Datos del puesto'
		,undefined:null
		,items:[{
	xtype:'fieldset'
	, title: 'Datos del puesto'
	, itemId: "container_ID5GBN25FV0BGYFHNI1EWZQBIUEK"
	, defaultType: 'textfield'
	, layout: 'anchor'
	, defaults: { anchor:'none', undefined:null }
	, undefined:null
	, items: [/**/{
		xtype: "fieldcontainer", fieldLabel: 'Fecha Ingreso'
		/*formField*/
		, itemId: "container_IDRMZALVEY1MDWN35PPAQ0MGMU0G"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFD, fieldName=FechaIngreso, Column_Name=FechaIngreso, isPrimaryKey=0, isIdentity=0, dataType=date, isNullable=0, supportsInsert=1, supportsUpdate=1, defaultValue=(getdate()), headerText=Fecha Ingreso, controlType=default, debug:tab=19, debug:fieldSet=20, date (default)
	fieldLabel: 'Fecha Ingreso'

	, emptyText: 'Fecha Ingreso'
	, name: 'FechaIngreso'
	, itemId: "field_FechaIngreso_ID0JHLYMMMZFXFGHHEPKTE3XFYKL"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: date; lw: 100; iw: 100*/
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
		, itemId: "container_IDBIS53UKH2WQJJ22NJYCHJIZJLH"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EVD, fieldName=IngresoMensual, Column_Name=IngresoMensual, isPrimaryKey=0, isIdentity=0, dataType=money, length=15, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Ingreso Mensual, controlType=default, money (default)
	fieldLabel: 'Ingreso Mensual'

	, emptyText: 'Ingreso Mensual'
	, name: 'IngresoMensual'
	, itemId: "field_IngresoMensual_IDZGD4ECWQQDE5KCLAW4AFWNCS2F"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: money; lw: 100; iw: 170*/
	, width: 170/*15*/
	, maxLength: 15
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
,/**/{
		xtype: "fieldset"
		,itemId: "container_IDM4ULEQPWYGZQD0AN13JGLHS15H"
		,title: 'Vive Fuera En Mexico'
		,checkboxToggle: true
		,checkboxName: "ViveFueraEnMexico"
		,collapsed: true
		,layout: 'vbox'
		,defaults: { anchor: 'none', flex:0, columnWidth:50, }
		,undefined:null
		,items: [
{ //fieldId=ID0ENF, fieldName=DondeVive, Column_Name=DondeVive, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Donde Vive, controlType=default, debug:fieldSet=16, debug:fieldContainer=17, nvarchar (default)
	fieldLabel: 'Donde Vive'

	, emptyText: 'Donde Vive'
	, name: 'DondeVive'
	, itemId: "field_DondeVive_IDBDVQKZQIPWLEKIIT0CEK3LB0HE"
, afterLabelTextTpl: ''/*dt: nvarchar; lw: 100; iw: 306*/
	, width: 306/*50*/
	, maxLength: 50
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'DondeVive'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nvarchar*/undefined:null
	, emptyText: 'Donde Vive'
	/*dbconfig*//*dbconfig*/
}
, {xtype:"displayfield", flex:1}]
		
		, listeners: {
			expand: function(){},collapse: function(){}
		}
	}
]
	}
]
	}

					]
				}]
			}
		]
	}
]
}
,{
	mainItem: 0,
	items: [
	{
		xtype: 'portalpanel',
		title: 'Responsabilidades',
		iconCls: 'x-icon-users',
		tabTip: '',
		//style: 'padding: 10px;',
		frame: true,
		border: false,
		layout: 'fit',
		items: [{
			flex: 1,
			items: [{
				xtype: 'panel',
				frame: true,
				border: false,
				defaults: {
					anchor: 'none'
				},
				items: [
					{
	xtype:'fieldset'
	, title: 'Responsabilidades'
	, itemId: "container_IDXCJHDY3ST1PGEKH5INP0AWMZOF"
	, defaultType: 'textfield'
	, layout: 'anchor'
	, defaults: { anchor:'none', undefined:null }
	, undefined:null
	, items: [/**/{
		xtype: "fieldcontainer", fieldLabel: 'Perfiles'
		/*formField*/
		, itemId: "container_IDSMC1OI1OVKR0BAZK0AZYGAMFCE"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0E4F, fieldName=Perfiles, Column_Name=Perfiles, dataType=junctionTable, relationshipType=hasMany, foreignSchema=dbo, foreignTable=Perfiles, foreignReference=IdEmpleado, scaffold=true, headerText=Perfiles, controlType=default, debug:groupTabPanel=14, debug:fieldSet=15, junctionTable (default)
	fieldLabel: 'Perfiles'

	, emptyText: 'Perfiles'
	, name: 'Perfiles'
	, itemId: "field_Perfiles_IDYALN5BEVXZRWGQADODHZR4U4C"
, afterLabelTextTpl: ''/*dt: junctionTable; lw: 100; iw: 550*/
	, height: 150, width: 550/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
	xtype: "customtreepanel"
	,store: Ext.create('Panax.data.TreeStore', {model: 'Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Perfiles.insert.gridView'})
	,width: 500
	,height: 300
	,itemId: "Perfiles"
	,hideHeaders: false
	,collapsible: false
    ,useArrows: true
    ,rootVisible: false
	,resizable: true
	,singleExpand: true
	,multiSelect: true
	,autoScroll: true
	, height: 150, width: 550
	,maxSelections: undefined
	,minSelections: undefined
	,columns: [
		function () { 
		var me = Ext.create('Ext.tree.Column', {
            header: "Perfiles", 
			flex: 2,
            sortable: true,
            displayValue: 'value',
			displayField: 'text',
            dataIndex: 'Perfiles.IdPerfil'
			, renderer: function(value, metaData, record, rowIndex, colIndex, store, view){ 
				return Ext.isObject(value)?value[me.displayField]:value 
			}
		});
		return me;
		}()
		, function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Proyecto"
, displayField: "text"
, displayValue: "value"

, editor: new Ext.form.field.ComboBox({
	typeAhead: true
	, valueField: 'id'
	, displayField: 'text'
	, triggerAction: 'all'
	, forceSelection: true
	, selectOnTab: true
	, /*foreignKey*/undefined:null
	, store: Ext.create('Ext.data.Store', {
        fields: ['id', 'text']
		, autoLoad: false
        , proxy: {
            type: 'ajax'
            , url: '../Scripts/xmlCatalogOptions.asp'
            , reader: {
                type: 'json'
                , root: 'data'
                , successProperty: 'success'
                , messageProperty: 'message'
                , totalProperty: 'total'
                , idProperty: ''
            }
			, pageParam: 'pageIndex'
			, limitParam: 'pageSize'
			, sortParam: 'sorters'
			, extraParams: {
				catalogName: "dbo.Proyecto"
				, filters: ""
				, dataValue: "RTRIM([Id])"
				, dataText: "RTRIM([Proyecto])"
				
				, output: 'json'
			}
            , listeners: {
                exception: function(proxy, response, operation){
					var message = operation.getError();
					message = Ext.isObject(message)?message["error"]:message;
					Ext.MessageBox.show({
						title: 'ERROR!',
						msg: message,
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK
					});
                }
            }
        }
    })
	, lazyRender: false
	, listClass: 'x-combo-list-small'
	})

	, hideable: false

, filter: {updateBuffer: 1500, type: 'list', dataIndex: "Proyecto", store: Ext.create('Ext.data.Store', {
        fields: ['id', 'text']
        , proxy: {
            type: 'ajax'
            , url: '../Scripts/xmlCatalogOptions.asp'
            , reader: {
                type: 'json'
                , root: 'data'
                , successProperty: 'success'
                , messageProperty: 'message'
                , totalProperty: 'total'
                , idProperty: ''
            }
			, pageParam: 'pageIndex'
			, limitParam: 'pageSize'
			, sortParam: 'sorters'
			, extraParams: {
				catalogName: "dbo.Proyecto"
				, filters: ""
				, dataValue: "RTRIM([Id])"
				, dataText: "RTRIM([Proyecto])"
				, output: 'json'
			
			}
            , listeners: {
                exception: function(proxy, response, operation){
					var message = operation.getError();
					message = Ext.isObject(message)?message["error"]:message;
					Ext.MessageBox.show({
						title: 'ERROR!',
						msg: message,
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK
					});
                }
            }
        }
    })
}
, sortable: true
, dataIndex: "Perfiles.Proyecto"
, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
	//editorStore
	value=Ext.isArray(value)?value[0]:value;
	return Ext.isObject(value)?value["text"]:value;
}
, 
		summaryType: 'count'
		, summaryRenderer: function(value, summaryData, dataIndex) {
		     return ((value === 0 || value > 1) ? '(' + value + ' elementos)' : '(1 elemento)');  
	    }
	
})
return me;
}()
,function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Comentarios"
, displayField: "text"
, displayValue: "value"
, flex:1
, field: {
	xtype: 'textfield'
	
	, /*nvarchar*/undefined:null
    }

, filter: {updateBuffer: 1500, undefined:undefined}
, sortable: true
, dataIndex: "Perfiles.Comentarios"
, renderer: function (value, metaData, record, row, col, store, gridView) { 
return Ext.isObject(value)?value[this.displayField]:value 
}
, 
		summaryType: 'count'
		, summaryRenderer: function(value, summaryData, dataIndex) {
		     return ((value === 0 || value > 1) ? '(' + value + ' elementos)' : '(1 elemento)');  
	    }
	
})
return me;
}()
]
	, loadMask: true
	, columnLines: false
	, emptyText: 'No Matching Records'
	, onCheckEvent: function(control, rowIndex, checked, eOpts){return undefined}
	, /*junctionTable*/undefined:null
	, emptyText: 'Perfiles'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Direcciones'
		/*formField*/
		, itemId: "container_ID5YTMYV4M0TXXBD221N3WLR05OI"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EKDAC, fieldName=Direcciones, Column_Name=Direcciones, dataType=foreignTable, relationshipType=hasMany, foreignSchema=dbo, foreignTable=Direcciones, foreignReference=IdEmpleado, headerText=Direcciones, controlType=default, scaffold=true, debug:scaffold=18, foreignTable (default)
	fieldLabel: 'Direcciones'

	, emptyText: 'Sin registros'
	, name: 'Direcciones'
	, itemId: "field_Direcciones_IDCD55UOMBXCAXMKHYU0N0J2Q5MI"
, afterLabelTextTpl: ''/*dt: foreignTable; lw: 100; iw: 306*/
	, width: 306/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
	xtype: 'foreigntable'
	, itemId: "Direcciones"
	, border: false
	, resizable: true
	, multiSelect: true
	, autoScroll: true
	, height: 150, width: 350
	, 
defaults: {
	
	labelWidth: 100
	
}
, layout: {
	type: 'fit'
}
, frame: true

	, dockedItems: [{
		xtype: 'toolbar',
		items: [
{
	iconCls: 'add',
	text: 'Nuevo',
	itemId: 'addButton',
	scope: this,
	handler: function() { 
		var grid = Ext.ComponentQuery.query("#Direcciones")
		grid[0].onAddClick()
		}
}, {
	iconCls: 'remove',
	text: 'Borrar',
	disabled: true,
	itemId: 'deleteButton',
	scope: this,
	handler: function() { 
		var grid = Ext.ComponentQuery.query("#Direcciones")
		grid[0].onDeleteClick()
		}
		
}
]
		}]
	, columns: [function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Direccion"
, displayField: "text"
, displayValue: "value"
, flex:1
, field: {
	xtype: 'textfield'
	
	, /*nvarchar*/undefined:null
    }

	, hideable: false

, filter: {updateBuffer: 1500, undefined:undefined}
, sortable: true
, dataIndex: "Direcciones.Direccion"
, renderer: function (value, metaData, record, row, col, store, gridView) { 
return Ext.isObject(value)?value[this.displayField]:value 
}
, 
		summaryType: 'count'
		, summaryRenderer: function(value, summaryData, dataIndex) {
		     return ((value === 0 || value > 1) ? '(' + value + ' elementos)' : '(1 elemento)');  
	    }
	
})
return me;
}()
]
	

	, onBeforeEdit: function(editor, e, eOpts) {
	}

	, onAddClick: function(){
		var rec = new Demo.es.dbo.Empleado.insert.formView.Demo.es.dbo.Direcciones.insert.gridView(), edit = this.editing, grid=this;
		function removeColumns(element, index, array){ 
			return element.xtype!="actioncolumn";
		}
        edit.cancelEdit();
        this.store.insert(0, rec);
		edit.startEditByPosition({row: 0, column: grid.columns.filter(removeColumns)[0].getIndex()})
        //edit.startEditByPosition({ row: 0, column: 0 });
       
    }
	, /*foreignTable*/undefined:null
	, emptyText: 'Sin registros'
	/*dbconfig*//*dbconfig*/
}
]
	}
]
	
	}

					]
				}]
			}
		]
	}
]
}
]
});
grouptabpanel.items.items[0].width=250; //se tiene que definir así porque no tiene configuración
return grouptabpanel;
}()
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
	