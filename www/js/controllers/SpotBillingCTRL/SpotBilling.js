angular.module('starter')

  .controller('SpotBillCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage,$sessionStorage,localStorageService) {
	  $scope.show = 1;
	  
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  
	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.langID = "1";
	  
	  $scope.searchspotbill = '';
	  $scope.data_ = {};
	  $scope.meterstatusdata = '';
	  $scope.CurentDate;
	  $scope.connNumber;
	  $scope.Meternumber;
	  $scope.ConnName;
	  $scope.LastMtrRead;
	  $scope.MeterStatus;
	  $scope.GapCode;
	  $scope.meterid;
	  $scope.metername;
	  $scope.gapid;
	  $scope.gapname;
	  $scope.Orgid;
	  $scope.MrdCpdIdWtp;
	  $scope.CsIdn;
	  $scope.MmMtnid;
	  $scope.Month;
      $scope.MaxMeterRead;
	  $scope.InstallMeterRead;
	  $scope.PreviousReading1;
	  $scope.PreviousReading2;
	  $scope.PreviousReading3;
	  $scope.PreviousReading4;
	  $scope.PreviousReading5;
	  $scope.PreviousReading6;
	  $scope.PreviousReading;
	  $scope.PreviousReading8;
	  $scope.PreviousReading9;
      $scope.PreviousReading10;
	  $scope.PreviousReading11;
	  $scope.CurrentMeterRead;
	  $scope.MeterDate;
	  $scope.spotbillremark;
	  $scope.genratedata;
	  $scope.totalPayableAmount;
	  
	  $scope.changeAttr = function(item){
			if($scope.MeterDate == "" || $scope.MeterDate == null || $scope.MeterDate == undefined )
				item.currentTarget.setAttribute("placeholder","Date");
			else item.currentTarget.setAttribute("placeholder","");
		} 
	  $scope.changeAttr = function(item){
			if($scope.TodayDate == "" || $scope.TodayDate == null || $scope.TodayDate == undefined )
				item.currentTarget.setAttribute("placeholder","Today Date");
			else item.currentTarget.setAttribute("placeholder","");
		}
	  

	  $scope.spotsearch = function() {
		 if(!$scope.searchspotbill == ""){
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
			 RestService.spotbill($scope.searchspotbill,$scope.orgid,$scope.userID,$scope.langID).then(function (responsedata){
				 if(responsedata.status == "S"){
//					 $sessionStorage.clear();
					 	if(responsedata.meterType == 'MTR')
					 	{
//					 		 $localStorage.spotSearchData = responsedata;
							 $sessionStorage.spotSearchData = responsedata;
							 var tempTest	=	0;
							 RestService.getprefixdata($scope.orgid).then(function (getprefixdataresponse) {
								  console.log("prefixdata=="+getprefixdataresponse);
								  
								  if(getprefixdataresponse==undefined || getprefixdataresponse == null || getprefixdataresponse=="")
								  {
									  tempTest	=	1;
								  	 return false;
								  }
								  else
								  {
//									  $localStorage.getprefixdataresponse = getprefixdataresponse;
									  $sessionStorage.getprefixdataresponse = getprefixdataresponse;
									  if(tempTest==0)
											$state.go("app.meterRead");
									  $ionicLoading.hide();
								  }
									$ionicLoading.hide();
								},function (err) { 
									
									$ionicLoading.hide();
								})
							 
							 
							  $ionicLoading.hide();
					 	}
					 	else if(responsedata.meterType == 'NMR'){
					 		$sessionStorage.spotSearchData = responsedata;
					 		$state.go("app.BillGenerate");
					 	}else{
					 		alert("Error");
					 	}
					 
				 }
				 else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
					}
				 $ionicLoading.hide();
				},
					function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})	
		 } 
		 else{ alert ("Please Enter Connection Number"); }
	  };  
	  
 
	  var _init = function () {
	      /* $ionicLoading.show({
	        template: 'Loading...'
	      }); */
	    };
	    _init();
	    

	  
  })
  
  
