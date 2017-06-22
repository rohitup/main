angular.module('starter')
.controller('PropertyDuesPaymentCtrl', function ($scope, $http, RestService, $ionicLoading, toaster, $filter, $state, sharedProperties){
	/*Global Functions Start*/
	function makeFloat(number){
		var num = number;
		if(num != '' || num==0){
			return num+".00";
		}
		else{
			return num;
		}
	}
	function paymentGateway(){
		alert($scope.paymentGatewaySelect);
	}
	/*Global Functions End*/
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();
	$scope.langId = sharedProperties.getLangId();*/
	$scope.orgId = "711";
	$scope.empId = "1";
	$scope.langId = "1";
	
	$scope.searchProperty = "";
	$scope.viewpropdetail = "";
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
	$scope.propertySearch = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
		console.log($scope.searchProperty+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.viewPropertyDet($scope.searchProperty,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(response){
		/*var url = 'js/services/viewPropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var response = res.data;*/
			console.log("viewPropertyDet data: "+JSON.stringify(response));
			if(response.status == "success"){
				$ionicLoading.hide();
				
				propRelatedstatus = response.propRelatedstatus;
				if(propRelatedstatus == "P"){
					toaster.error($filter('translate')(''), "You don't have any pending dues");
					return;
				}else if(propRelatedstatus == "L"){
					toaster.error($filter('translate')(''), "We are facing some issues in retrieving your property details. Please contact your ULB for further support.");
					return;
				}else{
					$scope.KPDArrearIntFlag = "";
					$scope.KPDCurrentIntFlag = "";
					$scope.KPDPenaltyFlag = "";
					$scope.KPDNetChargeFlag = "";
					$scope.KPDAdjAmtFlag = "true";
					$scope.KPDAdvAmtFlag = "true";
					if(propRelatedstatus == "D"){
						var r = confirm("No filing was available in the current financial year. Do you want to file assessment as No-Change?");
						if (r == false) {return;}
						$scope.KPDArrearIntFlag = "true";
						$scope.KPDCurrentIntFlag = "true";
						$scope.KPDPenaltyFlag = "true";
						$scope.KPDNetChargeFlag = "true";
						$scope.KPDAdjAmtFlag = "";
						$scope.KPDAdvAmtFlag = "";
					}
					$scope.propTotalPay = response.totalAmount;
					$scope.viewpropdetail = "true";
					$scope.KPDPropertyNo = $scope.searchProperty;
					$scope.KPDOwnerName = response.propOwnerName;
					$scope.KPDArrearWoInt = makeFloat(response.arrerWithoutInterest);
					$scope.KPDTotalTax = makeFloat(response.totalAnualTax);
					$scope.KPDRebate = makeFloat(response.rebate);
					$scope.KPDRainRebate = makeFloat(response.rainRebate);
					$scope.KPDArrearInt = makeFloat(response.arrerInterest);
					$scope.KPDCurrentInt = makeFloat(response.currentInterest);
					$scope.KPDPenalty = makeFloat(response.interestpenalty);
					$scope.KPDNetCharge = makeFloat(response.netServiceChargePayable);
					$scope.KPDAdjAmt = makeFloat(response.adjustmentamount);
					$scope.KPDAdvAmt = makeFloat(response.advanceamount);
					$scope.KPDTotalPayable = makeFloat($scope.propTotalPay);
					
					$scope.KPDPayableAmount = makeFloat($scope.propTotalPay);
					$scope.propSuccessFlag = response.succesFlag;
					$scope.propServiceCode = response.serviceCode;
					$scope.propServiceUrl = response.serviceUrl;
					$scope.propPayService = response.payService;
				}
				//$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
			}
			else{
				$scope.viewpropdetail = "";
				toaster.error($filter('translate')(''), response.responseMsg);
				//$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
			}
			$ionicLoading.hide();
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
	$scope.totalAmountSelection = function(){
		$scope.KPDPayableAmount = makeFloat($scope.propTotalPay);
		$scope.propPayType = "F";
		$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
	}
	$scope.partialAmountSelection = function(){
		$scope.KPDPayableAmount = "";
		$scope.propPayType = "P";
		$scope.amountPattern = /^[0-9]{1,6}$/;
	}
	$scope.submitPropertyDetails = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		if($scope.propPayType == "P") $scope.finalPropPayableAmount = $scope.KPDPayableAmount;
		else $scope.finalPropPayableAmount = $scope.propTotalPay;
		
		console.log($scope.searchProperty+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.savePropertyDet($scope.searchProperty,$scope.propSuccessFlag,$scope.propServiceCode,$scope.propServiceUrl,$scope.propPayService,$scope.propTotalPay,$scope.propPayType,$scope.finalPropPayableAmount,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(saveResponse){
		/*var url = 'js/services/savePropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var saveResponse = res.data;*/
			console.log("savePropertyDet data: "+JSON.stringify(saveResponse));
			if(saveResponse.status == "success"){
				$ionicLoading.hide();
				toaster.success($filter('translate')(''), "Your property dues payment application has been submitted successfully");
				setTimeout(function(){  $state.go("app.home");}, 3000);
				$scope.paymentGatewayDetail = "true";
				$scope.pgAmount = saveResponse.totalPay;
				$scope.pgAppId = saveResponse.appId;
				$scope.pgServiceId = saveResponse.serviceId;
				$scope.pgServiceType = $scope.propPayService;
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