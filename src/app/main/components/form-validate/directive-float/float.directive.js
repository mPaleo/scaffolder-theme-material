(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdFloat', floatNumber);
 
		function floatNumber($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@',
				},          
				link: function(scope, element, attrs, ngModel) {

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.NUMBER_INVALID" | translate }} </span> </div> </div>';

					angular.element(element).after($compile(errorsTemplate)(scope));

					var floatNumber = element[0].value, hasComma;

					scope.$watch(function(){ 

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required; 

						hasComma = floatNumber.indexOf(',');

						floatNumber = element[0].value;
						floatNumber = floatNumber.replace(/[^((?:\d*\,)?\d+)]/g,"");    
						floatNumber = floatNumber.replace(/:|\+|\!|\?|\.|\*/g,"");    
						
						if(hasComma != -1){
							var secondComma = floatNumber.slice(hasComma+1, floatNumber.length).indexOf(',');
							if(secondComma != -1){
								ngModel.$setValidity(attrs.ngModel, false);
							}else{
								ngModel.$setValidity(attrs.ngModel, true);
							}
						}
						element[0].value = floatNumber; 
						

					});

					angular.element(element)
						.on("blur", function() {
						  if(hasComma == -1 && floatNumber != "")
								element[0].value = floatNumber + ',00';							
						});

				}
			}
		}
	
})();
