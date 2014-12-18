/*!
 *
 * Bancha Scaffolding Library
 * Copyright 2011-2014 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha.scaffold.samples
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://scaffold.bancha.io
 * @since         Bancha Scaffold v 0.5.1
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha Scaffold v PRECOMPILER_ADD_BANCHA_SCAFFOLD_RELEASE_VERSION
 *
 * For more information go to http://scaffold.bancha.io
 */

// init Ext.Direct Provider
//Ext.syncRequire('Ext.direct.Manager');
//Ext.direct.Manager.addProvider(Bancha.REMOTE_API);

/*
// define the article model
Ext.define('Bancha.model.Article', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            read    : Bancha.RemoteStubs.Article.read,
            create  : Bancha.RemoteStubs.Article.create,
            update  : Bancha.RemoteStubs.Article.update,
            destroy : Bancha.RemoteStubs.Article.destroy
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            rootProperty: 'data'
        }
    },
    idProperty:'id',
    fields: [
        {
            name:'id',
            type:'int'
        },{
            name:'title',
            type:'string'
        },{
            name:'date',
            type:'date',
            dateFormat:'Y-m-d H:i:s'
        },{
            name:'body',
            type:'string'
        },{
            name:'published',
            type:'boolean'
        },{
            name:'user_id',
            type:'int',
            reference: 'Bancha.model.User'
        }
    ],
    validators: {
        name: { type: 'presence' },
        user_id: { type: 'range', min: 0 }
    }
});
*/

Ext.define('Bancha.model.Ciudad', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        batchActions: false,
        api: {
            read    : "../../../scripts/xmlCatalogOptions.asp"
            //create  : "Bancha.RemoteStubs.User.create",
            //update  : Bancha.RemoteStubs.User.update,
            //destroy : Bancha.RemoteStubs.User.destroy
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message',
            successProperty: 'success',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            rootProperty: 'data'
        }
        , extraParams: {
            catalogName: "CatalogosSistema.Municipio"
            , orderBy: ""
            , dataValue: "RTRIM([Id])"
            , dataText: "RTRIM(Municipio)"
            , sortDirection: ""
            , OptNew: "false"
            , lang: "es"
            , output: 'json'
        }
    },
    idProperty: 'id',
    fields: [{
        name: 'id'
    }, {
        name: 'text'
    }]

});

// define the user model
Ext.define('Bancha.model.User', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        batchActions: false,
        api: {
            read    : "../../../request.asp"
            //create  : "Bancha.RemoteStubs.User.create",
            //update  : Bancha.RemoteStubs.User.update,
            //destroy : Bancha.RemoteStubs.User.destroy
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            rootProperty: 'data'
        }
        , pageParam: 'pageIndex'
        , limitParam: 'pageSize'
        , filterParam: 'filters'
        , sortParam: 'sorters'
        , extraParams: {
            catalogName: "dbo.Empleado"
            , identityKey: "id"
            , primaryKey: ["id"]
            , mode: "readonly"
            , lang: "es"
            , output: 'json'
        }
    },
    idProperty: 'id',
    clientIdProperty: 'id',
    belongsTo: 'Ciudad',
    fields: [
        
        {
            name: "id",
            mapping: "Id"
        }, 
        
        
        {
            name: 'Nombre'
            ,fieldName: 'Nombre',
            
            
            
            mapping: 'Nombre["value"]'
            ,useNull: true
        }, 
        
        {
            name: 'PrimerApellido'
            ,fieldName: 'PrimerApellido',
            
            
            
            mapping: 'PrimerApellido["value"]'
            ,useNull: true
        }, 
        
        {
            name: 'CiudadNacimiento'
            ,fieldName: 'CiudadNacimiento',
            mapping: 'CiudadNacimiento["value"]'
            ,useNull: true

            , reference: 'Ciudad' 

        }

    ],

    validators: {
    }
});

/*
// define book model (for management panel)
Ext.define('Bancha.model.Book', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            read: Bancha.RemoteStubs.Book.read
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    },
    idProperty: 'id',
    fields: [
        {
            name:'id',
            type:'int'
        },{
            name:'title',
            type:'string'
        },{
            name:'published',
            type:'boolean'
        },{
            name:'user_id',
            type:'int',
            reference: 'Bancha.model.User'
        }
    ],
    validators: {
        id: { type: 'range', min: 0, precision: 0 },
        title: [
            { type: 'presence' },
            { type: 'length', min: 3, max: 64 }
        ],
        user_id: { type: 'range', precision: 0 }
    }
});
*/