/*
 * Controller
 *    Identificando se é ou não edição a partir do objeto da Entidade (Sample) // Sample.id == nulo é cadastro
 *
 *
 */

(function ()
{
	'use strict';

	angular
		.module('app.blankstate.text')
		.controller('BlankStateController', BlankStateController);

	function BlankStateController($stateParams,  $mdDialog, $location, $filter)
	{
		var vm = this;
		vm.$t = $filter('translate');


	}

})();


	