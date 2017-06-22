angular.module('starter')

  .controller('ForgotPasswordCtrl', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate) {
	  
	  $ionicSideMenuDelegate.canDragContent(false)
	  
	  $scope.show = 1;
	  $scope.forgotmobileNo;
	  
	  $scope.forgotmobilesubmit1 = function() {  $scope.show = 2; }
	  $scope.forgototpsubmit1 = function() { $scope.show = 3;}
	  $scope.forgotpasswordsubmit1 = function(){
			 $state.go("app.LoginPage");
	  }
	  
	  
 $scope.forgotmobilesubmit = function() {
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
	RestService.forgotoptservice($scope.forgotmobileNo).then(function (responseregisterdata){
		console.log("responseregisterdata---"+responseregisterdata);
		alert("responseregisterdata---"+responseregisterdata.status);
		 if(responseregisterdata.status == "success"){
			 $ionicLoading.hide();
			 $scope.show = 2;
			 
		  }	else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
	  }
	  
	  
 $scope.forgototpsubmit = function() {
		  
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
	RestService.forgototpverfiy($scope.forgotmobileNo,$scope.forgototp).then(function (responseOPTdata){
	console.log("responseOPTdata---"+responseOPTdata);
		 if(responseOPTdata.status == "success"){
			 $ionicLoading.hide();
			 $scope.show = 3;
			 
		  }	else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
	  }
	  
  $scope.forgotpasswordsubmit = function(){
		/*  var password = document.getElementById("txtPassword").value;
	      var confirmPassword = document.getElementById("txtConfirmPassword").value;
	        if (password != confirmPassword) {
	            alert("Passwords do not match.");
	            return false;
	        }
	        return true;*/
	        
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
		RestService.forgotpasswordservice($scope.forgotmobileNo,$scope.forgotpassword).then(function (responsepassworddata){
		console.log("responsepassworddata---"+responsepassworddata);
		 if(responsepassworddata.status == "success"){
			 $ionicLoading.hide();
			 $state.go("app.LoginPage");
		  }	else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
	 }
	  
	  $scope.inputType = 'password';
	  
		  $scope.hideShowPassword = function(){
		    if ($scope.inputType == 'password')
		      $scope.inputType = 'text';
		    else
		      $scope.inputType = 'password';
		  };
})
