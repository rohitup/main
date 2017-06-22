angular.module('starter')
 
 .controller('BookestateApplnInfoCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {

	 $scope.savebookapplninfo = function()
	 {
		 $state.go("app.BookingDetails");
	 }

    var _init = function (){
  
    };
    _init();
  });
