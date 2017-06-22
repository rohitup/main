angular.module('starter')
.controller('NoChangePropertyPaymentCtrl', function ($scope, $http, RestService, $ionicLoading, toaster, $filter, $state, sharedProperties,$stateParams,$localStorage,$rootScope){
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();
	$scope.langId = sharedProperties.getLangId();*/
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	
	
	$scope.showOTPForm = "";
	$scope.optionType = "NC";
	
	$scope.paymentGatewayDetail = "";
	$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
	$scope.propPayType = "F";

	$scope.KPDPayableAmount = $rootScope.makeFloat($stateParams.response);
	$scope.propTotalPay = $stateParams.response;

	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	$scope.totalAmountSelection = function(){
		$scope.KPDPayableAmount = $rootScope.makeFloat($scope.propTotalPay);
		$scope.propPayType = "F";
		$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
	}
	$scope.partialAmountSelection = function(){
		$scope.KPDPayableAmount = "";
		$scope.propPayType = "P";
		$scope.amountPattern = /^[0-9]{1,6}$/;
	}
	$scope.submitPropertyDetails = function(){
		/*toaster.success($filter('translate')(''), "Your No Change in Assessment filing has been done successfully");
		setTimeout(function(){  $state.go("app.home");}, 3000);*/
		$ionicLoading.hide();
		
		if($scope.propPayType == "P") $scope.finalPropPayableAmount = $scope.KPDPayableAmount;
		else $scope.finalPropPayableAmount = $scope.propTotalPay;
		
		console.log($localStorage.propertyNo+"|"+$localStorage.assessSuccessFlag+"|"+$localStorage.serviceCode+"|"+$localStorage.serviceUrl+"|"+$localStorage.payService+"|"+$scope.propTotalPay+"|"+$scope.propPayType+"|"+$scope.finalPropPayableAmount+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.savePropertyDet($localStorage.propertyNo,$localStorage.assessSuccessFlag,$localStorage.serviceCode,$localStorage.serviceUrl,$localStorage.payService,$scope.propTotalPay,$scope.propPayType,$scope.finalPropPayableAmount,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(saveResponse){
		/*var url = 'js/services/savePropertyDetResponse.json';
	    $http.get(url).then(function(res){
	    	var saveResponse = res.data;*/
			console.log("savePropertyDet data: "+JSON.stringify(saveResponse));
			if(saveResponse.status == "success"){
				$ionicLoading.hide();
				$scope.paymentGatewayDetail = "true";
				$scope.pgAmount = saveResponse.totalPay;
				$scope.pgAppId = saveResponse.appId;
				$scope.pgServiceId = saveResponse.serviceId;
				$scope.pgServiceType = $localStorage.payService;
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
	//$state.go("app.noChangePropertyDetail",{response: JSON.stringify(response)});
	/*Function Declaration End*/
	
	var _init = function (){
    };
    _init();
});