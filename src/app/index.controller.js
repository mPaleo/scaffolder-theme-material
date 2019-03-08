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
    var remove_div = document.getElementById('vertical-navigation');
        remove_div.classList.add('md-locked-open');
        remove_div.classList.remove('md-closed');
})();