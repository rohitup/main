angular.module('starter')
.controller('BirthDeathCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter,
		ENV, $state, sharedProperties,$localStorage){
	/*Global Functions Start*/	


	/*Global Functions End*/
	/*Variable Declaration Start*/
	
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	
	$scope.postaldeliverybirth = function()
	{
//		$state.go("app.IssueBirth");
		$ionicLoading.show({ template: 'Loading...'	});
		
		RestService.postalcode($scope.orgId,$scope.empId,$scope.langId).then(function(postaldata){
			if(postaldata.status == "success"){
			$localStorage.postaldata = postaldata;
			$state.go("app.IssueBirth");
			}else{
				$ionicLoading.hide();
				alert("We are facing some issues retrieving details. Please try again after sometime.");
			}
	 		   $ionicLoading.hide();
	 	  },function (err){
	 		  $ionicLoading.hide();
	 		 alert("We are facing some issues retrieving details. Please try again after sometime.");
	 		})
	};
	
	$scope.postaldeliverydeath = function()
	{
		$state.go("app.IssueDeath");
		
		$ionicLoading.show({ template: 'Loading...'	});
		
		RestService.postalcode($scope.orgId,$scope.empId,$scope.langId).then(function(postaldata){
			if(postaldata.status == "success"){
			$localStorage.postaldata = postaldata;
			$state.go("app.IssueDeath");
			}else{
				$ionicLoading.hide();
				alert("We are facing some issues retrieving details. Please try again after sometime.");
			}
	 		   $ionicLoading.hide();
	 	  },function (err){
	 		  $ionicLoading.hide();
	 			 alert("Something went wrong!!");
	 		})
	};
	
	/*Function Declaration End*/
	
	var _init = function (){
    };
    _init();
});