angular.module('starter')

  .controller('RegisterPageCtrl', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate, sharedProperties) {
	  
	  $ionicSideMenuDelegate.canDragContent(false)
	  
	  $scope.changeAttr = function(item){
			if($scope.regdob == "" || $scope.regdob == null || $scope.regdob == undefined )
				item.currentTarget.setAttribute("placeholder","Date of Birth");
			else item.currentTarget.setAttribute("placeholder","");
		}
	  
	  $scope.regOrgID;
      $scope.regUserID;
	  
	  $scope.show = 1;
	
	  
	  $scope.regsubmit1 = function() {$scope.show = 2;}
	  
	  $scope.otpsubmit1 = function() { $scope.show = 3;}
	  
	  $scope.passwordsubmit1 = function(){$state.go("app.LoginPage");}
	  
	  
	  $scope.regsubmit= function() {
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
	RestService.registerservice($scope.regfirstname,$scope.reglastname,$scope.reggender,$scope.regdob,$scope.regmobile,
		$scope.regemailid,$scope.regaadharnumber).then(function (responseregisterdata){
		console.log("responseregisterdata---"+responseregisterdata);
		 if(responseregisterdata.status == "success"){
			 $ionicLoading.hide();
			 
			 $scope.REGORGID = responseregisterdata.orgId;
			 $scope.regUserID = responseregisterdata.userId;
			alert($scope.REGORGID);
			
			 sharedProperties.setregorgID($scope.REGORGID);
			 sharedProperties.setreguserID($scope.regUserID);
			 
			 
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
	  
	  
	  $scope.RegorgId = sharedProperties.getRegorgId();
	  $scope.regUserID = sharedProperties.getreguserID(); 
	  
$scope.otpsubmit= function() {
	 alert(" $scope.regorgId ----get--" +$scope.regorgId);
		  
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
	RestService.optservice($scope.regmobile,$scope.regotp,$scope.RegorgId,$scope.regUserID).then(function (responseOPTdata){
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
	  
  $scope.passwordsubmit = function(){
		  
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
			 
		RestService.passwordservice($scope.regmobile,$scope.regpassword,$scope.RegorgId,$scope.regUserID).then(function (responsepassworddata){
		console.log("responsepassworddata---"+responsepassworddata);
		 if(responsepassworddata.status == "success"){
			 $ionicLoading.hide();
//			 $scope.show = 3;
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
