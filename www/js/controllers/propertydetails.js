angular.module('starter')

  .controller('propertyTaxDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {
	  console.log($stateParams.response);
	  $scope.propDetailList = new Array();
	  $scope.propDetailResponse = JSON.parse($stateParams.response);
	  
		function pad(s) { return (s < 10) ? '0' + s : s; }
function formatDate(myDate) {
	var d = new Date(myDate);
	return [pad(d.getDate()),monthNames[d.getMonth()], d.getFullYear()].join('-');
}
 
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];	  
	
function makeFloat(number){
	var num = number;
	//alert(num);
	if(num != '' || num==0){
		//alert(num);
		return num+".00";
	}
	else{
		return num;
	}
}	
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
									  /*$("#NCOwnerHouse1").text($scope.propDetailResponse.generalDetailDTO.ownerHouse1);
									  $("#NCOwnerHouse2").text($scope.propDetailResponse.generalDetailDTO.ownerHouse2);
									  $("#NCOwnerHouse3").text($scope.propDetailResponse.generalDetailDTO.ownerHouse3);
									  */
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
									  
									  
									  
									  $scope.NCAcquDate = formatDate($scope.propDetailResponse.landOrBuildingDetailDTO.acquDate);
									  $scope.NCMainTotalArea = $scope.propDetailResponse.landOrBuildingDetailDTO.mainTotalArea;
									  $scope.NCAnnualRentalValue = $scope.propDetailResponse.landOrBuildingDetailDTO.annualRentalValue;
									  $scope.NCVacantLandArea = $scope.propDetailResponse.landOrBuildingDetailDTO.vacantLandArea;
									  $scope.NCTotalArrearTax = $scope.propDetailResponse.landOrBuildingDetailDTO.totalArrearTax;

									  $scope.NCFName = $scope.propDetailResponse.ownerDetailDTO.title+" "+$scope.propDetailResponse.ownerDetailDTO.fName;
									  $scope.NCSpouseName = $scope.propDetailResponse.ownerDetailDTO.husName;
									  $scope.NCGender = $scope.propDetailResponse.ownerDetailDTO.genDesc;
									  $scope.NCPanNo = $scope.propDetailResponse.ownerDetailDTO.panNo;

									  
									  
									  
									  $scope.NCPenalty = makeFloat($scope.propDetailResponse.taxCalculation.interestPenaltysas);
									  $scope.NCNetServCharge = makeFloat($scope.propDetailResponse.taxCalculation.netServiceChargePay);
									  $scope.NCAdjAmt = makeFloat($scope.propDetailResponse.taxCalculation.adjustmentAmount);
									  $scope.NCAdvAmt = makeFloat($scope.propDetailResponse.taxCalculation.advanceAmount);

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
		
		
					 
					 //fruits.splice(2, 0, "Lemon", "Kiwi");
					 //$scope.groups[2].items[0].data[0].splice(0,0, replace);
	  
  })
