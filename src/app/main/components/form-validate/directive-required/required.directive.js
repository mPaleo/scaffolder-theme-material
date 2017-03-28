(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdRequired', isRequired); 
 
		function isRequired($compile) { 

			return {
				restrict: 'A',
				require: 'ngModel', 
				transclude: false,   
				scope: {
					name: '@'
				},    
				link: function(scope, element, attrs, ngModel) {

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="errorRequired"> <span style="font-size: 12px">{{ "ERROR_MESSAGE.REQUIRED" | translate }}</span> </div> </div>';
					angular.element(element).after($compile(errorsTemplate)(scope));

					scope.$watch(function(){ 
						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.errorRequired = ngModel.$error.required;
					});
					
				}
			}
		}
	
})();

