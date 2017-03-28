(function ()
{
    'use strict';

    angular
        .module('scaffolder')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(scaffolderTheming)
    {
        var vm = this;

        // Data
        vm.themes = scaffolderTheming.themes;

        //////////
    }
})();