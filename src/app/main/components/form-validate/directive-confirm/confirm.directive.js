(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdConfirm', confirm); 
 
		function confirm($compile) { 
			
			return {
		    restrict: 'A',
		    require: 'ngModel', 
		    scope: {
		      trueValue: '=cdConfirm',
		      description: '@'
		    },
		    link: function(scope, element, attrs, ngModel){
		    	
		    if(!scope.description)
		    	scope.description = 'Campo';

				scope.description = scope.description.charAt(0).toUpperCase() + scope.description.slice(1);

				var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px">'+ scope.description +' {{ "ERROR_MESSAGE.CONFIRM" | translate }} </span> </div> </div>';
			
				angular.element(element).after($compile(errorsTemplate)(scope));

				var inputValue = element[0].value;

				scope.$watch(function(){ 

					inputValue = element[0].value;
					scope.existError = ngModel.$error;
					scope.touched = ngModel.$touched;
					scope.valid = ngModel.$valid;
					scope.errorRequired = ngModel.$error.required;

					if(inputValue == scope.trueValue){
						ngModel.$setValidity(attrs.ngModel, true);
					}else{
						ngModel.$setValidity(attrs.ngModel, false);
					}
				});

			}

		  };
		}
	
})();
