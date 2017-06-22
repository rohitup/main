angular.module('starter')
.controller('BirthRegistrationCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties){
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Birth");
		else item.currentTarget.setAttribute("placeholder","");
	}
	
	/*Global Functions End*/
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();
	$scope.langId = sharedProperties.getLangId();*/
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.childName = "";
	$scope.fatherName = "";
	$scope.motherName = "";
	$scope.hospName = "";
	$scope.sex = "";
	$scope.dateOfBirth = "";
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	
	$scope.viewBirthRegistration = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});	
		var dateOfBirth = formatDate($scope.dateOfBirth);
		console.log($scope.childName+"|"+$scope.fatherName+"|"+$scope.motherName+"|"+$scope.hospName+"|"+$scope.sex+"|"+dateOfBirth+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.viewBReg($scope.childName,$scope.fatherName,$scope.motherName,$scope.hospName,$scope.sex,dateOfBirth,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(res){
		/*var url = 'js/services/viewBirthResponse.json';
	    $http.get(url).then(function(res){*/
	    	var response = res;
			console.log("response data: "+JSON.stringify(response));
			if(response.length > 0){
				for(var i=0;i<response.length;i++){
				//alert("response.birthApplicationStatus: "+response[i].birthApplicationStatus+"|"+response[i].status);
					if(response[i].status == "success"){
						//alert("Success");
						$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
					}
					else{
						//alert(response[i].birthApplicationStatus);
						toaster.error($filter('translate')(''), response[i].birthApplicationStatus);
						//$state.go("app.birthRegistrationView",{response: JSON.stringify(response)});
					}
				}
			}
			else {
				toaster.error($filter('translate')(''), $filter('translate')('NO_RECORD'));
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