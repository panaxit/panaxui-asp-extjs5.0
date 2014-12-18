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


Ext.define('Ext.data.Model', {
	override: 'Ext.data.Model',
	
	constructor: function (config) {
		this.callParent(arguments);
	}
	
    , setErased: function() {
        this.erased = true;
		this.dirty = false;
		this.dropped = false;
        this.callJoined('afterErase');
    }
});

Ext.define('Ext.form.Basic', {
	override: 'Ext.form.Basic',
	
	constructor: function (config) {
		this.callParent(arguments);
	}
	
	,  getFields: function() { // Este override se hizo porque el componente ValidationStatus marcaba error si el formulario ya había sido destruído.
        return this.monitor?this.monitor.getItems():new Ext.util.MixedCollection();
    }
});

// Ext.define('Ext.data.Session', {
	// override: 'Ext.data.Session'
	
	// ,constructor: function (config) {
		// this.callParent(arguments);
	// }
	
	// ,onIdChanged: function (record, oldId, newId) {
		// var me = this,
			// entityName = record.entityName,
			// id = record.id,
			// bucket = me.data[entityName],
			// entry = bucket[oldId],
			// associations = record.associations,
			// refs = entry.refs,
			// setNoRefs = me._setNoRefs,
			// association, fieldName, matrix, refId, role, roleName, roleRefs, store;

		// if (bucket[newId]) {
			// Ext.Error.raise('Cannot change ' + entityName + ' id from ' + oldId +
							// ' to ' + newId + ' id already exists');
		// }

		// delete bucket[oldId];
		// bucket[newId] = entry;

		// for (roleName in associations) {
			// role = associations[roleName];
			// if (role.isMany) {
				// store = role.getAssociatedItem(record);
				// if (store) {
					// matrix = store.matrix;
					// if (matrix) {
						// matrix.changeId(newId);
					// }
				// }
			// }
		// }

		// if (refs) {
			// for (roleName in refs) {
				// roleRefs = refs[roleName];
				// role = associations[roleName];
				// association = role.association;

				// if (association.isManyToMany) {
					
				// } else {
					// fieldName = association.field.name;

					// for (refId in roleRefs) {
						// roleRefs[refId].set(fieldName, id, setNoRefs);
					// }
				// }
			// }
		// }
		// this.getParent().getRecord(entityName, oldId).setId(newId)	//override -- Si existe 
		// me.registerReferences(record, oldId);
	// }
// });

