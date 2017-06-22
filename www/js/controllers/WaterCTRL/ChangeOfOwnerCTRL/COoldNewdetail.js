angular.module('starter')

  .controller('COoldNewDetailCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage) {
	  
	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

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
	  $localStorage.serviceCode = "WCO";
	  $localStorage.deptCode = "WT";
	  var chargeApplicableAt = "150";
	  
	 /*  water rate master
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
		$scope.FlatRate;*/
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
	  

	  console.log("ownerresponse---"+$localStorage.ownerresponse);
					
					$scope.oldCOWconnName = $localStorage.ownerresponse.oldOwnerFullName;
					$localStorage.oldCOWconnName = $scope.oldCOWconnName;
					$scope.oldtitle = $localStorage.ownerresponse.cooOtitle;
					$localStorage.oldtitle = $scope.oldtitle;
					$scope.oldconnNo = $localStorage.ownerresponse.connectionNumber;
					$localStorage.oldconnNo = $scope.oldconnNo;
					$scope.oldcsidn = $localStorage.ownerresponse.conId;
					$localStorage.CSidn = $scope.oldcsidn;
					$scope.oldCOUconnSize = $localStorage.ownerresponse.conSize;
					
					 var lookUpCode = "CSZ";
			            RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (CSZresponse) {
						  console.log("CSZresponse=="+CSZresponse);
						
						    for(var i=0;i<CSZresponse.length;i++)
						    	if(CSZresponse[i].lookUpId == $scope.oldCOUconnSize)
						    	{
						    		$localStorage.oldCOUconnSize = 	CSZresponse[i].descLangFirst;
						    		$ionicLoading.hide();
						    }
						},function (err){ 
							 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								$ionicLoading.hide();
					})
					
					$localStorage.oldCOUconnSize = $scope.oldCOUconnSize;
					$scope.oldcodDwzid1 = $localStorage.ownerresponse.codDwzid1;
					$localStorage.oldcodDwzid1 = $scope.oldcodDwzid1;
					$scope.oldcodDwzid2 = $localStorage.ownerresponse.codDwzid2;
					$localStorage.oldcodDwzid2 = $scope.oldcodDwzid2;
					$scope.oldCOUtarifCate = $localStorage.ownerresponse.trmGroup1;
					$localStorage.oldCOUtarifCate = $scope.oldCOUtarifCate;
					$scope.oldCOUpermiseType = $localStorage.ownerresponse.trmGroup2;
					$localStorage.oldCOUpermiseType = $scope.oldCOUpermiseType;
//					$scope.oldCOUmetertype = $localStorage.ownerresponse.meterType;
					$scope.applmeterread = $localStorage.ownerresponse.meterType;
					
					var lookUpCode = "WMN";
					 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseWMN){
					console.log("responseWMN=="+responseWMN);
					if(responseWMN==undefined || responseWMN == null || responseWMN=="")
						{
							$ionicLoading.hide();
							return false;
						}
						else
						{
							for(var i=0;i<responseWMN.length;i++){
								if($scope.applmeterread == responseWMN[i].lookUpId)
								{
									$localStorage.applmeterread = responseWMN[i].descLangFirst;
								}
							}
							$ionicLoading.hide();
						}
					},function (err) { 
//						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
					})
					
					
					$scope.oldCOUapplicantType = $localStorage.ownerresponse.applicantType;
//					$localStorage.oldCOUapplicantType = $scope.oldCOUapplicantType;
					var lookUpCode = "APT";
					RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseAPT){
					console.log("responseWMN=="+responseAPT);
					if(responseAPT==undefined || responseAPT == null || responseAPT=="")
						{
							$ionicLoading.hide();
							return false;
						}
						else
						{
							for(var i=0;i<responseAPT.length;i++){
								if($scope.oldCOUapplicantType == responseAPT[i].lookUpId)
								{
									$localStorage.applicantType = responseAPT[i].descLangFirst;
								}
							}
							$ionicLoading.hide();
						}
					},function (err) { 
//						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
					})

					
						$scope.cszoptions = new Array();
						    for(var i=0;i<$localStorage.getprefixdataresponsecsz.length;i++){	
									$scope.cszoptions.push({
									cszid : $localStorage.getprefixdataresponsecsz[i].lookUpId,
									cszvalue : $localStorage.getprefixdataresponsecsz[i].descLangFirst,
									cszname : $localStorage.getprefixdataresponsecsz[i].descLangFirst
							   })
						    } 
							$scope.trfoptions = new Array();
							    for(var i=0;i<$localStorage.getprefixdataresponseTRF.length;i++){	
										$scope.trfoptions.push({
										trfid : $localStorage.getprefixdataresponseTRF[i].lookUpId,
										trfvalue : $localStorage.getprefixdataresponseTRF[i].descLangFirst,
										trfname : $localStorage.getprefixdataresponseTRF[i].descLangFirst
								   })
								   $scope.prefix = $localStorage.getprefixdataresponseTRF[i].lookUpId;
							    }
							  
							$scope.permiseoptions = new Array();
							    for(var i=0;i<$localStorage.prefixdataresponsepermise.length;i++){	
										$scope.permiseoptions.push({
										permiseid : $localStorage.prefixdataresponsepermise[i].lookUpId,
										permisevalue : $localStorage.prefixdataresponsepermise[i].descLangFirst,
										permisename : $localStorage.prefixdataresponsepermise[i].descLangFirst
								   })
								   $scope.prefix = $localStorage.prefixdataresponsepermise[i].lookUpId;
							    }
							    
							    $("#cszoptions").val(oldconnsize).change();
							    $("#trfoptions").val(oldtarifcos).change();
							    $("#permiseoptions").val(oldpermisecos).change();
							
				
	/*new prefix*/
