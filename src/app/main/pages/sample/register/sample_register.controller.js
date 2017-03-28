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
		.module('app.sample.register')
		.controller('SampleController', SampleController);

	function SampleController($stateParams, sample, SampleResource, $mdDialog, $location, $filter)
	{
		var vm = this;
		vm.$t = $filter('translate');

		// Variables
		vm.company = sample ;

		// Mehods 
		vm.sendForm = sendForm;
		vm.confirmDeleteAction = confirmDeleteAction;
		vm.cancelAction = cancelAction;

		function sendForm()
		{
			console.log(vm.company);

			var alert =	$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.ok(vm.$t('common_words.ok'));

			if(vm.company.id){
				alert.title(vm.$t('register.dialogs.edit_item.success.title', { entity: 'company' }));
				SampleResource.update(vm.company.id, vm.company).$promise.then(function(data){
					alert.textContent(vm.$t('register.dialogs.edit_item.success.content', { entity: 'company' }));
					$mdDialog.show(alert); 
				}, function(error){
					alert.title(vm.$t('register.dialogs.edit_item.error.title', { entity: 'company' }));
					alert.textContent(vm.$t('register.dialogs.edit_item.error.content', { entity: 'company' }));
					$mdDialog.show(alert);
				});

			}else{
				alert.title(vm.$t('register.dialogs.add_item.success.title', { entity: 'company' }));
				SampleResource.create(vm.company).then(function(data){
					alert.textContent(vm.$t('register.dialogs.add_item.success.content', { entity: 'company' }));
					$mdDialog.show(alert); 
					$location.path('/sample/list');
				}, function(error){
					alert.title(vm.$t('register.dialogs.add_item.error.title'));
					console.log(error);
					if(error.statusText)
						alert.textContent(vm.$t('register.dialogs.add_item.error.content_with_log', { entity: 'company' }) + error.statusText);
					else
						alert.textContent(vm.$t('register.dialogs.add_item.error.content', { entity: 'company' }));
					$mdDialog.show(alert);
				});
			}

			// Clear object
			vm.form = {};
		}    

		function confirmDeleteAction(ev){
			var confirm = $mdDialog.confirm()
				.title(vm.$t('register.dialogs.remove_item.title', { entity: "company" }))
				.textContent(vm.$t('register.dialogs.remove_item.content', { entity: "company" }))
				.targetEvent(ev)
				.ok(vm.$t('common_words.yes'))
				.cancel(vm.$t('common_words.no'));
			$mdDialog.show(confirm).then(function() {
				SampleResource.delete(vm.company.id);
				$location.path('/sample/list');
			});
		}

		function cancelAction(){
			$location.path('/sample/list');
		}

	}

})();


	