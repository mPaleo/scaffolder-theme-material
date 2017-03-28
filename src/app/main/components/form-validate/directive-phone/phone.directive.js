(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdPhone', phoneNumber);
 
		function phoneNumber($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@'
				},          
				link: function(scope, element, attrs, ngModel) {

					element.attr('maxlength', 14); // não aceita 9 digitos por enquanto
					element.attr('minlength', 14);

					// Create error messages

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.PHONE_INVALID" | translate }} </span> </div> </div>';
					var el = $compile(errorsTemplate)(scope); 
					angular.element(element).after(el);

					scope.$watch(function(){

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required;
                                               
						// Masks 

						var phone = element[0].value;
						
						phone = phone.replace(/\D/g,"");            
				        phone = phone.replace(/^(\d\d)(\d)/g,"($1) $2"); 
				        phone = phone.replace(/(\d)(\d{4})$/,"$1-$2");   

				        if(phone.length > 14){
				        	phone = phone.replace(/^(\d{6})(\d)/,"$1 $2");
				        }


				        if(phone.length < 14){
				        	ngModel.$setValidity(attrs.ngModel, false);
				        }else{
				        	ngModel.$setValidity(attrs.ngModel, true);
				        }
						
						element[0].value = phone;

					});
				}
			}
		}

})();
