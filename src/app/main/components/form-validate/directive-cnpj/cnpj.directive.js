(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdCnpj', cnpj);
 
		function cnpj($compile) { 
			
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: {
					name: '@'
				},          
				link: function(scope, element, attrs, ngModel) {

					element.attr('maxlength', 18);
					element.attr('placeholder', "00.000.000/0000-00");
					element.attr('ng-pattern', "/^[0-9]{5}$/");

					// Create error messages

					var errorsTemplate = '<div ng-messages="existError" ng-show="touched" role="alert" class="md-input-messages-animation"> <div ng-show="errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.REQUIRED" | translate }} </span> </div> <div ng-show="!valid && !errorRequired"> <span style="font-size: 12px"> {{ "ERROR_MESSAGE.CNPJ_INVALID" | translate }}</span> </div> </div>';
					var el = $compile(errorsTemplate)(scope); 
					angular.element(element).after(el);

					scope.$watch(function(){ 

						scope.existError = ngModel.$error;
						scope.touched = ngModel.$touched;
						scope.valid = ngModel.$valid;
						scope.errorRequired = ngModel.$error.required;
                                               
						// Masks 

						var cnpj = element[0].value;
						cnpj = cnpj.replace(/\D/g,"");                 
						cnpj = cnpj.replace(/(\d{2})(\d)/,"$1.$2");       
						cnpj = cnpj.replace(/(\d{3})(\d)/,"$1.$2");      
						cnpj = cnpj.replace(/(\d{3})(\d)/,"$1/$2");                                                                       
						cnpj = cnpj.replace(/(\d{4})(\d{1,2})$/,"$1-$2"); 
						
						element[0].value = cnpj;

						// Validations 

						var isValid = validateCNPJ(cnpj);
						ngModel.$setValidity(attrs.ngModel, isValid);

					});
				}
			}
		}

		// Function validate CNPJ 

		function validateCNPJ(cnpj) {
 
		    cnpj = cnpj.replace(/[^\d]+/g,'');
		 
		    if(cnpj == '') return false;
		     
		    if (cnpj.length != 14)
		        return false;

		    if (cnpj == "00000000000000" || 
		        cnpj == "11111111111111" || 
		        cnpj == "22222222222222" || 
		        cnpj == "33333333333333" || 
		        cnpj == "44444444444444" || 
		        cnpj == "55555555555555" || 
		        cnpj == "66666666666666" || 
		        cnpj == "77777777777777" || 
		        cnpj == "88888888888888" || 
		        cnpj == "99999999999999")
		        return false;
		         
		    var size = cnpj.length - 2,
			    numbers = cnpj.substring(0,size),
			    digits = cnpj.substring(size),
			    sum = 0,
			    pos = size - 7, 
			    result = 0,
			    i;

		    for (i = size; i >= 1; i--) {
		      sum += numbers.charAt(size - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
		    if (result != digits.charAt(0))
		        return false;
		         
		    size = size + 1;
		    numbers = cnpj.substring(0,size);
		    sum = 0;
		    pos = size - 7;
		    for (i = size; i >= 1; i--) {
		      sum += numbers.charAt(size - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
		    if (result != digits.charAt(1)) 
		          return false;
		           
		    return true;
		}
	
})();
