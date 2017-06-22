angular.module('starter')

  .controller('COUOldNewCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage ) {
/*declare start*/

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;
	 $localStorage.serviceCode = "WCU";
	 $localStorage.deptCode = "WT";
	 var chargeApplicableAt = "150";
/*declare end*/	  
	  

	/* search data from getconn service start  */
						
						$scope.csidn = $localStorage.custinfo.csIdn;
						$localStorage.CSidn = $scope.csidn;
						$scope.connNo = $localStorage.custinfo.csCcn;
						$localStorage.connNo = $scope.connNo;
						var fname = $localStorage.custinfo.csName;
						var Mname =$localStorage.custinfo.csMname;
						var Lname = $localStorage.custinfo.csLname;
//						var res = fname.concat(Mname).concat(Lname);
						var res = fname.concat(" "+Lname);
						$scope.COUconnName = res;
						$localStorage.COUconnName = $scope.COUconnName;
						$scope.COUconnSize = $localStorage.custinfo.csCcnsize;
						$localStorage.COUconnSize = $scope.COUconnSize;
						$scope.COUtarifCate = $localStorage.custinfo.trmGroup1;
						$localStorage.COUtarifCate = $scope.COUtarifCate;
						$scope.COUpermiseType = $localStorage.custinfo.trmGroup2;
						$localStorage.COUpermiseType = $scope.COUpermiseType;
						$scope.appltitle = $localStorage.custinfo.csTitle;
						$localStorage.appltitle = $scope.appltitle;
						$scope.applFName = $localStorage.custinfo.csName;
						$localStorage.applFName = $scope.applFName;
						$scope.applMname = $localStorage.custinfo.csMname;
						$localStorage.applMname = $scope.applMname;
						$scope.applLname = $localStorage.custinfo.csLname;
						$localStorage.applLname = $scope.applLname;
						$scope.appladdress = $localStorage.custinfo.csAdd;
						$localStorage.appladdress = $scope.appladdress;
						$scope.applRoadname = $localStorage.custinfo.csRdcross;
						$localStorage.applRoadname = $scope.applRoadname;
						$scope.applmobileno = $localStorage.custinfo.csContactno;
						$localStorage.applmobileno = $scope.applmobileno;
						
						$scope.applConntype = $localStorage.custinfo.csCcntype;
						$localStorage.applConntype = $scope.applConntype;
						$scope.applnoofUsers = $localStorage.custinfo.csNoofusers;
						$localStorage.applnoofUsers = $scope.applnoofUsers;
						$scope.applConnsize = $localStorage.custinfo.csCcnsize;
						$localStorage.applConnsize = $scope.applConnsize;
						$scope.applnoofTaps = $localStorage.custinfo.csNooftaps;
						$localStorage.applnoofTaps = $scope.applnoofTaps;
						$scope.applmeterread = $localStorage.custinfo.csMeteredccn;
						
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
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})
						
						$scope.applListatus = $localStorage.custinfo.csListatus;
						$localStorage.applListatus = $scope.applListatus;
						$scope.applDwzid1 = $localStorage.custinfo.codDwzid1;
						$localStorage.applDwzid1 = $scope.applDwzid1;
						$scope.applDwzid2 = $localStorage.custinfo.codDwzid2;
						$localStorage.applDwzid2 = $scope.applDwzid2;
						$scope.applcategory1 = $localStorage.custinfo.csCcncategory1;
						$localStorage.applcategory1 = $scope.applcategory1;
						$scope.applbplflag = $localStorage.custinfo.bplFlag;
						$localStorage.applbplflag = $scope.applbplflag;
						$scope.applbplno = $localStorage.custinfo.bplNo;
						$localStorage.applbplno = $scope.applbplno;
						$scope.applicantType = $localStorage.custinfo.applicantType;
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
									if($scope.applicantType == responseAPT[i].lookUpId)
									{
										$localStorage.applicantType = responseAPT[i].descLangFirst;
									}
								}
								$ionicLoading.hide();
							}
						},function (err) { 
//							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								$ionicLoading.hide();
						})
						/* search data from getconn service ended */
						
						$scope.cszoptions = new Array();
					    for(var i=0;i<$localStorage.getprefixdataresponsecsz.length;i++){	
								$scope.cszoptions.push({
								cszid : $localStorage.getprefixdataresponsecsz[i].lookUpId,
								cszvalue : $localStorage.getprefixdataresponsecsz[i].descLangFirst,
								cszname : $localStorage.getprefixdataresponsecsz[i].descLangFirst
						   })
					    } 
//						
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
					    
					    $("#cszoptions").val(COUconnSize).change();
					    $("#trfoptions").val(COUtarifCate).change();
					    $("#permiseoptions").val(COUpermiseType).change();
	  
/*new details*/  

/*  $scope.TRFprefix = function(){ 
	  var lookUpCode = "TRF";
	  var level = "1";
		  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.trfoptions = new Array();
			    for(var i=0;i<getprefixdataresponseTRF.length;i++){	
						$scope.trfoptions.push({
						trfid : getprefixdataresponseTRF[i].lookUpId,
						trfvalue : getprefixdataresponseTRF[i].descLangFirst,
						trfname : getprefixdataresponseTRF[i].descLangFirst
				   })
			    }
			},function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			})
	  };*/
	
	  $scope.selectAction = function() {
		    console.log($scope.newCOUtarifnew);
		    $scope.$watch('newCOUtarifnew', function(newVal) {
		    	var lookUpCode = "TRF";
				  var level = "2";
		            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise) {
					console.log("prefixdataresponsepermise---"+prefixdataresponsepermise);
					  
					$scope.permiseoptions1 = new Array();
					    for(var i=0;i<prefixdataresponsepermise.length;i++)
					    	if(prefixdataresponsepermise[i].lookUpParentId == $scope.newCOUtarifnew)
					    	{
					    	 console.log("prefixdataresponsepermise=="+prefixdataresponsepermise[i]);
								$scope.permiseoptions1.push({
								permiseid1 : prefixdataresponsepermise[i].lookUpId,
								permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
								permisename1 : prefixdataresponsepermise[i].descLangFirst
						   })
					    }
					},function (err) { 
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
		    });
	  	};
	
  		$scope.selectpermise = function() {
		    console.log($scope.newCOUpermise);
//		    alert("permise---"+$scope.newCOUpermise);
		};

