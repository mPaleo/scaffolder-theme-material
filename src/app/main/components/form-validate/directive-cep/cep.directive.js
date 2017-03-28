(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdCep', cep);
 
		function cep($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@'
				},          
				link: function(scope, element, attrs, ngModel) {

					element.attr('maxlength', 10);
					element.attr('placeholder', "00.000-000");
					element.attr('ng-pattern', "/^[0-9]{5}$/");

					// Create error messages

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.CEP_INVALID" | translate }} </span> </div> </div>';
					var el = $compile(errorsTemplate)(scope); 
					angular.element(element).after(el);

					scope.$watch(function(){

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required;
                                               
						// Masks 

						var cep = element[0].value;
						cep = cep.replace(/\D/g,"");           
			            cep = cep.replace(/^(\d\d)(\d)/g,"$1.$2"); 
			            cep = cep.replace(/(\d{3})(\d)/,"$1-$2");   

			            if(cep.length == 10){
				        	ngModel.$setValidity(attrs.ngModel, true);
				        }else{
				        	ngModel.$setValidity(attrs.ngModel, false);
				        }
						
						element[0].value = cep;

					});
				}
			}
		}

})();
