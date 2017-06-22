
var datePicker = angular.module('starter');
datePicker.controller('AccVendorBillRecordsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, $state, $stateParams){
	$scope.orgId = "81";
	$scope.billRecordsResponse = JSON.parse($stateParams.response);
	console.log("$scope.billRecordsResponse "+JSON.stringify($scope.billRecordsResponse));
	
	$scope.authorizeBillRecord = function(id){
		$state.go("app.accVendorBillEdit");
	}
	var _init = function(){
	};
	_init();
});