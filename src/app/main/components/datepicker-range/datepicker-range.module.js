(function ()
{
	'use strict';

	angular
		.module('app.components.datepicker-range', [])
		.config(config);

	/** @ngInject */
	function config($translatePartialLoaderProvider)
	{

		$translatePartialLoaderProvider.addPart('app/main/components/datepicker-range');
	}
   
})();