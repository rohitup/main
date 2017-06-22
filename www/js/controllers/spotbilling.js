angular.module('starter')

  .controller('SpotbillCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties) {
	  $scope.show = 1;
	  
	  $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();
	  
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
	 
	  $scope.spotsearch1 = function() { $scope.show = 2; }
	  $scope.meterreadproceed1 = function() { $scope.show = 3; }
	  $scope.billgenesubmit1 = function() { $scope.show = 4; }
	  
	  
	  
	  $scope.spotsearch = function() {
		 if(!$scope.searchspotbill == ""){
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 RestService.spotbill($scope.searchspotbill,$scope.orgid,$scope.userID).then(function (responsedata){
				 if(responsedata.status == "S"){
					 
					 $scope.connNumber = responsedata.csCcn;
					 console.log("connNumber==" +$scope.connNumber);
					 $scope.Meternumber =responsedata.mtrNumber;
					 console.log("Meternumber==" +$scope.Meternumber);
					 $scope.ConnName = responsedata.name;
					 console.log("ConnName==" +$scope.ConnName);
					 $scope.LastMtrRead = responsedata.lastMtrRead;
					 console.log("LastMtrRead==" +$scope.LastMtrRead);
					 $scope.MeterStatus = responsedata.cpdMtrstatus;
					 console.log("MeterStatus==" +$scope.MeterStatus);
					 $scope.GapCode = responsedata.cpdGap;
					 console.log("GapCode==" +$scope.GapCode);
					 $scope.Orgid = responsedata.orgid;
					 console.log("Orgid==" +$scope.Orgid);
					 $scope.MrdCpdIdWtp = responsedata.mrdCpdIdWtp;
					 console.log("MrdCpdIdWtp==" +$scope.MrdCpdIdWtp);
					 $scope.CsIdn = responsedata.csIdn;
					 console.log("CsIdn==" +$scope.CsIdn);
//					alert("CsIdn==---" +$scope.CsIdn);
					 $scope.MmMtnid = responsedata.mmMtnid;
					 console.log("MmMtnid==" +$scope.MmMtnid);
					 $scope.Month = responsedata.month;
					 console.log("Month==" +$scope.Month);
					 $scope.MaxMeterRead = responsedata.maxMeterRead;
					 console.log("MaxMeterRead==" +$scope.MaxMeterRead);
					 $scope.InstallMeterRead = responsedata.installMeterRead;
					 console.log("InstallMeterRead==" +$scope.InstallMeterRead);
					 $scope.PreviousReading1 = responsedata.previousReading1;
					 console.log("PreviousReading1==" +$scope.PreviousReading1);
					 $scope.PreviousReading2 = responsedata.previousReading2;
					 console.log("PreviousReading2==" +$scope.PreviousReading2);
					 $scope.PreviousReading3 = responsedata.previousReading3;
					 console.log("PreviousReading3==" +$scope.PreviousReading3);
					 $scope.PreviousReading4 = responsedata.previousReading4;
					 console.log("PreviousReading4==" +$scope.PreviousReading4);
					 $scope.PreviousReading5 = responsedata.previousReading5;
					 console.log("PreviousReading5==" +$scope.PreviousReading5);
					 $scope.PreviousReading6 = responsedata.previousReading6;
					 console.log("PreviousReading6==" +$scope.PreviousReading6);
					 $scope.PreviousReading7 = responsedata.previousReading7;
					 console.log("PreviousReading7==" +$scope.PreviousReading7);
					 $scope.PreviousReading8 = responsedata.previousReading8;
					 console.log("PreviousReading8==" +$scope.PreviousReading8);
					 $scope.PreviousReading9 = responsedata.previousReading9;
					 console.log("PreviousReading9==" +$scope.PreviousReading9);
					 $scope.PreviousReading10 = responsedata.previousReading10;
					 console.log("PreviousReading10==" +$scope.PreviousReading10);
					 $scope.PreviousReading11 = responsedata.previousReading11;
					 console.log("PreviousReading11==" +$scope.PreviousReading11);
					 
				//	 $scope.meterreaddetails = true;
					 // $state.go("app.meterReading");

					  RestService.getprefixdata($scope.orgid).then(function (getprefixdataresponse) {
						  console.log("prefixdata=="+getprefixdataresponse);
						 		
							$scope.mstoptions = new Array();
						    for(var i=0;i<getprefixdataresponse.MST.length;i++){	
									$scope.mstoptions.push({
									meterid : getprefixdataresponse.MST[i].lookUpId,
									metername : getprefixdataresponse.MST[i].lookUpCode
							   })
						    } 
						    
							$scope.gapoptions = new Array();
						    for(var i=0;i<getprefixdataresponse.GAP.length;i++){	
									$scope.gapoptions.push({
									gapid : getprefixdataresponse.GAP[i].lookUpId,
									gapname : getprefixdataresponse.GAP[i].descLangFirst
							   })
						    }
						    $("#mstoptions").val(MeterStatus).change();
						    $("#gapoptions").val(GapCode).change();
						    
							$ionicLoading.hide();
						},function (err) { 
							$ionicLoading.hide();
						})
//				 alert("calling meter reading page");
					  $scope.show = 2;
					  $ionicLoading.hide();
				 }
				 else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
					}
				 $ionicLoading.hide();
				},
					function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})	
		 } 
		 else{ alert ("Please Enter Connection Number"); }
	  };  
	  

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
	 
	  if(!$scope.CurrentMeterRead == ""){
		 
			 $ionicLoading.show({
					template: 'Loading...'
				});
				  RestService.proceedmeterread($scope.CurrentMeterRead,$scope.MeterDate,$scope.MrdCpdIdWtp,$scope.CsIdn,
						  $scope.MmMtnid,$scope.Month,$scope.MeterStatus,$scope.GapCode,$scope.MaxMeterRead,
						  $scope.InstallMeterRead,$scope.orgid,$scope.userID).then(function (responsedata){
				    	  console.log("resposeaayaa"+responsedata);   
					  if(responsedata.status == "S"){
						  $scope.show = 3;
						  $scope.CurentDate = $filter("date")(Date.now(), "yyyy-MM-dd");
						  $ionicLoading.hide();
					  }	else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
						}
					 $ionicLoading.hide();
				  },function (err) { 
						$ionicLoading.hide();
					})
	 } 
	 else{ alert ("Please Enter Connection Number"); }
  };

 
  /*bill generation function start*/
	  
	  $scope.billgenesubmit = function() {
		  $scope.totalPayableAmount;
		  $scope.genratedata='';
		  	 if(!$scope.TodayDate == ""){
				 
				 $ionicLoading.show({
						template: 'Loading...'
					});
				 
			RestService.billgenerationsubmit($scope.searchspotbill,$scope.CsIdn,$scope.spotbillremark,$scope.orgid).then(function (billgenedataresponse){
				console.log("resposeaayaa"+billgenedataresponse);   
    			if(billgenedataresponse.status == "S"){
    				
    				alert("Bill Successfully generated...");
    				$scope.totalPayableAmount = billgenedataresponse.totalPayableAmount;
    				
    				RestService.getPayOpt($scope.orgid).then(function (response) {
						console.log("dash==="+response);
						
						$scope.options = new Array();
					    for(var i=0;i<response.list.length;i++){							
								$scope.options.push({
								id : response.list[i].bankId,
								name : response.list[i].cbbankname
						    })
					    }
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
    				 $scope.show = 4;
    				   $ionicLoading.hide();
  			  		}	
    			else{
    					alert("Bill Not Generated ");
  						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_MSG'));
  					}    			
    			$ionicLoading.hide();
			},function (err) { 
				$ionicLoading.hide();
			})
	  }else
		  {
		  alert("Please Enter the Date.");
		  }
 }; 
	  
	  /*bill generation function end*/
	  
	$scope.payWaterBill = function() {
		
		$ionicLoading.show({
			template: 'Loading...'
		});
		RestService.savePayReqspotbill($scope.data_.payingAmountspotbill, $scope.data_.paymentGatewayspotbill, 
				$scope.searchspotbill,$scope.CsIdn,$scope.orgid,$scope.userID).then(function (response) {
			if(response.status == "success"){
				var H= null;
				H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
				H.addEventListener('loadstop', function(event) {        
									if (event.url.match("mobile/close")) {
										H.close();
									}
								});
			}
			else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
			}
			$ionicLoading.hide();
		}, function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			$ionicLoading.hide();
		})
};
 
	  var _init = function () {
	      /* $ionicLoading.show({
	        template: 'Loading...'
	      }); */
	    };
	    _init();
  })
  
  
