angular.module('starter')

  .controller('generateBillCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage,$sessionStorage) {

	  console.log("$sessionStorage.spotSearchData---"+$sessionStorage.spotSearchData)
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  function fullGender(status){
			var fullGenderDesc;
			if(status == "S") fullGenderDesc = "Success";
			else if(status == "S") fullGenderDesc = "Success";
			else if(status == "F") fullGenderDesc = "Fail";
			else fullGenderDesc = "";
			return fullGenderDesc;
		}
	  
	  
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
			if($scope.TodayDate == "" || $scope.TodayDate == null || $scope.TodayDate == undefined )
				item.currentTarget.setAttribute("placeholder","Today Date");
			else item.currentTarget.setAttribute("placeholder","");
		}
	

$scope.connNumber = $sessionStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);
$scope.ConnName = $sessionStorage.spotSearchData.name;
console.log("ConnName==" +$scope.ConnName);
$scope.CSidn = $sessionStorage.spotSearchData.csIdn;
console.log("CsIdn==" +$scope.CSidn);
	  
$scope.Billdetails = false;

	$scope.billgenesubmit = function() {
		  $scope.totalPayableAmount;
		  $scope.genratedata='';
		  	 if(!$scope.TodayDate == ""){
				 $ionicLoading.show({
						template: 'Loading...'
					});
				 
			RestService.billgenerationsubmit($scope.connNumber,$scope.CSidn,$scope.spotbillremark,$scope.orgid,$scope.userID,$scope.langID)
			.then(function (billgenedataresponse){
				console.log("resposeaayaa"+JSON.stringify(billgenedataresponse));   
    			if(billgenedataresponse.status == "S"){
    				toaster.error($filter('translate')('SUCCESS'), $filter('translate')('SUCCESSMSG'));
    				$sessionStorage.billgenedataresponse = billgenedataresponse;  					console.log("$sessionStorage.billgenedataresponse--"+JSON.stringify($sessionStorage.billgenedataresponse));
    				 $ionicLoading.show({ template: 'Loading...'});
    				 RestService.prefixpayment($scope.orgid).then(function (response) {
							console.log("prefixpayment==="+response);
							 var tempTest	=	0;
							if(response==undefined || response == null || response=="")
							  {
								  tempTest	=	1;
							  	 return false;
							  }
							  else
							  {
								  $sessionStorage.response = response;
								  if(tempTest==0)
									 $state.go("app.SpotBillpay")
								  $ionicLoading.hide();
							  }
						
							$ionicLoading.hide();
						}, function (err) {
							$ionicLoading.hide();
						})
    				
    				   $ionicLoading.hide();
  			  		}	
    			else{
//    					alert("Bill Generation Failed.");
  						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_MSG'));
  					}    			
    			$ionicLoading.hide();
			},function (err) { 
				$ionicLoading.hide();
			})
	  }else
		  {
		  	 alert("Please Enter the Bill Generation Date.");
		  }
 }; 
 
 $scope.homepage = function()
 {
 	$state.go("app.home");
 }; 
	
	  var _init = function () {
	    
	    };
	    _init();
  })
  
  
