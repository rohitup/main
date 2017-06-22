angular.module('starter')
.controller('BirthRegistrationViewCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties,$rootScope){
	/*Variable Declaration Start*/
	$scope.birthDetailList = [];
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	$scope.birthDetailResponse = JSON.parse($stateParams.response);
	console.log("$scope.birthDetailResponse "+$scope.birthDetailResponse);
	for(var i=0;i<$scope.birthDetailResponse.length;i++){
		$scope.birthDetailList.push({
			bRegNo : $scope.birthDetailResponse[i].birthRegno,
			bChildName : $scope.birthDetailResponse[i].birtChildname,
			bGender : $rootScope.fullGender($scope.birthDetailResponse[i].birthGender),
			bDob: $rootScope.formatDate($scope.birthDetailResponse[i].birthDob),
			bFatherName: $scope.birthDetailResponse[i].birthFatherName,
			bMotherName : $scope.birthDetailResponse[i].birthMotherName,
			bHospName : $scope.birthDetailResponse[i].birthHospitalName,
		})
	}
	console.log("$scope.birthDetailList: "+$scope.birthDetailList);
	$scope.viewBirthRegistration1 = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
	}
	/*Function Declaration End*/
	var _init = function (){
    };
    _init();
});