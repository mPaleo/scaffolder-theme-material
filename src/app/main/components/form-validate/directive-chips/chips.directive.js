(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdChips', chips);
 
		function chips($compile, $timeout, $q, $log, $http, api) { 
			
			return {
				restrict: 'EA',
				require: 'ngModel',
				templateUrl: '/app/main/components/form-validate/directive-chips/chips.template.html',
				scope: {
					url: "@",
					fieldText: "@",
					foreign: "@",
					getCheckedUrl: "@",
					editMode: "@"
				},
				link: function($scope, element, attrs, ngModel) {
					$scope.list = [];
					$scope.readonly = false;
					$scope.selectedItem = null;
					$scope.searchText = null;
					$scope.querySearch = querySearch;
					$scope.selectedItems = [];
					$scope.changeItem = changeItem;
					$scope.list = [];
					$scope.numberChips = [];
					$scope.numberChips2 = [];
					$scope.numberBuffer = '';
					$scope.autocompleteDemoRequireMatch = true;
					$scope.transformChip = transformChip;
					/**
					 * Return the proper object when the append is called.
					 */
					function transformChip(chip) {
						// If it is an object, it's already a known chip
						if (angular.isObject(chip)) {
							return chip;
						}
						// Otherwise, create a new one
						return { name: chip, type: 'new' }
					}
					
					function querySearch (query) {
						var results = [];
						var completeUrl = attrs.url + "?" + attrs.foreign + "[" + attrs.fieldText + "]=" + query;

						$http.get(completeUrl).success(function(result){
							$scope.list = result.data.map( function (item) {
								return {
									value: item.id,
									name: item[attrs.fieldText].toLowerCase(), 
									text: item[attrs.fieldText]
								}
							});
						});

						var results = query ? $scope.list.filter(createFilterFor(query)) : [];
						return results;
					}

					function changeItem () {
						var items = $scope.selectedItems.map( function(object) {
							return object.value
						});
						setModel(items);
					}

					function setModel(value) {
						ngModel.$setViewValue(value);
					}

					/**
					 * Create filter function for a query string
					 */
					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(item) {
							return (item.name.indexOf(lowercaseQuery) === 0);
						};
					}
										
					if (attrs.editMode) {
						$http.get(attrs.getCheckedUrl).success(function(result){
							$scope.selectedItems = result.map( function (item) {
								return {
									value: item.id,
									name: item[attrs.fieldText].toLowerCase(), 
									text: item[attrs.fieldText]
								}
							});
						});
					}
				}
			}
		}

})();
