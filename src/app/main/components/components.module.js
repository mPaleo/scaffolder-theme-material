(function ()
{
    'use strict';

    angular
        .module('app.components', [
            'app.components.cards',
            'app.components.charts.c3',
            'app.components.charts.chartist',
            'app.components.charts.chart-js',
            'app.components.charts.nvd3',
            'app.components.maps',
            'app.components.price-tables',
            'app.components.tables.simple-table',
            'app.components.tables.datatable',
            'app.components.widgets',
            'app.components.material-docs',
            'app.components.validation',
            'app.components.resize-uigrid',
            'app.components.datepicker-range'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('components', {
            title : 'COMPONENTS',
            group : true,
            weight: 4
        });

        msNavigationServiceProvider.saveItem('components.cards', {
            title : 'Cards',
            icon  : 'icon-content-copy',
            state : 'app.components_cards'
        });

        msNavigationServiceProvider.saveItem('components.charts', {
            title: 'Charts',
            icon : 'icon-poll'
        });

        msNavigationServiceProvider.saveItem('components.charts.c3', {
            title: 'C3',
            state: 'app.components_charts_c3'
        });

        msNavigationServiceProvider.saveItem('components.charts.chart-js', {
            title: 'Chart.js',
            state: 'app.components_charts_chart-js'
        });

        msNavigationServiceProvider.saveItem('components.charts.chartist', {
            title: 'Chartist',
            state: 'app.components_charts_chartist'
        });

        msNavigationServiceProvider.saveItem('components.charts.nvd3', {
            title: 'nvD3',
            state: 'app.components_charts_nvd3'
        });

        msNavigationServiceProvider.saveItem('components.maps', {
            title: 'Maps',
            icon : 'icon-map-marker',
            state: 'app.components_maps'
        });

        msNavigationServiceProvider.saveItem('components.price-tables', {
            title: 'Price Tables',
            icon : 'icon-view-carousel',
            state: 'app.components_price-tables'
        });

        msNavigationServiceProvider.saveItem('components.tables', {
            title: 'Tables',
            icon : 'icon-table-large'
        });

        msNavigationServiceProvider.saveItem('components.tables.simple-table', {
            title: 'Simple Table',
            state: 'app.components_tables_simple-table'
        });

        msNavigationServiceProvider.saveItem('components.tables.datatable', {
            title: 'Datatable',
            state: 'app.components_tables_datatable'
        });

        msNavigationServiceProvider.saveItem('components.widgets', {
            title: 'Widgets',
            icon : 'icon-apps',
            state: 'app.components_widgets'
        });
    }
})();