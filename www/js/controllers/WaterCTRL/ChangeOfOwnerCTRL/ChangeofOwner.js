angular.module('starter')

  .controller('ChangeofOwnerCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage,$ionicPopup) {
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	 // $scope.waterBillSearch = false;
		
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.isOutStandingPending;
	  $scope.isExistingConnectionOrConsumerNo
	  $scope.isExistingProperty;
	  $scope.disConnectionType;
	  $scope.factor1;
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;
	  
	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
		var cosconnsizetext;
		var costariftext;
		var cospermisetext;
		$scope.selectfilename;
		$scope.newtransfermode;
		/*old data*/
		$scope.oldCOWconnName;
		$scope.oldtitle;
		$scope.oldconnNo;
		$scope.oldcsidn;
		$scope.oldCOUconnSize;
		$scope.oldcodDwzid1;
		$scope.oldcodDwzid2;
		$scope.oldCOUtarifCate;
		$scope.oldCOUpermiseType;
		$scope.oldCOUmetertype;
		$scope.oldCOUapplicantType;
	  
	  
	 var tempTest = 0;
		  
	$scope.searchchangeowner = function() {
		  if(!$scope.changeowner == ""){
				$ionicLoading.show({
					template: 'Loading...'
				});
				
				RestService.changeofownerservice($scope.changeowner,$scope.orgid).then(function (ownerresponse){
					$localStorage.canApplyOrNot = ownerresponse.canApplyOrNot;
					if(ownerresponse.canApplyOrNot == "Y"){
						 $localStorage.ownerresponse = ownerresponse;
						 console.log("ownerresponse---"+$localStorage.ownerresponse);
						 
						 var lookUpCode  = "CSZ";
						 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsecsz){
						  console.log("getprefixdataresponsecsz=="+getprefixdataresponsecsz);
							  if(getprefixdataresponsecsz==undefined || getprefixdataresponsecsz == null || getprefixdataresponsecsz=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.getprefixdataresponsecsz = getprefixdataresponsecsz;
								  if(tempTest==0)
								  $ionicLoading.hide();
							  } 
						  		
						   },function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})
						
						   var lookUpCode  = "TRF";
					  		var level = "1";
					      RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF){
							  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
							  if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
								  if(tempTest==0)
								  $ionicLoading.hide();
							  }
//							  	$localStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
							},function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })
							
							 var lookUpCode  = "TRF";
					   		 var level = "2";
							RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise){
							  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
							  if(prefixdataresponsepermise==undefined || prefixdataresponsepermise == null || prefixdataresponsepermise=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.prefixdataresponsepermise = prefixdataresponsepermise;
								  if(tempTest==0)
								  $ionicLoading.hide();
							  }
//							  	$localStorage.prefixdataresponsepermise = prefixdataresponsepermise;
							},function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})
					
					/*new details*/		
						 var lookUpCode  = "GEN";
						  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsegen){
							  console.log("getprefixdataresponsegen=="+getprefixdataresponsegen);
							  if(getprefixdataresponsegen==undefined || getprefixdataresponsegen == null || getprefixdataresponsegen=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.getprefixdataresponsegen = getprefixdataresponsegen;
								  if(tempTest==0)
								  $ionicLoading.hide();
							  }
//							  $localStorage.getprefixdataresponsegen = getprefixdataresponsegen;
							},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })
							
							 var lookUpCode  = "TTL";
						  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsettl){
							  console.log("getprefixdataresponsettl=="+getprefixdataresponsettl);
							  if(getprefixdataresponsettl==undefined || getprefixdataresponsettl == null || getprefixdataresponsettl=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.getprefixdataresponsettl = getprefixdataresponsettl;
								  if(tempTest==0)
								  $ionicLoading.hide();
							  }
//							  $localStorage.getprefixdataresponsettl = getprefixdataresponsettl;
							},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})
							
							var lookUpCode  = "TFM";
						   RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (TFMresponse){
							   console.log("TFMresponse=="+TFMresponse);
							   if(TFMresponse==undefined || TFMresponse == null || TFMresponse=="")
							  {
								  tempTest	=	1;
								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $localStorage.TFMresponse = TFMresponse;
								  if(tempTest==0)
									  $state.go("app.COoldnewdetails");
								  $ionicLoading.hide();
							  }
//							  $localStorage.TFMresponse = TFMresponse;
							},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));	})
					 					
							
//					$state.go("app.COoldnewdetails");
					$ionicLoading.hide();
				}else{
					
					$scope.applyornot = ownerresponse.canApplyOrNot;
//					alert($scope.applyornot);
					
					var confirmPopup = $ionicPopup.show({
						 title : 'Change Of OwnerShip',
				         template : '<b>#'+$scope.applyornot+'</b>',
				         buttons : [{
				             text : 'Proceed',
				             type : 'button-balanced',
				             onTap : function(){
				             }
			          		}]
						});
					$ionicLoading.hide();
				  }
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
				
		  }else{alert ("Please Enter Valid Connection Number");}
	  };
  })
