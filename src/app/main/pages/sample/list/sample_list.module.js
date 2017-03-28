(function ()
{
	'use strict';

	angular
		.module('app.sample.list')
		.config(config);

	/** @ngInject */
	function config($stateProvider, msNavigationServiceProvider)
	{
		// State
		$stateProvider
			.state('app.sample_list', {
				url    : '/sample/list',
				views  : {
					'content@app': {
						templateUrl: 'app/main/pages/sample/list/sample_list.html',
						controller : 'SampleListController as vm'
					}
				},
				resolve: {
					datasource: function (apiResolver, SampleResource)
					{
						console.log('log');
						return apiResolver.resolve('sample@query', {});
					}
				}
			});

		// Navigation
		// msNavigationServiceProvider.saveItem('sample.list', {
		// 	title : 'nav.list',
		// 	icon       : 'icon-view-list',
		// 	state      : 'app.sample_list',
		// 	weight     : 2
		// });
	}
})();