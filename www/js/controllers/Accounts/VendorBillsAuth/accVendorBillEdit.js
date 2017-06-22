
var datePicker = angular.module('starter');
datePicker.controller('AccVendorBillEditCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $sessionStorage,$rootScope,$stateParams,$ionicModal,$localStorage,$window,$ionicPopup){
	$scope.orgId = "81";
	$scope.langId = "1";
	$scope.empId = "1";
	$scope.data = [];
	$("#rem_char_left").html("500");
	$("#receiptErrorMsg").show();
	$rootScope.allowAdd = false;
	$rootScope.viewBudget = false;
	
	$ionicLoading.show();
	$rootScope.getNonHData("ABT","billTypeList",$scope.orgId);

	
    $ionicModal.fromTemplateUrl('./templates/Accounts/VendorBillsAuth/accDeductionDetail.html', {
    	scope: $scope,
    	animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalDedDetail = modal;
    });
	$scope.openModalDedDetail = function(action,id,amount) {
		alert(" $scope.modalDedDetail :"+$scope.modalDedDetail);
		$scope.DEDModalParams = {
			action: action,
			id: id,
			amount: amount
		}
		$scope.$broadcast('DEDOpenModalEvt',JSON.stringify($scope.DEDModalParams));
		$scope.modalDedDetail.show();
	};
	$scope.closeModalDedDetail = function(){
		$scope.modalDedDetail.hide();
		$("#receiptErrorMsg").hide();
		if(!$scope.receiptCollections || $scope.receiptCollections.length < 1)
    		$("#receiptErrorMsg").show();
	};
	$scope.$on('DEDChangeEvt', function (event, data){
    	$scope.receiptCollections = {};
    	$scope.receiptCollections = data;
    	console.log("$scope.receiptCollections: "+JSON.stringify($scope.receiptCollections));
    	$scope.AccTotalAmount = 0;
    	for(var i = 0 ; i < $sessionStorage.receiptArray.length; i++){
    		var addAmount = $sessionStorage.receiptArray[i].amount;
    		$scope.AccTotalAmount += parseInt(addAmount);
    	}
    });
    $scope.removeReceiptHead = function (index) {
    	var confirmDelete = $scope.showconfirmbox();
    	if(confirmDelete == "Y"){
	    	var deleteAmount = $sessionStorage.receiptArray[index].amount;
	    	$scope.AccTotalAmount -= parseInt(deleteAmount);
	    	$sessionStorage.receiptArray.splice(index, 1);
	    	$scope.receiptCollections = $sessionStorage.receiptArray;
	    	if(!$scope.receiptCollections || $scope.receiptCollections.length < 1) $("#receiptErrorMsg").show();
    	}else {
    		return;
    	}
    };

    /*Vendor Select Dropdown Start*/
    RestService.getVendors($scope.orgId,$scope.langId)
	.then(function(response){
		console.log("getVendors response: "+JSON.stringify(response));
		$scope.vendorResponse = response;
		console.log("scope.vendorResponse: "+JSON.stringify($scope.vendorResponse));
		
		$scope.vendorList = new Array();
		for(var i=0; i < $scope.vendorResponse.length; i++){
			$scope.vendorList.push({
				id: i,
				value: $scope.vendorResponse[i].vmVendorid,
				name : $scope.vendorResponse[i].vmVendorname,
				mobile: $scope.vendorResponse[i].mobileNo,
				email: $scope.vendorResponse[i].emailId
			})
		}
		console.log("scope.vendorList response: "+JSON.stringify($scope.vendorList));
		$ionicLoading.hide();
	},function(vendorerr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
	/*Vendor Select Dropdown End*/
	/*Receipt Head Select Dropdown Start*/
    /*RestService.getReceiptHeads($scope.orgId)
	.then(function(response){
		console.log("getReceiptHeads response: "+JSON.stringify(response));
		$scope.receiptHeadsResponse = response.budgetHeadList;
		console.log("scope.receiptHeadsResponse: "+JSON.stringify($scope.receiptHeadsResponse));
		
		$scope.receiptHeadsList = new Array();
		$.each($scope.receiptHeadsResponse, function(key, value) {
			$scope.receiptHeadsList.push({
				value : key,
				name : value
			})
		});
		console.log("scope.receiptHeadsList: "+JSON.stringify($scope.receiptHeadsList));
		$ionicLoading.hide();
	},function(receiptheadserr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})*/
	/*Receipt Head Select Dropdown End*/
	/*Bank Select Dropdown Start*/
    RestService.getBanks($scope.orgId)
	.then(function(response){
		console.log("getBanks response: "+JSON.stringify(response));
		$scope.banksResponse = response;
		console.log("scope.banksResponse: "+JSON.stringify($scope.banksResponse));
		
		$scope.bankList = new Array();
		$.each($scope.banksResponse.bankAcList, function(key, value) {
			$scope.bankList.push({
				value : key,
				name : value
			})
		});
		$scope.customerBankList = new Array();
		$.each($scope.banksResponse.customerBankMap, function(key, value) {
			$scope.customerBankList.push({
				value : key,
				name : value
			})
		});
		console.log("scope.bankList: "+JSON.stringify($scope.bankList));
		console.log("scope.customerBankList: "+JSON.stringify($scope.customerBankList));
		$ionicLoading.hide();
	},function(bankserr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
	/*Bank Select Dropdown End*/

    /*Disable Instrument Future Date Start*/
	var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10) month = '0' + month.toString();
    if(day < 10) day = '0' + day.toString();
    $scope.currentDate = year + '-' + month + '-' + day;
    /*Disable Instrument Future Date End*/
    
    /*Save Receipt Information Start*/
    $scope.saveReceiptDetails = function(){
    	var receiptFeeDetail = new Array();
    	for(var i=0; i < $scope.receiptCollections.length; i++){
			receiptFeeDetail.push({
				budgetCodeid: $scope.receiptCollections[i].id,
				rfFeeamount : $scope.receiptCollections[i].amount
			})
		}
    	var AccModeId = $.grep($scope.AccModeList, function (rMode) {
            return rMode.value == $scope.data.AccMode;
        })[0].id;
    	var saveReceiptInput = {
    		fieldId:9,
    		receiptPayeeName:$scope.CRPayeeName,
    		mobileNumber:$scope.data.CRMobile,
    		emailId:$scope.data.CREmail,
    		rmNarration:$scope.data.CRNarration,
    		orgId:$scope.orgId,
    		createdBy:$scope.empId,
    		langId:$scope.langId,
    		lgIpMac:$localStorage.macAddress,
    		receiptFeeDetail:receiptFeeDetail,
    		receiptModeDetail:
			{
				cpdFeemode:AccModeId,
				cpdFeemodeCode:$scope.data.AccMode,
				baAccountid:$scope.data.AccBank,
				tranRefNumber:$scope.data.AccInstNo,
				tranRefDatetemp: $filter('date')($scope.data.AccInstDate, "dd/MM/yyyy"),
				rdAmount:$scope.AccTotalAmount
			}
    	};
    	console.log("saveReceiptInput: "+JSON.stringify(saveReceiptInput));
    	$ionicLoading.show();
    	RestService.saveReceiptData(saveReceiptInput)
		.then(function(response){
			console.log("saveReceiptData response: "+JSON.stringify(response));
			alert(response);
			$ionicLoading.hide();
			$state.go("app.home");
		},function(savereceipterr){
			alert(savereceipterr.data);
			//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    }
    /*Save Receipt Information End*/
    /*Budget Popup Start*/
    $scope.viewBudgetDetails = function() {
    	var template = "<table class='gridtable noBorderGridTable'>"
    		+"<tr>"
    		+"	<th class='noFont'>{{'BUDGET' | translate}}</th>"
    		+"	<td>1450000</td>"
    		+"</tr>"
    		+"<tr>"
    		+"	<th class='noFont'>{{'PREVIOUS_EXP' | translate}}</th>"
    		+"	<td>0</td>"
    		+"</tr>"
    		+"<tr>"
    		+"	<th class='noFont'>{{'CURRENT_EXP' | translate}}</th>"
    		+"	<td>1000</td>"
    		+"</tr>"
    		+"<tr>"
    		+"	<th class='noFont'>{{'BALANCE' | translate}}</th>"
    		+"	<td>1449000</td>"
    		+"</tr>"
    	+"</table>";
        var alertPopup = $ionicPopup.alert({
           title: $filter('translate')('BUDGET_DET'),
           template: template
        });

        alertPopup.then(function(res) {
           // Custom functionality....
        });
     };
    /*Budget Popup End*/
    /*Slide Change Function Start*/
    $scope.slideChanged = function(index) {
    	$rootScope.allowAdd = false;
    	$rootScope.viewBudget = false;
    	if(index == "2"){
    		$rootScope.allowAdd = true;
    		if(!$scope.receiptCollections || $scope.receiptCollections.length < 1){
        		//$scope.openModalDedDetail('new','','');
    			$("#receiptErrorMsg").show();
        	}
    	}
    	if(index == "1"){
    		$rootScope.viewBudget = true;
    	}
    	//else $rootScope.allowAdd = false;
    }
    /*Slide Change Function End*/


    $scope.showconfirmbox = function () {
	    if ($window.confirm("Are you sure you want to delete?")) return "Y";
	    else return "N";
    }
	var _init = function(){
	};
	_init();
});