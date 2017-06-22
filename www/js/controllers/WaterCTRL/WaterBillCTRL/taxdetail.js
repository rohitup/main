angular.module('starter')
  .controller('taxdetailCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {
	  
	$scope.search = '';
	$scope.data_ = {};
	$scope.totalPayableAmount;
	$scope.CSidn; 
	$scope.Rebate; 
	$scope.waterBillSearch = false;
//	var logindata = $localStorage.responselogindata;
	/*console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	*/
	
	$scope.orgid = "81";
	$scope.userID = "1";
	$scope.loginUSername = "2";
	$scope.LoginMobileNo = "2";

	/*function start*/
		console.log("$sessionStorage.taxes"+JSON.stringify($sessionStorage.taxes));

		
	$scope.taxes =$sessionStorage.taxes;
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
    	
	$scope.homepage = function()
	{
		$state.go("app.waterBillpay");
	}
	
    var _init = function (){
  
    };
    _init();
  });
