angular.module('starter')
  .controller('ComplaintPagectrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage,$sessionStorage) {
	  
	  /*$scope.orgid = "81";
	  $scope.userID = "36";*/
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  
	  
$scope.deptartmentperfix = function(){ 
	$ionicLoading.show({	template: 'Loading...'	});
	/*for reopen*/
		RestService.allgrieavance($scope.userID).then(function (response) {
				console.log("response--"+response);
//			if(response==undefined || response == null || response=="")
//				{
//					$ionicLoading.hide();
//					return false;
//				}
//			else
//				{
			$scope.allgrievance = new Array();
				for(var i=0;i<response.length;i++)
				{
					if(response[i].processStatus == "CLOSED")
					{	
						$scope.allgrievance.push(response[i]);
					}
				}
				$sessionStorage.allgrievanceresponse = $scope.allgrievance;
					$state.go("app.LodgeComplaint");
					$ionicLoading.hide();
//				}
				$ionicLoading.hide();
		},function (err) { 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
		})
	};
 		  
    var _init = function (){
    	$ionicLoading.show({	template: 'Loading...'	});
    	 /*Departmemnt*/
		RestService.deptprefix($scope.orgid).then(function (response) {
			console.log("deptresponse--"+response);
			if(response==undefined || response == null || response=="")
				{
					$ionicLoading.hide();
					return false;
				}
			else
				{
					$sessionStorage.deptresponse = response;
					$ionicLoading.hide();
				}
			$ionicLoading.hide();
		},function (err) { 
//			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			$ionicLoading.hide();
		})
 /* location */
		RestService.fetchalllocation($scope.orgid).then(function (locationresponse) {
			console.log("locationresponse--"+locationresponse);
			if(locationresponse==undefined || locationresponse == null || locationresponse=="")
				{
				   $ionicLoading.hide();
					return false;
				}
			else
				{
				 	$sessionStorage.locationresponse = locationresponse;
					$ionicLoading.hide();
				}
			$ionicLoading.hide();
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    };
    _init();
  });
