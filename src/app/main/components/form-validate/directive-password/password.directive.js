(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdPassword', password);
 
		function password($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@'
				},          
				link: function(scope, element, attrs, ngModel) {

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.PASSWORD_INVALID" | translate }} </span> </div> </div>';
					
					var el = $compile(errorsTemplate)(scope);
					angular.element(element).after(el);

					scope.$watch(function(){ 

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required;
                                               
						if(element[0].value.length < 6)
							ngModel.$setValidity(attrs.ngModel, false);
						else
							ngModel.$setValidity(attrs.ngModel, true);
					});
				}
			}
		}
	
})();
