angular.module('starter')
.controller('waterDisconnectionCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		toaster, $filter, ENV, $state, $localStorage,$sessionStorage){
	$scope.data = {};
	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	
	var connectiondetail;
	$sessionStorage.serviceCode = "WCC";
	$sessionStorage.deptCode = "WT";
	var chargeApplicableAt = "150";
	var lookUpCode = "TRF";
	/*var PermiseText;
	var TarifText;
	var ApplicantType;
	var applbplflag;*/
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
$scope.disconnNoSearchDetails = false;
	  
$scope.disConnNosearch = function()
 {
	var lookUpCode = "TRF";
	$ionicLoading.show({	template: 'Loading..'	});
		RestService.disconnsearchConnectionDetails($scope.orgid,$scope.connectionNosearch)
		.then(function (response) {
			console.log("response--"+response);
			if(response.status == "success")
				{
					$sessionStorage.connectiondetail = response.connectionList;
				  for(var i=0;i<$sessionStorage.connectiondetail.length;i++){
					  var fname = $sessionStorage.connectiondetail[i].csName;
					  if(response.connectionList[i].csMname == null){
						  var middlename = "";
					  }else{
						  var middlename = $sessionStorage.connectiondetail[i].csMname;
					  }
					  var lname = $sessionStorage.connectiondetail[i].csLname;
					  var fullname = fname+ " " +middlename+ " " +lname;
					  
					  $scope.data.disConsumerName = fullname;
					  $scope.data.disAreaName = $sessionStorage.connectiondetail[i].csAdd;
					  var tariftext = $sessionStorage.connectiondetail[i].trmGroup1;
			var lookUpCode = "TRF";
			var level = "1";
		RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
			console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF==""){
				 $ionicLoading.hide();  
				return false;
			}
			else{
			   	for(var i=0;i<getprefixdataresponseTRF.length;i++)
				{
					if(tariftext == getprefixdataresponseTRF[i].lookUpId)
					{
						$sessionStorage.TarifText = getprefixdataresponseTRF[i].descLangFirst;
					}
				} 
				$ionicLoading.hide();
			}
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		  $ionicLoading.hide();
		})
	var permisetext = $sessionStorage.connectiondetail[i].trmGroup2;
	  var level = "2";
	  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (permiseresponse) {
		console.log("getprefixdataresponseTRF=="+permiseresponse);
		if(permiseresponse==undefined || permiseresponse == null || permiseresponse=="")
		{
		  $ionicLoading.hide();  
			return false;
		}
	    else
		{
	    	for(var i=0;i<permiseresponse.length;i++){
				if(permisetext == permiseresponse[i].lookUpId)
				{
					$sessionStorage.PermiseText = permiseresponse[i].descLangFirst;
				}
			}
			 $ionicLoading.hide();
		}
	},function (err) { 
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})
	 var applicantType = $sessionStorage.connectiondetail[i].applicantType;
	  var lookUpCode = "APT";
		RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseAPT){
		console.log("responseAPT=="+responseAPT);
		if(responseAPT==undefined || responseAPT == null || responseAPT=="")
			{
				$ionicLoading.hide();
				return false;
			}
			else
			{
				for(var i=0;i<responseAPT.length;i++){
					if(applicantType == responseAPT[i].lookUpId)
					{
						$sessionStorage.ApplicantType = responseAPT[i].descLangFirst;
					}
				}
				$ionicLoading.hide();
			}
		},function (err) { 
			$ionicLoading.hide();
		})
		var metertype = $sessionStorage.connectiondetail[i].csMeteredccn;
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
							if(metertype == responseWMN[i].lookUpId)
							{
								$sessionStorage.MeterType = responseWMN[i].descLangFirst;
							}
						}
						$ionicLoading.hide();
					}
				},function (err) { 
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})
				
		var connsize = $sessionStorage.connectiondetail[i].csCcnsize;
		var lookUpCode = "CSZ";
		RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responsecsz){
			console.log("responsecsz=--"+responsecsz);
				if(responsecsz==undefined || responsecsz == null || responsecsz=="")
					{
						$ionicLoading.hide();
						return false;
					}
					else
					{
						for(var i=0;i<responsecsz.length;i++){
							if(connsize == responsecsz[i].lookUpId)
							{
								$sessionStorage.ConnSize = responsecsz[i].descLangFirst;
							}
						}
						$ionicLoading.hide();
					}
				},function (err) { 
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})
		
		$sessionStorage.applbplflag = $sessionStorage.connectiondetail[i].bplFlag;
		$scope.disconnNoSearchDetails = true;
				}
				  $ionicLoading.hide();
			}
			else
				{	
					$ionicLoading.hide();
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				}
				$ionicLoading.hide();
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	 }

$scope.validateplumber = function()
{
	var plumberNo = $scope.data.plumberlicNo;
	
	RestService.validatePlumber(plumberNo).then(function (responsedata){
		console.log("plumberNo--"+JSON.stringify(responsedata)); 
	if(responsedata == null || responsedata == "" || responsedata == undefined)
		{
			alert("Please Enter A Valid Plumber License No.");
			return false;
			$ionicLoading.hide();
		}else{
			$sessionStorage.plumberNo = responsedata;
			$ionicLoading.hide();
		}
		$ionicLoading.hide();
	},function (err){ 
		$ionicLoading.hide();
	})	
}

