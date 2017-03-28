(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdNumber', number);
 
		function number($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@',
					maxlength: '@',
					minlength: '@'
				},          
				link: function(scope, element, attrs, ngModel) {

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.MINLENGTH" | translate }} '+ scope.minlength +' {{ "ERROR_MESSAGE.DIGITS" | translate }} </span> </div> </div>';
					angular.element(element).after($compile(errorsTemplate)(scope));

					scope.$watch(function(){ 

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required; 

						var number = element[0].value;
						number = number.replace(/\D/g,"");   
						element[0].value = number; 

					});
				}
			}
		}
	
})();
