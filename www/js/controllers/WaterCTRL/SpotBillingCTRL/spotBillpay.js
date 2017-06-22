angular.module('starter')

  .controller('SpotBillpayCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage) {
	 
	  
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  
	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.loginUSername = "Gajendra";
	  $scope.LoginMobileNo = "9664611565";
	  $scope.ServiceShortName = "WNC";
	
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

console.log("bankdetails--"+JSON.stringify($localStorage.Bankresponse));
$scope.connNumber = $localStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);	  
$scope.totalPayableAmount = $localStorage.billgenedataresponse.totalPayableAmount;
console.log("totalPayableAmount==" +$scope.totalPayableAmount);
$scope.CSidn = $localStorage.spotSearchData.csIdn;
console.log("CsIdn==" +$scope.CSidn);
$scope.applicationNumber = $localStorage.billgenedataresponse.applicationNumber
console.log("applicationNumber==" +$scope.applicationNumber);

$scope.options = new Array();
	for(var i=0;i<$localStorage.Bankresponse.list.length;i++){							
		$scope.options.push({
		id : $localStorage.Bankresponse.list[i].bankId,
		name : $localStorage.Bankresponse.list[i].cbbankname
	})
}
	$scope.connNumber = $localStorage.spotSearchData.csCcn;
	console.log("connNumber==" +$scope.connNumber);
	$scope.ConnName = $localStorage.spotSearchData.name;
	console.log("ConnName==" +$scope.ConnName);
	
	
$scope.payWaterBill = function() {
		
		$ionicLoading.show({
			template: 'Loading...'
		});
		/*RestService.savePayReq($scope.data_.payingAmountspotbill, $scope.data_.paymentGatewayspotbill, 
				$scope.connNumber,$scope.CSidn,$scope.orgid,$scope.userID)*/
			RestService.savePayReq($scope.data_.payingAmountspotbill,$scope.data_.paymentGatewayspotbill,$scope.applicationNumber,
				$scope.CSidn,$scope.orgid,$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName)
				
				.then(function (response) {
					if(response.status == "success"){
						/*var H= null;
						H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
						H.addEventListener('loadstop', function(event) {        
											if (event.url.match("mobile/close")) {
												H.close();
											}
										});*/
						
						var H= null;
						
						H = window.open(encodeURI(response.payRequestMsg), '_blank', 
						'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
						
						H.addEventListener('exit', iabClose);
						H.addEventListener('loadstop', iabClose1);
						function iabClose(event) 
						{
//							$scope.PaymentRecieptMethod1();
							H.removeEventListener('exit', iabClose); 
							$state.go("app.SpotBilling");
						}
						function iabClose1(event){
							if (event.url.match("mobile/close")) {
									H.close();
									H.removeEventListener('loadstop', iabClose1);
//									alert("Payment Have Successfully Done")
									$state.go("app.SpotBilling");
							}
						}
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
  
  
