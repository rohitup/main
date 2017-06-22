angular.module('starter')
  .controller('Complaintstatusctrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		toaster, $filter, ENV, $state, $ionicPopup,$sessionStorage, $localStorage) {
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  
	  
$scope.complaintStatusFormResponse = false;
	
$scope.applicationstatussearch = function()
{
	$ionicLoading.show({	template: 'Loading...'	});
	  RestService.getGrievanceStatus($scope.tokennumber).then(function (complaintstatusresponse) {
		if(complaintstatusresponse.errors == null)
			{
			    $sessionStorage.complaintstatusresponse = complaintstatusresponse;
				$state.go("app.compstatusdetail");
			}else{
				  toaster.error($filter('translate')('ERROR'), complaintstatusresponse.errors);
			}
				$ionicLoading.hide();
			},
		function (err){
			$ionicLoading.hide();
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		})
}
    	
    var _init = function (){
  
    };
    _init();
  });