angular.module('starter')
.controller('eststeBookingpayCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties) {
	var map;

	$scope.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 25.944341, lng: 86.167287},
			zoom: 7
		});
	}
	var _init = function (){
	};
	_init();
});