$scope.confrmproceed = function() {
		$localStorage.newCOUtarifnew = $scope.newCOUtarifnew;
		  console.log("newCOUtarifnew--"+$localStorage.newCOUtarifnew);
		  var sel = document.getElementById("NCOutarif");
		  coutariftext= sel.options[sel.selectedIndex].text;
		  $localStorage.coutariftext = coutariftext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $localStorage.newCOUpermise = $scope.newCOUpermise;
		  console.log("newCOUpermise--"+$localStorage.newCOUpermise);
		  var sel = document.getElementById("NCOUpermise");
		  coupermisetext= sel.options[sel.selectedIndex].text;
		  $localStorage.coupermisetext =coupermisetext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $localStorage.COURemarks = $scope.COURemarks;
		  console.log("COURemarks--"+$localStorage.COURemarks);
		  
		  $scope.checklist ='';
		  
	    	$ionicLoading.show({
					template: 'Loading...'
				});
		
		RestService.checklistcall($localStorage.serviceCode,$localStorage.deptCode,coutariftext,coupermisetext,$localStorage.applicantType,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
			$localStorage.applbplflag,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.noOfDays,$scope.isOutStandingPending,
		    $scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
		    $scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
			if(responsechecklistdata.wsStatus == "success"){
				$localStorage.responsechecklistdata = responsechecklistdata;
				$ionicLoading.hide();
				}	
				else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					}  
			$ionicLoading.hide();
			},function (err) { 
//				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
			
			RestService.setdepentparams($scope.orgid,$localStorage.serviceCode,chargeApplicableAt).then(function (setdependresponse){
			  console.log("setdependresponse=="+setdependresponse);
			  if(setdependresponse.wsStatus == "success"){
				  $localStorage.couTaxType = setdependresponse.responseObj[0].taxType;
				  $localStorage.couTaxCode = setdependresponse.responseObj[0].taxCode;
				  $localStorage.couTaxCategory = setdependresponse.responseObj[0].taxCategory;
				  $localStorage.couTaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
				  $localStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
				  var lookUpCode = "TAC";
				  var level = "2";
		            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
					  console.log("TACresponse--"+TACresponse);
					
					    for(var i=0;i<TACresponse.length;i++){
					    	if(TACresponse[i].lookUpCode ==  $localStorage.couTaxSubcategory1)
					    	{
					    		 $localStorage.couTaxSubcategory = 	TACresponse[i].descLangFirst;
					    		 $state.go("app.COUuploaddoc");
					    		 $ionicLoading.hide();
					    }
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
				  },function (err) { 
//					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
					})
		  	  };
	 
var _init = function ()
{
	$ionicLoading.show({
		template: 'Loading...'
	});
	RestService.getinitializedmodel().then(function (responsedata){
		console.log("COUresposeaayaainitial--"+responsedata); 

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
					$scope.isBPL = responsedata.responseObj[0].isBPL;
					$scope.noOfDays = responsedata.responseObj[0].noOfDays;
					$scope.serviceCode = responsedata.responseObj[0].serviceCode;
					$scope.deptCode = responsedata.responseObj[0].deptCode;
					$scope.applicantType = responsedata.responseObj[0].applicantType;
					$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
					$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
					$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
					$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
					
					/*water rate master*/
					
					$localStorage.couwrorgId = responsedata.responseObj[1].orgId;
					$localStorage.couwrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
					$localStorage.couwrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
					$localStorage.couwrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
					$localStorage.couwrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
					$localStorage.couwrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
					$localStorage.couwrfactor1 = responsedata.responseObj[1].factor1;
					$localStorage.couwrfactor2 = responsedata.responseObj[1].factor2;
					$localStorage.couwrfactor3 = responsedata.responseObj[1].factor3;
					$localStorage.couwrfactor4 = responsedata.responseObj[1].factor4;
					$localStorage.couwrisBPL = responsedata.responseObj[1].isBPL;
					$localStorage.couwrServiceCode = responsedata.responseObj[1].serviceCode;
					$localStorage.couwrDeptCode = responsedata.responseObj[1].deptCode;
					$localStorage.couwrTaxType = responsedata.responseObj[1].taxType;
					$localStorage.couwrTaxCode = responsedata.responseObj[1].taxCode;
					$localStorage.couwrTaxCate = responsedata.responseObj[1].taxCategory;
					$localStorage.couwrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
					$localStorage.couwrMeterType = responsedata.responseObj[1].meterType;
					$localStorage.couwrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
					$localStorage.couwrConnSize = responsedata.responseObj[1].connectionSize;
					$localStorage.couwrConnType = responsedata.responseObj[1].connectionType;
					$localStorage.couwrRoadType = responsedata.responseObj[1].roadType;
					$localStorage.couwrtransferMode = responsedata.responseObj[1].transferMode;
					$localStorage.couwrDisConnType = responsedata.responseObj[1].disConnectionType;
					$localStorage.couwrRatestartDate = responsedata.responseObj[1].rateStartDate;
					$ionicLoading.hide();
		  	}	                                                                                                                                                                                                                                                                                                                                                                                       
		else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
			}  
	},function (err) { 
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})
	
};
 _init();
/**/	  
  })