/*----BRMS checklis call-----  */

$scope.confirmtoproceed = function()
{
	$scope.validateplumber();
	
	$sessionStorage.DisConn_Type = $scope.data.disConnType;
	$sessionStorage.disfromdate = $scope.data.disfromdate;
	$sessionStorage.distodate = $scope.data.distodate;
	$sessionStorage.disConnReason = $scope.data.disConnReason;
	$sessionStorage.disPlumberDetail = $scope.data.disPlumberDetail;
//	$sessionStorage.plumberlicNo = $scope.data.plumberlicNo;
	
	 var sel = document.getElementById("DisConnType");
	 $sessionStorage.disConnectionType= sel.options[sel.selectedIndex].text;

	 $ionicLoading.show({	template: 'Loading..'	});
	RestService.checklistcall(
		$sessionStorage.serviceCode,
		$sessionStorage.deptCode,
		$sessionStorage.TarifText,
		$sessionStorage.PermiseText,
		$sessionStorage.ApplicantType,
		$sessionStorage.initializedmodeldata.responseObj[0].isExistingConnectionOrConsumerNo,
		$sessionStorage.initializedmodeldata.responseObj[0].isExistingProperty,
		$sessionStorage.applbplflag,
		$sessionStorage.initializedmodeldata.responseObj[0].usageSubtype3,
		$sessionStorage.initializedmodeldata.responseObj[0].usageSubtype4,
		$sessionStorage.initializedmodeldata.responseObj[0].usageSubtype5,
		$sessionStorage.initializedmodeldata.responseObj[0].noOfDays,
		$sessionStorage.initializedmodeldata.responseObj[0].isOutStandingPending,
		/*$sessionStorage.initializedmodeldata.responseObj[0].isBPL,*/
		$sessionStorage.disConnectionType,
		$sessionStorage.initializedmodeldata.responseObj[0].factor1,
		$sessionStorage.initializedmodeldata.responseObj[0].factor2,
		$sessionStorage.initializedmodeldata.responseObj[0].factor3,
		$sessionStorage.initializedmodeldata.responseObj[0].factor4,
		$scope.orgid
	).then(function (checklistresponsedata){
		console.log("dis checklis--"+JSON.stringify(checklistresponsedata));
	if(checklistresponsedata.wsStatus == "success"){
		$sessionStorage.responsechecklistdata = checklistresponsedata;
		console.log("checklistresponsedata--"+JSON.stringify($sessionStorage.responsechecklistdata));
		$ionicLoading.hide();
	}	
	else{
		  toaster.error($filter('translate')('ERROR'),$filter('translate')('ERROR'));
		  $ionicLoading.hide();
		}  
		$ionicLoading.hide();
	},function (err) { 
		$ionicLoading.hide();
	})
	
  RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,chargeApplicableAt).then(function (setdependresponse){
	console.log("setdependresponse=="+setdependresponse);
	if(setdependresponse.wsStatus == "success"){
		$sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
		$sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
		$sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
		$sessionStorage.TaxSubcategory = setdependresponse.responseObj[0].taxSubCategory;
		$sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
		var lookUpCode = "TAC";
		var level = "2";
		RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
	console.log("TACresponse--"+TACresponse);
	if(TACresponse==undefined || TACresponse == null || TACresponse=="")
	{
		$ionicLoading.hide();
		return false;
	}
	else
	{
		for(var i=0;i<TACresponse.length;i++){
			if(TACresponse[i].lookUpCode ==  $sessionStorage.TaxSubcategory)
			{
				$sessionStorage.TaxSubcategory = TACresponse[i].descLangFirst;
				$state.go("app.UploadDoc");
				$ionicLoading.hide();
			}
		  }
		$ionicLoading.hide();
	  }
	},function (err){ 
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})
}
else{
	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
	$ionicLoading.hide();
}$ionicLoading.hide();
	},function (err) { 	$ionicLoading.hide();		})	
	
}

/*Function Declaration End*/
	
  var _init = function (){
	  $ionicLoading.show({	template: 'Loading..'	});
		var lookUpCode =  "DIC"
		RestService.getNHPrefixData(lookUpCode,$scope.orgid)
		.then(function (DICresponse) {
			console.log("responseDIC--"+DICresponse);
		if(DICresponse==undefined || DICresponse == null || DICresponse=="")
			  {
			  	 return false;
			  }
			  else
			  {		$scope.DICoptions = new Array();
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
		})                  
		
	RestService.getinitializedmodel().then(function (responsedata){
		console.log("ChecklistModel|WaterRateMaster--"+JSON.stringify(responsedata)); 
		if(responsedata.wsStatus == "success"){
			 	$sessionStorage.initializedmodeldata = responsedata;
		  	}	                                                                                                                                                                                                                                                                                                                                                                                       
		else{
//				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			}  
	},function (err){ 
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})	
		
  };
    _init();
});