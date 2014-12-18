
Ext.define('Px.Demo.es.dbo.Empleado.readonly.gridView', { 
extend: 'Ext.container.Container'

, filters: ""
, showDockPanel: true
, showDetailsButton: true
, showAddButton: true
, showDeleteButton: true
, showPagingToolbar: true
, pageSize: 0
, initComponent: function() { 
	var me = this; 
	
	
Ext.define("Demo.es.dbo.Empleado.readonly.gridView", {
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

	var win;
    var url = {
        local:  'localData',//'temp_data.js',  // static data file
        remote: '../templates/request.asp'
    };

    // configure whether filter query is encoded or not (initially)
    var encode = false;
    
    // configure whether filtering is performed locally or remotely (initially)
    var local = false;
	showSummary = false;

	var editAction = Ext.create('Ext.Action', {
        icon: '../../../../resources/extjs/extjs-current/examples/simple-tasks/resources/images/edit_task.png'
        , text: 'Editar registro'
        , disabled: false
        , handler: function(widget, event) {
            var record = grid.normalGrid.getView().getSelectionModel().getSelection()[0]
            if (record) {
                var win = Ext.create('widget.window', {
					title: 'Editar registro'
					, itemId: 'modalWindow'
					, modal: true
					, closable: true
					//, closeAction: 'hide'
					, width: 800
					, minWidth: 350
					, height: 600
					, layout: {
						type: 'fit'
						, padding: 5
					}
				});
				var container=win;
				//win.animateTarget=widget.getEl();
        
				win.show();
				//var myMask = new Ext.LoadMask(container, {msg:"Cargando..."});
				//myMask.show();
				var instance={
					catalogName: 'dbo.Empleado',
					mode:'edit'
				}
		
				var content = Panax.getInstance(instance, {identity: record.getId()});
				if (content) {
 
					if (container.items.length>0) { 
						container.remove(0);
					}

					container.add(content);
				}
				//content.loadRecord(record.getId());
				//myMask.hide();


            }
        }
    });

	var detailsAction = Ext.create('Ext.Action', {
        icon: '../../../../resources/extjs/extjs-current/examples/simple-tasks/resources/images/edit_task.png'
        , text: 'Ver registro'
        , disabled: false
        , handler: function(widget, event) {
            var record = grid.normalGrid.getView().getSelectionModel().getSelection()[0]
            if (record) {
                var win = Ext.create('widget.window', {
					title: 'Ficha'
					, itemId: 'modalWindow'
					, modal: true
					, closable: true
					//, closeAction: 'hide'
					, width: 800
					, minWidth: 350
					, height: 600
					, layout: {
						type: 'fit'
						, padding: 5
					}
				});
				var container=win;
				//win.animateTarget=widget.getEl();
        
				win.show();
				//var myMask = new Ext.LoadMask(container, {msg:"Cargando..."});
				//myMask.show();
				var instance={
					catalogName: 'dbo.Empleado',
					mode:'readonly',
					controlType: 'formView'
				}
		
				var content = Panax.getInstance(instance, {identity: record.getId()});
				if (content) {
 
					if (container.items.length>0) { 
						container.remove(0);
					}

					container.add(content);
				}
				//content.loadRecord(record.getId());
				//myMask.hide();


            }
        }
    });

    var contextMenu = Ext.create('Ext.menu.Menu', {
        items: [detailsAction, editAction]
    });
	
    var ajaxStore = Ext.create('Panax.custom.AjaxStore', {
        autoLoad: true
        , autoSync: true
        , autoDestroy: true
        , pageSize: me.pageSize
        , defaultPageSize: 0
        , remoteSort: true
        , model: "Demo.es.dbo.Empleado.readonly.gridView"
		
        , settings: {
			catalogName: "dbo.Empleado"
			//, filters: !me.identity?"0=0":"[Id]="+me.identity
			, identityKey: "Id"
			, primaryKey: "Id"
			, mode: "readonly"
			, filters: this.filters
			, lang: "es"
		}
		, listeners: {
 
			beforeload: function(store, operation, eOpts){
				var view = grid.normalGrid;
/* 				if (view && !view.waitingMessage) {
					view.waitingMessage = new Ext.LoadMask(view, {msg:"Cargando..."});
					view.waitingMessage.show();
				}*/
				if (grid.lockedGrid) grid.lockedGrid.mask()
			}
			, remove: function(store, record, index, eOpts){
				var view = grid.normalGrid;
				/*if (view && !view.waitingMessage) {
					view.waitingMessage = new Ext.LoadMask(view, {msg:"Eliminando..."});
					view.waitingMessage.show();
				}*/
				if (grid.lockedGrid) grid.lockedGrid.mask()
			}
			, load: function(store, records, successful, eOpts){
				var view = grid.normalGrid;
				if (grid.lockedGrid) grid.lockedGrid.unmask()
				/*if (view && view.waitingMessage) { view.waitingMessage.hide(); view.waitingMessage = undefined;}*/
			}
			, refresh: function(store, eOpts){
				var view = grid.normalGrid;
				if (grid.lockedGrid) grid.lockedGrid.unmask()
				/*if (view && view.waitingMessage) { view.waitingMessage.hide(); view.waitingMessage = undefined;}*/
			}
			, datachanged: function(store, eOpts) {
				var disableInsert = Boolean(store.proxy.reader.metaData.disableInsert);
				disableInsert = (disableInsert===false?false:(disableInsert || true));
				if (me.showAddButton && store.proxy.reader.metaData.supportsInsert!==undefined && !disableInsert) {
					grid.down('#insertButton').show();
				}
				grid.down('#insertButton').setDisabled(disableInsert);
			}

		}
    });

	


    var filters = {
        ftype: 'filters'
        // encode and local configuration options defined previously for easier reuse
        , encode: encode // json encode the filter query
        , local: local   // defaults to false (remote filtering)
		, menuFilterText: "Filtros"
    };

 
   //The following functions are used to get the sorting data from the toolbar and apply it to the store
    /**
     * Tells the store to sort itself according to our sort data
     */
    function doSort() {
        ajaxStore.sort(getSorters());
    }

    /**
     * Callback handler used when a sorter button is clicked or reordered
     * @param {Ext.Button} button The button that was clicked
     * @param {Boolean} changeDirection True to change direction (default). Set to false for reorder
     * operations as we wish to preserve ordering there
     */
    function changeSortDirection(button, changeDirection) {
        var sortData = button.sortData
		, iconCls  = button.iconCls;
        
        if (sortData) {
            if (changeDirection !== false) {
                button.sortData.direction = Ext.String.toggle(button.sortData.direction, "ASC", "DESC");
                button.setIconCls(Ext.String.toggle(iconCls, "sort-asc", "sort-desc"));
            }
            ajaxStore.clearFilter();
            doSort();
        }
    }

    /**
     * Returns an array of sortData from the sorter buttons
     * @return {Array} Ordered sort data from each of the sorter buttons
     */
    function getSorters() {
        var sorters = [];
 
        Ext.each(tbar.query('button'), function(button) {
            sorters.push(button.sortData);
        }, this);

        return sorters;
    }

    /**
     * Convenience function for creating Toolbar Buttons that are tied to sorters
     * @param {Object} config Optional config object
     * @return {Object} The new Button configuration
     */
    function createSorterButtonConfig(config) {
        config = config || {};
        Ext.applyIf(config, {
            xtype: 'button'
            , listeners: {
                click: function(button, e) {
                    changeSortDirection(button, true);
                }
            }
            , iconCls: 'sort-' + config.sortData.direction.toLowerCase()
            , reorderable: true
        });
        return config;
    }

    var reorderer = Ext.create('Ext.ux.BoxReorderer', {
        listeners: {
            scope: this
            , Drop: function(r, c, button) { //update sort direction when button is dropped
                changeSortDirection(button, false);
            }
        }
    });

    var droppable = Ext.create('Ext.ux.ToolbarDroppable', {
        /**
         * Creates the new toolbar item from the drop event
         */
        createItem: function(data) {
            var header = data.header
			, headerCt = header.ownerCt
			, reorderer = headerCt.reorderer;
            
            // Hide the drop indicators of the standard HeaderDropZone
            // in case user had a pending valid drop in 
            if (reorderer) {
                reorderer.dropZone.invalidateDrop();
            }

            return createSorterButtonConfig({
                text: header.text
                , sortData: {
                    property: header.dataIndex
                    , direction: "ASC"
                }
            });
        }
		
        /**
         * Custom canDrop implementation which returns true if a column can be added to the toolbar
         * @param {Object} data Arbitrary data from the drag source. For a HeaderContainer, it will
         * contain a header property which is the Header being dragged.
         * @return {Boolean} True if the drop is allowed
         */
        , canDrop: function(dragSource, event, data) {
            var sorters = getSorters()
			, header  = data.header
			, length = sorters.length
			, entryIndex = this.calculateEntryIndex(event)
			, targetItem = this.toolbar.getComponent(entryIndex)
			, i;

            // Group columns have no dataIndex and therefore cannot be sorted
            // If target isn't reorderable it could not be replaced
            if (!header.dataIndex || (targetItem && targetItem.reorderable === false)) {
                return false;
            }

            for (i = 0; i < length; i++) {
                if (sorters[i].property == header.dataIndex) {
                    return false;
                }
            }
            return true;
        }
		
        , afterLayout: doSort
    });



    // use a factory method to reduce code while demonstrating
    // that the GridFilter plugin may be configured with or without
    // the filter types (the filters may be specified on the column model
    var createColumns = function (finish, start) {
        var columns = [{
            xtype: 'actioncolumn'
            , text: ''
            , width: 40
            
			, tooltip: 'Editar'
            , align: 'center'
			, locked: false
			, hideable: false
			, hidden: !me.showDetailsButton
            , icon: '../../../../resources/extjs/extjs-current/examples/simple-tasks/resources/images/edit_task.png'
            , handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
				var win = Ext.create('widget.window', {
					title: 'Editar registro'
					, itemId: 'modalWindow'
					, modal: true
					, closable: true
					//, closeAction: 'hide'
					, width: 1000
					, minWidth: 350
					, height: 600
					, opener: record
					, layout: {
						type: 'fit'
						, padding: 5
					}
				});
				var instance={
					dbId: 'Demo'
					,catalogName: 'dbo.Empleado'
					,lang: 'es'
					,mode:'edit'
				}
		
				var content = Panax.getInstance(instance, {identity: record.getId()});
				if (content) {
					var container=win;
 
					if (container.items.length>0) { 
						container.remove(0);
					}

					container.add(content);
					container.show();
					container.animateTarget=row; // La animación tiene que hacerse después de que se abre, de lo contrario la máscara de "cargando" no se muestra correctamente. TODO: Corregir
					//var myMask = new Ext.LoadMask(container, {msg:"Cargando..."});
					//myMask.show();
					//myMask.hide();
				}
				else {
					//Ext.Msg.alert("Mensaje del servidor", "No se pudo recuperar el módulo");
				}

            }
        },function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Nombre"
, displayField: "text"
, displayValue: "value"

, field: {
	xtype: 'textfield'
	
	, /*nvarchar*/undefined:null
    }
, locked:false 
	, hideable: false

, filter: {updateBuffer: 1500, undefined:undefined}
, sortable: true
, dataIndex: "Nombre"
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
,function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Primer Apellido"
, displayField: "text"
, displayValue: "value"

, field: {
	xtype: 'textfield'
	
	, /*nvarchar*/undefined:null
    }

, filter: {updateBuffer: 1500, undefined:undefined}
, sortable: true
, dataIndex: "PrimerApellido"
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
,function () { 
var me = Ext.create('Ext.grid.column.Column', {
header: "Fecha Ingreso"
, displayField: "text"
, displayValue: "value"

, field: {
	xtype: 'datefield'
	 , format: 'd/m/Y' 
	, /*date*/undefined:null
    }

, filter: {updateBuffer: 1500, menuItems : ['after', 'before', '-', 'on'], dateFormat: 'd/m/Y', beforeText: 'Antes de', afterText: 'Despues de', onText: 'Dia especifico'}
, sortable: true
, dataIndex: "FechaIngreso"
, renderer: Ext.util.Format.dateRenderer('d/m/Y')
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
header: "Ingreso Mensual"
, displayField: "text"
, displayValue: "value"
, flex:1
, field: {
	xtype: 'textfield'
	
	, /*money*/undefined:null
    }

, filter: {updateBuffer: 1500, undefined:undefined}
, sortable: true
, dataIndex: "IngresoMensual"
, renderer: 
function(value) {return value!=null? Ext.util.Format.usMoney(value) : null;}

, 
		summaryType: 'count'
		, summaryRenderer: function(value, summaryData, dataIndex) {
		     return ((value === 0 || value > 1) ? '(' + value + ' elementos)' : '(1 elemento)');  
	    }
	
})
return me;
}()

		];
        return columns.slice(start || 0, finish);
    };
    
    //create the toolbar with the 2 plugins
    var tbar = Ext.create('Ext.toolbar.Toolbar', {
        hidden:!me.showDockPanel
        , items  : [{
			xtype: 'tbtext'
            , text: 'Ordenar por:'
            , reorderable: false
        } ]
        , plugins: [reorderer, droppable]
    });

    var grid = Ext.create('Ext.grid.Panel', {
		tbar: tbar
        , border: false
        , store: ajaxStore
        , columns: createColumns()
        , loadMask: true
        , columnLines: true
        , loadMask: true
        , emptyText: 'No Matching Records'
	    , selModel: Ext.create('Ext.selection.RowModel', {
	        listeners: {
	            selectionchange: function(sm, selections) {
	                grid.down('#removeButton').setDisabled(selections.length == 0);
	            }
	        }
	    })
        , viewConfig: { 
			stripeRows: true, 
			listeners: {
				itemcontextmenu: function(view, rec, node, index, e) {
					e.stopEvent();
					contextMenu.showAt(e.getXY());
					return false;
				}
			}
		}
		
        , features: [filters, {
            id: 'group'
            , ftype: 'groupingsummary'
            , groupHeaderTpl: "Grupo: {name}" 
            , hideGroupedHeader: false
            , enableGroupingMenu: false
			, showSummaryRow: showSummary
        }]
        , listeners: {
            scope: this
            // wait for the first layout to access the headerCt (we only want this once):
            , single: true
            // tell the toolbar's droppable plugin that it accepts items from the columns' dragdrop group
            , afterlayout: function(grid) {
                
            } 
			, beforeedit: function (e) { 
				alert("disabled?")
				if (e.record.get('disabled')) { return false; }
			}
        }
        , dockedItems: [
		{
            xtype: 'toolbar'
			, hidden: !me.showDockPanel
            , items: [{
                itemId: 'insertButton'
				, hidden: true
				, disabled: true
                , text:'Nuevo Registro'
                , tooltip:'Agregar nuevo registro'
                , iconCls:'add'
                , handler: function() {
					var win = Ext.create('widget.window', {
						title: 'Nuevo registro'
						, itemId: 'modalWindow'
						, modal: true
						, closable: true
						//, closeAction: 'hide'
						, width: 800
						, minWidth: 350
						, height: 600
						, opener: grid
						, layout: {
							type: 'fit'
							, padding: 5
						}
					});
					
					var instance={
						catalogName: 'dbo.Empleado',
						mode:'insert'
					}
					var content = Panax.getInstance(instance);
					if (content) {
						win.animateTarget=this.getEl();
						var container=win;
 
						if (container.items.length>0) { 
							container.remove(0);
						}

						container.add(content);
						win.show();	
						//content.loadRecord(null);
					} else {
						//Ext.Msg.alert('Mensaje del sistema', 'No se pudo abrir')
					}


				}
            }, '-', {
                text:'Opciones'
                , tooltip:'Escoger otras opciones'
                , iconCls:'option'
                
				, menu: {
					items: [{
							text: 'Limpiar filtros'
							, handler: function () {
								grid.normalGrid.filters.clearFilters();
							} 
						}
					]
				}
            },'-',{
                itemId: 'removeButton'
				, hidden: !me.showDeleteButton
                , text:'Eliminar'
                , tooltip:'Eliminar elementos seleccionados'
                , iconCls:'remove'
                , disabled: true
                , handler: function() { 
					grid.onDeleteClick() 
				}
            }]
        }, 
		Ext.create('Ext.PagingToolbar', {
            dock: 'bottom'
            , store: ajaxStore
			, displayInfo: true
            , plugins: Ext.create('Ext.ux.ProgressBarPager', {})
			, hidden: !this.showPagingToolbar
        })]
        , emptyText: 'No se encontraron coincidencias'
		
		, onSync: function(){
			this.store.sync();
		}
		
		, onDeleteClick: function(){
			var selection = this.normalGrid.getView().getSelectionModel().getSelection()[0];
			var store = this.store;
			if (selection) {
				Ext.MessageBox.confirm('BORRAR FORMULARIO', 'Confirma que desea borrar el registro?', function(result){
					if (result=="yes") store.remove(selection);
					//selection.set('forDeletion', true);
				});
			}
		}
		
		, onAddClick: function(){
			alert('add')
			
		}
    });

    
		Ext.apply(me, { 
			layout: 'fit',
			items: [grid]
		});
		me.grid = grid;
		me.callParent(arguments); 
	}
})