$scope.genoptions = new Array();
	for(var i=0;i<$localStorage.getprefixdataresponsegen.length;i++){	
		$scope.genoptions.push({
		genid : $localStorage.getprefixdataresponsegen[i].lookUpId,
		genname : $localStorage.getprefixdataresponsegen[i].descLangFirst
	})
} 						    
							    
$scope.ttloptions = new Array();
    for(var i=0;i<$localStorage.getprefixdataresponsettl.length;i++){	
			$scope.ttloptions.push({
			ttlid : $localStorage.getprefixdataresponsettl[i].lookUpId,
			ttlname : $localStorage.getprefixdataresponsettl[i].descLangFirst
   })
} 							    
$scope.tfmoptions = new Array();
    for(var i=0;i<$localStorage.TFMresponse.length;i++){	
			$scope.tfmoptions.push({
			tfmid : $localStorage.TFMresponse[i].lookUpId,
			tfmname : $localStorage.TFMresponse[i].descLangFirst
	 })
} 							    
	  
    $scope.confrmproceed = function(){
		 
			$localStorage.newtransfermode = $scope.newtransfermode;
			$localStorage.WNCselecttitle = $scope.WNCselecttitle;
			$localStorage.WNCFirstname = $scope.WNCFirstname;
			$localStorage.WNCMiddlename = $scope.WNCMiddlename;
			$localStorage.WNCLastname = $scope.WNCLastname;
			$localStorage.WNCgender = $scope.WNCgender;
			$localStorage.WNCaadharnumber = $scope.WNCaadharnumber;
			$localStorage.COURemarks = $scope.COURemarks;
			
		  $scope.newtransfermode;
		  $localStorage.newtransfermode = $scope.newtransfermode;
		  var sel = document.getElementById("TFMname");
		  TFMtext = sel.options[sel.selectedIndex].text;
		  $localStorage.TFMtext = TFMtext;
		  console.log(sel.options[sel.selectedIndex].text);
		  
		  $scope.oldCOUtarifCate;
		  console.log("oldCOUtarifCate--"+$scope.oldCOUtarifCate);
		  
		  var sel = document.getElementById("oldtarifcos");
		  costariftext= sel.options[sel.selectedIndex].text;
		  $localStorage.costariftext =costariftext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $scope.oldCOUpermiseType;
		  console.log("oldCOUpermiseType--"+$scope.oldCOUpermiseType);
		  var sel = document.getElementById("oldpermisecos");
		  cospermisetext= sel.options[sel.selectedIndex].text;
		  $localStorage.cospermisetext = cospermisetext;
		  
		  var sel = document.getElementById("oldconnsize");
		  cosconnsizetext= sel.options[sel.selectedIndex].text;
		  $localStorage.cosconnsizetext = cosconnsizetext;
		  
			  $scope.checklist ='';
//				var apptypetext = "Individual";
//				var WNCBpl = "N";
//			RestService.COSchecklistcall(costariftext,cospermisetext,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
//				$scope.isOutStandingPending,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,$scope.disConnectionType,
//				$scope.factor1,$scope.factor2,$scope.factor3,$scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			//alert($scope.COBpl);
		RestService.checklistcall(
				$localStorage.serviceCode,
				$localStorage.deptCode,
				costariftext,
				cospermisetext,
				$localStorage.applicantType,
				$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
				$scope.COBpl,
				$scope.usageSubtype3,
				$scope.usageSubtype4,
				$scope.usageSubtype5,
				$scope.noOfDays,
				$scope.isOutStandingPending,
				$scope.disConnectionType,
				$scope.factor1,$scope.factor2,$scope.factor3,$scope.factor4,
				$scope.orgid).then(function (responsechecklistdata){		
				
				console.log("responsechecklistdata--"+responsechecklistdata);
				if(responsechecklistdata.wsStatus == "success"){
					
								$ionicLoading.show({
									template: 'Loading...'
								});
								
								$localStorage.responsechecklistdata = responsechecklistdata;
								
								$ionicLoading.hide();
							} 
					else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						}$ionicLoading.hide();
					  },function (err) { 
							$ionicLoading.hide();
						})
					
