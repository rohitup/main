angular.module('starter')
.controller('IssueBirthReceiptCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		ENV, $state, sharedProperties,$localStorage){
	
	$scope.issueBirthReceiptResponse = $localStorage.IssueBirthresponse;
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Birth");
		else item.currentTarget.setAttribute("placeholder","");
	}
	/*var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	function pad(s) { return (s < 10) ? '0' + s : s; }
	function formatDate(myDate) {
		if(myDate == "" || myDate == null || myDate == undefined) return "";
		else 
		{
			var d = new Date(myDate);
			return [pad(d.getDate()),monthNames[d.getMonth()], d.getFullYear()].join('-');
		}
	}
	function makeFloat(number){
		var num = number;
		if(num != '' || num==0){
			return num+".00";
		}
		else{
			return num;
		}
	}
	function fullGender(gender){
		var fullGenderDesc;
		if(gender == "F") fullGenderDesc = "Female";
		else if(gender == "M") fullGenderDesc = "Male";
		else if(gender == "T") fullGenderDesc = "Transgender";
		else fullGenderDesc = "";
		return fullGenderDesc;
	}*/
	/*Global Functions End*/
	

	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.birthReceiptcertificateAmt = 0;
	$scope.birthReceiptapplID = 0;
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	
	$scope.birthReceiptapplID = $scope.issueBirthReceiptResponse.applicationId;
	$scope.birthReceiptBirRegnumber = $scope.issueBirthReceiptResponse.birthRegno;
	$scope.birthReceiptchildName = $scope.issueBirthReceiptResponse.birtChildname;
	$scope.birthReceiptGender = fullGender($scope.issueBirthReceiptResponse.birthGender);
	$scope.birthReceiptDOB = formatDate($scope.issueBirthReceiptResponse.birthDob);
	$scope.birthReceiptfatherName = $scope.issueBirthReceiptResponse.birthFatherName;
	$scope.birthReceiptmotherName = $scope.issueBirthReceiptResponse.birthMotherName;
	$scope.birthReceiptbirthPlace = $scope.issueBirthReceiptResponse.birthHospitalName;
	$scope.birthReceiptcertificateAmt = makeFloat($scope.issueBirthReceiptResponse.certificateAmount);
	
	$localStorage.ServiceId = $scope.issueBirthReceiptResponse.serviceId;
	$localStorage.ServiceShortName = $scope.issueBirthReceiptResponse.serviceShortName;
	$localStorage.ServiceName = $scope.issueBirthReceiptResponse.serviceShortName;
	
	$scope.paybutton = function(){
		$state.go("app.IssueBirthPayReceipt")
	}
	
	/*Function Declaration End*/
	
	var _init = function (){
    };
    _init();
});