angular.module('starter')
  .controller('billpayPageCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {
	  
	$scope.search = '';
	$scope.data_ = {};
	$scope.totalPayableAmount;
	$scope.CSidn; 
	$scope.Rebate; 

//	var logindata = $localStorage.responselogindata;
	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	$scope.ServiceShortName = "WNC";
	$scope.payingAmount;
	$scope.paymentGateway;

	
	/*function start*/

	$scope.totalPayableAmount = $sessionStorage.waterbillresponse.totalPayableAmount;
	
	if($scope.totalPayableAmount == 0)
		{
			$scope.table1 = false;
			$scope.table2 = false;
		}else{
			$scope.table1 = true;
			$scope.table2 = false;
		}
	
	$scope.CSidn = $sessionStorage.waterbillresponse.csIdn;
	$scope.Rebate = $sessionStorage.waterbillresponse.rebate;
	$scope.applictNo = $sessionStorage.waterbillresponse.applicationNumber;
	
	$sessionStorage.taxes = $sessionStorage.waterbillresponse.taxes;
	$scope.taxes = $sessionStorage.taxes;
	$scope.docsitems = [];
	var counter = 1;
	
	var taxtable = "";
	for (var i = 0; i < $scope.taxes.length; i++) {
		var taxdata = {
				taxdesc : $scope.taxes[i].taxdescription,
				arrear : $scope.taxes[i].arrearTaxAmount,
				taxamt : $scope.taxes[i].taxAmount,
				total : $scope.taxes[i].total
		}
		$scope.docsitems.push(taxdata);
	}
	

    $scope.billpaymentsave = function()
    {
    	$ionicLoading.show({	template: 'Loading...'		});
    	RestService.watersavebillpayment($scope.CSidn,$scope.orgid,$scope.userID,$scope.Rebate,
    			$scope.data_.payingAmount,$scope.totalPayableAmount).then(function (response) {
			$ionicLoading.hide();
		}, function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    };
   
    $scope.advancebillpaymentsave = function()
    {
    	$ionicLoading.show({	template: 'Loading...'		});
    	RestService.advancewatersavebillpayment($scope.CSidn,$scope.orgid,$scope.userID,$scope.Rebate,$scope.data_.payingAmount).then(function (response) {
			$ionicLoading.hide();
		}, function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    };   
    
    
$scope.payWaterBill = function() {
		
	if($scope.data_.payingAmount < 0 || $scope.data_.payingAmount == "0" || $scope.data_.payingAmount == "")
	{
		alert("Please Enter Vaild Amount");
		return;
	}
	
		console.log($scope.data_.payingAmount);
		console.log($scope.data_.paymentGateway);
//		document.getElementById('btn1').setAttribute("disabled","disabled");
		
		if($scope.totalPayableAmount == 0){
			$scope.advancebillpaymentsave();
		}else{
			$scope.billpaymentsave();
		}
			$ionicLoading.show({	template: 'Loading...'		});
			
			RestService.savePayReq($scope.data_.payingAmount,$scope.data_.paymentGateway,$scope.applictNo,$scope.CSidn,$scope.orgid,
				$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName)
				.then(function (response) {
				if(response.status == "success"){
					console.log(response.payRequestMsg);
					var H= null;
					H = window.open(encodeURI(response.payRequestMsg), '_blank', 
					'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
					$ionicLoading.hide();
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
					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					  $ionicLoading.hide();
					}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
    	};
    	
    var _init = function (){
    	RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
    		console.log("dash==="+response);
    		
    		$scope.options = new Array();
    	    for(var i=0;i<response.list.length;i++){							
    				$scope.options.push({
    				id : response.list[i].bankId,
    				name : response.list[i].cbbankname
    		    })
    	    }
    		$ionicLoading.hide();
    	}, function (err) {
    		$ionicLoading.hide();
    	})
    	
    };
    _init();
  });
