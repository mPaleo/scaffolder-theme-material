(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdAutocomplete', autoComplete);
 
		function autoComplete($compile, $timeout, $q, $log, $http, api) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: false,          
				link: function($scope, element, attrs, ngModel) {

					var vm = $scope;
					
					vm.dir = {};
					vm.dir.isDisabled    = false;

					vm.dir.querySearch   = querySearch;
					vm.dir.selectedItemChange = selectedItemChange;
					vm.dir.searchTextChange   = searchTextChange;
					vm.dir.newState = newState;
					
					$scope.$watch(attrs.ngModel, function () {
						var completeUrl = attrs.url + "/" + ngModel.$modelValue;
						if (ngModel.$modelValue) {
							$http.get(completeUrl).success(function(result){
								vm.dir.selectedItem = {
									value: result.id,
									name: result[attrs.fieldText].toLowerCase(), 
									text: result[attrs.fieldText]
								}
							});
						}
					});

					function newState(item) {
					  alert("Sorry! You'll need to create a Constituion for " + item + " first!"); 
					}

					function querySearch (query) {
						var completeUrl = attrs.url + "/query?" + attrs.foreign + "[name]=" + query;

						$http.get(completeUrl).success(function(result){
							vm.dir.list = result.data.map( function (item) {
								return {
									value: item.id,
									name: item[attrs.fieldText].toLowerCase(), 
									text: item[attrs.fieldText]
								}
							});
						});

						var results = query ? vm.dir.list.filter( createFilterFor(query) ) : vm.dir.list,
							deferred;

						return results;
					}
					function searchTextChange(text) {
						$log.info('Text changed to ' + text);
					}
					function selectedItemChange(item) {
						$log.info('Item changed to ' + JSON.stringify(item));
					}
					
					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(item) {
							return (item.name.indexOf(lowercaseQuery) === 0);
						};
					}
				}
			}
		}

})();