//			RestService.COSsetdepentparams($scope.orgid).then(function (setdependresponse) {
	RestService.setdepentparams($scope.orgid,$localStorage.serviceCode,chargeApplicableAt).then(function (setdependresponse){
			  console.log("setdependresponse=="+setdependresponse);
			  if(setdependresponse.wsStatus == "success"){
				  $localStorage.TaxType = setdependresponse.responseObj[0].taxType;
				  $localStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
				  $localStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
				  $localStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
				  $localStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
				  var lookUpCode = "TAC";
				  var level = "2";
		            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
					  console.log("TACresponse=="+TACresponse);
					
					    for(var i=0;i<TACresponse.length;i++)
					    	if(TACresponse[i].lookUpCode == $localStorage.TaxSubcategory1)
					    	{
					    		$localStorage.TaxSubcategory = 	TACresponse[i].descLangFirst;
					    		$state.go("app.COuploaddoc");
					    		$ionicLoading.hide();
					    }
					},function (err){ 
						 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
				})
			$ionicLoading.hide();
		  }
		else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			}$ionicLoading.hide();
		  },function (err) { 
			  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})	
						
};

var _init = function (){
	$ionicLoading.show({
		template: 'Loading...'
	});
RestService.getinitializedmodel().then(function (responsedata){
	console.log("resposeaayaainitial--"+responsedata); 
//	alert("resposeaayaainitial.wsStatus--"+responsedata.wsStatus)

	if(responsedata.wsStatus == "success"){

				$scope.orgId = responsedata.responseObj[0].orgId;
				$scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
				$scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
				$scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
				$scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
				$scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
				$scope.factor1 = responsedata.responseObj[0].factor1;
				$scope.factor2 = responsedata.responseObj[0].factor2;
				$scope.factor3 = responsedata.responseObj[0].factor3;
				$scope.factor4 = responsedata.responseObj[0].factor4;
				//$scope.isBPL = responsedata.responseObj[0].isBPL;
				$scope.noOfDays = responsedata.responseObj[0].noOfDays;
				$scope.serviceCode = responsedata.responseObj[0].serviceCode;
				$scope.deptCode = responsedata.responseObj[0].deptCode;
				$scope.applicantType = responsedata.responseObj[0].applicantType;
				$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
				$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
				$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
				$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
				
				/*water rate master*/
				
				$localStorage.wrorgId = responsedata.responseObj[1].orgId;
				$localStorage.wrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
				$localStorage.wrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
				$localStorage.wrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
				$localStorage.wrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
				$localStorage.wrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
				$localStorage.wrfactor1 = responsedata.responseObj[1].factor1;
				$localStorage.wrfactor2 = responsedata.responseObj[1].factor2;
				$localStorage.wrfactor3 = responsedata.responseObj[1].factor3;
				$localStorage.wrfactor4 = responsedata.responseObj[1].factor4;
				$localStorage.wrisBPL = $scope.COBpl;
				$localStorage.wrisBPLno = $scope.CObplno;
				$localStorage.wrServiceCode = responsedata.responseObj[1].serviceCode;
				$localStorage.wrDeptCode = responsedata.responseObj[1].deptCode;
				$localStorage.wrTaxType = responsedata.responseObj[1].taxType;
				$localStorage.wrTaxCode = responsedata.responseObj[1].taxCode;
				$localStorage.wrTaxCate = responsedata.responseObj[1].taxCategory;
				$localStorage.wrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
				$localStorage.wrMeterType = responsedata.responseObj[1].meterType;
				$localStorage.wrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
				$localStorage.wrConnSize = responsedata.responseObj[1].connectionSize;
				$localStorage.wrConnType = responsedata.responseObj[1].connectionType;
				$localStorage.wrRoadType = responsedata.responseObj[1].roadType;
				$localStorage.wrtransferMode = responsedata.responseObj[1].transferMode;
				$localStorage.wrDisConnType = responsedata.responseObj[1].disConnectionType;
				$localStorage.wrRatestartDate = responsedata.responseObj[1].rateStartDate;
				$ionicLoading.hide();
	  	}	
	else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			}  
},function (err) { 
//	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
	$ionicLoading.hide();
})
	
}

_init();
	  
  })
