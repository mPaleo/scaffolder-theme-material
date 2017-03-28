(function ()
{
    'use strict';

    angular
        .module('app.components.validation', [])
        .config(config);

	/** @ngInject */
	function config($translatePartialLoaderProvider)
	{
		$translatePartialLoaderProvider.addPart('app/main/components/form-validate');
	}
   
})();