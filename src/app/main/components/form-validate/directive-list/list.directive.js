(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdList', list);
 
		function list($compile, $timeout, $q, $log, $http, api) { 
			
			return {
				restrict: 'EA',  
				require: 'ngModel',
				templateUrl: '/app/main/components/form-validate/directive-list/list.template.html',
				scope: {
					url: "@",
					selectedValue: "@",
					fieldName: "@"
				},
				link: function($scope, element, attrs, ngModel) {

					var vm = $scope;
					vm.selectedItem = "";
					vm.setModel = setModel;
					
					if (attrs.selectedValue) {
						vm.selectedItem = attrs.selectedValue;
					}

					function setModel() {
						console.log(vm.selectedItem);
						ngModel.$setViewValue(vm.selectedItem);
					}
					
					$http.get(attrs.url).success(function(result){
						vm.list = result.data.map(function(element) {
							return {
								id: element.id,
								name: element[attrs.fieldName]
							};
						});
					});
				}
			}
		}

})();
