angular.module('starter')

  .controller('COUpaymentCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage,$ionicPopup) {
/*declare start*/
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
	    $scope.ServiceShortName = "WCO";
	 
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;
	  
/*declare end*/	  
		$scope.COUFlatRate = $localStorage.responseservicechargedata.responseObj[0].flatRate;
		$scope.options = new Array();
		for(var i=0;i<$localStorage.Bankresponse.list.length;i++){							
			$scope.options.push({
			id : $localStorage.Bankresponse.list[i].bankId,
			name : $localStorage.Bankresponse.list[i].cbbankname
		})
	}	 
		
$scope.COUsavedata = function(){
/*	if ($scope.COUFlatRate <= $scope.COUpaidamt) {
			alert("Paid Amount Should Not Be Greater Then Total Amount");
			return false;
		}
		else {	*/
			$ionicLoading.show({
				template: 'Loading...'
			});
			RestService.COUsaveservice($localStorage.applFName,$localStorage.applMname,$localStorage.applLname,$localStorage.applmobileno,$localStorage.appltitle,
				$localStorage.appladdress,$scope.COUpaidamt,$localStorage.csidn,$localStorage.applRoadname,$localStorage.connNo,$localStorage.applConnsize,
				$localStorage.COURemarks,$localStorage.COUtarifCate,$localStorage.COUpermiseType,$localStorage.newCOUtarifnew,
				$localStorage.newCOUpermise,$scope.orgid,$scope.userID,$localStorage.documentObjectArray,$localStorage.applbplflag,
				$localStorage.couwrNewRatestartDate,$localStorage.macAddress).then(function(COUresponse){
					  console.log("COUresponse=="+JSON.stringify(COUresponse));
					  if(COUresponse.status == "success"){
						 $scope.applictNo = COUresponse.applicationNo;
//						
						 $ionicLoading.show({
								template: 'Loading...'
							});
						 var confirmPopup = $ionicPopup.show({
							 title : 'Change Of Usage',
					         template : 'Your application <b>#'+$scope.applictNo+'</b> is successfully submitted.',
					         buttons : [{
					             text : 'Proceed',
					             type : 'button-balanced',
					             onTap : function(){	 
						 RestService.savePayReq($scope.COUFlatRate,$scope.COUpaymettype,$scope.applictNo,$localStorage.CSidn,$scope.orgid,
							$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,$scope.emailId)
									.then(function (response) {
									if(response.status == "success"){
										$ionicLoading.hide();
										
										var H= null;
										H = window.open(encodeURI(response.payRequestMsg), '_blank', 
										'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
										
										H.addEventListener('exit', iabClose);
										H.addEventListener('loadstop', iabClose1);
										function iabClose(event) 
										{
//											$scope.PaymentRecieptMethod1();
											H.removeEventListener('exit', iabClose); 
											$state.go("app.WaterModule");
										}
										function iabClose1(event){
											if (event.url.match("mobile/close")) {
													H.close();
													H.removeEventListener('loadstop', iabClose1);
//													alert("Payment Have Successfully Done")
													$state.go("app.WaterModule");
											}
										}
									}
									else{
											toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
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
					},function (err) { 
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
				})
//			  }
		};
  })
