(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdDate', date); 
 
		function date($compile) { 
			
			var directive = {
				restrict: 'EA',  
				require: 'ngModel',
				scope: false,          
				link: dateValidation,
			};

			return directive;

			function dateValidation(scope, element, attrs, ngModel) {

				// Remove button icon

				angular.element(element).find('button').first().remove();

				var formatDate = attrs.format;
				var input = angular.element(element).find('input');
				input.css('background', 'transparent');
				input.attr('maxlength', 10);

				switch(formatDate){

					// Date type
					case 'date':

						// Take input into Directive date Angular 

						var valueDate = input[0].value, timeDate;

						var errorsTemplate = '<div> <span class="date-error-message" ng-show="errorRequiredDate && validDate"> Campo obrigatório </span> <span class="date-error-message" ng-show="!validDate && !errorRequiredDate"> Campo inválido </span> </div>';
						angular.element(element).after($compile(errorsTemplate)(scope));

						scope.$watch(function(){

							scope.existErrorDate = ngModel.$error; 
							scope.touchedDate = ngModel.$touched;
							scope.errorRequiredDate = ngModel.$error.required;
							scope.validDate = ngModel.$valid;

							if(scope.errorRequiredDate == undefined) scope.errorRequiredDate = false;
																												
							valueDate = input[0].value;
							if(valueDate){
								valueDate = valueDate.replace(/\D/g,"");
								valueDate = valueDate.replace(/(\d{2})(\d)/,"$1/$2");
								valueDate = valueDate.replace(/(\d{2})(\d)/,"$1/$2");
								if(valueDate.split("/")[0]>31 || (valueDate.split("/")[0]<=0 && valueDate.split("/")[0].length == 2) ){
										input[0].value = "";
								}
								if(valueDate.split("/")[1]>12 || (valueDate.split("/")[1]<=0 && valueDate.split("/")[1].length == 2)){
										input[0].value = valueDate.split("/")[0]+"/";
								}
							}
							input[0].value = valueDate;  
						});
						angular.element(input)
							.on("blur", function() {
								var day = valueDate.slice(0, 2), month = valueDate.slice(3, 5), year = valueDate.slice(6, 10);
								ngModel.$modelValue = new Date(month +'/'+ day +'/'+ year);
							})
							.on("keypress", function() {
								var day = valueDate.slice(0, 2), month = valueDate.slice(3, 5), year = valueDate.slice(6, 10);
								if(valueDate.length == 10) 
									ngModel.$modelValue = new Date(month +'/'+ day +'/'+ year);
							});

						break;

					// Datetime type 

					case 'datetime':

						var valueDateTime = input[0].value, timeDate;

						var errorsTemplate = '<div> <span class="date-error-message" ng-show="errorRequiredDateTime && validDateTime"> Campo obrigatório </span> <span class="date-error-message" ng-show="!validDateTime && !errorRequiredDateTime"> Campo inválido </span> </div>';
						angular.element(element).after($compile(errorsTemplate)(scope));

						var inputTime, inputDateTime; 
						inputTime = $compile('<input type="time" name="time" value="" placeholder="Time" class="md-datepicker-input datetime">')(scope);
						angular.element(input).after(inputTime);
						inputTime.attr('maxlength', 11);

						scope.click = false;

						scope.$watch(function(){

							scope.existErrorDateTime = ngModel.$error;
							scope.touchedDateTime = ngModel.$touched;
							scope.errorRequiredDateTime = ngModel.$error.required;
							scope.validDateTime = ngModel.$valid;

							if(scope.errorRequiredDateTime == undefined) scope.errorRequiredDateTime = false;

							if(ngModel.$modelValue){
								var hours = ngModel.$modelValue.getUTCHours() +'', minutes = ngModel.$modelValue.getUTCMinutes()+'', seconds = ngModel.$modelValue.getUTCSeconds()+'', miliseconds = ngModel.$modelValue.getUTCMilliseconds()+'';

								if(hours.length == 1) hours = '0' + hours;
								if(minutes.length == 1) minutes = '0' + minutes;
								if(seconds.length == 1) seconds = '0' + seconds;
								if(miliseconds.length == 1) miliseconds = '0' + miliseconds;

								timeDate = hours + ':' + minutes; // + ':' + seconds + ':' + miliseconds;

								if(scope.click == false)
									inputTime[0].value = timeDate;
							}

							valueDateTime = input[0].value;
							if(valueDateTime){
								valueDateTime = valueDateTime.replace(/\D/g,"");
								valueDateTime = valueDateTime.replace(/(\d{2})(\d)/,"$1/$2");
								valueDateTime = valueDateTime.replace(/(\d{2})(\d)/,"$1/$2");
								if(valueDateTime.split("/")[0]>31 || (valueDateTime.split("/")[0]<=0 && valueDateTime.split("/")[0].length == 2) ){
										input[0].value = "";
								}
								if(valueDateTime.split("/")[1]>12 || (valueDateTime.split("/")[1]<=0 && valueDateTime.split("/")[1].length == 2)){
										input[0].value = valueDateTime.split("/")[0]+"/";
								}
							}
							input[0].value = valueDateTime;  

						});

						angular.element(inputTime)
							.on("blur", function() {
								scope.click = false;
							})
							.on("click", function() {
								scope.click = true;
							})
							.on("keypress", function(){
								if(inputTime[0].value.length == 11){
									console.log('obj');
								}
							});

						angular.element(input)
							.on("blur", function() {
								var day = valueDateTime.slice(0, 2), month = valueDateTime.slice(3, 5), year = valueDateTime.slice(6, 10);
								ngModel.$modelValue = new Date(month +'/'+ day +'/'+ year);
							})
							.on("keypress", function() {
								var day = valueDateTime.slice(0, 2), month = valueDateTime.slice(3, 5), year = valueDateTime.slice(6, 10);
								if(valueDateTime.length == 10) 
									ngModel.$modelValue = new Date(month +'/'+ day +'/'+ year);
							});

						break;

					// Time type 

					case 'time':

						var errorsTemplate = '<div> <span class="date-error-message" ng-show="errorRequired && valid"> Campo obrigatório </span> <span class="date-error-message" ng-show="!valid && !errorRequired"> Campo inválido </span> </div>';
						angular.element(element).after($compile(errorsTemplate)(scope));

						angular.element(element).find('button').remove();

						var inputTime, inputDateTime;
						inputTime = $compile('<input type="time" name="time" value="" placeholder="Time" class="md-datepicker-input">')(scope);
						angular.element(input).after(inputTime);
						inputTime.attr('maxlength', 11);

						angular.element(element).find('input').first().remove();

						scope.$watch(function(){

							scope.existError = ngModel.$error;
							scope.touched = ngModel.$touched;
							scope.errorRequired = ngModel.$error.required;
							scope.valid = ngModel.$valid;

						});

						break;
				}
			}

		}
	
})();
