Ext.define('KitchenSink.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    constructor: function(config) {
        var me = this
		
        me.callParent([Ext.apply({
            root: {
                text: 'All',
                id: 'all',
                expanded: true,
                children: me.getNavItems()
            }
        }, config)]);
    },

    getNavItems: function() {
		var store;
		Ext.Ajax.request({
			url: '../../Templates/menu.asp'
			, method: 'GET'
			, async: false
			, success: function(xhr) {
				var response=Ext.JSON.decode(xhr.responseText); 
				// parameters["success"] = (response.success/* && confirm("Se reconstruyó el módulo, continuar?")*/);
					if (response.callback) {
						response.callback();
					}					
					else {
						if (response.message) {
							Ext.MessageBox.show({
								title: 'MENSAJE DEL SISTEMA',
								msg: response.message,
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				
				store=response;
			}
			, failure: function() {
				Ext.Msg.alert("Error de comunicación", "La conexión con el servidor falló, favor de intentarlo nuevamente en unos segundos.");
				parameters["success"] = false;
			}
		});
        return store;
    }
});
