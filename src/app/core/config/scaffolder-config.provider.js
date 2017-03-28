(function ()
{
    'use strict';

    angular
        .module('app.core')
        .provider('scaffolderConfig', scaffolderConfigProvider);

    /** @ngInject */
    function scaffolderConfigProvider()
    {
        // Default configuration
        var scaffolderConfiguration = {
            'disableCustomScrollbars'        : false,
            'disableMdInkRippleOnMobile'     : true,
            'disableCustomScrollbarsOnMobile': true
        };

        // Methods
        this.config = config;

        //////////

        /**
         * Extend default configuration with the given one
         *
         * @param configuration
         */
        function config(configuration)
        {
            scaffolderConfiguration = angular.extend({}, scaffolderConfiguration, configuration);
        }

        /**
         * Service
         */
        this.$get = function ()
        {
            var service = {
                getConfig: getConfig,
                setConfig: setConfig
            };

            return service;

            //////////

            /**
             * Returns a config value
             */
            function getConfig(configName)
            {
                if ( angular.isUndefined(scaffolderConfiguration[configName]) )
                {
                    return false;
                }

                return scaffolderConfiguration[configName];
            }

            /**
             * Creates or updates config object
             *
             * @param configName
             * @param configValue
             */
            function setConfig(configName, configValue)
            {
                scaffolderConfiguration[configName] = configValue;
            }
        };
    }

})();