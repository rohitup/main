angular.module('starter')

  .controller('PaymentPageCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage,$sessionStorage,$ionicPopup) {
/*declare start*/
	//console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
/*	$scope.orgid = "81";
	$scope.userID = "10";
	$scope.loginUSername = "Dharti";
	$scope.LoginMobileNo = "4687987974";*/
	$scope.data={
		finalAppName:'',
		finalAppMobile:'',
		finalAppEmail:'',
		paymentType:'',
	};
	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.data.finalAppName = $localStorage.responselogindata.firstName;
	$scope.data.finalAppMobile = $localStorage.responselogindata.mobileNo;
	$scope.data.finalAppEmail = $localStorage.responselogindata.emailId;
	$scope.ServiceShortName = "ESR";
	$scope.finalAmount = $sessionStorage.rnlFinalAmount;
	$scope.pgOptions = new Array();
		for(var i=0;i<$sessionStorage.pgList.length;i++){							
			$scope.pgOptions.push({
			id : $sessionStorage.pgList[i].bankId,
			name : $sessionStorage.pgList[i].cbbankname
		})
	}
	$scope.saveRNLServiceData = function(){
		$sessionStorage.saveRNLData.estateBookingDTO.amount = $sessionStorage.rnlFinalAmount;
		$sessionStorage.saveRNLData.payAmount = $sessionStorage.rnlFinalAmount;
		$sessionStorage.saveRNLData.documentList = $localStorage.documentObjectArray;
		console.log("$sessionStorage.saveRNLData: "+JSON.stringify($sessionStorage.saveRNLData));
		
		$ionicLoading.show();
		RestService.saveRNLService($sessionStorage.saveRNLData).then(function(rnlsaveresponse){
			  if(rnlsaveresponse.status == "success"){
				 $scope.applicationNo = rnlsaveresponse.applicationNo;
				 $ionicLoading.show({
						template: 'Loading...'
				 });
				 var confirmPopup = $ionicPopup.show({
					 title : 'Estate Booking',
			         template : 'Your application <b>#'+$scope.applicationNo+'</b> is successfully submitted.',
			         buttons : [{
			             text : 'Proceed',
			             type : 'button-balanced',
			             onTap : function(){
			            	 if(!$scope.data.finalAppEmail){$scope.data.finalAppEmail = "";}
			            	 RestService.savePayReq($sessionStorage.rnlFinalAmount,$scope.data.paymentType,$scope.applicationNo,$scope.applicationNo,$scope.orgId,$scope.userID,$scope.data.finalAppName,$scope.data.finalAppMobile,$scope.ServiceShortName,$scope.data.finalAppEmail)
			 				.then(function (response){
			 					if(response.status == "success"){
			 						$ionicLoading.hide();
			 						
			 						var H= null;
			 						H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
			 						H.addEventListener('exit', iabClose);
			 						H.addEventListener('loadstop', iabClose1);
			 						function iabClose(event) 
			 						{
			 							H.removeEventListener('exit', iabClose); 
			 							$state.go("app.home");
			 						}
			 						function iabClose1(event){
			 							if (event.url.match("mobile/close")) {
			 								H.close();
			 								H.removeEventListener('loadstop', iabClose1);
			 								$state.go("app.home");
			 							}
			 						}
			 					}
			 					else{
			 						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			 					}
			 					$ionicLoading.hide();
			 				}, function (err) {
			 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			 					$ionicLoading.hide();
			 				})
			             }
	          		}]
				});
				 
				$ionicLoading.hide();
		    }
			else{
			  	$ionicLoading.hide();
		  	}
		},function (savernlerr) { 
			console.log("savernlerr: "+JSON.stringify(savernlerr));
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	};
})