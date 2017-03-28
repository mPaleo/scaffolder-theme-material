(function ()
{
	'use strict';

	angular
		.module('app.sample', [
			'app.sample.list',
			'app.sample.register'
		])
		.config(config);

	/** @ngInject */
	function config(msNavigationServiceProvider, $translatePartialLoaderProvider)
	{
		$translatePartialLoaderProvider.addPart('app/main/pages/sample');
	}
})();