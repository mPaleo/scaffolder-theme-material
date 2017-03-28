(function ()
{
	'use strict';

	angular
		.module('app.sample.register', ['app.components.validation']) 
		.config(config);

	/** @ngInject */
	function config($stateProvider, msNavigationServiceProvider)
	{
		// State
		$stateProvider
			.state('app.sample_register', {
				url    : '/sample/:id', 
				views  : {
					'content@app': {
						templateUrl: 'app/main/pages/sample/register/sample_register.html', 
						controller : 'SampleController as vm' 
					}
				},
				resolve: {
					sample: function ($stateParams, SampleResource, apiResolver)
					{
						if( $stateParams.id ){
							return apiResolver.resolve('sample@get', { 'id' : $stateParams.id });
						}
					}
				}
			});

		// Navigation

		// msNavigationServiceProvider.saveItem('sample.register', {
		// 	title      : 'nav.register',
		// 	icon       : 'icon-plus-circle-outline',
		// 	state      : 'app.sample_register',
		// 	weight     : 1
		// });
	}
})(); 