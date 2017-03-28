(function ()
{
	'use strict';

	angular
		.module('app.blankstate', [ 
			'app.blankstate.text'
		])
		.config(config);

	/** @ngInject */
	function config(msNavigationServiceProvider, $translatePartialLoaderProvider)
	{
		$translatePartialLoaderProvider.addPart('app/main/pages/blankstate');
	}
})();