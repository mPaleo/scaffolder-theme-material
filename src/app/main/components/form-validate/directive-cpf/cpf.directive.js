(function ()
{
    'use strict';

    angular
        .module('app.components.validation') 
        .directive('cdCpf', cpf);
  
        function cpf() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {

                    $scope.$watch(function(){
                        var cpf = element[0].value;

                        cpf = cpf.replace(/\D/g,"");                 
                        cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");       
                        cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");      
                                                                 
                        cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 
                        
                        element[0].value = cpf;
                    });
                }
            }
        }
    
})();