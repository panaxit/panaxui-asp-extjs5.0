
Ext.define('Px.Demo.es.dbo.Empleado.edit.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Empleado.edit.formView", {
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
}, {name:'FechaIngreso',fieldName:'FechaIngreso',  mapping:'FechaIngreso["value"]', type: 'date', dateFormat: 'd/m/Y'
, useNull: true
}, {name:'IngresoMensual',fieldName:'IngresoMensual',  mapping:'IngresoMensual["value"]', type: 'float', minValue: 0
, useNull: true
}, {name:'IdSexo',fieldName:'IdSexo',  mapping:'IdSexo["value"]'
, useNull: true
}]
	, validations: []
	
	, associations: [
	{ type: 'hasMany', model: "Demo.es.dbo.Empleado.edit.formView.Demo.es.dbo.Perfiles.edit.gridView", name: "Perfiles",  tableName: 'dbo.Perfiles' ,primaryKey: "IdEmpleado,IdPerfil", identityKey: 'Id', foreignKey: "IdEmpleado", associationKey: "Perfiles", reader: { type: 'json', root: 'data' }}]
});

Ext.define("Demo.es.dbo.Empleado.edit.formView.Demo.es.dbo.Perfiles.edit.gridView", {
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
	
	, belongsTo: "Demo.es.dbo.Empleado.edit.formView"
});


    var store = 
Ext.create('Panax.custom.AjaxStore', {
	autoLoad: true
	, autoSync: true
	, autoDestroy: true
	, pageSize: 1
	, defaultPageSize: 1
	, remoteSort: true
	, model: "Demo.es.dbo.Empleado.edit.formView"
	
	, settings: {
		catalogName: "dbo.Empleado"
		, filters: me.filters?me.filters:(!me.identity?"0=0":"[Id]="+me.identity)
		, identityKey: "Id"
		, primaryKey: "Id"
		, mode: "edit"
		, lang: "es"
	}
	, undefined:undefined
	
})

	
	me.formView = Ext.create('Panax.Form', {
		store: store
		, mode: 'edit'
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
	,items: [{
	xtype:'fieldset'
	, title: 'Generales'
	, itemId: "container_IDYXTW4ZG0KQKSNQK2NRKLDZHTEO"
	, defaultType: 'textfield'
	, layout: 'anchor'
	, defaults: { anchor:'none', undefined:null }
	, undefined:null
	, items: [/**/{
		xtype: "fieldcontainer", fieldLabel: 'Nombre'
		/*formField*/
		, itemId: "container_IDXVUO4H0ANTQ1IN3RDG3OVQJEVC"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFB, fieldName=Nombre, Column_Name=Nombre, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=30, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Nombre, controlType=default, debug:fieldSet=8, nvarchar (default)
	fieldLabel: 'Nombre'

	, emptyText: 'Nombre'
	, name: 'Nombre'
	, itemId: "field_Nombre_ID4XAMQN1VBVARPVCCRWWHTAFR3C"
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
		, itemId: "container_IDRBMZYENIZMLKJFKLYLFMIZ2XMG"
		, fieldLabel: 'Apellidos'
		
, afterLabelTextTpl: '*'
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		
		, defaults: { hideEmptyLabel:false, hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, items: [
{ //fieldId=ID0ETB, fieldName=PrimerApellido, Column_Name=PrimerApellido, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Primer Apellido, controlType=default, fieldContainer.Orientation=horizontal, debug:fieldContainer.Orientation=9, debug:fieldContainer=10, nvarchar (default)
	fieldLabel: 'Primer Apellido'

	, emptyText: 'Primer Apellido'
	, name: 'PrimerApellido'
	, itemId: "field_PrimerApellido_IDZ3A0S0LLZ4NSEQMISUTTTYHT0I"
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
{ //fieldId=ID0EDC, fieldName=SegundoApellido, Column_Name=SegundoApellido, isPrimaryKey=0, isIdentity=0, dataType=nvarchar, length=50, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Segundo Apellido, controlType=default, debug:fieldContainer=11, nvarchar (default)
	fieldLabel: 'Segundo Apellido'

	, emptyText: 'Segundo Apellido'
	, name: 'SegundoApellido'
	, itemId: "field_SegundoApellido_IDP4CTKODL01WWNATAAELG2F1LVF"
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
		xtype: "fieldcontainer", fieldLabel: 'Fecha Ingreso'
		/*formField*/
		, itemId: "container_IDLT1KVR41TAMDD5BBO3BQNIAMBG"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0ERC, fieldName=FechaIngreso, Column_Name=FechaIngreso, isPrimaryKey=0, isIdentity=0, dataType=date, isNullable=0, supportsInsert=1, supportsUpdate=1, defaultValue=(getdate()), headerText=Fecha Ingreso, controlType=default, date (default)
	fieldLabel: 'Fecha Ingreso'

	, emptyText: 'Fecha Ingreso'
	, name: 'FechaIngreso'
	, itemId: "field_FechaIngreso_IDESGSV3OEQQKZCEZDHZKCYZMCBG"
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
		, itemId: "container_IDXEUHN5WME000G3ZYYR22SQUCFL"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0E4C, fieldName=IngresoMensual, Column_Name=IngresoMensual, isPrimaryKey=0, isIdentity=0, dataType=money, length=15, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Ingreso Mensual, controlType=default, money (default)
	fieldLabel: 'Ingreso Mensual'

	, emptyText: 'Ingreso Mensual'
	, name: 'IngresoMensual'
	, itemId: "field_IngresoMensual_IDE4RQEYRNJZXRNC1NYWWE1VFVL"
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
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Sexo'
		/*formField*/
		, itemId: "container_IDFKGBOI04D5R2PTY1Y1M4SWQFFM"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EJD, fieldName=IdSexo, Column_Name=IdSexo, isPrimaryKey=0, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=1, supportsInsert=1, supportsUpdate=1, headerText=Sexo, controlType=radiogroup, debug:controlType=7, foreignKey (radiogroup)
	fieldLabel: 'Sexo'

	, emptyText: 'Sexo'
	, name: 'IdSexo'
	, itemId: "field_IdSexo_ID2AFHIQKQZLCQJKAEXS4LTM230D"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: */
	
	, onchange_event: undefined
	, /*radiogroup*/
xtype: 'radiogroup'
, itemId: 'input_IdSexo_ID2AFHIQKQZLCQJKAEXS4LTM230D'
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
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Perfiles'
		/*formField*/
		, itemId: "container_IDMBCJ1YMEVNLHDATZVUYX4ETYJO"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EEE, fieldName=Perfiles, Column_Name=Perfiles, dataType=junctionTable, relationshipType=hasMany, foreignSchema=dbo, foreignTable=Perfiles, foreignReference=IdEmpleado, scaffold=true, headerText=Perfiles, controlType=default, junctionTable (default)
	fieldLabel: 'Perfiles'

	, emptyText: 'Perfiles'
	, name: 'Perfiles'
	, itemId: "field_Perfiles_IDV1A5ZG4QL03QDZXXUIFUKC20UI"
, afterLabelTextTpl: ''/*dt: junctionTable; lw: 100; iw: 550*/
	, height: 150, width: 550/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
	xtype: "customtreepanel"
	,store: Ext.create('Panax.data.TreeStore', {model: 'Demo.es.dbo.Empleado.edit.formView.Demo.es.dbo.Perfiles.edit.gridView'})
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
	