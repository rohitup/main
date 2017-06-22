angular.module('starter')
 
 .controller('BookingDetailsCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {
	 var map;

	$scope.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 25.944341, lng: 86.167287},
          zoom: 7
        });
      }	
	 
	 $scope.fromDate = function(item){
			if($scope.fromDate == "" || $scope.fromDate == null || $scope.fromDate == undefined )
				item.currentTarget.setAttribute("placeholder","From Date");
			else item.currentTarget.setAttribute("placeholder","");
		} 
	 $scope.ToDate = function(item){
			if($scope.ToDate == "" || $scope.ToDate == null || $scope.ToDate == undefined )
				item.currentTarget.setAttribute("placeholder","To Date");
			else item.currentTarget.setAttribute("placeholder","");
		}
	 
	 $scope.bookingdetails = function()
	 {
		 $state.go("app.bookeStateDoc");
	 }
	 
    var _init = function (){
  
    };
    _init();
  });
