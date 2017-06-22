angular.module('starter')
 
 .controller('bookeStateDocCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {
	 $scope.upload = function()
	 {
		 $state.go("app.eststeBookingpay");
	 }
	 

    var _init = function (){
  
    };
    _init();
  });
