Ext.define('Px.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
		,'Px.view.main.MainController'
		,'Px.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',
    stateful: true,
    stateId: 'Px-viewport',

    items: [{
        region: 'north',
        xtype: 'appHeader'
    }, {
        region: 'west',
        reference: 'tree',
        xtype: 'navigation-tree'
    }, {
        region: 'center',
        xtype: 'contentPanel',
        reference: 'contentPanel',
        // dockedItems: [{
        //     xtype: 'navigation-breadcrumb',
        //     reference: 'breadcrumb>'
        // }]
    }
    ],

    applyState: function(state) {
        // this.getController().applyState(state);

    },

    getState: function() {
        // return this.getController().getState();
    }
});
