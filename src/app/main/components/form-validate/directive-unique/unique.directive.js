(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdUnique', unique);
 
		function unique($compile, $timeout, $q, $log, $http) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel',
				scope: false,          
				link: function($scope, element, attrs, ngModel) {

					$scope.unique = true;

					var request = 0, errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="!unique && valid"> <span style="font-size: 12px;"> {{ "ERROR_MESSAGE.UNIQUE_VALUE" | translate }} </span> </div> </div>';

					angular.element(element).after($compile(errorsTemplate)($scope));

					$scope.$watch(function(){

						$scope.existError = ngModel.$error;
						$scope.touched = ngModel.$touched;
						$scope.valid = ngModel.$valid;
						$scope.errorRequired = ngModel.$error.required;
                       
					});

					angular.element(element)
						.on("blur", function() {
							
							if($scope.valid && !$scope.errorRequired){

								$http.get(attrs.cdUnique + ngModel.$viewValue ).success(function(result){

									if(result){
										$scope.unique = false;
										ngModel.$setValidity(attrs.ngModel, false);
										$scope.valid = ngModel.$valid;
									}
									else{
										$scope.unique = true;
										ngModel.$setValidity(attrs.ngModel, true);
									}
								}); 

							}

						});

				}
			}

		}

})();
