(function(angular) {

  'use strict';

  angular.module('appControllers').controller('mapCtrl', ['$scope', 'mapService', 'parkService', 'uiGmapGoogleMapApi', 'uiGmapIsReady', '$q', '$mdDialog', 'jobsService',
  	function($scope, mapService, parkService, gMapsAPI, uiGmapIsReady, $q, $mdDialog, jobsService){

  	// Map settings
    $scope.map = mapService.map;

    // $scope.$watch('map.location.coords', function(newValue) {
      // console.log(newValue);
    // }, true);
    
    // Park Markers
    $scope.parks = parkService.markers;
    $scope.jobs = jobsService.jobs;
            
    // Park Info Window
    $scope.parkWindow = parkService.parkWindow;

    // Make a new query when the activities filter changes
    // $scope.$watchCollection('selectedActivities.current', function (selected) {
    //   parkService.updateParkMarkers(selected);
    // });

    $scope.map.events.zoom_changed = function (map) {
      // Close info windows
      $scope.parkWindow.show = false;
    };

    var mapInstance,
        mapsApi;

    gMapsAPI.then( function (maps) {
    	mapsApi = maps;
    });

    uiGmapIsReady.promise(1).then(function(instances) {
      mapInstance = instances[0].map;
      // console.log( mapInstance.getMapTypeId() );
      // applyMapStyles();
    });

    var applyMapStyles = function () {
    	var styledMap = new mapsApi.StyledMapType( $scope.map.options.styles, {name: 'Nature'});
  	  mapInstance.setMapTypeId('nature');
      mapInstance.mapTypes.set('nature', styledMap);
      console.log( mapInstance.getMapTypeId() );
    };

  }]);

})(window.angular);