
var datePicker = angular.module('starter');
datePicker.controller('EstateBookPropCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties,$rootScope,$stateParams,$localStorage,$sessionStorage){
	var disabledDates = [];
	disabledDates = JSON.parse($stateParams.disabledDates);
	console.log("$scope.disabledDates: "+JSON.stringify(disabledDates));
	$scope.data = {};
	$scope.data = {
		RNLTitle:'',
		RNLFName:'',
		RNLMName:'',
		RNLLName:'',
		RNLGender:'',
		RNLMobile:'',
		RNLEmail:'',
		RNLAadhar:'',
		RNLPan:'',
		RNLFlatNo:'',
		RNLBuilding:'',
		RNLRoad:'',
		RNLBlock:'',
		RNLArea:'',
		RNLVillage:'',
		RNLPinCode:'',
		fromDate:'',
		toDate:'',
		RNLShift:'',
		RNLPurpose:''
	};
	$scope.langId = "1";
	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.userId = $localStorage.responselogindata.userId;
	$sessionStorage.rnlServiceCode = "ESR";
	/*$scope.data.fromDate = "";
	$scope.data.toDate = "";*/
	/*Retrieving Dropdown Data Start*/
	$rootScope.getNonHData("TTL","ttlList",$scope.orgId);
	$rootScope.getNonHData("GEN","genList",$scope.orgId);
	$rootScope.getNonHData("SHF","shfList",$scope.orgId);
	$rootScope.getNonHData("CAA","chargeApplList",$scope.orgId);
	
	
	$scope.rnlNewRatestartDate= new Date($sessionStorage.currentDate).getTime();
	/*Retrieving Dropdown Data End*/
	/*Retrieve Property Details*/
	$scope.propDetails = JSON.parse($stateParams.response);
	console.log("$scope.propDetails: "+JSON.stringify($scope.propDetails));
	if($scope.propDetails.propId > 0){
		$scope.RNLEstateCode = $scope.propDetails.estateCode;
		$scope.RNLEstateName = $scope.propDetails.estateName;
		$scope.RNLPropertyNo = $scope.propDetails.propertyNo;
		$scope.RNLPropName = $scope.propDetails.propName;
		$scope.RNLUnitNo = $scope.propDetails.unit;
		$scope.RNLOccType = $scope.propDetails.occupancy;
		$scope.RNLUsage = $scope.propDetails.usage;
		$scope.RNLFloor = $scope.propDetails.floor;
		$scope.RNLTotalArea = $scope.propDetails.totalArea;
	}
	/*Retrieve Property Details*/
	/*Map User Details in Form*/
	$scope.$watch('genList', function (newValue, oldValue, $scope) {
		/*$scope.data.RNLTitle = $localStorage.responselogindata.title;
		$scope.data.RNLGender = $localStorage.responselogindata.gender;*/
	});
	
	$scope.data.RNLFName = $localStorage.responselogindata.firstName;
	$scope.data.RNLMName = $localStorage.responselogindata.middleName;
	$scope.data.RNLLName = $localStorage.responselogindata.lastName;
	$scope.data.RNLMobile = $localStorage.responselogindata.mobileNo;
	$scope.data.RNLEmail = $localStorage.responselogindata.emailId;
	$scope.data.RNLAadhar = $localStorage.responselogindata.addhaarNo;

/*	$("#ttloptions").val(appTTlID).change();
	$("#genoptions").val(wncgender).change();*/
	/*Map User Details in Form*/	
	/*Disable Past and Booked Dates Start*/
	
	$('body').on('focus',".datepicker", function(){
		var dateToday = new Date($sessionStorage.currentDate);
		$("#fromDate").datepicker({
			beforeShowDay: DisableSpecificDates,
			minDate: dateToday,
			dateFormat: 'dd/mm/yy',
			onClose: function() {
				$(this).blur(); 
			}
		});
		
		$("#toDate").datepicker({
			beforeShowDay: DisableSpecificDates,
			minDate: dateToday,
			dateFormat: 'dd/mm/yy',
			onClose: function() {
				$(this).blur(); 
			}
		});
	});
	function DisableSpecificDates(date) {
		
		var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
	    return [disabledDates.indexOf(string) == -1];
	}
	/*Disable Past and Booked Dates End*/
	
	$scope.getShifts = function(type){
		$scope.data.RNLShift = "";
		$("#toDate").datepicker("option","minDate",$("#fromDate").datepicker("getDate"));
		console.log("$scope.fromDate: "+$scope.data.fromDate+"|$scope.toDate: "+$scope.data.toDate);		
		if(type=='from'){
			$("#toDate").val("");
		}
		if(!!($scope.data.fromDate) && !!($scope.data.toDate)){
			$ionicLoading.show();
			RestService.getRNLShifts($scope.propDetails.propId,$scope.data.fromDate,$scope.data.toDate,$scope.orgId)
			.then(function(response){
				$rootScope.shfList.length = 0;
				for(var i=0;i<response.length;i++){
					$rootScope.shfList.push({
						value : response[i].lookUpId,
						name : response[i].descLangFirst
					})
				}
				console.log("getRNLShifts response: "+JSON.stringify(response));
				$ionicLoading.hide();
			},function(shifterr){
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
		}
		else {
			$rootScope.shfList = $rootScope.tempshfList;
		}
	}
	$scope.submitPropertyInfo = function()
	{
		$scope.rnlToDate = $("#toDate").datepicker("getDate").getTime();
		$scope.rnlFromDate = $("#fromDate").datepicker("getDate").getTime();
		
		console.log("$scope.rnlToDate: "+$scope.rnlToDate+"|$scope.rnlFromDate: "+$scope.rnlFromDate);
		/*alert("todate: "+$scope.data.toDate);
		var myDate= new Date($scope.data.toDate).getTime();
		alert("todate format: "+myDate);*/
		$sessionStorage.saveRNLData = new Array();
		$sessionStorage.saveRNLData = {
			applicantDetailDto:{
				organizationName:"",
				applicantFirstName:$scope.data.RNLFName,
				applicantMiddleName:$scope.data.RNLMName,
				applicantLastName:$scope.data.RNLLName,
				gender:$scope.data.RNLGender,
				mobileNo:$scope.data.RNLMobile,
				emailId:$scope.data.RNLEmail,
				pinCode:$scope.data.RNLPinCode,
				buildingName:$scope.data.RNLBuilding,
				roadName:$scope.data.RNLRoad,
				applicantTitle:$scope.data.RNLTitle,
				areaName:$scope.data.RNLArea,
				blockName:$scope.data.RNLBlock,
				villageTownSub:$scope.data.RNLVillage,
				orgId:$scope.orgId,
				langId:$scope.langId,
				userId:$scope.userId,
				flatBuildingNo:$scope.data.RNLFlatNo,
				aadharNo:$scope.data.RNLAadhar,
				panNo:$scope.data.RNLPan
			},
			estateBookingDTO:{
				toDate:$scope.rnlToDate,
				fromDate:$scope.rnlFromDate,
				amount:"",
				securityAmount:0.0,
				propId:$scope.propDetails.propId,
				shiftId:$scope.data.RNLShift,
				purpose:$scope.data.RNLPurpose,
				orgId:$scope.orgId,
				langId:$scope.langId,
				createdBy:$scope.userId,
				createdDate:$scope.rnlNewRatestartDate,
				updatedBy:"",
				updatedDate:"",
				lgIpMac:$localStorage.macAddress,
				lgIpMacUp:$localStorage.macAddress,
				shiftName:""
			},
			estatePropResponseDTO: {
				propId: $scope.propDetails.propId
			},
			deptId:1,
			serviceId: 1
		};
		console.log("$sessionStorage.saveRNLData: "+JSON.stringify($sessionStorage.saveRNLData));
		$ionicLoading.show();
		/*Model Initialization Call*/
		RestService.initializeModel('ChecklistModel|RNLRateMaster')
		.then(function(responsedata){
			console.log("initializeModel response: "+JSON.stringify(responsedata));
			if(responsedata.wsStatus == "success"){
				$scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
				$scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
				$scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
				$scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
				$scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
				$scope.factor1 = responsedata.responseObj[0].factor1;
				$scope.factor2 = responsedata.responseObj[0].factor2;
				$scope.factor3 = responsedata.responseObj[0].factor3;
				$scope.factor4 = responsedata.responseObj[0].factor4;
				$scope.isBPL = responsedata.responseObj[0].isBPL;
				$scope.noOfDays = responsedata.responseObj[0].noOfDays;
				$scope.deptCode = responsedata.responseObj[0].deptCode;
				$scope.applicantType = responsedata.responseObj[0].applicantType;
				$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
				$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
				$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
				$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;

				/*Checklist Call*/
				var checklistInput = {
					dataModel: {
						orgId:$scope.orgId,
						serviceCode:$sessionStorage.rnlServiceCode,
						usageSubtype1:$sessionStorage.rnlusageSubtype1,
						usageSubtype2:$scope.usageSubtype2,
						usageSubtype3:$sessionStorage.rnlusageSubtype3,
						usageSubtype4:$sessionStorage.rnlusageSubtype4,
						usageSubtype5:$scope.usageSubtype5,
						applicantType:$scope.applicantType,
						noOfDays:$scope.noOfDays,
						isOutStandingPending:$scope.isOutStandingPending,
						isExistingConnectionOrConsumerNo:$scope.isExistingConnectionOrConsumerNo,
						isExistingProperty:$scope.isExistingProperty,
						isBPL:$scope.isBPL,
						disConnectionType:$scope.disConnectionType,
						factor1:$sessionStorage.rnlfactor1,
						factor2:$sessionStorage.rnlfactor2,
						factor3:$scope.factor3,
						factor4:$scope.factor4,
					}
				};
				console.log("checklistInput: "+JSON.stringify(checklistInput));
				RestService.getChecklistCall(checklistInput)
				.then(function (checklistResponse){
					console.log("checklistResponse: "+JSON.stringify(checklistResponse));
					if(checklistResponse.wsStatus == "success"){
						$localStorage.checklistResponse = checklistResponse;
						/*Dependency Call*/
						var chargeApplAt = $.grep($rootScope.mainchargeApplList, function (prefix) {
				            return prefix.lookUpCode == "APL";
				        })[0].lookUpId;
						var chargeApplAtLabel = $.grep($rootScope.mainchargeApplList, function (prefix) {
				            return prefix.lookUpCode == "APL";
				        })[0].descLangFirst;
						RestService.dependentParams($scope.orgId,$sessionStorage.rnlServiceCode,chargeApplAt)
						.then(function (setdependresponse){
							console.log("setdependresponse: "+JSON.stringify(setdependresponse));
							var dependentRespParams = setdependresponse.responseObj;
							if(setdependresponse.wsStatus == "success"){
								var serviceChargeParams = new Array();
								for(var i=0; i < dependentRespParams.length; i++){
									serviceChargeParams.push({
										orgId: $scope.orgId,
										serviceCode: $sessionStorage.rnlServiceCode,
										deptCode: "RNL",
										taxType: dependentRespParams[i].taxType,
										taxCode: dependentRespParams[i].taxCode,
										taxCategory: dependentRespParams[i].taxCategory,
										taxSubCategory: dependentRespParams[i].chargeDescEng,
										usageSubtype1: $sessionStorage.rnlusageSubtype1,
										usageSubtype2: $sessionStorage.rnlusageSubtype3,
										usageSubtype3: $sessionStorage.rnlusageSubtype4,
										usageSubtype4: responsedata.responseObj[1].usageSubtype4,
										usageSubtype5: responsedata.responseObj[1].usageSubtype5,
										rateStartDate: $scope.rnlNewRatestartDate,
										chargeApplicableAt: chargeApplAtLabel,
										floorLevel: $sessionStorage.rnlfactor2,
										roadType: $sessionStorage.rnlroadType,
										occupancyType: $sessionStorage.rnlfactor1,
										factor4: responsedata.responseObj[1].factor4
									})
								}
								console.log("serviceChargeParams: "+JSON.stringify(serviceChargeParams));
								var serviceChargeInput = {
									dataModel: serviceChargeParams
								}
								console.log("serviceChargeInput: "+JSON.stringify(serviceChargeInput));
								$ionicLoading.hide();
								$state.go("app.checklistUpload",{serviceChargeInput: JSON.stringify(serviceChargeInput)});
							}
							else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							}
							$ionicLoading.hide();
						},function (err){
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
						})
					}
					$ionicLoading.hide();
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
			}
			else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			}
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			$ionicLoading.hide();
		})
	}
	var _init = function (){	
	};
	_init();
});