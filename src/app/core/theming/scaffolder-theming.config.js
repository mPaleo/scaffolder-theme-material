(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($mdThemingProvider, scaffolderPalettes, scaffolderThemes, scaffolderThemingProvider)
    {
        // Inject Cookies Service
        var $cookies;
        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);

        // Check if custom theme exist in cookies
        var customTheme = $cookies.getObject('customTheme');
        if ( customTheme )
        {
            scaffolderThemes['custom'] = customTheme;
        }

        $mdThemingProvider.alwaysWatchTheme(true);

        // Define custom palettes
        angular.forEach(scaffolderPalettes, function (palette)
        {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });

        // Register custom themes
        angular.forEach(scaffolderThemes, function (theme, themeName)
        {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.hues)
                .accentPalette(theme.accent.name, theme.accent.hues)
                .warnPalette(theme.warn.name, theme.warn.hues)
                .backgroundPalette(theme.background.name, theme.background.hues);
        });

        // Store generated PALETTES and THEMES objects from $mdThemingProvider
        // in our custom provider, so we can inject them into other areas
        scaffolderThemingProvider.setRegisteredPalettes($mdThemingProvider._PALETTES);
        scaffolderThemingProvider.setRegisteredThemes($mdThemingProvider._THEMES);
    }

})();