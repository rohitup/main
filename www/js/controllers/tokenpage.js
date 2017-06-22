angular.module('starter')
  .controller('TokenCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties) {

	$scope.orgid = sharedProperties.getorgID();
	$scope.userID = sharedProperties.getuserID();
	
	
	/*function start*/
$scope.reopen = function(){
	
	$state.go("app.reopenpage");
}
	
$scope.compdescription = false;
//$scope.show = 1;

$scope.reopencomplaint = function(){
	$scope.compdescription = true;
}   
	
    	
    var _init = function (){
  
    };
    _init();
  });