Ext.XML = (new(function() { //overriden
    var me = this,
    encodingFunction,
    // decodingFunction,
    // useNative = null,
    // useHasOwn = !! {}.hasOwnProperty,
    // isNative = function() {
        // if (useNative === null) {
            // useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == '[object JSON]';
        // }
        // return useNative;
    // },
    pad = function(n) {
        return n < 10 ? "0" + n : n;
    },
    // doDecode = function(json) {
        // return eval("(" + json + ')');
    // },
    doEncode = function(o, newline) {
        
        if (o === null || o === undefined) {
            return "null";
        } else if (o === "") {
            return "null";
        } else if (Ext.isDate(o)) {
            return Ext.XML.encodeDate(o);
        } else if (Ext.isString(o)) {
            return encodeString(o);
        } else if (typeof o == "number") {
            return isFinite(o) ? String(o) : "null";
        } else if (Ext.isBoolean(o)) {
            return o?"1":"null";
        }
        
        
        else if (o.toJSON) {
            return o.toJSON();
        } else if (Ext.isArray(o)) {
			if (o.length>1) {
				return encodeArray(o, newline);
			} else {
				return doEncode(o[0]);
			}
        } else if (Ext.isObject(o)) {
            return encodeObject(o, newline);
        } else if (typeof o === "function") {
            return "null";
        }
        return 'undefined';
    },
    // m = {
        // "\b": '\\b',
        // "\t": '\\t',
        // "\n": '\\n',
        // "\f": '\\f',
        // "\r": '\\r',
        // '"': '\\"',
        // "\\": '\\\\',
        // '\x0b': '\\u000b' 
    // },
    // charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g,
    encodeString = function(s) {
		return "'"+s.replace('+', '%2B')+"'";
        // return '"' + s.replace(charToReplace, function(a) {
            // var c = m[a];
            // return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        // }) + '"';
    },


    encodeArray = function(o, newline) {

        var a = [""], //["<values>"], 
            len = o.length,
            i;
        for (i = 0; i < len; i += 1) {
            a.push("<value>",doEncode(o[i]),"</value>");
        }
        
        // a[a.length - 1] = '</values>';
        return a.join("");
    },

    encodeObject = function(o, newline) {
		return o.isInstance?doEncode(Ext.isObject(o.getValue()) && o.valueField?o.getValue()[o.valueField]:o.getValue()):doEncode(o.value!==undefined?o["value"]:(o.id!==undefined?o["id"]:null));//doEncode(o["value"] || o["id"] || null);
		//return (o.value?"'"+o.value+"'":(o.id?"'"+o.id+"'":'NULL'));
        // var a = ["{", ""], 
            // i;
        // for (i in o) {
            // if (!useHasOwn || o.hasOwnProperty(i)) {
                // a.push(doEncode(i), ":", doEncode(o[i]), ',');
            // }
        // }
        
        // a[a.length - 1] = '}';
        // return a.join("");
    };

    
    me.encodeValue = doEncode;

    
    me.encodeDate = function(o) {
        return "'" + o.getFullYear() + "-"
        + pad(o.getMonth() + 1) + "-"
        + pad(o.getDate()) + "T"
        + pad(o.getHours()) + ":"
        + pad(o.getMinutes()) + ":"
        + pad(o.getSeconds()) + "'";
    };

    
    me.encode = function(o) {
        if (!encodingFunction) {
            
            encodingFunction = /*isNative() ? JSON.stringify : */me.encodeValue;
        }
        return encodingFunction(o);
    };

    
    // me.decode = function(json, safe) {
        // if (!decodingFunction) {
            
            // decodingFunction = isNative() ? JSON.parse : doDecode;
        // }
        // try {
            // return decodingFunction(json);
        // } catch (e) {
            // if (safe === true) {
                // return null;
            // }
            // Ext.Error.raise({
                // sourceClass: "Ext.XML",
                // sourceMethod: "decode",
                // msg: "You're trying to decode an invalid JSON String: " + json
            // });
        // }
    // };
})());

