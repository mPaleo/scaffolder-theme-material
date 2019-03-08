(function ()
{
	'use strict';

	angular
		.module('app.components.validation') 
		.directive('cdAnimationFilter', animationFilter);
 
		/*
		 *
		 *		Animation filter
		 *		Directive that add animation to filter advanced options
		 *
		 *		por @maria.luisa
		 *
		 */
		function animationFilter($compile, $timeout, $q, $log, $http, api, $translate, $filter, i18nService) { 
			return {
				restrict: 'A',  
				scope: {
					expand: "=expand"
				},
				link: function(scope, element, attrs) {

					i18nService.setCurrentLang(getLang());
					var vm 				= scope,
						icnExpandFilter = element.find(document.getElementsByClassName('icon-filter-expand')[0]),
						btnOptions 		= element.find(document.getElementById('filter-options-advanced')),
						btnSubmit 		= element.find(document.getElementById('filter-submit')),
						fieldsOptions	= element.find(document.getElementById('fields-advanced-options')),
						expandOptSearch = attrs.expand,
						translate		= $filter('translate');

					// Get the current language, and set it's correctly
					function getLang() {
						var lang = $translate.use();
						switch(lang) {
							case "pt_BR":
								return "pt-br";
							default:
								return lang;
						}
					}

					// error case 
					if(expandOptSearch == "true"){ expandOptSearch = true; }else{ expandOptSearch = false };
					
					// define text in option advanced link (insert translate)
					btnOptions.text(translate("list.filter.advanced_options.show"));

					// See more options in form filter
					btnOptions.on('click', function(){

						// change controll variable
						expandOptSearch = !expandOptSearch;

						// change text options
						if(expandOptSearch){
							scope.expand = true;
							btnOptions.text(translate("list.filter.advanced_options.hide"));
							// Remove advanced filters search icon
							element.find(document.getElementsByClassName('icon-simple-search')[0]).css("display", "none");
							// Expands filter area
							fieldsOptions.css("display", "block");
							element.addClass('expanded-filter-box');
							icnExpandFilter.addClass('icon-filter-expand-rotate');
							btnOptions.addClass("name-fade");
							// wait seconds 
							$timeout(function(){
								element.css("height", fieldsOptions[0].clientHeight + 115);
							}, 50);
						}else{
							scope.expand = false;
							btnOptions.text(translate("list.filter.advanced_options.show"));
							// Show advanced filters search icon
							element.find(document.getElementsByClassName('icon-simple-search')[0]).css("display", "block");
							// Remove complete filter area
							fieldsOptions.css("display", "none");
							element.removeClass('expanded-filter-box');
							icnExpandFilter.removeClass('icon-filter-expand-rotate');
							element.addClass('mini-expanded-filter-box');
							btnOptions.addClass("name-fade");
							// wait seconds 
							$timeout(function(){
								element.css("height", 115);
							}, 50);
						}
						$timeout(function(){
							btnOptions.removeClass("name-fade");
						}, 600);
					});

					// See more options in form filter
					icnExpandFilter.on('click', function(){

						// change controll variable
						expandOptSearch = !expandOptSearch;

						// change text options
						if(expandOptSearch){
							scope.expand = true;
							btnOptions.text(translate("list.filter.advanced_options.hide"));
							// Remove advanced filters search icon
							element.find(document.getElementsByClassName('icon-simple-search')[0]).css("display", "none");
							// Expands filter area
							fieldsOptions.css("display", "block");
							element.addClass('expanded-filter-box');
							icnExpandFilter.addClass('icon-filter-expand-rotate');
							btnOptions.addClass("name-fade");
							// wait seconds 
							$timeout(function(){
								element.css("height", fieldsOptions[0].clientHeight + 115);
							}, 50);
						}else{
							scope.expand = false;
							btnOptions.text(translate("list.filter.advanced_options.show"));
							// Show advanced filters search icon
							element.find(document.getElementsByClassName('icon-simple-search')[0]).css("display", "block");
							// Remove complete filter area
							fieldsOptions.css("display", "none");
							element.removeClass('expanded-filter-box');
							icnExpandFilter.removeClass('icon-filter-expand-rotate');
							element.addClass('mini-expanded-filter-box');
							btnOptions.addClass("name-fade");
							// wait seconds 
							$timeout(function(){
								element.css("height", 115);
							}, 50);
						}
						$timeout(function(){
							btnOptions.removeClass("name-fade");
						}, 600);
					});

					// submit search
					btnSubmit.on('click', function(){
						// console.log("click submit search");
					});
				}
			}
		}
})();