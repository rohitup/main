angular.module('starter')

  .controller('NewWaterconnPayCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage,$ionicPopup) {
	  
	 /* $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.loginUSername = "Gajendra";
	  $scope.LoginMobileNo = "9664611565";*/
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
	    $scope.ServiceShortName = "WNC";
	   
	  $scope.checklist ='';
	  $scope.WNCtarif;
	  $scope.WNCpermise;
	  $scope.WNCapplicantype;
	  $scope.WNCexistconsumerdetail;
	  $scope.WNCexistproperty;
	  $scope.WNCBpl;
	  $scope.settemp;
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.noOfDays;
	  $scope.isOutStandingPending;
	  $scope.disConnectionType;
	  $scope.factor1; 
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;
	  
	  var apptypetext;
	  var tariftext;
	  var permisetext;
	 
	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
		$scope.selectfilename;
		
		console.log("$localStorage.Bankresponse--"+$localStorage.Bankresponse);
		$scope.FlatRate = $localStorage.responseservicechargedata.responseObj[0].flatRate;
		$scope.options = new Array();
		for(var i=0;i<$localStorage.Bankresponse.list.length;i++){							
			$scope.options.push({
			id : $localStorage.Bankresponse.list[i].bankId,
			name : $localStorage.Bankresponse.list[i].cbbankname
		})
	}	  
	  
 $scope.savedata = function(){
//	 if ($scope.FlatRate <= $scope.data_.payingAmount) {
//			alert("Paid Amount Should Not Be Greater Then Total Amount");
//			return false;
//		}
//		else {	
			  console.log("documentObjectArray---"+JSON.stringify($localStorage.documentObjectArray));
			  $scope.applnDate = new Date().getTime();
			  
			  $ionicLoading.show({
					template: 'Loading...'
				});
//			  console.log("$localStorage.WNCConnSize--"+$localStorage.WNCConnSize);
//			  $localStorage.WNCwaterconn
			 $scope.free =  $localStorage.responsechecklistdata.free;
			  console.log(" $scope.free--"+$scope.free);
			  
		  RestService.savewaterconndata(
					$localStorage.WNCapplicantype,
					$localStorage.WNCorgname,
					$localStorage.WNCtemporary,
				    $localStorage.WNCfromdate,
					$localStorage.WNCtodate,
					$localStorage.WNCselecttitle,
					$localStorage.WNCFirstname,
					$localStorage.WNCMiddlename,
						  $localStorage.WNCLastname,
						  $localStorage.WNCgender,
						  $localStorage.WNCmobile,
						  $localStorage.WNCaadharnumber,
						  $localStorage.WNCBpl,
						  $localStorage.WNCbplno,
						  $localStorage.addinfochecked,
						  $localStorage.WNCroadname,
						  $localStorage.WNCareaname,
						  $localStorage.WNCtowncity,
						  $localStorage.WNCpincode,
						  $localStorage.WNCbillroadname,
						  $localStorage.WNCbillareaname,
						  $localStorage.WNCbilltowncity,
						  $localStorage.WNCbillpincode,
						  $localStorage.WNCexistconsumerdetail,
						  $localStorage.WNCexistconnno,
						  $localStorage.WNCexistproperty,
						  $localStorage.WNCpropertyno,
						  $localStorage.WNCconstype,
						  $localStorage.WNCnoofusers,
						  $localStorage.WNCtarif,
						  $localStorage.WNCpermise,
						  $localStorage.WNCConnSize,
						  $localStorage.WNCnooftaps,
						  $scope.selectfilename,
						  $localStorage.WNCnooffamily,
						  $scope.orgid,
						  $scope.userID,
						  $scope.ServiceShortName,
						  $localStorage.WNCZone,
						  $localStorage.WNCWard,
						  $localStorage.WNCconntype,
						  $localStorage.macAddress,
						  $scope.applnDate,
						  $localStorage.WNCemailid,
						  $localStorage.documentObjectArray,
						  $scope.FlatRate,
						  $scope.free,
						  $localStorage.PlumberDetail
						  )
				  .then(function (newwaterconnresponse){
			  console.log("newwaterconnresponse=="+JSON.stringify(newwaterconnresponse));
			  $ionicLoading.hide();
			  if(newwaterconnresponse.status == "success"){
				  $localStorage.applictNo = newwaterconnresponse.applicationNo;
				  console.log("$localStorage.applictNo-"+$localStorage.applictNo);
				  $localStorage.CSidn = newwaterconnresponse.applicationNo;
				  
				  $ionicLoading.show({
						template: 'Loading...'
				 });
				 var confirmPopup = $ionicPopup.show({
					 title : 'New Water Connection',
			         template : 'Your application <b>#'+$localStorage.applictNo+'</b> is successfully submitted.',
			         buttons : [{
			             text : 'Proceed',
			             type : 'button-balanced',
			             onTap : function(){
				  
				  RestService.savePayReq($scope.FlatRate,$scope.data_.paymentGateway,$localStorage.applictNo,$localStorage.CSidn,$scope.orgid,
					$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,$scope.emailId)
					.then(function (response) {
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
//					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					  $ionicLoading.hide();
				  }
			  
			},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
//				}
	  		};
	  	

  
  }) /*controler ends*/
  
