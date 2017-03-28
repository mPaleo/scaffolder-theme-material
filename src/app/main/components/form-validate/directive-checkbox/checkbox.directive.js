(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdCheckbox', checkbox);
 
		function checkbox($compile, $timeout, $q, $log, $http, api) { 
			
			return {
				restrict: 'EA',
				require: 'ngModel',
				templateUrl: '/app/main/components/form-validate/directive-checkbox/checkbox.template.html',
				scope: {
					url: "@",
					fieldText: "@",
					getCheckedUrl: "@",
					editMode: "@"
				},
				link: function($scope, element, attrs, ngModel) {
					$scope.list = [];
					
					if (attrs.editMode) {
						$http.get(attrs.getCheckedUrl).success(function(result){
							$scope.list = result.map( function (item) {
								return item.id
							});
							setModel($scope.list);
						});
					}
				
					$http.get(attrs.url).success(function(result){
						$scope.items = result.data.map( function (item) {
							return {
								id: item.id,
								text: item[attrs.fieldText]
							}
						});
					});

					function setModel(value) {
						ngModel.$setViewValue(value);
					}


					$scope.toggle = function (item, list) {
						var idx = list.indexOf(item);
						if (idx > -1) list.splice(idx, 1);
						else list.push(item);
						setModel(list);
					};
					$scope.exists = function (item, list) {
						return list.indexOf(item) > -1;
					};
				}
			}
		}

})();
