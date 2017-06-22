angular.module('starter')

  .controller('DissConnPayCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage,$sessionStorage) {
	  $scope.data = {};
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

	  $scope.ServiceShortName = "WCC";
		
		console.log("$localStorage.Bankresponse--"+$localStorage.Bankresponse);
		$scope.FlatRate = $localStorage.responseservicechargedata.responseObj[0].flatRate;
		$scope.options = new Array();
		for(var i=0;i<$localStorage.Bankresponse.list.length;i++){							
			$scope.options.push({
			id : $localStorage.Bankresponse.list[i].bankId,
			name : $localStorage.Bankresponse.list[i].cbbankname
		})
	}	  
		
		for(var i=0;i<$sessionStorage.connectiondetail.length;i++){	
			var applicantTitle = $sessionStorage.connectiondetail[i].csTitle;
			var applicantFirstName = $sessionStorage.connectiondetail[i].csName;
			var applicantMiddleName = $sessionStorage.connectiondetail[i].csMname;
			var applicantLastName = $sessionStorage.connectiondetail[i].csLname;
			var mobileNo = $sessionStorage.connectiondetail[i].csContactno;
			var bplNo = $sessionStorage.connectiondetail[i].bplNo;
			var housingComplexName = $sessionStorage.connectiondetail[i].csBldplt;
			var roadName = $sessionStorage.connectiondetail[i].csRdcross;
			var areaName = $sessionStorage.connectiondetail[i].csAdd;
			var csIdn = $sessionStorage.connectiondetail[i].csIdn;
			var csApldate = $sessionStorage.connectiondetail[i].csApldate;
		}
	  
 $scope.savedata = function(){

	 if ($scope.FlatRate <= $scope.payingAmount) {
			alert("Paid Amount Should Not Be Greater Then Total Amount");
			return false;
		}
		else {	
			 $ionicLoading.show({template: 'Loading...'	});
			  
	RestService.disconnsave(
			$scope.orgid,
			$scope.userID,
			applicantTitle,	
			applicantFirstName,
			applicantMiddleName,
			applicantLastName,
			mobileNo,
			bplNo,
			housingComplexName,
			roadName,
			areaName,
			csIdn,
			csApldate,
			$localStorage.documentObjectArray,
			$sessionStorage.applbplflag,
			$sessionStorage.DisConn_Type,
			$sessionStorage.disfromdate,
			$sessionStorage.distodate,
			$sessionStorage.disConnReason,
			$sessionStorage.disPlumberDetail,
			$sessionStorage.startDate,
			$sessionStorage.plumberNo,
			$sessionStorage.initializedmodeldata.free
	).then(function (disconnresponse){
		console.log("disconnresponse----"+disconnresponse.status);
			 if(disconnresponse.status == "success"){
				 
				 $sessionStorage.applictNo = disconnresponse.applicationNo;
				 
			  RestService.savePayReq($scope.payingAmount,$scope.paymentGateway,
					$sessionStorage.applictNo,csIdn,$scope.orgid,$scope.userID,
					$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName)
							.then(function (response) {
								alert(response.status);
							if(response.status == "success"){
//								alert(response.payRequestMsg);
								var H= null;
								
								H = window.open(encodeURI(response.payRequestMsg), '_blank', 
								'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
								
								H.addEventListener('exit', iabClose);
								H.addEventListener('loadstop', iabClose1);
								function iabClose(event) 
								{
									H.removeEventListener('exit', iabClose); 
									$state.go("app.WaterModule");
								}
								function iabClose1(event){
									if (event.url.match("mobile/close")) {
										H.close();
										H.removeEventListener('loadstop', iabClose1);
										$state.go("app.WaterModule");
									}
								}
							}
							else{
									toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
								}
							$ionicLoading.hide();
						}, function (err){ 
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
							$ionicLoading.hide();
						})
				  $ionicLoading.hide();
			  }
				  else{
					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					  $ionicLoading.hide();
				  }
			},function (err){ 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
			  }
	  	};
 		
  }) /*controler ends*/
  
