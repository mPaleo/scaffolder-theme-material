(function ()
{
	'use strict';

	angular
		.module('app.model', ['ui.grid', 'ui.grid.pagination', 'angular-loading-bar'])
		.controller('ListController', ListController);

	/** @ngInject */
	function ListController(datasource, apiResolver, $mdSidenav, $mdDialog, $scope, $translate)
	{
		console.log($translate);
		var vm = this;
		vm.isFiltered = false;
		vm.columns =  [
				{ name: "Fantasy Name", field: "fantasy_name" },
				{ name: "Social Reason", field: "social_reason" },
				{ name: "cnpj", field: "cnpj" },
				{ name: "cnes", field: "cnes" }
			];

		vm.filterForm = {};
		vm.searchParams = {
			sort: [{
				field: "name",
				order: "ASC",
				priority: 1,
			}],
			pagination: {
				actual: 1,
				itensPerPage: 25,
			},
			filters: {}
		};

		vm.gridUiOpts = {
			data: datasource,
			paginationPageSize: 10,
			paginationPageSizes: [25, 50, 100],
			useExternalSorting: true,
			useExternalFiltering: true,
			//useExternalPagination: true,
			enableSorting: true,
			rowHeight: 51,
			columnDefs: vm.columns,
			onRegisterApi: onRegisterApi
		};

		// Data
			

		// Methods
		vm.toggleSidenav = toggleSidenav;
		vm.getFilter = getFilter;
		vm.getSort = getSort;
		vm.getPagination = getPagination;
		vm.removeFilter = removeFilter;
		vm.toggleColumns = toggleColumns;
		vm.setDataSource = setDataSource;

		function onRegisterApi(gridApi){
			vm.gridApi = gridApi;
			vm.gridApi.core.on.sortChanged($scope, function(sortColumns) {
				vm.searchParams.sort = getSort(sortColumns.columns);
				setDataSource();
			});
			vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				vm.searchParams.pagination = getPagination(newPage, pageSize);
				setDataSource();
			});
		}

		function setDataSource(){
			datasource = apiResolver.resolve('company@query', vm.searchParams);
		}

		 /** Toggle sidenav **/
		function toggleSidenav(sidenavId) {
			$mdSidenav(sidenavId).toggle();
		}

		function getFilter() {
			vm.searchParams.filter = vm.filterForm;

			// Just do stuff if there is any kinding of filtering
			console.log(vm.searchParams.filter);
			if(Object.keys(vm.searchParams.filter).length > 0) {
				vm.isFiltered = true;
				setDataSource();				
			}
		}

		function getSort(columns) {
			var sort = [];
			columns.forEach(function(column) {
				// Just add to the object if there is any kinding of sorting
				if(column.sort.length > 0) {
					sort.push({
						field: column.field,
						order: column.sort.direction,
						priority: column.sort.priority
					});
				}
			});
			return sort;
		}

		function getPagination(newPage, pageSize) {
			var pagination = {
				actual: newPage,
				itensPerPage: pageSize,
			};
			return pagination;
		}

		function removeFilter() {
			vm.searchParams.filter = {};
			vm.filterForm = {};
			vm.isFiltered = false;
		}

		function toggleColumns(ev) {
			
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title("translations.COLUMNS_DIALOG.TITLE")
					.textContent('All of the banks have agreed to forgive you your debts.')
					.ariaLabel('Lucky day')
					.targetEvent(ev)
					.clickOutsideToClose(true)
					.parent(angular.element(document.body))
					.ok('Please do it!')
					.cancel('Sounds like a scam');
				$mdDialog.show(confirm).then(function() {
					$scope.status = 'You decided to get rid of your debt.';
				}, function() {
					$scope.status = 'You decided to keep your debt.';
				});

			console.log(vm.gridApi);
		}

		function DialogController($scope, $mdDialog) {
		  $scope.hide = function() {
		    $mdDialog.hide();
		  };
		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };
		  $scope.answer = function(answer) {
		    $mdDialog.hide(answer);
		};
		}
	}
})();
