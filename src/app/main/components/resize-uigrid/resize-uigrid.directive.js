(function ()
{
	'use strict';

	angular
		.module('app.components.resize-uigrid') 
		.directive('resizeUiGrid', resizeUiGrid); 
 
		function resizeUiGrid() { 
			var directive = {
				restrict: 'A',
				link: setGridSize
			};

			return directive;			
		}

		function setGridSize($scope, element, attrs) {

			var sg = $scope.vm;
			
			sg.gridApi.core.on.canvasHeightChanged($scope, function (canvas) {
				setSizes();

			});

			sg.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				setSizes();
			});

			// Methods
			sg.setSizes = setSizes;

			function setSizes() {
				var rows = sg.gridApi.grid.rows.length;
				var heights = {
					line: sg.gridUiOpts.rowHeight,
					header: element.find('.ui-grid-top-panel').outerHeight(),
					footer: element.find('.ui-grid-pager-panel').outerHeight()					
				};
				var canvas = heights.line * rows;
				var grid = canvas + heights.header + heights.footer;
				element.css('height', grid );
				element.find('.ui-grid-viewport').css('height', canvas );
				element.find('.ui-grid-canvas').css('height', canvas + 1 );

			}

		}
	
})();

