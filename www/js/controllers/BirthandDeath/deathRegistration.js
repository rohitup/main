angular.module('starter')
.controller('DeathRegistrationCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties){
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfdeath == "" || $scope.dateOfdeath == null || $scope.dateOfdeath == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Death");
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
	}*/
	/*Global Functions End*/
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();
	$scope.langId = sharedProperties.getLangId();*/
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.deceasedName = "";
	$scope.causeofdeath = "";
	$scope.deathplace = "";
	$scope.deathsex = "";
	$scope.dateOfdeath = "";
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	$scope.viewDeathRegistration1 = function(){
		alert("working");
	}
	
	
	$scope.viewDeathRegistration = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});	
		var dateOfdeath = formatDate($scope.dateOfdeath);
		console.log($scope.deceasedName+"|"+$scope.causeofdeath+"|"+$scope.deathplace+"|"+$scope.deathsex+"|"+dateOfdeath+"|"+$scope.orgId+"|"+$scope.empId+"|"+$scope.langId);
		RestService.viewDeathReg($scope.deceasedName,$scope.causeofdeath,$scope.deathplace,$scope.deathsex,dateOfdeath,$scope.orgId,$scope.empId,$scope.langId)
		.then(function(response){
			
			console.log("response data: "+JSON.stringify(response));
			if(response.length > 0){
				for(var i=0;i<response.length;i++){
					if(response[i].status == "success"){
						$state.go("app.deathRegistrationViewdetails",{response: JSON.stringify(response)});
					}
					else{
						toaster.error($filter('translate')(''), response[i].deathApplicationStatus);
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