(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdMail', mail); 
 
		function mail($compile) { 

			return {
				restrict: 'A',
				require: 'ngModel', 
				transclude: true,   
				scope: {
					name: '@'
				},    
				link: function(scope, element, attrs, ngModel, ngPattern) {

					element.attr("minlength","4");

					var regex = /^.+@.+\..+$/;
							
					var errorsTemplate = '<div ng-messages="existError" ng-show="touched"role="alert" class="md-input-messages-animation" multiple> <div ng-show="errorRequired"> <span style="font-size:12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!pattern && !errorRequired"> <span style="font-size:12px" > {{ "ERROR_MESSAGE.MAIL_INVALID" | translate }} </span> </div> </div>';
 
					var el = $compile(errorsTemplate)(scope);
					angular.element(element).after(el);

					scope.$watch(function(){ 

						scope.pattern = regex.test(element[0].value); 
						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						
						scope.errorRequired = ngModel.$error.required; 

						if(com(element[0].value) == false && !scope.errorRequired){
							scope.pattern = false;
							ngModel.$setValidity(attrs.ngModel, false);
						}else{
							ngModel.$setValidity(attrs.ngModel, true);
						}
					});
				}
			}

			function com(email){
				var a = email.indexOf("@"); 
				var p = email.lastIndexOf(".com");
				if( p == -1 || a == -1 || p < a) 
					return false; 
				else 
					return true;
			}
		}
	
})();
