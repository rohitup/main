angular.module('starter')
 .controller('LoginPageCtrl', function ($scope, $location,$ionicHistory, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter, 
	  $state, $ionicSideMenuDelegate, sharedProperties, $localStorage,$ionicPlatform,localStorageService,$ionicPopup,$window) {
	  $scope.isMainPanel = true;
	  $scope.ULBoptions = new Array();
	
	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
		      function() {
		    	
		    	 /* swal({
		    			title: "Are You Sure Want To Exit?",
		    			type: "warning",
		    			showCancelButton: true,
		    			confirmButtonColor: "#bd3a09",
		    			confirmButtonText: "Yes!",
		    			closeOnConfirm: true
		    		},
		    		function(){
		    			navigator.app.exitApp();
		    		});*/
		    	  var confirmPopup = $ionicPopup.show({
			           
		    		  title : 'MAINeT?',
			          template : 'Are You Sure Want To Exit?',
			           
			          buttons : [{
						             text : 'Ok',
						             type : 'button-balanced',
					             
						             onTap : function() {
						            	 	$localStorage.$reset();
						    			 	$window.localStorage.clear();
						    			    $ionicHistory.clearCache();
						    			    $ionicHistory.clearHistory();
						    			    navigator.app.exitApp();
						            	 ionic.Platform.exitApp();
					             	}
			          		}]
		           });
		       
		      }, 100
		    );
		    $scope.$on('$destroy', deregisterSecond);
		    
	  $scope.onlyNumericTenLimitInput = function()
	  {
	  	var mobileno = document.getElementById("mobileNo").value;
	  	var inputVal = mobileno;
	  	    var numericReg = /^[0-9]{1,10}$/;
	  	    if(!numericReg.test(inputVal) || inputVal.length>10) 
	  	    {
	  	    	inputVal.slice(0,-1);
	  	    	var inputValSlice = inputVal.slice(0,-1);
	  	    	document.getElementById("mobileNo").value = inputValSlice;
	  	    }
	  }
	  
		  $scope.loginmobilenumber;
		  $scope.loginPassword;
		  $scope.OrgID;
		  $scope.UserID;
	  
	  $ionicSideMenuDelegate.canDragContent(false)
	  
	  $scope.login = function() {
		  if(!$scope.loginmobileNo == ""){
			 
				 $ionicLoading.show({
						template: 'Loading...'
					});
			console.log("ULBid--"+$scope.ULBid)	  
		RestService.loginservice($scope.loginmobileNo,$scope.loginPassword,$scope.ULBid).then(function (responselogindata){
			console.log("responselogindata---"+responselogindata);
			 if(responselogindata.status == "success"){
//				 localStorageService.set('Loginresponse', responselogindata);
				 $localStorage.responselogindata = responselogindata;
				 
//				 sharedProperties.userData = $localStorage.responselogindata;
//				 alert("sharedProperties.userData--"+JSON.stringify(sharedProperties.userData));
				 
				 /* RestService.authenticateBihar().then(function(response){
				    		console.log("local: "+$localStorage.jwtToken);
				      },function(error){
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				      })*/
				 
				 $state.go("app.home");
				 $ionicLoading.hide();
			  }	else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
				}
			 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
			         
	  } else{ alert ("Please Enter Correct MobileNo or Password or Organization!"); }
	
	  }; 
  
	  $scope.ifnotregister = function() {
		 $state.go("app.Register");
	  }
	  
	  $scope.forgotpage = function() {
		$state.go("app.forgotpassword");
	  }
	  
var _init = function()
{
	$ionicLoading.show({
		template: 'Loading...'
	});
	$scope.ULBoptions.length = 0;
	RestService.ulbService().then(function (responseULB){
		console.log("responseULB---"+JSON.stringify(responseULB));
		 if(responseULB.status == "success"){
			var ULBList = responseULB.lookUpList;
			    for(var i=0;i<ULBList.length;i++){	
						$scope.ULBoptions.push({
						ulbid : ULBList[i].lookUpId,
						ulbname : ULBList[i].descLangFirst
				   })
			    }
			 $ionicLoading.hide();
		  }	else{
//				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			}
		 $ionicLoading.hide();
	},
	function (err) {
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	  })
};

_init();
	  
  })
