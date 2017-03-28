(function ()
{
    'use strict';

    angular
        .module('scaffolder')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true); 

        $urlRouterProvider.otherwise('/blankstate');

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/vertical-navigation.html',
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: 'app/navigation/layouts/vertical-navigation/navigation.html',
                        controller : 'NavigationController as vm'
                    },
                    'quickPanel@app': {
                        templateUrl: 'app/quick-panel/quick-panel.html',
                        controller : 'QuickPanelController as vm'
                    }
                }
            });
    }

})();
