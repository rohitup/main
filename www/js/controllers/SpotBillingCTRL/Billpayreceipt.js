angular.module('starter')

  .controller('BillpayReceiptCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  $ionicHistory, dateFilter, $state, sharedProperties,$localStorage,$sessionStorage) {
	 
	  
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  
	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.langID = "1";
	  $scope.loginUSername = "Ambar ";
	  $scope.LoginMobileNo = "9921266899";
	 
	  
	  function fullstatus(status){
			var fullGenderDesc;
			if(status == "S") fullGenderDesc = "Success";
			else if(status == "S") fullGenderDesc = "Success";
			else if(status == "F") fullGenderDesc = "Fail";
			else fullGenderDesc = "";
			return fullGenderDesc;
		}
		
	  function fulllookUpId(lookUpId){
			var fullpayDesc;
			if(lookUpId == "4") fullpayDesc = "Cash";
			else if(lookUpId == "5") fullpayDesc = "Cheque";
			else if(lookUpId == "6") fullpayDesc = "Pay Order";
			else if(lookUpId == "3") fullpayDesc = "Demand Draft";
			else fullpayDesc = "";
			return fullpayDesc;
		}

$scope.connNumber = $sessionStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);	  
$scope.ConnName = $sessionStorage.spotSearchData.name;
console.log("ConnName==" +$scope.ConnName);
$scope.Payamount = $sessionStorage.Payamount;
$scope.PaymentMode = fulllookUpId($sessionStorage.PaymentMode);
$scope.transtatus = fullstatus($sessionStorage.paymentresponse.status);
$scope.ReceiptNo = $sessionStorage.paymentresponse.receiptNo;

 
	$scope.homepage = function()
		 {
			$sessionStorage.$reset();
			
			  $ionicHistory.nextViewOptions({
	                disableBack: true,
	                disableAnimate: true,
	                historyRoot: true
	            });
	            $ionicHistory.clearCache();
	            $ionicHistory.clearHistory();
	            
		 	$state.go("app.home");
		 }; 

		 
	  var _init = function () {
	      
	    };
	    _init();
  })
  
  
