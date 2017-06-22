angular.module('starter')

  .controller('MeterReadDeatilCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage,$sessionStorage,$ionicPopup) {
	 
console.log("$sessionStorage.spotSearchData---"+$sessionStorage.spotSearchData)

	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.langID = "1";
	  
	  $scope.searchspotbill = '';
	  $scope.data_ = {};
	//  $scope.meterreaddetails = false;
	  $scope.meterstatusdata = '';
	  $scope.CurentDate;
	  $scope.connNumber;
	  $scope.Meternumber;
	  $scope.ConnName;
	  $scope.LastMtrRead;
	  $scope.MeterStatus;
	  $scope.GapCode;
	  $scope.meterid;
	  $scope.metername;
	  $scope.gapid;
	  $scope.gapname;
	  $scope.Orgid;
	  $scope.MrdCpdIdWtp;
	  $scope.CsIdn;
	  $scope.MmMtnid;
	  $scope.Month;
      $scope.MaxMeterRead;
	  $scope.InstallMeterRead;
	  $scope.PreviousReading1;
	  $scope.PreviousReading2;
	  $scope.PreviousReading3;
	  $scope.PreviousReading4;
	  $scope.PreviousReading5;
	  $scope.PreviousReading6;
	  $scope.PreviousReading;
	  $scope.PreviousReading8;
	  $scope.PreviousReading9;
      $scope.PreviousReading10;
	  $scope.PreviousReading11;
	  $scope.CurrentMeterRead;
	  $scope.MeterDate;
	  $scope.spotbillremark;
	  $scope.genratedata;
	  $scope.totalPayableAmount;
	 
	  
	  
	  $scope.changeAttr = function(item){
			if($scope.MeterDate == "" || $scope.MeterDate == null || $scope.MeterDate == undefined )
				item.currentTarget.setAttribute("placeholder","Date");
			else item.currentTarget.setAttribute("placeholder","");
		} 
	 
/*	  $scope.billinghide = true;
	    $scope.checkedOrNot = function (billPeriod) {
	    	
	        if (billPeriod) {
	        	$scope.showPopuptable();
	        } else {
	        	return false;
	        }
	    };
	    */
	    
					 $scope.connNumber = $sessionStorage.spotSearchData.csCcn;
					 console.log("connNumber==" +$scope.connNumber);
					 $scope.Meternumber = $sessionStorage.spotSearchData.mtrNumber;
					 console.log("Meternumber==" +$scope.Meternumber);
					 $scope.ConnName = $sessionStorage.spotSearchData.name;
					 console.log("ConnName==" +$scope.ConnName);
					 $scope.LastMtrRead = $sessionStorage.spotSearchData.lastMtrRead;
					 console.log("LastMtrRead==" +$scope.LastMtrRead);
					 $scope.MeterStatus = $sessionStorage.spotSearchData.cpdMtrstatus;
					 console.log("MeterStatus==" +$scope.MeterStatus);
					 $scope.GapCode = $sessionStorage.spotSearchData.cpdGap;
					 console.log("GapCode==" +$scope.GapCode);
					 $scope.Orgid = $sessionStorage.spotSearchData.orgid;
					 console.log("Orgid==" +$scope.Orgid);
					 $scope.MrdCpdIdWtp = $sessionStorage.spotSearchData.mrdCpdIdWtp;
					 console.log("MrdCpdIdWtp==" +$scope.MrdCpdIdWtp);
					 $scope.CSidn = $sessionStorage.spotSearchData.csIdn;
					 console.log("CsIdn==" +$scope.CsIdn);
//					alert("CsIdn==---" +$scope.CsIdn);
					 $scope.MmMtnid = $sessionStorage.spotSearchData.mmMtnid;
					 console.log("MmMtnid==" +$scope.MmMtnid);
					 $scope.Month = $sessionStorage.spotSearchData.month;
					 console.log("Month==" +$scope.Month);
					 $scope.MaxMeterRead = $sessionStorage.spotSearchData.maxMeterRead;
					 console.log("MaxMeterRead==" +$scope.MaxMeterRead);
					 $scope.InstallMeterRead = $sessionStorage.spotSearchData.installMeterRead;
					 console.log("InstallMeterRead==" +$scope.InstallMeterRead);
					 $scope.meterInstallDate = $sessionStorage.spotSearchData.meterInstallDate;
					 console.log("meterInstallDate==" +$scope.meterInstallDate);
					 $scope.pcDate = $sessionStorage.spotSearchData.pcDate;
					 console.log("pcDate==" +$scope.pcDate);
					
					 $scope.monthoptions = new Array();
					    for(var i=0;i<$scope.Month.length;i++){	
								$scope.monthoptions.push({
								monthcheck : $scope.Month[i].from,
								monthname : $scope.Month[i].monthDesc
						   })
					    }
					 
					    $scope.selectAction = function() {
						    console.log("Monthoptions---"+$scope.Monthoptions);
						    $scope.$watch('Monthoptions', function(newVal) {
						    	
						    	for(var i=0;i<$scope.Month.length;i++){	
						    		if($scope.Month[i].from == $scope.Monthoptions)
						    			$scope.Month[i].valueCheck = "Y";
						    	}
						         console.log("$scope.Monthfnal--"+JSON.stringify($scope.Month));
						    });
					  	};
					
						  console.log("$sessionStorageprefixdata=="+JSON.stringify($sessionStorage.getprefixdataresponse));
						 		
							$scope.mstoptions = new Array();
						    for(var i=0;i<$sessionStorage.getprefixdataresponse.MST.length;i++){	
									$scope.mstoptions.push({
									meterid : $sessionStorage.getprefixdataresponse.MST[i].lookUpId,
									metername : $sessionStorage.getprefixdataresponse.MST[i].lookUpCode
							   })
						    } 
						    
							$scope.gapoptions = new Array();
						    for(var i=0;i<$sessionStorage.getprefixdataresponse.GAP.length;i++){	
									$scope.gapoptions.push({
									gapid : $sessionStorage.getprefixdataresponse.GAP[i].lookUpId,
									gapname : $sessionStorage.getprefixdataresponse.GAP[i].descLangFirst
							   })
						    }
						    $("#mstoptions").val($scope.MeterStatus).change();
						    $("#gapoptions").val($scope.GapCode).change();
						    

$scope.imageuplod11 = function(options){
		  RestService.imgup().then(function (response) {
						 
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
	  };
 
 
 $scope.meterreadproceed = function() {
	  $scope.CurrentMeterRead;
	  $scope.MeterDate;

	  if ($scope.LastMtrRead > $scope.CurrentMeterRead) {
			alert("Your Current Meter Reading Should Be Greater The Last Meter Reading");
			return;
		}
	  else if(!$scope.CurrentMeterRead == ""){
		 
			 $ionicLoading.show({
					template: 'Loading...'
				});
				  RestService.proceedmeterread($scope.CurrentMeterRead,$scope.MeterDate,$scope.MrdCpdIdWtp,$scope.CSidn,
						  $scope.MmMtnid,$scope.Month,$scope.MeterStatus,$scope.GapCode,$scope.MaxMeterRead,
						  $scope.InstallMeterRead,$scope.orgid,$scope.userID,$scope.pcDate,$scope.meterInstallDate)
						  .then(function (responsedata){
				    	  console.log("resposeaayaa"+JSON.stringify(responsedata)); 
				    	
					  if(responsedata.status == "S"){
						 $state.go("app.BillGenerate")
						  $scope.CurentDate = $filter("date")(Date.now(), "yyyy-MM-dd");
						  $ionicLoading.hide();
					  }	else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						}
					 $ionicLoading.hide();				  }
			,function (err) { 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})
	 } 
	 else{ alert ("Please Enter Correct Current Meter reading and Date."); }
  };


 
	  var _init = function () {
	      /* $ionicLoading.show({
	        template: 'Loading...'
	      }); */
	    };
	    _init();
  })
  
  
