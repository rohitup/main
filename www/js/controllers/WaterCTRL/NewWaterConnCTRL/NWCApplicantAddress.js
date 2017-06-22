
angular.module('starter')

  .controller('NewWaterconnAddressCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage) {
	  
	  $scope.data_ = {};
	  /*$scope.orgid = sharedProperties.getorgID();
//	  $scope.UserId = sharedProperties.getuserID();
	  $scope.userID = sharedProperties.getuserID();*/
	   /* $scope.orgid = "81";
		$scope.userID = "1";
		$scope.loginUSername = "2";
		$scope.LoginMobileNo = "2";*/
		var tempTest = 0;
  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  
	  $scope.checklist ='';
	  $scope.WNCtarif;
	  $scope.WNCpermise;
	  $scope.WNCapplicantype;
	  $scope.WNCexistconsumerdetail;
	  $scope.WNCexistproperty;
	  $scope.WNCBpl;
	  $scope.settemp;
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.noOfDays;
	  $scope.isOutStandingPending;
	  $scope.disConnectionType;
	  $scope.factor1; 
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;
	  
	  var apptypetext;
	  var tariftext;
	  var permisetext;
	 
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
		  
		$scope.selectfilename;


		$scope.billinghide = true;
	    $scope.checkedOrNot = function (addinfochecked) {
	    	
	        if (addinfochecked) {
	            $scope.billinghide = false;
	        } else {
	        	
	        	 $scope.billinghide = true;
	        }
	    };
		
	   
	    $scope.onlyNumericSixLimitInput = function()
		 {
		 	var addpincode = document.getElementById("addpincode").value;
		 	var inputVal = addpincode;
		 	    var numericReg = /^[0-9]{1,6}$/;
		 	    if(!numericReg.test(inputVal) || inputVal.length>6) 
		 	    {
		 	    	inputVal.slice(0,-1);
		 	    	var inputValSlice = inputVal.slice(0,-1);
		 	    	document.getElementById("addpincode").value = inputValSlice;
		 	    }
		 };	

	  
	  $scope.applicantinfoaddress = function() {
		   var pincode = document.getElementById("addpincode").value;
		  if ($scope.WNCpincode == "" || $scope.WNCpincode == null || $scope.WNCpincode == undefined) {
				 alert("Please Enter Your Pincode");
				  return ;
			}
			else if(/^\s|\s$/.test(pincode) || !(/^[0-9]{1,6}$/.test(pincode)) || pincode.length != 6){
				alert("Please Enter a Valid Pincode Number");
				return;
		  }
			else{
			
		  $scope.WNCroadname;
		  $localStorage.WNCroadname = $scope.WNCroadname;
		  $scope.WNCareaname;
		  $localStorage.WNCareaname = $scope.WNCareaname;
		  $scope.WNCtowncity;
		  $localStorage.WNCtowncity = $scope.WNCtowncity;
		  $scope.WNCpincode;
		  $localStorage.WNCpincode = $scope.WNCpincode;
		  $scope.isChecked;
		  $localStorage.addinfochecked = $scope.addinfochecked;
		  $scope.data_.WNCbillroadname;
//		  alert( " $scope.WNCbillroadname--"+$scope.data_.WNCbillroadname);
		  $localStorage.WNCbillroadname = $scope.data_.WNCbillroadname;
		  $scope.data_.WNCbillareaname;
		  $localStorage.WNCbillareaname = $scope.data_.WNCbillareaname;
		  $scope.data_.WNCbilltowncity;
		  $localStorage.WNCbilltowncity = $scope.data_.WNCbilltowncity;
		  $scope.data_.WNCbillpincode;
		  $localStorage.WNCbillpincode = $scope.data_.WNCbillpincode;
	
		  $ionicLoading.show({
				template: 'Loading...'
			});
		 
		  var lookUpCode = "TRF";
		  var level = "1";
		  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
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
//					  $state.go("app.NWCExistConndetails");
				  $ionicLoading.hide();
			  } 
			 /* $localStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
			  $ionicLoading.hide();*/
			},function (err) { 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
			
			
			  var lookUpCode = "CCG";
			  var level = "1";
		  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseCCG) {
				  console.log("getprefixdataresponseCCG=="+getprefixdataresponseCCG);
				  
				  if(getprefixdataresponseCCG==undefined || getprefixdataresponseCCG == null || getprefixdataresponseCCG=="")
				  {
					  tempTest	=	1;
					  $ionicLoading.hide();
				  	 return false;
				  }
				  else
				  {
					  $localStorage.getprefixdataresponseCCG = getprefixdataresponseCCG;
					  if(tempTest==0)
//							 $state.go("app.NWCExistConndetails");
					  $ionicLoading.hide();
				  }
				  /*$localStorage.getprefixdataresponseCCG = getprefixdataresponseCCG;
				  $ionicLoading.hide();*/
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
				})
				
				
			var lookUpCode = "CSZ"
		  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsecsz) {
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
					 $ionicLoading.hide();
//						alert("insidetempTest--"+tempTest);
					 if(tempTest==0)
						 $state.go("app.NWCExistConndetails");
	//			  $state.go("app.NewWaterConnection");
			  }
			 
			/* $localStorage.getprefixdataresponsecsz = getprefixdataresponsecsz;
			 $ionicLoading.hide();*/
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})
		  
	
			}
	  };
	  
	  
	  $scope.goBack = function(){
		  $location.path('app');
	  };
  
  }) /*controler ends*/
  
