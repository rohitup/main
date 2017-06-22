angular.module('starter')
  .controller('ComplaintTaskCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, $state, sharedProperties, $localStorage) {
	  
$scope.empTaskData = sharedProperties.getTaskData();
$scope.empcareData = sharedProperties.getCareData();
console.log("$scope.empTaskDataRESolution----->"+JSON.stringify($scope.empTaskData));
/*function start*/

//$scope.applcantdate = $scope.empcareData.careDetails.location;
//$scope.department = $scope.empcareData.careDetails.department;
//alert("$scope.department----"+$scope.department);
//$scope.compltype  = $scope.empcareData.careDetails.complaintSubType;


$scope.show = 1;
$scope.taskapplNo;
	  
$scope.SelectedTask = null;

$scope.setSelected = function (SelectedTask) {
	 $ionicLoading.show({ template: 'Loading...' });
	 $scope.SelectedTask = SelectedTask;
	RestService.carerequestbyID($scope.SelectedTask).then(function (careIDresponse) {
		console.log("getprefixdataresponseTRF=="+careIDresponse);
		$scope.careEmpIDdata = careIDresponse;
		sharedProperties.setCareData($scope.careEmpIDdata);
		$state.go("app.complaintcarepage");
		$ionicLoading.hide();
	},
	function (err) {
		alert("Not working");
		$ionicLoading.hide();
	})
};
	  
		
		
/*$scope.grivancedetail = function(){
    	 $ionicLoading.show({
				template: 'Loading...'
			});
    	
		  RestService.carerequestbyID().then(function (careIDresponse) {
			 
			  console.log("getprefixdataresponseTRF=="+careIDresponse);
//			  alert("careIDresponse"+JSON.stringify(careIDresponse));
			  $scope.careEmpIDdata = careIDresponse;
			 console.log("careEmpIDdata-->"+JSON.stringify($scope.careEmpIDdata));
			  
			 sharedProperties.setCareData($scope.careEmpIDdata);
			 $state.go("app.complaintcarepage");
			 $ionicLoading.hide();
			},
			function (err) { 
				alert("Not working");
				 $ionicLoading.hide();
				})
    	
//    	$scope.show = 2;
    }*/
	  
    var _init = function (){
  
    };
    _init();
  });
