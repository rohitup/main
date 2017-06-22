angular.module('starter')
  .controller('WaterBillCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties, $localStorage) {
	$scope.search = '';
	$scope.data_ = {};
	$scope.totalPayableAmount;
	$scope.CSidn; 
	//$scope.options = new Array();$scope.orgID
	$scope.waterBillSearch = false;
	$scope.orgid = sharedProperties.getorgID();
	$scope.userID = sharedProperties.getuserID();
	
	/*function start*/
	$scope.searchWaterBill1 = function() {	$scope.waterBillSearch = true;}
	
	$scope.searchWaterBill = function() {
		if(!$scope.search == ""){
			$ionicLoading.show({
				template: 'Loading...'
			});
//			alert("controller orgid--"+$scope.orgid);
			
			RestService.getWPayDet($scope.search, $scope.orgid).then(function (response) {
				if(response.status == "S"){
					$scope.totalPayableAmount = response.totalPayableAmount;
					$scope.CSidn = response.csIdn;
//					alert("$scope.CSidn---"+$scope.CSidn);
					$scope.waterBillSearch = true;
					
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
		else { alert ("Please Enter Connection Number"); }
    };
    
	$scope.payWaterBill = function() {
			$ionicLoading.show({
				template: 'Loading...'
			});
			RestService.savePayReq($scope.data_.payingAmount,$scope.data_.paymentGateway,$scope.search,
			$scope.CSidn,$scope.orgid,$scope.userID).then(function (response) {
				if(response.status == "success"){
					//alert(response.payRequestMsg);
					var H= null;
					H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
					
					H.addEventListener('loadstop', function(event) {        
						if (event.url.match("mobile/close")) {
										alert("close call");
										H.close();
									}
								});
					   		}
				else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
					}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
    	};
    	
    var _init = function (){
  
    };
    _init();
  });
