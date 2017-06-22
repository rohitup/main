angular.module('starter')

  .controller('generateBillCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage) {

	  console.log("$localStorage.spotSearchData---"+$localStorage.spotSearchData)
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  
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
			if($scope.TodayDate == "" || $scope.TodayDate == null || $scope.TodayDate == undefined )
				item.currentTarget.setAttribute("placeholder","Today Date");
			else item.currentTarget.setAttribute("placeholder","");
		}
	

$scope.connNumber = $localStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);
$scope.ConnName = $localStorage.spotSearchData.name;
console.log("ConnName==" +$scope.ConnName);
$scope.CSidn = $localStorage.spotSearchData.csIdn;
console.log("CsIdn==" +$scope.CSidn);
	  
$scope.billgenesubmit = function() {
		  $scope.totalPayableAmount;
		  $scope.genratedata='';
		  	 if(!$scope.TodayDate == ""){
				 
				 $ionicLoading.show({
						template: 'Loading...'
					});
				 
			RestService.billgenerationsubmit($scope.connNumber,$scope.CSidn,$scope.spotbillremark,$scope.orgid).then(function (billgenedataresponse){
				console.log("resposeaayaa"+JSON.stringify(billgenedataresponse));   
    			if(billgenedataresponse.status == "S"){
    				
    				alert("Your Bill Successfully Generated.");
    				
//    				$scope.totalPayableAmount = billgenedataresponse.totalPayableAmount;
    				$localStorage.billgenedataresponse = billgenedataresponse;
    				
    				RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
						console.log("dash==="+response);
						$localStorage.Bankresponse = response;
						/*$scope.options = new Array();
					    for(var i=0;i<response.list.length;i++){							
								$scope.options.push({
								id : response.list[i].bankId,
								name : response.list[i].cbbankname
						    })
					    }*/
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
    				$state.go("app.SpotBillpay")
    				   $ionicLoading.hide();
  			  		}	
    			else{
    					alert("Bill Generation Failed.");
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
	  

	  
	/*$scope.payWaterBill = function() {
		
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
};*/
 
	  var _init = function () {
	      /* $ionicLoading.show({
	        template: 'Loading...'
	      }); */
	    };
	    _init();
  })
  
  