Ext.define('Panax.data.writer.Writer', {
     override: 'Ext.data.writer.Writer',

	constructor: function (config) {
		this.callParent(arguments); 
	},
	nameProperty: 'fieldName',
	write: function(request) {
        var operation = request.getOperation(),
            records = operation.getRecords() || [],
            len = records.length,
			i         = 0,
			dataRows  = [];

		var dataTable = { params: request.getParams() }
		for (; i < len; i++) {
			var currentRecord = records[i];
			var record = {};
			record.action=operation.action;
			record.data=this.getRecordData(currentRecord, operation)
			record.previousValues=(currentRecord.previousValues || {});
			record.primaryValues={}
			var fields = currentRecord.getFieldsMap();
			for (field in fields) {
				if (fields[field].unique) {
					record.primaryValues[field] = record.data[field];
				}
			}
			//record.associations=currentRecord.associations;
			if (record) dataRows.push(record);
		}
		dataTable["identityKey"]=request.getProxy().getModel().idProperty;
		dataTable["records"]=dataRows;
		//{ settings: { catalogName: request.params.catalogName, foreignKey:request.params.foreignKey, identityKey: request.identityKey, primaryKey: request.params.primaryKey, mode: request.params.mode, filters: request.params.filters }, records:dataRows }
		request.setXmlData(this.writeRecords(dataTable));
		return request;
	}
        
	// , getRecordData: function(record, operation) {
        // var me = this, i, association, childStore,
			// isPhantom = record.phantom === true,
            // writeAll = this.writeAllFields || isPhantom,
            // nameProperty = this.nameProperty,
            // fields = record.fields,
            // fieldItems = fields.items,
            // dataRow = { data:{}, associations: {}, action: (record.get("forDeletion") || operation && operation.action=='destroy')?'destroy':(record.getId()?'update':'create') },
            // clientIdProperty = record.clientIdProperty,
            // changes,
            // name,
            // field,
            // key,
            // f, fLen;
        
		// if (dataRow.action!='destroy')
			// {
			// if (writeAll) {
				// fLen = fieldItems.length;
				// for (f = 0; f < fLen; f++) {
					// field = fieldItems[f];

					// if (field.persist && (field.submitValue==undefined || field.submitValue==true)) {
						// name       = field[nameProperty] || field.name;
						// dataRow.data[name] = record.get(field.name);
					// }
				// }
			// } else {
				// changes = record.getChanges();
				// if (dataRow.action=='update' && changes["checked"]!=undefined && changes["checked"]==false) {
					// dataRow.action='destroy'
					// }
				// else {
					// fLen = fieldItems.length;
					// for (f = 0; f < fLen; f++) {
						// field = fieldItems[f];

						// if (field[nameProperty] && field.isAlwaysSubmitable && (field.submitValue==undefined || field.submitValue==true)) {
							// name       = field[nameProperty] || field.name;
							// dataRow.data[name] = record.get(field.name);
						// }
					// }
					// // Also write the changes
					// for (key in changes) {
						// if (key && (fields.get(key).submitValue==undefined || fields.get(key).submitValue) && changes.hasOwnProperty(key)) {
							// field      = fields.get(key);
							// name       = field[nameProperty] || field.name;
							// if (field[nameProperty]) {
								// dataRow.data[name] = changes[key];
							// }
						// }
					// }
				// }
			// }
		// }
        // if(isPhantom) {
            // if(clientIdProperty && operation && operation.records.length > 1) {
                // // include clientId for phantom records, if multiple records are being written to the server in one operation.
                // // The server can then return the clientId with each record so the operation can match the server records with the client records
                // dataRow.data[clientIdProperty] = record.internalId;
            // }
        // } else {
            // // always include the id for non phantoms
            // if (fields.get(record.idProperty)[nameProperty]) dataRow.data[fields.get(record.idProperty)[nameProperty]] = record.getId();
        // }
		// dataRow.data.metaData=(dataRow.data.metaData || {});
		// if (record.store) {
			// if (!record.store.storeId) record.store.storeId='Store-'+Ext.id()
			// if (!Ext.getStore(record.store.storeId)) Ext.data.StoreManager.register(record.store)
			// dataRow.data.metaData["storeId"] = record.store.storeId;
			// dataRow.data.metaData["internalId"] = record.internalId;
		// }
		// //Ext.getStore(record.store.storeId).getById(record.internalId)
		
// //http://www.sencha.com/forum/showthread.php?141957-Saving-objects-that-are-linked-hasMany-relation-with-a-single-Store
        // //Iterate over all the hasMany associations
		// for (i = 0; i < record.associations.length; i++) {
            // association = record.associations.get(i);
			// if (association.type=='hasMany' || association.type=='hasOne') {
				// childStore = record[(association.type=='hasMany')? (
					// association.storeName
				// ) : (
					// association.instanceName
				// )];

				// var associationStore = { settings: {catalogName:association.tableName/*association.associatedName*/, identityKey: association.identityKey, primaryKey: association.primaryKey, foreignKey:association.foreignKey }, records: [] };

				// dataRow.associations[association.name]=associationStore;
				
				// if (childStore.getRootNode) {
					// childStore.getRootNode().cascadeBy(function(childRecord) {


					// //Recursively get the record data for children (depth first)
					// var child = me.getRecordData.call(me, childRecord);

					// /*
					 // * If the child was marked dirty or phantom it must be added. If there was data returned that was neither
					 // * dirty or phantom, this means that the depth first recursion has detected that it has a child which is
					 // * either dirty or phantom. For this child to be put into the prepared data, it's parents must be in place whether
					 // * they were modified or not.
					 // */
					// if (childRecord.dirty | childRecord.phantom | (child && child.records != null)){
						// dataRow.associations[association.name].records.push(child);
						// //record.setDirty();
					// }
				// }, me);
				// } else if (childStore.each) {
				// //Iterate over all the children in the current association
				// childStore.each(function(childRecord) {


					// //Recursively get the record data for children (depth first)
					// var child = me.getRecordData.call(me, childRecord);

					// /*
					 // * If the child was marked dirty or phantom it must be added. If there was data returned that was neither
					 // * dirty or phantom, this means that the depth first recursion has detected that it has a child which is
					 // * either dirty or phantom. For this child to be put into the prepared data, it's parents must be in place whether
					 // * they were modified or not.
					 // */
					// if (childRecord.dirty | childRecord.phantom | (child && child.records != null)){
						// dataRow.associations[association.name].records.push(child);
						// //record.setDirty();
					// }
				// }, me);
				// } else {
					// var child = me.getRecordData.call(me, childStore);
					// if (child && (child.records != null || child.data)) {
						// dataRow.associations[association.name].records.push(child);
					// }
				// }

				// /*
				 // * Iterate over all the removed records and add them to the preparedData. Set a flag on them to show that
				 // * they are to be deleted
				 // */
				// Ext.each(childStore.removed, function(removedChildRecord) {
					// //Set a flag here to identify removed records
					// removedChildRecord.set('forDeletion', true);
					// var removedChildData = me.getRecordData.call(me, removedChildRecord);
					// dataRow.associations[association.name].records.push(removedChildData);
					// //record.setDirty();
				// });
			// }
        // }

        // //Only return data if it was dirty, new or marked for deletion.
        // if (record.dirty | record.phantom | dataRow.action=='destroy' | !Panax.util.isEmptyObject(dataRow.associations)) {
            // return dataRow;
        // }
    // }
});	
	
