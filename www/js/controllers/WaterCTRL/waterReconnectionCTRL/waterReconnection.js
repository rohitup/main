angular.module('starter')
.controller('waterReconnectionCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		toaster, $filter, ENV, $state, sharedProperties,$sessionStorage,$localStorage){
	$scope.data = {};
//	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	 $scope.changeAttr = function(item){
			if($scope.data.disfromdate == "" || $scope.data.disfromdate == null || $scope.data.disfromdate == undefined )
				item.currentTarget.setAttribute("placeholder","From Date");
			else item.currentTarget.setAttribute("placeholder","");
		} 
	  $scope.tochangeAttr = function(item){
		  if($scope.data.distodate == "" || $scope.data.distodate == null || $scope.data.distodate == undefined )
				item.currentTarget.setAttribute("placeholder","To Date");
			else item.currentTarget.setAttribute("placeholder","");
		}

	/*Function Declaration Start*/
  $scope.reconnNoSearchDetails = true;
	  
 $scope.reConnNosearch = function()
 {
	 $scope.reconnNoSearchDetails = true;
 }
	  
  $scope.documentlist = $sessionStorage.responsedata;
	console.log("documentlist ::: "+JSON.stringify($scope.documentlist));
	  $scope.docsitems = [];
		for (var i = 0; i < $scope.documentlist.length; i++) {
			var docdata = {   
					connectionNo: $scope.documentlist[i].connectionNo,
					consumerName: $scope.documentlist[i].consumerName,
			   }
			$scope.docsitems.push(docdata);
		}
	 
$scope.SelectedTask = null;

 $scope.setSelected = function (SelectedTask){
	console.log("--SelectedTask--"+SelectedTask);
	$scope.SelectedTask = SelectedTask;
 }		
		
	/*Function Declaration End*/
	
	var _init = function (){
		
    };
    
    _init();
});