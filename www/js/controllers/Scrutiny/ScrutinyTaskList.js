angular.module('starter')
  .controller('ScrutinyTaskCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, $state, sharedProperties, $localStorage,$sessionStorage,$ionicPopup) {
	  

	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.langID = "1";

$scope.backbutton = function()
	{
		var confirmPopup = $ionicPopup.show({
	          title : 'Exit MaiNet?',
	          template : 'Are U want to goto Home page?',
	          buttons : [{
				           text : 'Cancel',
				           type : 'button-assertive',
	          			}, 
	          			{
				           text : 'Ok',
				           type : 'button-balanced',
				           onTap : function() {
				        	   					$state.go("app.home");
				           					  }
	          			}]
	         });
	};
 
 $scope.appldetail = function()
 {
	 $state.go("app.ApplnDetail");
 }




var _init = function (){
  
    };
    _init();
  });