Ext.define('Panax.data.writer.Xml', {
     override: 'Ext.data.writer.Xml',

	constructor: function (config) {
		this.callParent(arguments); 
	},
	
	documentRoot: 'dataTable',
	//record: 'dataRow',
	
	createXMLTable: function(dataTable) {
            var me = this,
                xml = [],
                i = 0,
                records = dataTable.records,
                len = records.length,
                root = me.documentRoot,
                item,
                key;
            xml.push('<', root, ' name="', dataTable.params.catalogName,'"',function(){return (dataTable.identityKey?' identityKey="['+dataTable.identityKey+']"':'')}(),'',function(){return (dataTable.params.primaryKey && dataTable.params.primaryKey.length?' primaryKey="['+dataTable.params.primaryKey.join('],[')+']"':'')}(), function(){return (dataTable.params.foreignKey?' foreignKey="'+dataTable.params.foreignKey+'"':'')}(),'>');
				xml.push(this.createXMLRows(dataTable));
            xml.push('</', root, '>');
            return xml.join('');
	},
	
	createXMLRows: function(dataTable){
            var me = this
                , xml = []
                , i = 0
				, records = dataTable.records
                , len = records.length
                , root = me.getDocumentRoot()
                , record
                , key
				, association
				, transform;
                
			transform = this.getTransform();
			if (transform) {
				data = transform(data, request);
			}
				
            // may not exist
            xml.push(me.getHeader() || '');
			var deleteXML = [] 
			for (; i < len; ++i) {
                var record = records[i];
    			var dataRow=(record.action=='destroy'?'deleteRow':'dataRow');
				var currentXMLNode=[]
                currentXMLNode.push('<', dataRow, function() { return !dataTable.identityKey?'':(' identityValue="'+(record.action=='create'?'NULL':Ext.XML.encodeValue(record.data[dataTable.identityKey]))+'"')}()
				,function(){
					var attributesString='';
					for (var attribute in record.data["metaData"]) {
						attributesString+=' '+attribute+'="'+record.data["metaData"][attribute]+'"';
					}
					return attributesString;
				}()
				,'>');// renovado
				
				delete record.data["metaData"];
    			if (record.action!='destroy') {
    				for (key in record.data) {
						if (key && record.data.hasOwnProperty(key)) { // && key!=dataTable.identityKey
							var pv = record.previousValues[key], value = record.data[key]
    						currentXMLNode.push('<dataField name="', key, '"'
								, (record.primaryValues[key] && pv && pv!==value)?' previousValue="'+Ext.XML.encodeValue(pv)+'"':''
								, record.primaryValues[key]?' isPK="true"':''
							,'>', Ext.XML.encodeValue(value), '</dataField>');// renovado
    					}
    				}
    			}
				for (association in record.associations) {
				    currentXMLNode.push(this.createXMLTable(record.associations[association]));
				}
                currentXMLNode.push('</', dataRow, '>');
				if (dataRow!='deleteRow') {
					xml.push(currentXMLNode.join(''))
				} else {
					deleteXML.push(currentXMLNode.join(''))
				}
			}
		/*siempre se generan los nodos de borrado primero y después los de actualización*/
        return deleteXML.join('')+xml.join('');
	},
	
	writeRecords: function(dataTable) {
		// alert("method overriden")
        var xml = [];        
        xml.push(this.createXMLTable(dataTable));
        return xml.join('');
	}
 });
 
 
 
