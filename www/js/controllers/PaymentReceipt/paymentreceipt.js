angular.module('starter')
.controller('paymentReceiptCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties,$location,$sessionStorage,$rootScope) {
	console.log("$sessionStorage.transactionId in payrec: "+$sessionStorage.transactionId);
	$scope.orgID = "100";
	$scope.empID = "1";
	$scope.langID = "1";
	var usagedoctable;
	console.log("$sessionStorage.PaymentReceiptData DATA:::::: "+JSON.stringify($sessionStorage.PaymentReceiptData));
	 					
	var status = $sessionStorage.PaymentReceiptData.status;
	if($sessionStorage.PaymentReceiptData.email == null || $sessionStorage.PaymentReceiptData.email == "" || $sessionStorage.PaymentReceiptData.email == undefined){
		$sessionStorage.PaymentReceiptData.email = "";
	}
	$scope.payRecBankFlag = "";
	$scope.payRecTrackId = $sessionStorage.transactionId;
	$scope.payRecAppNo = $sessionStorage.PaymentReceiptData.applicationId;
	$scope.payRecAppName = $sessionStorage.PaymentReceiptData.firstName;
	$scope.payRecEmail = $sessionStorage.PaymentReceiptData.email;
	$scope.payRecAmt = $rootScope.makeFloat($sessionStorage.PaymentReceiptData.amount);
	
	$scope.payRecService = $sessionStorage.PaymentReceiptData.productinfo;
	$scope.payRecStatus = $rootScope.capitalise(status);
	if(status == "success"){
		$scope.payRecBankFlag = "true";
		$scope.payRecBank = $sessionStorage.PaymentReceiptData.bankRefNo;
		$scope.payRecMobNo = $sessionStorage.PaymentReceiptData.mobileNo;
	}
	else{
		$scope.payRecMobNo = $sessionStorage.PaymentReceiptData.phone;
	}
    var _init = function (){
    };
    _init();
});
