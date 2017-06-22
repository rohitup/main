angular.module('starter')
  .controller('propertyTaxCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties,$http,localStorageService,$ionicHistory) {
	$scope.search = '';
	$scope.data_ = {};
	$scope.totalPayableAmount;
	$scope.CSidn; 
	$scope.propPayType = "F";
	$scope.propDetails = {};
	$scope.propertydata = {};
	//$scope.options = new Array();$scope.orgID
	$scope.waterBillSearch = false;
	$scope.orgid = sharedProperties.getorgID();
	$scope.userID = sharedProperties.getuserID();
	$scope.NCArrearInterest='';
	$scope.NCTotalTax='';
	$scope.NCRebateCurrent='';
	$scope.NCRebate='';
	$scope.NCPenalty='';
	$scope.NCNetServCharge='';
	$scope.NCAdvAmt='';
	$scope.NCArrearInt='';
	$scope.NCCurrInt='';
	$scope.NCTotalPayable='';
	$scope.viewpropdetail = false;
	$scope.payoptions = new Array();
	$scope.paymentModeValue='';
	$scope.partialamtDisabled = "false";
	$scope.totalamtDisabled = "false";
	$scope.totresponseAmt;
	var orgId = localStorageService.get('orgID');
	var empId = localStorageService.get('empId');
	/*function start*/
	 $scope.payMode = {};
	$scope.bankMode = {};
	$scope.receiptdata = new Array();
	$scope.resetPayBtnClick = function(){
		$scope.payMode.pay = { id: 0, name: 'Select Payment Mode'};
		$scope.changedValue($scope.payMode.pay);
		$scope.bankMode.bank = { id: 0, name: 'Select Bank Name'};
		//$scope.totalAmountSelection();
	};
	
	$scope.changedValue=function(item){
		$scope.paymentModeValue = item.name;
				
		var select = item.name;	
		if(select != "" && select != "Cash" && select != "Select Payment Mode" && select === "Cheque") {
			console.log(item.name+""+item.id);
				$scope.paymentDetails = "true";
				$scope.bankName = "true";
				$scope.accNumber = "true";
				$scope.chequeno = "true";
				RestService.getBankList().then(function (response) {
				
					$scope.bankOptions = new Array();
						$.each(response, function(k, v) {
								//display the key and value pair
								console.log("fetchcustbank"+k+"values"+v);
							$scope.bankOptions.push({
								id : k,
								name : v
						    })
							});
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
			
		 }else if(select != "" && select != "Cash" && select != "Select Payment Mode" && select != "Cheque" && select != "Online Payment"){
			 console.log("other than cheque"+item.name+""+item.id);
			 $scope.paymentDetails = "true";
			 $scope.bankName = "false";
			 $scope.accNumber = "false";
			 $scope.chequeno = "true";
			 
		 }else if(select != "" && select != "Cash" && select != "Select Payment Mode" && select != "Cheque" && select === "Online Payment"){
			$scope.paymentDetails = "true";
			 $scope.bankName = "true";
			 $scope.accNumber = "false";
			$scope.chequeno = "false";
		RestService.getPosBankList().then(function (response) {
				
					$scope.bankOptions = new Array();
						$.each(response, function(k, v) {
								//display the key and value pair
								console.log("fetchcustbank"+k+"values"+v);
							$scope.bankOptions.push({
								id : k,
								name : v
						    })
							});
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
		
	}else if(select === "Cash" || select === "Select Payment Mode"){
			 $scope.paymentDetails = "false";
		 }
    }
	$scope.changedBankValue=function(item){
		console.log(item.name+""+item.id);
	}
	$scope.searchWaterBill1 = function() {	$scope.waterBillSearch = true;}
	$scope.changeAttr = function(item){
		if($scope.paymentDate == "" || $scope.paymentDate == null || $scope.paymentDate == undefined )
			item.currentTarget.setAttribute("placeholder","Cheque/DD Date/PO Date*");
		else item.currentTarget.setAttribute("placeholder","");
	}
	$scope.getProperty = function(){
		if(!$scope.propNumber == ""){
			$ionicLoading.show({
				template: 'Loading...'
			});
//			alert("controller orgid--"+$scope.orgid);
			//assessPropertyNumber,oldPID,orgid,empid
			var assessPropertyNumber = $scope.propNumber;
			var assessOldPid = $scope.oldPid;
			
			if(assessPropertyNumber == "" || assessPropertyNumber == null || assessPropertyNumber == undefined){
			  assessPropertyNumber = null;
			  }
			  else if(assessOldPid == "" || assessOldPid == null || assessOldPid == undefined){
				  assessOldPid = null;
			  }
			RestService.getPropValidate(assessPropertyNumber,assessOldPid,orgId,empId).then(function (response) {
				$scope.propertydata = response;
				if(response.succesFlag == "Y" || response.succesFlag == "N"){
					$scope.viewpropdetail = true;
					//$scope.totalPayableAmount = response.totalPayableAmount;
					///$scope.CSidn = response.csIdn;
//					alert("$scope.CSidn---"+$scope.CSidn);
					//$scope.waterBillSearch = true;
					$scope.getpaymentMode();
					RestService.getPropDetails(response).then(function (response) {
						console.log("dash==="+response);
						
						/*$scope.options = new Array();
					    for(var i=0;i<response.list.length;i++){							
								$scope.options.push({
								id : response.list[i].bankId,
								name : response.list[i].cbbankname
						    })
					    }*/
						$scope.propDetails=response;
						if(response.saveOrUpdateDataReqDTO == null){
										
										$scope.NCArrearInterestFlag='true';
										$scope.NCTotalTaxFlag='true';
										$scope.NCRebateCurrentFlag='true';
										$scope.NCRebateFlag='true';
										$scope.NCPenaltyFlag='false';
										$scope.NCNetServChargeFlag='false';
										$scope.NCAdvAmtFlag='false';
										$scope.NCArrearIntFlag='true';
										$scope.NCCurrIntFlag='true';
										$scope.NCTotalPayableFlag='true';
										
										$scope.NCArrearInterest=response.taxCalculation.arrearswithoutInterest;
										$scope.NCTotalTax=response.taxCalculation.totalannualtax;
										$scope.NCRebateCurrent= response.taxCalculation.rebatesas;
										$scope.NCRebate=response.taxCalculation.rebaters;
										$scope.NCTotalPayable=response.taxCalculation.totalpayable;
										$scope.data_.KPDPayableAmount = makeFloat(response.taxCalculation.totalpayable);
										$scope.totresponseAmt = response.taxCalculation.totalpayable;
									}//For Change Y
									else{
										
									   $scope.NCArrearInterestFlag='true';
										$scope.NCTotalTaxFlag='true';
										$scope.NCRebateCurrentFlag='true';
										$scope.NCRebateFlag='true';
										$scope.NCPenaltyFlag='false';
										$scope.NCNetServChargeFlag='false';
										$scope.NCAdvAmtFlag='false';
										$scope.NCArrearIntFlag='true';
										$scope.NCCurrIntFlag='true';
										$scope.NCTotalPayableFlag='true';
										
										$scope.NCArrearInt = response.saveOrUpdateDataReqDTO.arrearsInterest;
										$scope.NCCurrInt = response.saveOrUpdateDataReqDTO.currentInterest;
										$scope.NCArrearInterest=response.saveOrUpdateDataReqDTO.totalArrears;
										$scope.NCTotalTax=response.saveOrUpdateDataReqDTO.totalCurrent;
										$scope.NCRebateCurrent= response.saveOrUpdateDataReqDTO.rebate;
										$scope.NCRebate=response.saveOrUpdateDataReqDTO.rainRebate;
										$scope.NCTotalPayable=response.saveOrUpdateDataReqDTO.totalPay;
										$scope.data_.KPDPayableAmount = makeFloat(response.saveOrUpdateDataReqDTO.totalPay);
										$scope.totresponseAmt = response.saveOrUpdateDataReqDTO.totalPay;
									  }
					
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
				}
				else{
					toaster.error(response.successMessage);
				}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
		}
		else { $scope.viewpropdetail = false; alert ("Please Enter Connection Number"); }
		
		
		
	};
	/*total or partial function*/
	$scope.totalAmountSelection = function(){
		$scope.data_.KPDPayableAmount = makeFloat($scope.totresponseAmt);
		$scope.propPayType = "F";
		$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
	}
	$scope.partialAmountSelection = function(){
		$scope.data_.KPDPayableAmount = "";
		$scope.propPayType = "P";
		$scope.amountPattern = /^[0-9]{1,6}$/;
	}
	/*end*/
	$scope.getpaymentMode = function(){
		$scope.payoptions.length = 0;
		
		RestService.getPropPaymentMode(orgId).then(function (response) {
			console.log("dash==="+response);
			
			
			for(var i=0;i<response.length;i++){
				if(response[i].lookUpId != "693861"){
					$scope.payoptions.push({
					id : response[i].lookUpId,
					name : response[i].descLangFirst
				})
				}
			}
			
			$ionicLoading.hide();
		}, function (err) {
			$ionicLoading.hide();
		})
		
						
	};
	
	$scope.propertyPayBtnClick = function(){
		$scope.finalamt;
		$scope.payType;
		var payModeId = $scope.payMode.pay.id;
		/*var PartialAmount = 0;
			 PartialAmount = $scope.data_.PartialAmount;
			if(PartialAmount > 0){
				$scope.finalamt =  PartialAmount;
				$scope.payType = "P";
			}else{
				$scope.finalamt = $scope.totresponseAmt;
				$scope.payType = "F";
			}*/
		if($scope.propPayType == "P"){
			//alert($scope.data_.KPDPayableAmount);
			$scope.finalamt = $scope.data_.KPDPayableAmount;
			$scope.payType = "P";
		}else{ $scope.finalamt = $scope.propTotalPay;
		$scope.payType = "F";}
		
		$scope.retrievedData = new Array();
		if($scope.payMode.pay.name == "Cash"){
			//alert($scope.finalamt);
			$scope.retrievedData = {
					AmountPay : $scope.finalamt,
					selectPaymode : payModeId,
					bmChqDDNo : '',
					bmChqDDDate : '',
					bmBankAccountId : '',
					bmDrawOn : '',
					totalPay : $scope.totresponseAmt,
					payType : $scope.payType,
					amountToBePay : $scope.finalamt,
			};
			
			saveDetails();
		}else if($scope.payMode.pay.name == "Cheque"){
			if ($scope.data_.ChequeNo != "" && $scope.data_.AccountNo != "" && $scope.bankMode.bank.id != "") {
			var d = $scope.data_.paymentDate;
		var paymentdate=[d.getFullYear(),pad(d.getMonth()+1), pad(d.getDate())].join('-');
			$scope.retrievedData = {
					AmountPay : $scope.finalamt,
					selectPaymode : payModeId,
					bmChqDDNo : $scope.data_.ChequeNo,
					bmChqDDDate : paymentdate,
					bmBankAccountId : $scope.data_.AccountNo,
					bmDrawOn : $scope.bankMode.bank.id,
					totalPay : $scope.totresponseAmt,
					payType : $scope.payType,
					amountToBePay : $scope.finalamt,
			};	
				
			saveDetails();	
			}else{
				toaster.error("Please fill the required fields");
				
			}	
		}else if($scope.payMode.pay.name == "Online Payment"){
			if($scope.data_.paymentDate != ""){
			var d = $scope.data_.paymentDate;
		var paymentdate=[d.getFullYear(),pad(d.getMonth()+1), pad(d.getDate())].join('-');
				
			try{
					var String = "";
					var res = 
					//var suserMobile=window.localStorage.getItem('suserMobile');
					cordova.exec(sayHelloSuccess,sayHelloFailure,"OpenNative","open",[$scope.propDetails.contactDetailDTO.mobileNo,$scope.propDetails.generalDetailDTO.propertyNo,$scope.propDetails.generalDetailDTO.oldProNo,$scope.finalamt,$scope.totresponseAmt,"8108582824"]);
					function sayHelloSuccess(data){
						//bluetoothSerial.write(data);
						alert("Thank You For Choosing POS Payment");
						String = window.Mosambee.LoadPreferences("transactiondata");
						console.log("transactiondata123: " + String);
						//alert("Data "+String);
						
						
						window.Mosambee.ClearPreferences("transactiondata");
						if(String == "true"){
							$scope.retrievedData = {
									AmountPay : $scope.finalamt,
									selectPaymode : payModeId,
									bmChqDDNo : '',
									bmChqDDDate : paymentdate,
									bmBankAccountId : '',
									bmDrawOn : $scope.bankMode.bank.id,
									totalPay : $scope.totresponseAmt,
									payType : $scope.payType,
									amountToBePay : $scope.finalamt,
							};
							saveDetails(); 
							
						}else{
							alert("transaction unsuccessful");
							return;
						}
						
					}
					function sayHelloFailure(data){
						console.log("Error"+data);
					}
				
				}catch(error){
					alert(error.message);
				}	
			}else{
				toaster.error("Please fill the required fields");
			}
				
		}else{
			console.log("$scope.data_.paymentDate"+$scope.data_.paymentDate+"$scope.ChequeNo"+$scope.ChequeNo);
			if($scope.data_.paymentDate != "" && $scope.ChequeNo != ""){
			var d = $scope.data_.paymentDate;
		var paymentdate=[d.getFullYear(),pad(d.getMonth()+1), pad(d.getDate())].join('-');
			$scope.retrievedData = {
					AmountPay : $scope.finalamt,
					selectPaymode : payModeId,
					bmChqDDNo : $scope.ChequeNo,
					bmChqDDDate : paymentdate,
					bmBankAccountId : '',
					bmDrawOn : '',
					totalPay : $scope.totresponseAmt,
					payType : $scope.payType,
					amountToBePay : $scope.totresponseAmt,
			};
			saveDetails();
			}else{
				toaster.error("Please fill the required fields");
			}
		}
		function saveDetails(){
		$ionicLoading.show({
				template: 'Loading...'
			});
		RestService.savePropDetails($scope.retrievedData,$scope.propertydata).then(function (response) {
						console.log(JSON.stringify(response));
						if(response.status == "success"){
						var	proownername = $scope.propDetails.ownerDetailDTO[0].title+" "+$scope.propDetails.ownerDetailDTO[0].fName;
							$scope.receiptdata = {
								propPhNo : $scope.propDetails.contactDetailDTO.mobileNo,
								propOwnerName : proownername,
								amountPay : $scope.finalamt,
								totalPayable: $scope.totresponseAmt,
								paymentMode: $scope.payMode.pay.name,
								receiptDate : response.receiptDate,
								propertyNo : response.propertyNo,
								receiptNo : response.receiptNo,
								toDayDate : response.toDayDate
							};
								$ionicHistory.clearCache();
								$ionicHistory.clearHistory();
							$state.go('app.propertyTaxReceiptDetails',{response: JSON.stringify($scope.receiptdata)});
								
						}else{
							
						}
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
		
		}
	};
	$scope.keypressevtPropno = function(){
		
		$scope.oldPid = "";
		$scope.viewpropdetail == false;
		
	};
	$scope.keypressevtOldpid = function(){
		$scope.propNumber = "";
		$scope.viewpropdetail == false;
		
	};
	
	function makeFloat(number){
	var num = number;
	//alert(num);
	if(num != '' || num==0){
		//alert(num);
		return num+".00";
	}
	else{
		return num;
	}
}
	 $scope.paychange = function() {
		 
		console.log($scope.data_.paymentGateway)
	  }
	
	function pad(s) { return (s < 10) ? '0' + s : s; }	
	$scope.viewPropDetail = function(){
		$state.go('app.propertyTaxDetails',{response: JSON.stringify($scope.propDetails)});
		
	};
	
	
	
	
    	
    var _init = function (){
		
  
  
    };
    _init();
  });