/**
 * A {@link Ext.ux.statusbar.StatusBar} plugin that provides automatic error
 * notification when the associated form contains validation errors.
 * TODO: Fix error validation for elements that haven't been shown yet. They are taken into account until the container renders them for the first time.
 */
Ext.define('Ext.ValidationStatus', {//overriden
    extend: 'Ext.Component', 
    requires: ['Ext.util.MixedCollection'],
    /**
     * @cfg {String} errorIconCls
     * The {@link Ext.ux.statusbar.StatusBar#iconCls iconCls} value to be applied
     * to the status message when there is a validation error.
     */
    errorIconCls : 'x-status-error',
    /**
     * @cfg {String} errorListCls
     * The css class to be used for the error list when there are validation errors.
     */
    errorListCls : 'x-status-error-list',
    /**
     * @cfg {String} validIconCls
     * The {@link Ext.ux.statusbar.StatusBar#iconCls iconCls} value to be applied
     * to the status message when the form validates.
     */
    validIconCls : 'x-status-valid',
    
    /**
     * @cfg {String} showText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to be applied when
     * there is a form validation error.
     */
    showText : 'The form has errors (click for details...)',
    /**
     * @cfg {String} hideText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to display when
     * the error list is displayed.
     */
    hideText : 'Click again to hide the error list',
    /**
     * @cfg {String} submitText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to be applied when
     * the form is being submitted.
     */
    submitText : 'Saving...',
    
    // private
    init : function(sb) {
        var me = this;

        me.statusBar = sb;
        sb.on({
            single: true,
            scope: me,
            render: me.onStatusbarRender,
            beforedestroy: me.destroy
        });
        sb.on({
            click: {
                element: 'el',
                fn: me.onStatusClick,
                scope: me,
                buffer: 200
            }
        });
    },

    onStatusbarRender: function(sb) {
        var me = this,
            startMonitor = function() {
                me.monitor = true;
            };

        me.monitor = true;
        me.errors = Ext.create('Ext.util.MixedCollection');
        me.listAlign = (sb.statusAlign === 'right' ? 'br-tr?' : 'bl-tl?');

        if (me.form) {
            me.formPanel = Ext.getCmp(me.form);
            me.basicForm = me.formPanel.getForm();
            me.startMonitoring();
            me.basicForm.on('beforeaction', function(f, action) {
                if (action.type === 'submit') {
                    // Ignore monitoring while submitting otherwise the field validation
                    // events cause the status message to reset too early
                    me.monitor = false;
                }
            });
            me.basicForm.on('actioncomplete', startMonitor);
            me.basicForm.on('actionfailed', startMonitor);
        }
   },
    
    // private
    startMonitoring : function() {
        this.basicForm.getFields().each(function(f) {
            f.on('validitychange', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    stopMonitoring : function() {
        this.basicForm.getFields().each(function(f) {
            f.un('validitychange', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    onDestroy : function() {
        this.stopMonitoring();
        this.statusBar.statusEl.un('click', this.onStatusClick, this);
        this.callParent(arguments);
    },
    
    // private
    onFieldValidation : function(f, isValid) {
        var me = this,
            msg;

        if (!me.monitor) {
            return false;
        }
        msg = f.getErrors()[0];
        if (msg) {
            me.errors.add(f.id, {field:f, msg:msg});
        } else {
            me.errors.removeAtKey(f.id);
        }
        this.updateErrorList();
        if (me.errors.getCount() > 0) {
            if (me.statusBar.getText() !== me.showText) {
                me.statusBar.setStatus({
                    text: me.showText,
                    iconCls: me.errorIconCls
                });
            }
        } else {
            me.statusBar.clearStatus().setIcon(me.validIconCls);
        }
    },

    // private //overriden
    updateErrorList : function() {
        var me = this,
            msg,
            msgEl = me.getMsgEl();

        if (me.errors.getCount() > 0) {
            msg = ['<ul>'];
            this.errors.each(function(err) {
                msg.push('<li id="x-err-', err.field.id, '">', err.field.fieldLabel, ': '+err.msg, '</li>');
            });
            msg.push('</ul>');
            msgEl.update(msg.join(''));
        } else {
            msgEl.update('');
        }
        // reset msgEl size
        msgEl.setSize('auto', 'auto');
    },
    
    //overriden
    getMsgEl : function() { 
        var me = this,
            msgEl = me.msgEl,
            t;

        if (!msgEl) {
            msgEl = me.msgEl = Ext.DomHelper.append(Ext.getBody(), {
                cls: me.errorListCls
            }, true);
            msgEl.hide();
            msgEl.on('click', function(e) {
                t = e.target;//getTarget('li', 10, true); //Marcaba error cuando se daba click por segunda vez sobre el elemento seleccionado
                if (t) {
                    var cmp = Ext.getCmp(t.id.split('x-err-')[1]);
					if (cmp) {
						var containerTab = cmp.ownerCt;
						if (containerTab) {
							//containerTab = containerTab.component;
							if (containerTab.tab && !containerTab.tab.active) {
								var tabPanel = containerTab.findParentByType('tabpanel');
								containerTab.tab.show()
								tabPanel.setActiveTab(containerTab)
							}
						}
						cmp.focus();
					}
                    me.hideErrors();
                }
            }, null, {stopEvent: true}); // prevent anchor click navigation
        }
        return msgEl;
    },
    
    // private
    showErrors : function() {
        var me = this;

        me.updateErrorList();
        me.getMsgEl().alignTo(me.statusBar.getEl(), me.listAlign).slideIn('b', {duration: 300, easing: 'easeOut'});
        me.statusBar.setText(me.hideText);
        me.formPanel.body.on('click', me.hideErrors, me, {single:true}); // hide if the user clicks directly into the form
    },

    // private
    hideErrors : function() {
        var el = this.getMsgEl();
        if (el.isVisible()) {
            el.slideOut('b', {duration: 300, easing: 'easeIn'});
            this.statusBar.setText(this.showText);
        }
        this.formPanel.body.un('click', this.hideErrors, this);
    },
    
    // private
    onStatusClick : function() {
        if (this.getMsgEl().isVisible()) {
            this.hideErrors();
        } else if (this.errors.getCount() > 0) {
            this.showErrors();
        }
    }
});

Ext.define('Ext.form.action.Submit', {
	override: 'Ext.form.action.Submit'
	
	, constructor: function (config) {
		this.callParent(arguments);
	}

	, handleResponse: function(response) {
        var form = this.form,
            errorReader = form.errorReader,
            rs, errors, i, len, records, result;
            
        if (errorReader) { //overriden
            rs = errorReader.read(response);
            records = rs.records;
            errors = [];
            if (records) {
                for(i = 0, len = records.length; i < len; i++) {
                    errors[i] = records[i].data;
                }
            }
            if (errors.length < 1) {
                errors = null;
            }
            result = {
                success : rs.success,
                errors : errors
            };
			result = Ext.apply(rs, result);
        } else {
            try {
                result = Ext.decode(response.responseText);
            } catch (e) {
                result = {
                    success: false,
                    errors: []
                };
            }
            
        }
        return result;
    }
});