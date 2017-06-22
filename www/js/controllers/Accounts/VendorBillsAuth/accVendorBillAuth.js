
var datePicker = angular.module('starter');
datePicker.controller('AccVendorBillAuthCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $sessionStorage,$rootScope,$stateParams,$ionicModal,$localStorage,$window){
	$scope.orgId = "81";
	$scope.langId = "1";

	$ionicLoading.show();
	$scope.person = {};
    /*Vendor Select Dropdown Start*/
    RestService.getVendorNames($scope.orgId,$scope.langId)
	.then(function(response){
		console.log("getVendorNames response: "+JSON.stringify(response));
		$scope.vendorNameResponse = response.lookUpList;
		console.log("scope.vendorNameResponse: "+JSON.stringify($scope.vendorNameResponse));
		
		$scope.vendorList = new Array();
		for(var i=0; i < $scope.vendorNameResponse.length; i++){
			$scope.vendorList.push({
				value: $scope.vendorNameResponse[i].lookUpId,
				name : $scope.vendorNameResponse[i].descLangFirst
			})
		}
		console.log("scope.vendorList response: "+JSON.stringify($scope.vendorList));
		$ionicLoading.hide();
	},function(vendorerr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
	/*Vendor Select Dropdown End*/

    $scope.people = [
      { name: 'Adam adam@email.com adam@email.com adam@email.com',email: 'adam@email.com',age: 10 },
      { name: 'Amalie',email: 'amalie@email.com',age: 12 },
      { name: 'Wladimir',email: 'wladimir@email.com',age: 30 },
      { name: 'Samantha',email: 'samantha@email.com',age: 31 },
      { name: 'Estefanía',email: 'estefanía@email.com',age: 16 },
      { name: 'Natasha',email: 'natasha@email.com',age: 54 },
      { name: 'Nicole',email: 'nicole@email.com',age: 43 },
      { name: 'Adrian',email: 'adrian@email.com',age: 21 }
    ];
    /*Save Receipt Information Start*/
    $scope.getVendorBillRecords = function(){ 
    	if(!$scope.VBSVendor) $scope.AccBillDate = "";
    	if(!$scope.VBSBillDate) $scope.VBSBillDate = "";
    	if(!$scope.VBSBillNo) $scope.AccBillDate = "";

    	var getBillRecordInput = {
			orgId:$scope.orgId,
			fromDate:$filter('date')($scope.VBSBillDate, "dd/MM/yyyy"),
			toDate:$filter('date')($scope.VBSBillDate, "dd/MM/yyyy"),
			billNo:$scope.VBSBillNo,
			vendorId:$scope.VBSVendor,
			checkerAuthorization: "N"
		};
    	console.log("getBillRecordInput: "+JSON.stringify(getBillRecordInput));
    	$ionicLoading.show();
    	RestService.getBillRecords(getBillRecordInput)
		.then(function(response){
			console.log("getBillRecords response: "+JSON.stringify(response));
			$state.go("app.accVendorBillRecords",{response: JSON.stringify(response)});
			$ionicLoading.hide();
		},function(billrecorderr){
			if(billrecorderr.status == 0 || billrecorderr.status == 404) toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			else alert(billrecorderr.data);
			//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    }
    /*Save Receipt Information End*/
	var _init = function(){
	};
	_init();
});