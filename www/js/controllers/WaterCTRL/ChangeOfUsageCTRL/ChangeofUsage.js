angular.module('starter')

  .controller('ChangeofUsageCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage) {
/*declare start*/
	 
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

/*declare end*/	  

	  $scope.searchchangeusages = function() {
		  if(!$scope.changeusages == ""){
				$ionicLoading.show({
					template: 'Loading...'
				});
				RestService.changeusageservice($scope.changeusages,$scope.orgid).then(function (usageresponse) {
					if(usageresponse.status == "success"){
					    $localStorage.custinfo = usageresponse.customerInfoDTO;
						console.log("$scope.custinfo--"+JSON.stringify($localStorage.custinfo));
						
						/* search data from getconn service start  */
						var lookUpCode = "CSZ";
						  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsecsz) {
							  console.log("getprefixdataresponsecsz=="+getprefixdataresponsecsz);
//							 
							if(getprefixdataresponsecsz==undefined || getprefixdataresponsecsz == null || getprefixdataresponsecsz=="")
							  {
								$ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.getprefixdataresponsecsz = getprefixdataresponsecsz;
								  $ionicLoading.hide();
							  }
							
							   },function (err) { 
								   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								   $ionicLoading.hide();
							})
							
						  var lookUpCode = "TRF";
						  var level = "1";
						   RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
								  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
								  if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF=="")
								  {
									
									 $ionicLoading.hide();  
								  	 return false;
								  }
								  else
								  {
									  $localStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
									  $ionicLoading.hide();
								  }
							
								},function (err) { 
									toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
									$ionicLoading.hide();
								})
							var lookUpCode = "TRF";
						    var level = "2";
								RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise) {
								  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
								  
								  if(prefixdataresponsepermise==undefined || prefixdataresponsepermise == null || prefixdataresponsepermise=="")
								  {
									  $ionicLoading.hide();  
								  	 return false;
								  }
								  else
								  {
									  $localStorage.prefixdataresponsepermise = prefixdataresponsepermise;
									  $state.go("app.COUoldnewdetails");
									  $ionicLoading.hide();
								  }
								 
								},function (err) { 
									toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
									$ionicLoading.hide();
								})
						
					$ionicLoading.hide();
				}else
					{
						$ionicLoading.hide();
//						alert("Please Enter Valid Connection Number")
						toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
					}
					$ionicLoading.hide();
				}, function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
				
			}
			else { alert ("Please Enter Valid Connection Number"); }
	  }
	  
/*new details*/  

	  
  })
