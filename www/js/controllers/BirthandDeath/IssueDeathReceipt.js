angular.module('starter')
.controller('IssueDeathReceiptCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		ENV, $state, sharedProperties,$localStorage){
	
	$scope.issueDeathReceiptResponse = $localStorage.IssueDeathresponse;
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Birth");
		else item.currentTarget.setAttribute("placeholder","");
	}

	/*Global Functions End*/
	

	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.deathReceiptcertificateAmt = 0;
	$scope.deathReceiptapplID = 0;
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	
	$scope.deathReceiptapplID = $scope.issueDeathReceiptResponse.applicationId;
	$scope.deathReceiptDeathRegnumber = $scope.issueDeathReceiptResponse.deathRegistrationNO;
	$scope.deathReceiptdeceasedName = $scope.issueDeathReceiptResponse.deceasedName;
	$scope.deathReceiptGender = fullGender($scope.issueDeathReceiptResponse.gender);
	$scope.deathReceiptDOB = formatDate($scope.issueDeathReceiptResponse.dateOfDeath);
	$scope.deathReceiptfatherName = $scope.issueDeathReceiptResponse.relativeName;
	$scope.deathReceiptmotherName = $scope.issueDeathReceiptResponse.motherName;
	$scope.deathReceiptdeathPlace = $scope.issueDeathReceiptResponse.hospitalName;
	$scope.deathReceiptcertificateAmt = makeFloat($scope.issueDeathReceiptResponse.certificateAmount);
	
	$localStorage.ServiceId = $scope.issueDeathReceiptResponse.serviceId;
	$localStorage.ServiceShortName = $scope.issueDeathReceiptResponse.serviceShortName;
	$localStorage.ServiceName = $scope.issueDeathReceiptResponse.serviceShortName;
	
	
	$scope.paydeathbutton = function(){
		$state.go("app.IssueDeathPayReceipt")
	}
	
	/*Function Declaration End*/
	
	var _init = function (){
    };
    _init();
});