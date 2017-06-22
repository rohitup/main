angular.module('starter')
.controller('NoChangePropertySearchCtrl', function ($scope, $http, RestService, $ionicLoading, toaster, $filter, $state, sharedProperties,$localStorage,$rootScope){
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();
	$scope.langId = sharedProperties.getLangId();*/
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";

	$scope.showOTPForm = "";
	$scope.optionType = "NC";

	$scope.searchProperty = "";
	$scope.paymentGatewayDetail = "";
	$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
	$scope.propPayType = "F";

	$scope.KPDTotalTaxFlag = "";
	$scope.KPDArrearIntFlag = "";
	$scope.KPDCurrentIntFlag = "";
	$scope.KPDPenaltyFlag = "";
	$scope.KPDNetChargeFlag = "";
	$scope.KPDAdjAmtFlag = "";
	$scope.KPDAdvAmtFlag = "";

	$scope.KPDPropertyNo;
	$scope.KPDOwnerName;
	$scope.KPDArrearWoInt;
	$scope.KPDTotalTax;
	$scope.KPDRebate;
	$scope.KPDRainRebate;
	$scope.KPDArrearInt;
	$scope.KPDCurrentInt;
	$scope.KPDPenalty;
	$scope.KPDNetCharge;
	$scope.KPDAdjAmt;
	$scope.KPDAdvAmt;
	$scope.KPDTotalPayable;
	$scope.propTotalPay;
	/*Variable Declaration End*/

	/*Function Declaration Start*/
	$scope.keypressevtPropno = function(){
		$scope.searchPID = "";
		$scope.showOTPForm = "";
	};
	$scope.keypressevtOldpid = function(){
		$scope.searchPropNo = "";
		$scope.showOTPForm = "";
	};
	$scope.noChangeSearch = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
		console.log($scope.searchPropNo+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.getDataByProp($scope.searchPropNo,$scope.searchPID,$scope.optionType,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(response){
		/*var url = 'js/services/viewPropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var response = res.data;*/
			console.log("getDataByProp data: "+JSON.stringify(response));
			if(response.resStatus == "success"){
					$scope.assessPropertyNumber = response.propertyNo;
					$scope.assessMobile = response.mobileNO;
					$scope.assessEmail = response.emailId;
					$scope.sendPropOtp();
				//$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
			}
			else{
				toaster.error($filter('translate')(''), response.resMsg);
				//$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
			}
			$ionicLoading.hide();
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
	$scope.sendPropOtp = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
		console.log($scope.assessPropertyNumber+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.sendNCPropOtp($scope.assessPropertyNumber,$scope.assessEmail,$scope.assessMobile,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(otpresponse){
		/*var url = 'js/services/viewPropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var response = res.data;*/
			console.log("sendNCPropOtp data: "+JSON.stringify(otpresponse));
			if(otpresponse.resStatus == "success"){
				$ionicLoading.hide();
				$scope.showOTPForm = "true";
				$scope.assessOtpNo = otpresponse.otp;
				alert("Please check the OTP sent on your registered mobile number.");
			}
			else{
				$scope.showOTPForm = "";
				toaster.error($filter('translate')(''), 'There is some issue in connecting to the server. Please try again.');
			}
			$ionicLoading.hide();
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}

	$scope.viewAssessDetail = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});

		console.log($scope.assessPropertyNumber+"|"+$scope.optionType+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.validateAssessDet($scope.assessPropertyNumber,$scope.optionType,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(validatePropData){
		/*var url = 'js/services/savePropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var saveResponse = res.data;*/
			console.log("validateAssessDet data: "+JSON.stringify(validatePropData));
			if(validatePropData.status == "success"){
				$localStorage.propertyNo = $scope.assessPropertyNumber;
				$localStorage.assessSuccessFlag = validatePropData.succesFlag;
				$localStorage.serviceCode = validatePropData.serviceCode;
				$localStorage.serviceUrl = validatePropData.serviceUrl;
				$localStorage.payService = validatePropData.payService;
				
				$scope.assessSuccessFlag = validatePropData.succesFlag;
				$scope.payService = validatePropData.payService;
				$scope.successMessage = validatePropData.successMessage;
				$scope.serviceUrl = validatePropData.serviceUrl;
				$scope.serviceCode = validatePropData.serviceCode;
				if($scope.assessSuccessFlag == "Y" || $scope.assessSuccessFlag == "N"){
					RestService.viewAssessDet($scope.assessPropertyNumber,validatePropData.lastPay,$scope.assessSuccessFlag,$scope.serviceCode,$scope.serviceUrl,$scope.payService,validatePropData.status,$scope.successMessage,validatePropData.requestType,validatePropData.hideBankId,validatePropData.amountToPay,validatePropData.payModeIn,validatePropData.bmChqDDNo,validatePropData.bmChqDDDate,validatePropData.bmBankAccountId,validatePropData.bmDrawOn,validatePropData.saveOrUpdateDataReqDTO,$scope.orgId,$scope.empId,$scope.langId)
					.then(function(viewResponse){
					/*var url = 'js/services/savePropertyDetResponse.json';
				    $http.get(url).then(function(res){
				    	var saveResponse = res.data;*/
						console.log("viewAssessDet data: "+JSON.stringify(viewResponse));
						if(viewResponse.status == "success"){
							$ionicLoading.hide();
							$state.go("app.noChangePropertyDetail",{response: JSON.stringify(viewResponse)});
						}
						else{
							toaster.error($filter('translate')(''), saveResponse.responseMsg);
						}
						$ionicLoading.hide();
					},function(err){
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})
				}
				else{
					alert(validatePropData.successMessage);
				}
			}
			else{
				toaster.error($filter('translate')(''), saveResponse.responseMsg);
			}
			$ionicLoading.hide();
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
	/*Function Declaration End*/
	var _init = function (){
    };
    _init();
});