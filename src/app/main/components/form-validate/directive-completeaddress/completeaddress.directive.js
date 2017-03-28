(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdCompleteaddress', address);
 
		function address($http) { 
			return {
				restrict: 'A',  
				require: 'ngModel', 
				scope: false,          
				link: function($scope, element, attrs, ngModel) {

					var cep, url, request = false;

					$scope.$watch(function(){ 
						cep = element[0].value;

						if(cep.length == 10 && !request){

							cep = cep.replace(/\D/g,"");
							url = attrs.searchurl.replace("CEP", cep);
							request = true;

							$http.get(url).success(function(json){
				            if(!json.erro){
				            	$scope.vm.company.address.street = json.logradouro; 
				            	$scope.vm.company.address.district = json.bairro; 
				            	$scope.vm.company.address.city = json.localidade; 
				            	$scope.vm.company.address.state = json.uf; 
				            	$scope.vm.company.address.complement = json.complemento; 
				            }
						  });

						}else if(cep.length < 10){
							request = false;
						}

					});

					var input = angular.element(document.querySelectorAll("input[name=district]"));

				}
			}
		} 
})();
