angular.module('starter')
  .controller('waterModuleCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
	ENV, $state, sharedProperties, $localStorage,$ionicPlatform,$sessionStorage) {
	/*  $scope.orgid = "81";
	  $scope.userID = "1";*/
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	 
	  
	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
		      function() {
		    	  $state.go("app.home");
		      }, 100
		    );
		    $scope.$on('$destroy', deregisterSecond);

		    $scope.appltype = function()
			  {
						$ionicLoading.show({
							template: 'Loading...'
						});
						
				var lookUpCode = "APT";
				RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (response) {
					console.log("response=="+response);
					  if(response==undefined || response==null || response=="")
					  {
						  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						  $ionicLoading.hide();
						  return false;
					  }
					  else
					  {
						  $localStorage.response = response;
//							$state.go("app.NewWaterConnection");
							$state.go("app.NWCApplicantInfo");
						  $ionicLoading.hide();
					  }
					    $ionicLoading.hide();
					}, function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						$ionicLoading.hide();
					})
			  };
	  
$scope.reconndata = function()
	{
		 $ionicLoading.show({	template: 'Loading..'	});
			RestService.reconnectionsearch($scope.orgid,$scope.userID).then(function (responsedata){
				console.log("responsedata--"+JSON.stringify(responsedata));
				if(responsedata.responseDTOs == null || responsedata.responseDTOs == undefined
				|| responsedata.responseDTOs == ""){
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
						return false;
				  	}	                                                                                                                                                                                                                                                                                                                                                                                       
				else{
						$sessionStorage.responsedata = responsedata.responseDTOs;
						console.log("reconnectionSerach--"+JSON.stringify(responsedata.responseDTOs)); 
						$state.go("app.waterReconnection");
						$ionicLoading.hide();
					}  
			},function (err){ 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})	
	}
	  
    var _init = function (){
    	/* $ionicLoading.show({	template: 'Loading..'	});
 		var lookUpCode =  "DIC"
 		RestService.getNHPrefixData(lookUpCode,$scope.orgid)
 		.then(function (DICresponse) {
 			console.log("responseDIC--"+DICresponse);
 		if(DICresponse==undefined || DICresponse == null || DICresponse=="")
 			  {
 			  	 return false;
 			  }
 			  else
 			  {		
 				 $localStorage.DICresponse = DICresponse;
 				  
 				  $scope.DICoptions = new Array();
 				    for(var i=0;i<DICresponse.length;i++){	
 							$scope.DICoptions.push({
 							id : DICresponse[i].lookUpId,
 							name : DICresponse[i].descLangFirst
 					   })
 				    }
 				$ionicLoading.hide();
 			 }
 				$ionicLoading.hide();
 		},function (err){ 
 			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
 			$ionicLoading.hide();
 		})       */ 
    };
    _init();
  });
