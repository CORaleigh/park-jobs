(function(angular) {

  'use strict';

  angular.module('appControllers').controller('navbarCtrl', ['$scope', '$rootScope', 'deviceService', '$mdSidenav', 'jobsFilterService', '$timeout', '$interval',
  	function ($scope, $rootScope, deviceService, $mdSidenav, jobsFilterService, $timeout, $interval) {
      
      $scope.title = 'Map My Park Job';
      
      // Start the circular progress icon
      $scope.progress = 'indeterminate';

      $scope.searchProgress = 100;

      $scope.activeTab = deviceService.activeTab;
      $scope.isMobile = deviceService.isMobile;

      $scope.filters = {
        searchText: undefined
      };

      var searchPromise;
      var progressInterval;
      var jobContainer;

      var startSearch = function () {
        if (angular.isUndefined(progressInterval)) {
          progressInterval = $interval( function () {
            $scope.searchProgress += 15;
          }, 100, 0, true);
        }
      };

      var stopSearch = function () {
        if (angular.isDefined(progressInterval)) {
          $interval.cancel(progressInterval);
          progressInterval = undefined;
        }
      };

      $scope.$watch('filters.searchText', function (newVal) {
        if (angular.isUndefined(newVal)) { return; }
        // Debounce updating the searchText model in the service
        $timeout.cancel(searchPromise);
        $scope.searchProgress = 0;
        startSearch();

        searchPromise = $timeout( function () {
          // Scroll to the top of the container so we don't get white screens after filtering if the user was at the bottom of the list
          jobContainer = jobContainer || document.getElementById('jobs-list');
          jobContainer.scrollTop = 0;
          // Update the search text model that triggers a filter update.
          jobsFilterService.filters.searchText = newVal; 
          // Cancel the progress bar interval and fill the bar.
          stopSearch();
          $scope.searchProgress = 100;
        }, 1000);
      });



      $scope.toggleSidenav = function () {
        $mdSidenav('left').toggle();
      };

      $rootScope.$on('loading:progress', function(){
        $scope.progress = 'indeterminate';
      });

      $rootScope.$on('loading:finish', function(){
      	$scope.progress = undefined;
      });

      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        stopSearch();
      });

  }]);

})(window.angular);