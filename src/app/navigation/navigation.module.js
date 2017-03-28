(function ()
{
    'use strict';

    angular
        .module('app.navigation', [])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider)
    {
        $translatePartialLoaderProvider.addPart('app/navigation');
    }

})();