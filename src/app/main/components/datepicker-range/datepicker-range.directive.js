(function ()
{
	'use strict';

	angular
		.module('app.components.resize-uigrid') 
		.directive('datepickerRange', datepickerRange); 
 
		function datepickerRange($translate, $filter) { 
			var directive = {
				restrict: 'EA',
				scope: {
					datapickerRangeName: "@"
				},
				templateUrl: 'app/main/components/datepicker-range/datepicker-range.template.html',
				require: 'ngModel',
				link: setRange
			};

			return directive;

			function setRange($scope, el, attr, ngModel) {

				$translate = $filter('translate');
				$scope.datepickerRange = {};
				$scope.calendar = {};
				$scope.dates = {
					todayStart: moment("00:00", "HH:mm").toDate(),
					todayEnd: moment("23:59", "HH:mm").toDate(),
					yesterdayStart: moment("00:00", "HH:mm").subtract(1, "days").toDate(),
					yesterdayEnd: moment("23:59", "HH:mm").subtract(1, "days").toDate(),
					thisMonth: moment("00:00", "HH:mm").date(1).toDate(),
					lastMonthStart: moment("00:00", "HH:mm").subtract(1, "months").date(1).toDate(),
					lastMonthEnd: moment("23:59", "HH:mm").date(0).toDate(),
					last30:  moment("00:00", "HH:mm").subtract(30, "days").toDate(),
					thisYear:  moment("00:00", "HH:mm").dayOfYear(1).toDate()
				};

				// Data
				$scope.periods = [
					{ name: $translate('SPECIFIC'), value: "other" },
					{ name: $translate('TODAY'), value: { start: $scope.dates.todayStart, end: $scope.dates.todayEnd } },
					{ name: $translate('YESTERDAY'), value:  { start: $scope.dates.yesterdayStart, end: $scope.dates.yesterdayEnd } },
					{ name: $translate('THIS_MONTH'), value: { start: $scope.dates.thisMonth, end: $scope.dates.todayEnd } },
					{ name: $translate('LAST_MONTH'), value: { start: $scope.dates.lastMonthStart, end: $scope.dates.lastMonthEnd }  },
					{ name: $translate('LAST_30'), value: { start: $scope.dates.last30, end: $scope.dates.todayEnd } },
					{ name: $translate('THIS_YEAR'), value: { start: $scope.dates.thisYear, end: $scope.dates.todayEnd } },
					{ name: $translate('ALL'), value: {}  }
				];
								
				// Methods
				$scope.setRangePeriod = setRangePeriod;
				$scope.setModel = setModel;
				$scope.createRangePeriod = createRangePeriod;

				function setRangePeriod() {
					setModel({});
					if($scope.datepickerRange.select != "other") {
						setModel($scope.datepickerRange.select);
					} else {
						createRangePeriod();						
					}					
				}

				function setModel(value) {
					ngModel.$setViewValue(value);
				}

				function createRangePeriod() {
					if($scope.calendar.start !== undefined && $scope.calendar.end !== undefined) {
						$scope.specificRange = {
							start: moment($scope.calendar.start).hour(0).minute(0).toDate(),
							end: moment($scope.calendar.end).hour(23).minute(53).toDate()
						};
						setModel($scope.specificRange);
					}
				}
			}			
		}

	
	
})();

