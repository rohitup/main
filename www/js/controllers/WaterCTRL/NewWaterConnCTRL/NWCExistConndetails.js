angular.module('starter')

  .controller('NewWaterconnExistCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage) {
	  
	  $scope.data_ = {};
	  
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
		
		$localStorage.serviceCode = "WNC";
		$localStorage.deptCode = "WT";
		var chargeApplicableAt = "150";
	    
	    $scope.WNCexistconsumerdetail = false;
	    $scope.checkedOrNotexist = function (existdetail) {
	    	
	        if (existdetail) {
	            $scope.WNCexistconsumerdetail = true;
	        } else {
	        	
	        	 $scope.WNCexistconsumerdetail = false;
	        }
	    };
		
	    $scope.WNCexistpropertydetails = false;
	    $scope.checkedOrNotprop = function (WNCexistproperty) {
	    	
	        if (WNCexistproperty) {
	            $scope.WNCexistpropertydetails = true;
	        } else {
	        	
	        	 $scope.WNCexistpropertydetails = false;
	        }
	    };
		
/*prefix data start*/
	/*    $scope.options = [{
            value: "Y",
            Name: 'Yes',
            selected: false
        }, {
            value: "N",
            Name: 'No',
            selected: true
        }];
	    
	   $scope.WNCexistconsumerdetail = 1;*/
	    
	    $scope.existdata = {};
        $scope.existdata = [
            { value: "Y", label: "Yes" }
            ,
            { value: "N", label: "No" }
        ];
        $scope.WNCexistconsumerdetail = $scope.existdata[1].value;
        $scope.WNCexistproperty = $scope.existdata[1].value;
	    
	
	$scope.trfoptions = new Array();
		for(var i=0;i<$localStorage.getprefixdataresponseTRF.length;i++){	
			$scope.trfoptions.push({
			trfid : $localStorage.getprefixdataresponseTRF[i].lookUpId,
			trfvalue : $localStorage.getprefixdataresponseTRF[i].descLangFirst,
			trfname : $localStorage.getprefixdataresponseTRF[i].descLangFirst
		})
	 } 
	  
	$scope.selecttariff= function(){ 
		  console.log($scope.WNCtarif);
		  $scope.$watch('WNCtarif', function(newVal) {
			  var lookUpCode = "TRF";
			  var level = "2";
	            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise) {
				  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
				  
				$scope.permiseoptions1 = new Array();
				    for(var i=0;i<prefixdataresponsepermise.length;i++)
				    	if(prefixdataresponsepermise[i].lookUpParentId == $scope.WNCtarif)
				    	{
				    	 console.log("prefixdataresponsepermise=="+prefixdataresponsepermise[i]);
							$scope.permiseoptions1.push({
							permiseid1 : prefixdataresponsepermise[i].lookUpId,
							permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
							permisename1 : prefixdataresponsepermise[i].descLangFirst
					   })
				    }
				},function (err){ 
			})
	    });
	};
	
	$scope.selectpermise1 = function(){
			console.log($scope.WNCpermise);
	}  
	 
			$scope.ccgoptions = new Array();
			    for(var i=0;i<$localStorage.getprefixdataresponseCCG.length;i++){	
						$scope.ccgoptions.push({
						ccgid : $localStorage.getprefixdataresponseCCG[i].lookUpId,
						ccgname : $localStorage.getprefixdataresponseCCG[i].descLangFirst
				   })
			    } 
	
			$scope.cszoptions = new Array();
			    for(var i=0;i<$localStorage.getprefixdataresponsecsz.length;i++){	
						$scope.cszoptions.push({
						cszid : $localStorage.getprefixdataresponsecsz[i].lookUpId,
						cszvalue : $localStorage.getprefixdataresponsecsz[i].descLangFirst,
						cszname : $localStorage.getprefixdataresponsecsz[i].descLangFirst
				   })
			    } 
			  
	 
	   /*prefix data end*/  
	  
	  /*---------------------------------------------------------------------------*/	  
	  var actiondetails;
	   
	 $scope.initialzedmodel = function(){
		 
		 $scope.WNCexistconsumerdetail;
		 $localStorage.WNCexistconsumerdetail = $scope.WNCexistconsumerdetail;
		 $scope.WNCexistproperty;
		 $localStorage.WNCexistproperty = $scope.WNCexistproperty;
		 $scope.data_.WNCpropertyno;
		 $localStorage.WNCpropertyno = $scope.data_.WNCpropertyno;
		 /* existing consumer details*/
		 $localStorage.WNCpropertyno = $scope.data_.WNCexistconnno;
		 $localStorage.WNCpropertyno = $scope.data_.connSize;
		 $localStorage.WNCpropertyno = $scope.data_.WNCexisttaps;
		 
		 $scope.WNCconntype;
		 $localStorage.WNCconntype = $scope.WNCconntype;
		 $scope.WNCnooffamily;
		 $localStorage.WNCnooffamily = $scope.WNCnooffamily;
		 $scope.WNCnoofusers;
		 $localStorage.WNCnoofusers = $scope.WNCnoofusers;
		 $scope.WNCtarif;
		 $localStorage.WNCtarif = $scope.WNCtarif;
		 var seltarif = document.getElementById("seltarif");
		 tariftext= seltarif.options[seltarif.selectedIndex].text;
		 $localStorage.tariftext = tariftext;
		 console.log(seltarif.options[seltarif.selectedIndex].text);
	 		 		 
		 $scope.WNCpermise;
		 $localStorage.WNCpermise = $scope.WNCpermise;
		 var selpermise = document.getElementById("selpermise");
		 permisetext= selpermise.options[selpermise.selectedIndex].text;
		 $localStorage.permisetext = permisetext;
		 console.log(selpermise.options[selpermise.selectedIndex].text);
		 
		 $scope.data_.PlumberDetail;
		 $localStorage.PlumberDetail = $scope.data_.PlumberDetail;
		 
		 $localStorage.WNCConnSize = $scope.WNCConnSize;
		 
		 var selconSize = document.getElementById("selconSize");
		 selconSizetext= selconSize.options[selconSize.selectedIndex].text;
		 $localStorage.selconSizetext = selconSizetext;
		 
		 $scope.WNCnooftaps;
		 $localStorage.WNCnooftaps = $scope.WNCnooftaps;
		 
		  $scope.checklist ='';
		  
	    	$ionicLoading.show({
					template: 'Loading...'
				});
			
		RestService.checklistcall($localStorage.serviceCode,$localStorage.deptCode,tariftext,permisetext,$localStorage.apptypetext,$scope.WNCexistconsumerdetail,
				$scope.WNCexistproperty,$localStorage.WNCBpl,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
				$scope.noOfDays,$scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,
				$scope.factor2,$scope.factor3,$scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			console.log("responsechecklistdata--"+responsechecklistdata);
			if(responsechecklistdata.wsStatus == "success"){
				
				$localStorage.responsechecklistdata = responsechecklistdata;
				console.log("$localStorage.responsechecklistdata--"+JSON.stringify($localStorage.responsechecklistdata));
//				  $state.go("app.NWCuploadoc");
				
				   $ionicLoading.hide();
				}	
				else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					}  
			},function (err) { 
//				toaster.error($filteissue#1636r('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
			
			 RestService.setdepentparams($scope.orgid,$localStorage.serviceCode,chargeApplicableAt).then(function (setdependresponse) {
//				  alert("setdependresponse.wsStatus--"+setdependresponse.wsStatus);
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
						    		  $state.go("app.NWCuploadoc");
						    		$ionicLoading.hide();
						    }
						},function (err){ 
							 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								$ionicLoading.hide();
					})
				 
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
	  
/*-------------------------------------------------------*/	  
var _init = function ()
{  
//	 $scope.WNCexistconsumerdetail = "1";
//	    $scope.WNCexistproperty = "1";
	    
	$ionicLoading.show({
		template: 'Loading...'
	});

	RestService.getinitializedmodel().then(function (responsedata){
		console.log("resposeaayaainitial--"+responsedata); 
		$ionicLoading.hide();
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
					$localStorage.wrisBPL = responsedata.responseObj[1].isBPL;
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
					$ionicLoading.hide();
				}  
	},function (err) { 
	//	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})
}
_init();
  }) /*controler ends*/
  
