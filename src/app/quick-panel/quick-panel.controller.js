(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('QuickPanelController', QuickPanelController);

    /** @ngInject */
    function QuickPanelController(api)
    {
        var vm = this;

        // Data
        vm.date = new Date();
        vm.settings = {
            notify: true,
            cloud : false,
            retro : true
        };

        api.quickPanel.activities.get({}, function (response)
        {
            vm.activities = response.data;
        });

        api.quickPanel.events.get({}, function (response)
        {
            vm.events = response.data;
        });

        api.quickPanel.notes.get({}, function (response)
        {
            vm.notes = response.data;
        });

        // Methods

        //////////
    }

})();