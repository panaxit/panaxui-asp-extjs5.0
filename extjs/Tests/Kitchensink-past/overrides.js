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


Ext.XML = (new(function() {
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

		for (; i < len; i++) {
			var currentRecord = records[i];
			var record = {};
			record.data=this.getRecordData(currentRecord, operation)
			record.previousValues=currentRecord.previousValues;
			record.primaryKeys={}
			var fields = currentRecord.getFieldsMap();
			for (field in fields) {
				if (fields[field].unique) {
					record.primaryKeys[field] = true;
				}
			}
			//record.associations=currentRecord.associations;
			if (record) dataRows.push(record);
		}
		var dataTable = { settings: { catalogName: 'catalogName', foreignKey:'foreignKey', identityKey: 'id', primaryKey: 'id', mode: 'mode', filters: 'filters' }, records:dataRows }//{ settings: { catalogName: request.params.catalogName, foreignKey:request.params.foreignKey, identityKey: request.params.identityKey, primaryKey: request.params.primaryKey, mode: request.params.mode, filters: request.params.filters }, records:dataRows }
		request.setXmlData(this.writeRecords(dataTable))
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
            xml.push('<', root, ' name="', dataTable.settings.catalogName,'" identityKey="',dataTable.settings.identityKey,'" primaryKey="',function(){return (dataTable.settings.primaryKey && dataTable.settings.primaryKey.indexOf(',')==-1?dataTable.settings.primaryKey:'')}(),'"', function(){return (dataTable.settings.foreignKey?' foreignKey="'+dataTable.settings.foreignKey+'"':'')}(),'>');
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
                currentXMLNode.push('<', dataRow, ' identityValue="', function() { return record.action=='create' && dataTable.settings.identityKey?'NULL':Ext.XML.encodeValue(record.data[dataTable.settings.identityKey])}() ,'"'
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
						if (key && record.data.hasOwnProperty(key)) { // && key!=dataTable.settings.identityKey
							var pv = record.previousValues[key], value = record.data[key]
    						currentXMLNode.push('<dataField name="', key, '"'
								, (record.primaryKeys[key] && pv && pv!==value)?' previousValue="'+Ext.XML.encodeValue(pv)+'"':''
								, record.primaryKeys[key]?' isPK="true"':''
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
 
 
 Ext.define('Ext.data.Session', {
    requires: [
        'Ext.data.schema.Schema',
        'Ext.data.Batch',
        'Ext.data.matrix.Matrix',
        'Ext.data.session.ChangesVisitor',
        'Ext.data.session.ChildChangesVisitor',
        'Ext.data.session.BatchVisitor'
    ],

    isSession: true,

    config: {
        
        schema: 'default',

        
        parent: null,

        crudProperties: {
            create: 'C',
            read:   'R',
            update: 'U',
            drop:   'D'
        }
    },

    destroyed: false,

    crudOperations: [{
        type: 'R',
        entityMethod: 'readEntities'
    }, {
        type: 'C',
        entityMethod: 'createEntities'
    }, {
        type: 'U',
        entityMethod: 'updateEntities'
    }, {
        type: 'D',
        entityMethod: 'dropEntities'
    }],

    crudKeys: {
        C: 1,
        R: 1,
        U: 1,
        D: 1
    },

    constructor: function (config) {
        var me = this;

        
        me.data = {};

        
        me.matrices = {};

        me.identifierCache = {};

        
        me.recordCreator = me.recordCreator.bind(me);

        me.initConfig(config);
    },

    destroy: function () {
        var me = this,
            matrices = me.matrices,
            data = me.data,
            entityName, entities,
            record, id;

        for (id in matrices) {
            matrices[id].destroy();
        }

        for (entityName in data) {
            entities = data[entityName];
            for (id in entities) {
                record = entities[id].record;
                if (record) {
                    
                    
                    record.$source = record.session = null;
                }
            }
        }

        me.recordCreator = me.matrices = me.data = null;
        me.setSchema(null);
        me.callParent();
    },

    
    adopt: function(record) {
        this.checkModelType(record.self);
        if (record.session && record.session !== this) {
            Ext.Error.raise('Record already belongs to an existing session');
        }
        if (record.phantom) {
            Ext.Error.raise('Phantom records cannot be adopted, use the createRecord method');
        }
        if (record.session !== this) {
            record.session = this;
            this.add(record);
        }
    },

    commit: function() {
        
    },

    
    createRecord: function (type, data) {
        this.checkModelType(type);
        var Model = type.$isClass ? type : this.getSchema().getEntity(type),
            parent = this.getParent(),
            id;

        if (parent) {
            id = Model.getIdFromData(data);
            if (parent.peekRecord(Model, id)) {
                Ext.Error.raise('A parent session already contains an entry for ' + Model.entityName + ': ' + id);
            }
        }
        
        return new Model(data, this);
    },

    
    getChanges: function () {
        var visitor = new Ext.data.session.ChangesVisitor(this);
        this.visitData(visitor);
        return visitor.result;
    },

    
    getChangesForParent: function() {
        var visitor = new Ext.data.session.ChildChangesVisitor(this);
        this.visitData(visitor);
        return visitor.result;
    },

    
    getRecord: function(type, id, autoLoad) {
        var me = this,
            record = me.peekRecord(type, id),
            Model, parent, parentRec;

        if (!record) {
            Model = type.$isClass ? type : me.getSchema().getEntity(type);
            parent = me.getParent();
            if (parent) {
                parentRec = parent.peekRecord(Model, id);
            }
            if (parentRec && !parentRec.isLoading()) {
                record = parentRec.copy(undefined, me);
                record.$source = parentRec;
            } else {
                record = Model.createWithId(id, null, me);
                if (autoLoad !== false) {
                    record.load(Ext.isObject(autoLoad) ? autoLoad : undefined);
                }
            }
        }
        return record;
    },

    
    getSaveBatch: function (sort) {
        var visitor = new Ext.data.session.BatchVisitor();

        this.visitData(visitor);

        return visitor.getBatch(sort);
    },

    
    onInvalidAssociationEntity: function(entityType, id) {
        Ext.Error.raise('Unable to read association entity: ' + this.getModelIdentifier(entityType, id));
    },

    
    onInvalidEntityCreate: function(entityType, id) {
        Ext.Error.raise('Cannot create, record already not exists: ' + this.getModelIdentifier(entityType, id));
    },

    
    onInvalidEntityDrop: function(entityType, id) {
        Ext.Error.raise('Cannot drop, record does not exist: ' + this.getModelIdentifier(entityType, id));
    },

    
    onInvalidEntityRead: function(entityType, id) {
        Ext.Error.raise('Cannot read, record already not exists: ' + this.getModelIdentifier(entityType, id));
    },

    
    onInvalidEntityUpdate: function(entityType, id, dropped) {
        if (dropped) {
            Ext.Error.raise('Cannot update, record dropped: ' + this.getModelIdentifier(entityType, id));
        } else {
            Ext.Error.raise('Cannot update, record does not exist: ' + this.getModelIdentifier(entityType, id));
        }
    },

    
    peekRecord: function(type, id, deep) {
        
        
        this.checkModelType(type);
        var entityType = type.$isClass ? type : this.getSchema().getEntity(type),
            entityName = entityType.entityName,
            entry = this.data[entityName],
            ret, parent;

        entry = entry && entry[id];
        ret = entry && entry.record;

        if (!ret && deep) {
            parent = this.getParent();
            ret = parent && parent.peekRecord(type, id, deep);
        }
        return ret || null;
    },

    
    save: function() {
        if (!this.getParent()) {
            Ext.Error.raise('Cannot commit session, no parent exists');
        }
        var visitor = new Ext.data.session.ChildChangesVisitor(this);
        this.visitData(visitor);
        this.getParent().update(visitor.result);
    },

    
    spawn: function () {
        return new this.self({
            schema: this.getSchema(),
            parent: this
        });
    },

    
    update: function(data) {
        var me = this,
            schema = me.getSchema(),
            crudOperations = me.crudOperations,
            len = crudOperations.length,
            crudKeys = me.crudKeys,
            entityName, entityType, entityInfo, i,
            operation, item, associations, key, role, associationData;

        
        for (entityName in data) {
            entityType = schema.getEntity(entityName);
            if (!entityType) {
                Ext.Error.raise('Invalid entity type: ' + entityName);
            }
            entityInfo = data[entityName];

            for (i = 0; i < len; ++i) {
                operation = crudOperations[i];
                item = entityInfo[operation.type];
                if (item) {
                    me[operation.entityMethod](entityType, item);
                }
            }
        }

        
        for (entityName in data) {
            entityType = schema.getEntity(entityName);
            associations = entityType.associations;
            entityInfo = data[entityName];

            for (key in entityInfo) {
                
                if (crudKeys[key]) {
                    continue;
                }
                role = associations[key];
                if (!role) {
                    Ext.Error.raise('Invalid association key for ' + entityName + ', "' + key + '"');
                }
                associationData = entityInfo[role.role];
                role.processUpdate(me, associationData);
            }
        }
    }, 

    
    privates: {
        
        add: function (record) {
            var me = this,
                id = record.id,
                matrices = me.matrices,
                entry = me.getEntry(record.self, id),
                associations, roleName, role;

            if (entry.record) {
                Ext.Error.raise('Duplicate id ' + record.id + ' for ' + record.entityName);
            }

            entry.record = record;

            me.registerReferences(record);
            associations = record.associations;
            for (roleName in associations) {
                role = associations[roleName];
                association = role.association;
                matrix = matrices[association.name];
                if (association.isManyToMany && matrix) {
                    role.checkMembership(me, record, matrix);
                }
            }
        },

        
        applySchema: function (schema) {
            return Ext.data.schema.Schema.get(schema);
        },

        
        checkModelType: function(name) {
            if (name.$isClass) {
                name = name.entityName;
            }

            if (!name) {
                Ext.Error.raise('Unable to use anonymous models in a Session');
            } else if (!this.getSchema().getEntity(name)) {
                Ext.Error.raise('Unknown entity type ' + name);
            }
        },

        
        createEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id;

            for (i = 0; i < len; ++i) {
                data = items[i];
                id = entityType.getIdFromData(data);
                rec = this.peekRecord(entityType, id);
                if (!rec) {
                    rec = this.createRecord(entityType, data);
                } else {
                    this.onInvalidEntityCreate(entityType, id);
                }
                
                
                rec.phantom = true;
            }
        },

        
        dropEntities: function(entityType, ids) {
            var len = ids.length,
                i, rec, id;

            for (i = 0; i < len; ++i) {
                id = ids[i];
                rec = this.peekRecord(entityType, id);
                if (rec) {
                    rec.drop();
                } else {
                    this.onInvalidEntityDrop(entityType, id);
                }
            }
        },

        
        getEntityList: function(entityType, ids) {
            var len = ids.length,
                i, id, rec, invalid;

            for (i = 0; i < len; ++i) {
                id = ids[i];
                rec = this.peekRecord(entityType, id);
                if (rec) {
                    ids[i] = rec;
                } else {
                    invalid = true;
                    ids[i] = null;
                    this.onInvalidAssociationEntity(entityType, id);
                }
            }
            if (invalid) {
                ids = Ext.Array.clean(ids);
            }
            return ids;
        },

        
        getEntry: function(type, id) {
            var entityType = type.$isClass ? type : this.getSchema().getEntity(type),
                entityName = entityType.entityName,
                data = this.data,
                entry;

            entry = data[entityName] || (data[entityName] = {});
            entry = entry[id] || (entry[id] = {});

            return entry;
        },

        getIdentifier: function (entityType) {
            var cache = this.identifierCache,
                identifier = entityType.identifier,
                key = identifier.id || entityType.entityName,
                ret = cache[key];

            if (!ret) {
                if (identifier.clone) {
                    ret = identifier.clone({
                        cache: cache
                    });
                } else {
                    ret = identifier;
                }

                cache[key] = ret;
            }

            return ret;
        },

        getMatrix: function (matrix) {
            var name = matrix.isManyToMany ? matrix.name : matrix,
                matrices = this.matrices;

            return matrices[name] ||
                   (matrices[name] = new Ext.data.matrix.Matrix(this, matrix));
        },

        getMatrixSlice: function (role, id) {
            var matrix = this.getMatrix(role.association),
                side = matrix[role.side];

            return side.get(id);
        },

        
        getModelIdentifier: function(entityType, id) {
            return id + '@' + entityType.entityName;
        },

        onIdChanged: function (record, oldId, newId) {
            var me = this,
                entityName = record.entityName,
                id = record.id,
                bucket = me.data[entityName],
                entry = bucket[oldId],
                associations = record.associations,
                refs = entry.refs,
                setNoRefs = me._setNoRefs,
                association, fieldName, matrix, refId, role, roleName, roleRefs, store;

            if (bucket[newId]) {
                Ext.Error.raise('Cannot change ' + entityName + ' id from ' + oldId +
                                ' to ' + newId + ' id already exists');
            }

            delete bucket[oldId];
            bucket[newId] = entry;

            for (roleName in associations) {
                role = associations[roleName];
                if (role.isMany) {
                    store = role.getAssociatedItem(record);
                    if (store) {
                        matrix = store.matrix;
                        if (matrix) {
                            matrix.changeId(newId);
                        }
                    }
                }
            }

            if (refs) {
                for (roleName in refs) {
                    roleRefs = refs[roleName];
                    role = associations[roleName];
                    association = role.association;

                    if (association.isManyToMany) {
                        
                    } else {
                        fieldName = association.field.name;

                        for (refId in roleRefs) {
                            roleRefs[refId].set(fieldName, id, setNoRefs);
                        }
                    }
                }
            }

			//#override -- Si existe una sesión padre actualiza su id
			var parent = this.getParent()
			if (parent) {
				parent.getRecord(entityName, oldId).setId(newId)
			}
			//#end_override 
            me.registerReferences(record, oldId);
        },

        processManyBlock: function(entityType, role, items, processor) {
            var me = this,
                id, record, store;

            if (items) {
                for (id in items) {
                    record = me.peekRecord(entityType, id);
                    if (record) {
                        records = me.getEntityList(role.cls, items[id]);
                        store = role.getAssociatedItem(record);
                        me[processor](role, store, record, records);
                    } else {
                        me.onInvalidAssociationEntity(entityType, id);
                    }
                }
            }
        },

        processManyCreate: function(role, store, record, records) {
            if (store) {
                
                store.add(records);
            } else {
                record[role.getterName](null, null, records);
            }
                 
        },

        processManyDrop: function(role, store, record, records) {
            if (store) {
                store.remove(records);
            }
        },

        processManyRead: function(role, store, record, records) {
            if (store) {
                store.setRecords(records);
            } else {
                
                record[role.getterName](null, null, records);
            }
        },

        
        readEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id;

            for (i = 0; i < len; ++i) {
                data = items[i];
                id = entityType.getIdFromData(data);
                rec = this.peekRecord(entityType, id);
                if (!rec) {
                    rec = this.createRecord(entityType, data);
                } else {
                    this.onInvalidEntityRead(entityType, id);
                }
                
                
                rec.phantom = false;
            }
        },

        recordCreator: function (data, Model) {
            var me = this,
                id = Model.getIdFromData(data),
                record = me.peekRecord(Model, id, true);

            
            if (!record) {
                
                
                
                
                record = new Model(data, me);
            } else {
                
                
                
                
                
                
                record = me.getRecord(Model, id);
            }

            return record;
        },

        registerReferences: function (record, oldId) {
            var entityName = record.entityName,
                id = record.id,
                recordData = record.data,
                remove = oldId || oldId === 0,
                entry, i, fk, len, reference, references, refs, roleName;

            
            len = (references = record.references).length;

            for (i = 0; i < len; ++i) {
                reference = references[i];  
                fk = recordData[reference.name];  

                if (fk || fk === 0) {
                    reference = reference.reference; 
                    entityName = reference.type;
                    roleName = reference.inverse.role;

                    
                    entry = this.getEntry(reference.cls, fk);
                    refs = entry.refs || (entry.refs = {});
                    refs = refs[roleName] || (refs[roleName] = {});

                    refs[id] = record;
                    if (remove) {
                        delete refs[oldId];
                    }
                }
            }
        },

        
        updateEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id, modified;

            
            if (Ext.isArray(items)) {
                for (i = 0; i < len; ++i) {
                    data = items[i];
                    id = entityType.getIdFromData(data);
                    rec = this.peekRecord(entityType, id);
                    if (rec) {
                        rec.set(data);
                    } else {
                        this.onInvalidEntityUpdate(entityType, id);
                    }
                }
            } else {
                for (id in items) {
                    data = items[id];
                    rec = this.peekRecord(entityType, id);
                    if (rec && !rec.dropped) {
                        modified = rec.set(data);
                    } else {
                        this.onInvalidEntityUpdate(entityType, id, !!rec);
                    }
                }
            }
        },

        updateReference: function (record, field, newValue, oldValue) {
            var reference = field.reference,
                entityName = reference.type,
                roleName = reference.inverse.role,
                id = record.id,
                entry, refs;

            if (oldValue || oldValue === 0) {
                
                refs = this.getEntry(entityName, oldValue).refs[roleName];
                delete refs[id];
            }

            if (newValue || newValue === 0) {
                entry = this.getEntry(entityName, newValue);
                refs = entry.refs || (entry.refs = {});
                refs = refs[roleName] || (refs[roleName] = {});
                refs[id] = record;
            }
        },

        
        visitData: function (visitor) {
            var me = this,
                data = me.data,
                matrices = me.matrices,
                all, assoc, id, id2, matrix, members, name, record, slice, slices, state;

            for (name in data) {
                all = data[name];  

                for (id in all) {
                    record = all[id].record;

                    if (record) {
                        if (record.phantom || record.dirty || record.dropped) {
                            if (visitor.onDirtyRecord) {
                                visitor.onDirtyRecord(record);
                            }
                        } else if (visitor.onCleanRecord) {
                            visitor.onCleanRecord(record);
                        }
                    }
                }
            }

            if (visitor.onMatrixChange) {
                for (name in matrices) {
                    matrix = matrices[name].left;  
                    slices = matrix.slices;
                    assoc = matrix.role.association;

                    for (id in slices) {
                        slice = slices[id];
                        members = slice.members;

                        for (id2 in members) {
                            state = (record = members[id2])[2];

                            if (state) {
                                visitor.onMatrixChange(assoc, record[0], record[1], state);
                            }
                        }
                    }
                }
            }

            return visitor;
        },

        
        

        _setNoRefs: {
            refs: false
        }
    }
});
