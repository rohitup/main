angular.module('starter')

  .controller('MeterReadDeatilCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage) {
	 
console.log("$localStorage.spotSearchData---"+$localStorage.spotSearchData)

	  $scope.orgid = "81";
	  $scope.userID = "1";
	  
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
	 
					 $scope.connNumber = $localStorage.spotSearchData.csCcn;
					 console.log("connNumber==" +$scope.connNumber);
					 $scope.Meternumber = $localStorage.spotSearchData.mtrNumber;
					 console.log("Meternumber==" +$scope.Meternumber);
					 $scope.ConnName = $localStorage.spotSearchData.name;
					 console.log("ConnName==" +$scope.ConnName);
					 $scope.LastMtrRead = $localStorage.spotSearchData.lastMtrRead;
					 console.log("LastMtrRead==" +$scope.LastMtrRead);
					 $scope.MeterStatus = $localStorage.spotSearchData.cpdMtrstatus;
					 console.log("MeterStatus==" +$scope.MeterStatus);
					 $scope.GapCode = $localStorage.spotSearchData.cpdGap;
					 console.log("GapCode==" +$scope.GapCode);
					 $scope.Orgid = $localStorage.spotSearchData.orgid;
					 console.log("Orgid==" +$scope.Orgid);
					 $scope.MrdCpdIdWtp = $localStorage.spotSearchData.mrdCpdIdWtp;
					 console.log("MrdCpdIdWtp==" +$scope.MrdCpdIdWtp);
					 $scope.CSidn = $localStorage.spotSearchData.csIdn;
					 console.log("CsIdn==" +$scope.CsIdn);
//					alert("CsIdn==---" +$scope.CsIdn);
					 $scope.MmMtnid = $localStorage.spotSearchData.mmMtnid;
					 console.log("MmMtnid==" +$scope.MmMtnid);
					 $scope.Month = $localStorage.spotSearchData.month;
					 console.log("Month==" +$scope.Month);
					 $scope.MaxMeterRead = $localStorage.spotSearchData.maxMeterRead;
					 console.log("MaxMeterRead==" +$scope.MaxMeterRead);
					 $scope.InstallMeterRead = $localStorage.spotSearchData.installMeterRead;
					 console.log("InstallMeterRead==" +$scope.InstallMeterRead);
					 $scope.PreviousReading1 = $localStorage.spotSearchData.previousReading1;
					 console.log("PreviousReading1==" +$scope.PreviousReading1);
					 $scope.PreviousReading2 = $localStorage.spotSearchData.previousReading2;
					 console.log("PreviousReading2==" +$scope.PreviousReading2);
					 $scope.PreviousReading3 = $localStorage.spotSearchData.previousReading3;
					 console.log("PreviousReading3==" +$scope.PreviousReading3);
					 $scope.PreviousReading4 = $localStorage.spotSearchData.previousReading4;
					 console.log("PreviousReading4==" +$scope.PreviousReading4);
					 $scope.PreviousReading5 = $localStorage.spotSearchData.previousReading5;
					 console.log("PreviousReading5==" +$scope.PreviousReading5);
					 $scope.PreviousReading6 = $localStorage.spotSearchData.previousReading6;
					 console.log("PreviousReading6==" +$scope.PreviousReading6);
					 $scope.PreviousReading7 = $localStorage.spotSearchData.previousReading7;
					 console.log("PreviousReading7==" +$scope.PreviousReading7);
					 $scope.PreviousReading8 = $localStorage.spotSearchData.previousReading8;
					 console.log("PreviousReading8==" +$scope.PreviousReading8);
					 $scope.PreviousReading9 = $localStorage.spotSearchData.previousReading9;
					 console.log("PreviousReading9==" +$scope.PreviousReading9);
					 $scope.PreviousReading10 = $localStorage.spotSearchData.previousReading10;
					 console.log("PreviousReading10==" +$scope.PreviousReading10);
					 $scope.PreviousReading11 = $localStorage.spotSearchData.previousReading11;
					 console.log("PreviousReading11==" +$scope.PreviousReading11);
				
						  console.log("$localStorageprefixdata=="+JSON.stringify($localStorage.getprefixdataresponse));
						 		
							$scope.mstoptions = new Array();
						    for(var i=0;i<$localStorage.getprefixdataresponse.MST.length;i++){	
									$scope.mstoptions.push({
									meterid : $localStorage.getprefixdataresponse.MST[i].lookUpId,
									metername : $localStorage.getprefixdataresponse.MST[i].lookUpCode
							   })
						    } 
						    
							$scope.gapoptions = new Array();
						    for(var i=0;i<$localStorage.getprefixdataresponse.GAP.length;i++){	
									$scope.gapoptions.push({
									gapid : $localStorage.getprefixdataresponse.GAP[i].lookUpId,
									gapname : $localStorage.getprefixdataresponse.GAP[i].descLangFirst
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
						  $scope.InstallMeterRead,$scope.orgid,$scope.userID).then(function (responsedata){
				    	  console.log("resposeaayaa"+responsedata);   
					  if(responsedata.status == "S"){
						 $state.go("app.BillGenerate")
						  $scope.CurentDate = $filter("date")(Date.now(), "yyyy-MM-dd");
						  $ionicLoading.hide();
					  }	else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						}
					 $ionicLoading.hide();				  },function (err) { 
						$ionicLoading.hide();
					})
	 } 
	 else{ alert ("Please Enter Connection Number"); }
  };


 
	  var _init = function () {
	      /* $ionicLoading.show({
	        template: 'Loading...'
	      }); */
	    };
	    _init();
  })
  
  
