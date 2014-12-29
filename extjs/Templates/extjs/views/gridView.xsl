<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:px="urn:panax"
    xmlns:str="http://exslt.org/strings"
	xmlns="http://www.w3.org/TR/xhtml1/strict"
	exclude-result-prefixes="px">
	<xsl:strip-space elements="*"/>

	<xsl:template match="*[@controlType='gridView' or @controlType='cardView']" mode="Viewcontroller">
		/**
		 * 
		 * [ViewController]: GridView
		 * 
		 */
		Ext.define('Panax.viewcontroller.<xsl:apply-templates select="." mode="modelName"/>', {
		    extend: 'Ext.app.ViewController',
		    alias: 'controller.<xsl:apply-templates select="." mode="modelName"/>',

		    /**
		     * Show formView window for record
		     * @param  {Object} record Selected record
		     */
		    createPanaxWindow: function(record) {
       			var panaxCmp;

				panaxCmp = Panax.getPanaxComponent({
					prefix: "Cache.app",
					dbId: "<xsl:value-of select="@dbId "/>",
					lang: "<xsl:value-of select="@xml:lang "/>",
					catalogName: "<xsl:value-of select="@Table_Schema "/>.<xsl:value-of select="@Table_Name "/>",
					mode: ("<xsl:value-of select="@mode "/>" === "readonly") ? "readonly" : (record ? "edit" : "insert"),
					controlType: "formView"
				}, {
					idValue: record ? record.id : null
				});

				Ext.suspendLayouts();

				this.panaxWindow = new Panax.view.PanaxWindow({
					title: ("<xsl:value-of select="@mode "/>" === "readonly") ? "Ver" : (record ? "Editar" : "Nuevo"),
					items: [panaxCmp]
				});

	           	this.panaxWindow.show();

	           	Ext.resumeLayouts(true);
		    },

		    /**
		     * Edit record
		     * @param  {Object} button Clicked button
		     */
			onEditRecordClick: function(button) {
				var record = button.dataViewRecord ? button.dataViewRecord : button.getWidgetRecord();
				this.createPanaxWindow(record);
			},

			/**
			 * Add record
			 */
		    onAddRecordClick: function() {
		   		this.createPanaxWindow(null);
		    },

		    /**
		     * Remove record
		     */
		    onRemoveRecordClick: function() {
				var panaxformGrid = this.getView(),
					selection = panaxformGrid.getSelectionModel().getSelection()[0];

				selection.drop();
		    },

		    /**
		     * Refresh store
		     */
			onRefreshClick: function() {
				var panaxformGrid = this.getView(),
					store = panaxformGrid.getStore();

				store.reload();
			},

			/**
			 * Clear filters
			 */
		    onClearFiltersClick: function () {
		        // The "filters" property is added to the grid by gridfilters plugin
		        this.getView().filters.clearFilters();
		    },

		    /**
		     * Toggle summaries
		     * @param  {Object} widget Object that fired the event
		     * @param  {[type]} opts   [description]
		     */
		    onToggleSummary: function(item, e) {
		    	var grid = this.getView(),
		    		summaryBar = grid.getDockedItems('component[itemId=summaryBar]')[0];

		    	if(item.summaryType) {
		    		grid.viewConfig.showSummary = true;
		    		summaryBar.setVisible(true);
		    	} else {
		    		grid.viewConfig.showSummary = false;
		    		summaryBar.setVisible(false);
		    	}
		    },

		    /**
		     * Init
		     */
            init: function() {
            	/*
            	Temporary FIX:
            	http://www.sencha.com/forum/showthread.php?289447-Binding-a-store-to-a-pagingtoolbar-does-not-work
            	 */
<!--             	var pagingTbar = this.lookupReference('pagingtoolbar');
            	if(pagingTbar) {
            		pagingTbar.setStore(this.getStore('panax_record'));
            	} -->
            }
		});
	</xsl:template>

	<xsl:template match="*[@controlType='gridView' or @controlType='cardView']" mode="Viewmodel">		
	    stores: {
	    	panax_record: {
	    		model: '<xsl:apply-templates select="." mode="modelName"/>',
	    		autoLoad: false,
	    		autoSync: false,
	    		autoDestroy: true,
	    		session: true,
	    		pageSize: 10,
	    		remoteFilter: true
	    	}
	    }
	</xsl:template>

	<xsl:template match="*[@controlType='gridView' and @mode!='filters']" mode="PanaxPanel.MainControl">
	{
        xtype: 'panaxgrid',
        flex: 1,
	    controller: '<xsl:apply-templates select="." mode="modelName"/>',
        bind: '{panax_record<xsl:apply-templates select="." mode="storeBind"/>}',
        columns: [
        	<xsl:if test="@mode!='readonly'">
	        {
	            xtype: 'widgetcolumn',
	            width: 44,
	            widget: {
	                xtype: 'button',
	                <xsl:choose>
		                <xsl:when test="/*[1]/@mode='readonly' or @mode='readonly'">
		                    glyph: 105, //Readonly
		                </xsl:when>
		                <xsl:otherwise>
		                    glyph: 47, //Edit
		                </xsl:otherwise>
	                </xsl:choose>
	                handler: 'onEditRecordClick'
	            }
	        },
		    </xsl:if>
		    <!-- ToDo: Columns order based on px:layout, not px:fields -->
 			<xsl:apply-templates select="px:fields/*[@dataType!='junctionTable' and @dataType!='foreignTable' and @isIdentity!=1]" mode="gridView.column"/>
        ],

        viewConfig: {
			showPagingToolbar: true
			//, pagingToolbarStore: '{panax_record<xsl:apply-templates select="." mode="storeBind"/>}'
			, showSummary: false
			<xsl:if test="/*[1]/@mode='readonly' or @mode='readonly'">
				, isReadonly: true
			</xsl:if>
        }

	}
	</xsl:template>

</xsl:stylesheet>