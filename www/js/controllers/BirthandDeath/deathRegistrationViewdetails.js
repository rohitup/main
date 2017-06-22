angular.module('starter')
.controller('DeathRegistrationViewCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties){
	/*Global Functions Start*/
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
	
	function fullGender(gender){
		var fullGenderDesc;
		if(gender == "F") fullGenderDesc = "Female";
		else if(gender == "M") fullGenderDesc = "Male";
		else if(gender == "T") fullGenderDesc = "Transgender";
		else fullGenderDesc = "";
		return fullGenderDesc;
	}*/
	/*Global Functions End*/

	/*Variable Declaration Start*/
	$scope.deathDetailList = [];
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	$scope.deathDetailResponse = JSON.parse($stateParams.response);
	console.log("$scope.deathDetailResponse "+$scope.deathDetailResponse);
	for(var i=0;i<$scope.deathDetailResponse.length;i++){
		$scope.deathDetailList.push({
			deathRegNo : $scope.deathDetailResponse[i].deathRegistrationNO,
			deathDeceasedName : $scope.deathDetailResponse[i].deceasedName,
			deathGender : fullGender($scope.deathDetailResponse[i].gender),
			deathDod: formatDate($scope.deathDetailResponse[i].dateOfDeath), 
			deathHospitalName: $scope.deathDetailResponse[i].hospitalName,
			deathMotherName : $scope.deathDetailResponse[i].motherName,
			deathReasonDeath : $scope.deathDetailResponse[i].reasonDeath,
		})
	}
	console.log("$scope.deathDetailList: "+$scope.deathDetailList);
	//alert($scope.birthDetailList[0].bRegNo);
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