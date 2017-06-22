angular.module('starter')

  .controller('COpaymentCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage) {
	 
	/*  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.loginUSername = "Gajendra";
	  $scope.LoginMobileNo = "9664611565";*/
 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
		
	  $scope.ServiceShortName = "WCO";
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

	 
$scope.COSFlatRate = $localStorage.responseservicechargedata.responseObj[0].flatRate;
	 $scope.options = new Array();
		for(var i=0;i<$localStorage.Bankresponse.list.length;i++){							
			$scope.options.push({
			id : $localStorage.Bankresponse.list[i].bankId,
			name : $localStorage.Bankresponse.list[i].cbbankname
		})
	} 


		  
$scope.changeownersavedata = function() {
	
	 /*if ($scope.COSFlatRate <= $scope.COUpaidamt) {
			alert("Paid Amount Should Not Be Greater Then Total Amount");
			return false;
		}
		else {*/	
	
	$ionicLoading.show({		
		template: 'Loading...'		
			});
console.log("documentObjectArray---"+JSON.stringify($localStorage.documentObjectArray));
	
var applicantinfo = {
	  organizationName:null,
	  applicantFirstName:$localStorage.responselogindata.firstName,
	  applicantMiddleName:$localStorage.responselogindata.middleName,
	  applicantLastName:$localStorage.responselogindata.lastName,
	  gender:$localStorage.responselogindata.gender,
	  mobileNo:$localStorage.responselogindata.mobileNo,
	  emailId:$localStorage.responselogindata.emailId,
	  pinCode:"",
	  buildingName:"",
	  roadName:"",
	  applicantTitle:$localStorage.responselogindata.title,
	  areaName:"",
	  blockName:"",
	  housingComplexName:null,
	  wing:null,
	  floorNo:null,
	  phone1:null,
	  phone2:null,
	  contactPersonName:null,
	  villageTownSub:"",
	  cfcCitizenId:null,
	  povertyLine:null,
	  orgId:$localStorage.responselogindata.orgId,
	  langId:1,
	  userId:$localStorage.responselogindata.orgId,
	  bplNo:$localStorage.wrisBPLno,
	  flatBuildingNo:"",
	  codTryId1:null,
	  codTryId2:null,
	  codTryId3:null,
	  codTryId4:null,
	  codTryId5:null,
	  aadharNo:"",
	  dwzid1:0,
	  dwzid2:0,
	  dwzid3:null,
	  dwzid4:null,
	  dwzid5:null,
	  isBPL:"N"
}

	RestService.changeofownersaveservice($localStorage.WNCselecttitle,$localStorage.WNCFirstname,$localStorage.WNCMiddlename,$localStorage.WNCLastname,
		$localStorage.COURemarks,$localStorage.changeowner,$localStorage.WNCgender,$localStorage.oldCOWconnName,$localStorage.oldtitle,$localStorage.oldconnNo,$localStorage.CSidn,
		$localStorage.oldCOUconnSize,$localStorage.oldcodDwzid1,$localStorage.oldcodDwzid2,$localStorage.oldCOUtarifCate,$localStorage.oldCOUpermiseType,
		$localStorage.oldCOUmetertype,$localStorage.oldCOUapplicantType,$localStorage.newtransfermode,$localStorage.documentObjectArray,
		$scope.orgid,$scope.userID,applicantinfo,$localStorage.canApplyOrNot,$localStorage.macAddress)
		.then(function(COWresponse){
			console.log("COUresponse=="+COWresponse);
			if(COWresponse.status == "success"){
				$scope.applictNo = COWresponse.applicationNo;
					$ionicLoading.show({	template: 'Loading...'});
						RestService.savePayReqWCU($scope.COSFlatRate,$scope.COUpaymettype,$scope.applictNo,$localStorage.CSidn,$scope.orgid,
							$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,$scope.emailId)
							.then(function (response) {
								if(response.status == "success"){
									$ionicLoading.hide();
									var H= null;
									H = window.open(encodeURI(response.payRequestMsg), '_blank', 
									'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
									H.addEventListener('exit', iabClose);
									H.addEventListener('loadstop', iabClose1);
								function iabClose(event) 
								{
									H.removeEventListener('exit', iabClose); 
									$state.go("app.WaterModule");
								}
							function iabClose1(event){
								if (event.url.match("mobile/close")) {
										H.close();
										H.removeEventListener('loadstop', iabClose1);
										$state.go("app.WaterModule");
									}
								}
							}
						else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
							}
							$ionicLoading.hide();
					}, function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})
						$ionicLoading.hide();
				}
			 else{
					alert("Your Application for Change of Ownership has been Not Saved.");
					$ionicLoading.hide();
				}
			},function (err) { 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
//		}
 };	  
		  
		  
	  
	
  })
