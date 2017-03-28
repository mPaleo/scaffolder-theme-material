(function ()
{
	'use strict';

	angular
		.module('app.blankstate.text', ['app.components.validation']) 
		.config(config);

	/** @ngInject */
	function config($stateProvider, msNavigationServiceProvider)
	{
		// State
		$stateProvider
			.state('app.blankstate_text', {
				url    : '/blankstate', 
				views  : {
					'content@app': {
						templateUrl: 'app/main/pages/blankstate/text/blankstate_text.html', 
						controller : 'BlankStateController as vm' 
					}
				}
			});

		msNavigationServiceProvider.saveItem('blank', {
			title : 'Home',
			icon       : 'icon-home',
			state      : 'app.blankstate_text',
			weight: 1 
		});
	}
})(); 