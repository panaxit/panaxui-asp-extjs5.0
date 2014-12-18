
Ext.define('Px.Demo.es.dbo.Perfil.insert.formView', { 
extend: 'Ext.container.Container', 
onDestroy: function() {
	//alert('destroyed form');
},
identity: null,
filters: undefined,
initComponent: function() { 
	var me = this; 
	var store;
	
Ext.define("Demo.es.dbo.Perfil.insert.formView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Id'
    , primaryKeys: 'Id'
    , fields: [{name:'Id',fieldName:'Id',  mapping:'Id', isAlwaysSubmitable: true
, useNull: true
}, {name:'Perfil',fieldName:'Perfil',  mapping:'Perfil["value"]'
, useNull: true
}, {name:'PerfilDelQueDepende',fieldName:'PerfilDelQueDepende',  mapping:'PerfilDelQueDepende["value"]'
, useNull: true
}]
	, validations: []
	
	, associations: [
	{ type: 'hasMany', model: "Demo.es.dbo.Perfil.insert.formView.Demo.es.dbo.Perfiles.insert.gridView", name: "Perfiles",  tableName: 'dbo.Perfiles' ,primaryKey: "IdEmpleado,IdPerfil", identityKey: 'Id', foreignKey: "IdPerfil", associationKey: "Perfiles", reader: { type: 'json', root: 'data' }}]
});

Ext.define("Demo.es.dbo.Perfil.insert.formView.Demo.es.dbo.Perfiles.insert.gridView", {
    extend: 'Ext.data.Model'
    , idProperty: 'Perfiles.Id'
    , primaryKeys: 'IdEmpleado,IdPerfil'
    , fields: [{ name:'checked', type: 'bool', submitValue: false },
{name:'Perfiles.Id',fieldName:'Id',  mapping:'Id'
, useNull: true
}, {name:'Perfiles.IdEmpleado',fieldName:'IdEmpleado',  mapping:'IdEmpleado["value"]', isAlwaysSubmitable: true
, useNull: true
}, {name:'Perfiles.Proyecto',fieldName:'Proyecto',  mapping:'Proyecto["value"]'
, useNull: true
}, {name:'Perfiles.Comentarios',fieldName:'Comentarios',  mapping:'Comentarios["value"]'
, useNull: true
}]
	, validations: []
	
	, belongsTo: "Demo.es.dbo.Perfil.insert.formView"
});


    var store = 
Ext.create('Panax.custom.AjaxStore', {
	autoLoad: true
	, autoSync: true
	, autoDestroy: true
	, pageSize: 1
	, defaultPageSize: 1
	, remoteSort: true
	, model: "Demo.es.dbo.Perfil.insert.formView"
	
	, settings: {
		catalogName: "dbo.Perfil"
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
		xtype: "fieldcontainer", fieldLabel: 'Perfil'
		/*formField*/
		, itemId: "container_IDONNNBDZOBFKKHWLGRLYNK1NL2O"
		
		
, afterLabelTextTpl: '*'
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0EFB, fieldName=Perfil, Column_Name=Perfil, isPrimaryKey=0, isIdentity=0, dataType=nchar, length=25, isNullable=0, supportsInsert=1, supportsUpdate=1, headerText=Perfil, controlType=default, nchar (default)
	fieldLabel: 'Perfil'

	, emptyText: 'Perfil'
	, name: 'Perfil'
	, itemId: "field_Perfil_ID0NSTI4ZI0PZVFL5VNM4KHE3GKN"
, afterLabelTextTpl: '*', required: true
	, cls: 'required '
	, allowBlank: false/*dt: nchar; lw: 100; iw: 175*/
	, width: 175/*25*/
	, maxLength: 25
	, onchange_event: undefined
	, /*default*/
xtype: 'textfield'
, name: 'Perfil'
, value: null
, defaultValue: ''
, enforceMaxLength: true
	

	, /*nchar*/undefined:null
	, emptyText: 'Perfil'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Perfil Del Que Depende'
		/*formField*/
		, itemId: "container_IDQUOVK1LILVZNPWWKSS2MTZ1BSL"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0ERB, fieldName=PerfilDelQueDepende, Column_Name=PerfilDelQueDepende, isPrimaryKey=0, isIdentity=0, dataType=foreignKey, relationshipType=belongsTo, length=10, isNullable=1, supportsInsert=1, supportsUpdate=1, scaffold=true, headerText=Perfil Del Que Depende, controlType=default, foreignKey (default)
	fieldLabel: 'Perfil Del Que Depende'

	, emptyText: 'Perfil Del Que Depende'
	, name: 'PerfilDelQueDepende'
	, itemId: "field_PerfilDelQueDepende_IDZ3A0S0LLZ4NSEQMISUTTTYHT0I"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: 300*/
	, width: 300/*10*/
	, onchange_event: undefined
	, /*default*/
	xtype: "cascadeddropdown"
	, layout: 'anchor'
	, defaults: { hideLabel: true, anchor: 'none', flex: 0, undefined:null }
	, width: 300
	, items: [
{ //fieldId=ID0E6B, fieldName=PerfilDelQueDepende, sortOrder=0, text=- -, foreignKey=PerfilDelQueDepende, referencesItself=true, dataText=RTRIM([Perfil]), dataValue=RTRIM([Id]), primaryKey=Id, headerText=Perfil, Table_Schema=dbo, Schema=dbo, Table_Name=Perfil, Name=Perfil, controlType=default, supportsInsert=1, supportsUpdate=1, supportsDelete=1, filtersBehavior=append,  (default)
	fieldLabel: 'Perfil'

	, emptyText: 'Perfil Del Que Depende'
	, name: 'PerfilDelQueDepende'
	, itemId: "field_Perfil_IDMBQLCCWYYF4UM1D13W00BNYFKI"
, afterLabelTextTpl: ''/*dt: foreignKey; lw: 100; iw: 550*/
	, height: 150, width: 550/*10*/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
	xtype: "customtreepanel"
	,store: Ext.create('Panax.data.TreeStore', {})
	,width: 500
	,height: 300
	,itemId: "PerfilDelQueDepende"
	,hideHeaders: true
	,collapsible: false
    ,useArrows: true
    ,rootVisible: false
	,resizable: true
	,singleExpand: true
	,multiSelect: true
	,autoScroll: true
	, height: 150, width: 550
	,maxSelections: 1
	,minSelections: undefined
	,columns: [
		function () { 
		var me = Ext.create('Ext.tree.Column', {
            header: "Perfil", 
			flex: 2,
            sortable: true,
            displayValue: 'value',
			displayField: 'text',
            dataIndex: 'text'
			, renderer: function(value, metaData, record, rowIndex, colIndex, store, view){ 
				return Ext.isObject(value)?value[me.displayField]:value 
			}
		});
		return me;
		}()
		]
	, loadMask: true
	, columnLines: false
	, emptyText: 'No Matching Records'
	, onCheckEvent: function(control, rowIndex, checked, eOpts){return undefined}
	, /**/undefined:null
	, emptyText: 'Perfil Del Que Depende'
	/*dbconfig*//*dbconfig*/
}
]

	, /*foreignKey*/undefined:null
	, emptyText: 'Perfil Del Que Depende'
	/*dbconfig*//*dbconfig*/
}
]
	}
,/**/{
		xtype: "fieldcontainer", fieldLabel: 'Perfiles'
		/*formField*/
		, itemId: "container_IDSWDACWPZR4ROGZBTZHVYXDFOVE"
		
		
, afterLabelTextTpl: ''
	    , labelWidth: 100
		, layout: 'hbox'
		, width: "100%"	
		, defaults: { labelAlign:'right', hideLabel: true, anchor: 'none', flex: 0, undefined:null}
		, undefined:null
		, undefined:null
		, items: [
{ //fieldId=ID0E4C, fieldName=Perfiles, Column_Name=Perfiles, dataType=junctionTable, relationshipType=hasMany, foreignSchema=dbo, foreignTable=Perfiles, foreignReference=IdPerfil, headerText=Perfiles, controlType=default, junctionTable (default)
	fieldLabel: 'Perfiles'

	, emptyText: 'Perfiles'
	, name: 'Perfiles'
	, itemId: "field_Perfiles_IDLYLMTRV1XP1MLKKZJRIZWR5UIB"
, afterLabelTextTpl: ''/*dt: junctionTable; lw: 100; iw: 550*/
	, height: 150, width: 550/**/
	, maxLength: NaN
	, onchange_event: undefined
	, /*default*/
	xtype: 'gridpanel'
	, border: false,
	frame: true,
	itemId: "Perfiles",
	
	hideHeaders: false,
	multiSelect: true,
	
	rootVisible: false,
	resizable: true,
	singleExpand: true,
	autoScroll: true
	, height: 150, width: 550
	,/*table*/undefined:null
	,maxSelections: undefined
	,minSelections: undefined
	,columns: [ {
            xtype: 'checkcolumn',
            dataIndex: 'checked',
            width: 55,
            stopSelection: false,
			listeners: {
				beforecheckchange: function( control, rowIndex, checked, eOpts) {
					var grid=control.up('grid')
					var c=checked?1:-1;
					Ext.Array.each((grid.getStore().data.items || []), function(record) {
						if (record.get('checked')) {
							++c
						}
					})
 
					if (c>grid.maxSelections && checked) {
						alert("Sólo se pueden seleccionar "+grid.maxSelections+" opciones");
						checked=false;
					}

				if (grid.onCheckEvent) grid.onCheckEvent(control, rowIndex, checked, eOpts)
				}
			}
        }, {
		
        header: "Empleado", 
		flex: 1, 
		readOnly: true,
		valueField: 'id',
		displayField: 'text',
		dataIndex: "Perfiles.IdEmpleado",
		renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
			var value=Ext.isArray(value)?value[0]:value;
			return (Ext.isObject(value)?value.text:value)
		
		}
	}, function () { 
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
],
	plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit:1,
			listeners: {
				 
				beforeedit: function(editor, e, eOpts) {
					if (e.record.raw && e.record.raw.readOnly) {
						return false;
					}
					var edit = this.onBeforeEdit && this.onBeforeEdit(editor, e, eOpts)
					if (edit==false) return false;
				}
				
			}
		})]
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
				var newRecord = dbo.Perfil.load(currentRecord
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
	