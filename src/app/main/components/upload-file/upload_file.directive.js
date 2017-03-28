(function ()
{
	'use strict';

	angular
		.module('app.upload-file')  
		.directive('resize', resizeDir);
  
		function resizeDir($compile, $timeout, $q, $log, $http, api, $interval) { 
			
			return {
				restrict: 'A',  
				scope: {
					sizeBox: "@resize"
				},          
				link: function(scope, element, attrs, ngModel) {

					if (attrs.type =='mode_save') { 

						if(scope.$parent.file.progress != -1)
							$interval(function() {
							    scope.$parent.file.progress += 10; 
							});
					}
					
					element.bind('load', function(){ 

						if (attrs.type =='mode_save'){
							if(scope.$parent.file.progress != -1)
								scope.$parent.file.progress = 100;
							scope.$parent.file.imageShow = true;
						}

						scope.img = {
							el: element[0],
							width: element[0].naturalWidth, 
							height: element[0].naturalHeight,
						};						 
						scope.img.ratio = scope.img.width / scope.img.height;

						if(scope.img.ratio < 1) {
 
							// element.addClass('portrait'); 
							// element.removeClass('landscape'); 
							// console.log('1');
							
							// imagens portrait
							$timeout(function(){
								element.css('margin-top', (-(element[0].clientHeight - scope.sizeBox)/2) + "px"); 
								element.css('margin-left', "0px");
								element.css('height', 'auto'); 
								element.css('width', '100%');
								element.css('max-width', '100%');
							}, 50);

						}
						else if(scope.img.ratio > 1){ 

							// element.addClass('landscape');
							// element.removeClass('portrait'); 
							// console.log('2'); 
							
							// imagens landscape
							$timeout(function(){
								element.css('margin-left', (-(element[0].clientWidth - scope.sizeBox)/2) + "px");
								element.css('margin-top', "0px");
								element.css('height', '100%');
								element.css('width', 'auto');
								element.css('max-width', 'none');
							}, 50);

						}else{
							// element.removeClass('portrait'); 
							// element.removeClass('landscape'); 
							// console.log('3');

							// imagens quadradas
							$timeout(function(){
								element.css('margin-left', "0px");
								element.css('margin-top', "0px"); 
								element.css('height', '100%');
								element.css('width', '100%');
								element.css('max-width', '100%');
							}, 50);
							
						}
					});					
				}
			}
		}

})();
