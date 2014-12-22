Ext.define('Px.Application', {
    extend: 'Ext.app.Application',
    namespace: 'Px',

    requires: [
        'Ext.app.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'Ext.chart.*',
        ,'Px.*'
		,'Px.view.Header'
		,'Px.view.Login'
		//,'Px.view.ThemeSwitcher'
		,'Px.view.ContentPanel'
		,'Px.store.Navigation'
		,'Px.view.navigation.Breadcrumb'
		,'Px.view.navigation.Tree',

        'Panax.data.Proxy',
        'Panax.data.CatalogProxy',
        'Panax.view.PanaxPanel',
        'Panax.view.PanaxGrid',
        'Panax.view.PanaxForm',
        'Panax.view.PanaxWindow',
        'Panax.view.base.FileManager',
        'Panax.view.base.ImageContainer',
        'Panax.view.dataview.MultiSort',
        'Panax.view.controls.AjaxComboBox',

    ],

    controllers: [
        'Global'
    ],
    init: function() {
        if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }

        var me = this,
            map = Ext.Object.fromQueryString(location.search);

        Ext.create('Px.store.Navigation', {
            storeId: 'navigation'
        });

        // Set the default route to start the application.
        me.setDefaultToken('home');

        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

		me.config = {
			rootPath: '../../..'
			,filesRepositoryPath: 'FilesRepository'
			,scriptsPath: 'Scripts'
		}
    },

    // listen : {
    //     controller : {
    //         '#' : {
    //             unmatchedroute : 'onUnmatchedRoute'
    //         }
    //     }
    // },

    // onUnmatchedRoute : function(hash) {
    //     var me = this

    //     Ext.Msg.alert(
    //         'Route Failure',
    //         'The view for ' + hash + ' could not be found. You will be taken to the application\'s start',
    //         function() {
    //             me.redirectTo(me.getApplication().getDefaultToken());
    //         }
    //     );
    // }
    
});

