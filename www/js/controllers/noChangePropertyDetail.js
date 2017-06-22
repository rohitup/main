angular.module('starter')
.controller('NoChangePropertyDetailCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $rootScope) {
	console.log($stateParams.response);
	$scope.propDetailList = new Array();
	$scope.propDetailResponse = JSON.parse($stateParams.response);

	$scope.NCContactNo = $scope.propDetailResponse.contactDetailDTO.contactNo;
	$scope.NCEmail=$scope.propDetailResponse.contactDetailDTO.email;
	$scope.NCMobileNo = $scope.propDetailResponse.contactDetailDTO.mobileNo;

	$scope.NCHouseNo=$scope.propDetailResponse.adressDetailDTO.houseNo;
	$scope.NCAssessAdd=$scope.propDetailResponse.adressDetailDTO.asseAdd;
	$scope.NCPropAdd=$scope.propDetailResponse.adressDetailDTO.propAdd;
	$scope.NCPinCode=$scope.propDetailResponse.adressDetailDTO.pinCode;

	$scope.NCPropertyNo = $scope.propDetailResponse.generalDetailDTO.propertyNo;
	$scope.NCNewHoldingNo = $scope.propDetailResponse.generalDetailDTO.newHoldingNo;
	$scope.NCOldProNo = $scope.propDetailResponse.generalDetailDTO.oldProNo;
	$scope.NCRefProNo = $scope.propDetailResponse.generalDetailDTO.refProNo;
	$scope.NCOldPID = $scope.propDetailResponse.generalDetailDTO.oldPid;
	$scope.NCUID = $scope.propDetailResponse.generalDetailDTO.uID;
	$scope.NCRevenueCircle = $scope.propDetailResponse.generalDetailDTO.revenueCircle;
	var ownerHouse1 = $scope.propDetailResponse.generalDetailDTO.ownerHouse1;
	var ownerHouse2 = $scope.propDetailResponse.generalDetailDTO.ownerHouse2;
	var ownerHouse3 = $scope.propDetailResponse.generalDetailDTO.ownerHouse3;
	if(ownerHouse1 == "" || ownerHouse1 == null || ownerHouse1 == undefined){
	  $scope.NCOwnerHouse1="Zone";
	  $("#NCOwnerHouse1").css('color', '#b8bec9');
	}
	else{
	  $scope.NCOwnerHouse1=ownerHouse1;
	  $("#NCOwnerHouse1").css('color', '#000000');
	}
	if(ownerHouse2 == "" || ownerHouse2 == null || ownerHouse2 == undefined){
	  $scope.NCOwnerHouse2="Sector";
	  $("#NCOwnerHouse2").css('color', '#b8bec9');
	}
	else{
	  $scope.NCOwnerHouse2=ownerHouse2;
	  $("#NCOwnerHouse2").css('color', '#000000');
	}
	if(ownerHouse3 == "" || ownerHouse3 == null || ownerHouse3 == undefined){
	  $scope.NCOwnerHouse3="House";
	  $("#NCOwnerHouse3").css('color', '#b8bec9');
	}
	else{
	  $scope.NCOwnerHouse3=ownerHouse3;
	  $("#NCOwnerHouse3").css('color', '#000000');
	}

	$scope.NCAcquDate = $rootScope.formatDate($scope.propDetailResponse.landOrBuildingDetailDTO.acquDate);
	$scope.NCMainTotalArea = $scope.propDetailResponse.landOrBuildingDetailDTO.mainTotalArea;
	$scope.NCAnnualRentalValue = $scope.propDetailResponse.landOrBuildingDetailDTO.annualRentalValue;
	$scope.NCVacantLandArea = $scope.propDetailResponse.landOrBuildingDetailDTO.vacantLandArea;
	$scope.NCTotalArrearTax = $scope.propDetailResponse.landOrBuildingDetailDTO.totalArrearTax;

	$scope.NCFName = $scope.propDetailResponse.ownerDetailDTO.title+" "+$scope.propDetailResponse.ownerDetailDTO.fName;
	$scope.NCSpouseName = $scope.propDetailResponse.ownerDetailDTO.husName;
	$scope.NCGender = $scope.propDetailResponse.ownerDetailDTO.genDesc;
	$scope.NCPanNo = $scope.propDetailResponse.ownerDetailDTO.panNo;

	if($scope.propDetailResponse.saveOrUpdateDataReqDTO == null){
	  	$scope.NCArrearIntFlag = "";
		$scope.NCCurrentIntFlag = "";
		$scope.NCPenaltyFlag = "true";
		$scope.NCNetChargeFlag = "true";
		$scope.NCAdjAmtFlag = "true";
		$scope.NCAdvAmtFlag = "true";
		
		$scope.NCPenalty = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.interestPenaltysas);
		$scope.NCNetCharge = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.netServiceChargePay);
		$scope.NCAdjAmt = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.adjustmentAmount);
		$scope.NCAdvAmt = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.advanceAmount);

		$scope.NCArrearWoInt = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.arrearswithoutInterest);
		$scope.NCTotalTax = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.totalannualtax);
		$scope.NCRebate = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.rebatesas);
		$scope.NCRainRebate = $rootScope.makeFloat($scope.propDetailResponse.taxCalculation.rebaters);
		
		$scope.NCTotalPayableAmount = $scope.propDetailResponse.taxCalculation.totalpayable;
	}else{
		$scope.NCArrearIntFlag = "true";
		$scope.NCCurrentIntFlag = "true";
		$scope.NCPenaltyFlag = "";
		$scope.NCNetChargeFlag = "";
		$scope.NCAdjAmtFlag = "";
		$scope.NCAdvAmtFlag = "";
		
		$scope.NCTotalPayableAmount = $scope.propDetailResponse.saveOrUpdateDataReqDTO.totalPay;
		$scope.NCArrearInt = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.arrearsInterest);
		$scope.NCCurrentInt = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.currentInterest);
		$scope.NCArrearWoInt = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.totalArrears);
		$scope.NCTotalTax = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.totalCurrent);
		$scope.NCRebate = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.rebate);
		$scope.NCRainRebate = $rootScope.makeFloat($scope.propDetailResponse.saveOrUpdateDataReqDTO.rainRebate);
	}

	$scope.NCTotalPayable = $rootScope.makeFloat($scope.NCTotalPayableAmount);

	proownername = $scope.propDetailResponse.ownerDetailDTO[0].title+" "+$scope.propDetailResponse.ownerDetailDTO[0].fName;

	var NCOwnerType = $scope.propDetailResponse.generalDetailDTO.ownerType;
	if(NCOwnerType == "186699" || NCOwnerType == "186698"){
		$scope.NCOwnerTable = "one";
		for(var i=0; i<$scope.propDetailResponse.ownerDetailDTO.length;i++){
			$scope.name = $scope.propDetailResponse.ownerDetailDTO[i].title+" "+$scope.propDetailResponse.ownerDetailDTO[i].fName;
			$scope.fathername = $scope.propDetailResponse.ownerDetailDTO[i].husName;
			$scope.gender = $scope.propDetailResponse.ownerDetailDTO[i].genDesc;
		}
	}
	else{
		$scope.NCOwnerTable = "two";
		for(var i=0; i<$scope.propDetailResponse.ownerDetailDTO.length;i++){
			$scope.Company = $scope.propDetailResponse.ownerDetailDTO[i].fName;
			$scope.pancardno = $scope.propDetailResponse.ownerDetailDTO[i].panNo;
		}
	}
	$scope.proceedToPayPage = function(){
		$state.go("app.noChangePropertyPayment",{response: $scope.NCTotalPayableAmount});
	}
})