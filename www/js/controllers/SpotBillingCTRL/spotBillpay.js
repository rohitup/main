angular.module('starter')

  .controller('SpotBillpayCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, 
		  dateFilter, $state, sharedProperties,$localStorage,$sessionStorage,$ionicPopup) {
	 
	 /* $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();*/
	  
	  $scope.orgid = "81";
	  $scope.userID = "1";
	  $scope.langID = "1";
	  $scope.loginUSername = "Ambar";
	  $scope.LoginMobileNo = "9921266899";
	  $scope.ServiceShortName = "WNC";
	
	  $scope.searchspotbill = '';
	  $scope.data_ = {};
	//  $scope.meterreaddetails = false;
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
	  $scope.onlinepay = true;
	  $scope.offlinepay = false;
	  $scope.propPayType = "F";
	  
	  $scope.partialamtDisabled = "false";
	  $scope.totalamtDisabled = "false";
	  
	  function fullstatus(status){
			var fullGenderDesc;
			if(status == "S") fullGenderDesc = "Success";
			else if(status == "S") fullGenderDesc = "Success";
			else if(status == "F") fullGenderDesc = "Fail";
			else fullGenderDesc = "";
			return fullGenderDesc;
		}
		
		/*total or partial function*/
		$scope.totalAmountSelection = function(){
			$scope.onlinepay = true;
			$scope.offlinepay = false;
			$scope.propPayType = "F";
			$scope.amountPattern = /^[0-9]+([,.][0-9]+)?$/;
		}
		$scope.partialAmountSelection = function(){
			$scope.offlinepay = true;
			$scope.onlinepay = false;
			$scope.propPayType = "P";
			$scope.amountPattern = /^[0-9]{1,6}$/;
		}
		/*end*/
		 $scope.changeAttr = function(item){
				if($scope.chequeDate == "" || $scope.chequeDate == null || $scope.chequeDate == undefined )
					item.currentTarget.setAttribute("placeholder","Cheque/DD No./PO No. Date");
				else item.currentTarget.setAttribute("placeholder","");
			}	
		 
		 $scope.backbutton = function()
			{
				var confirmPopup = $ionicPopup.show({
			          title : 'Exit MaiNet?',
			          template : 'Are U want to goto Home page?',
			          buttons : [{
						           text : 'Cancel',
						           type : 'button-assertive',
			          			}, 
			          			{
						           text : 'Ok',
						           type : 'button-balanced',
						           onTap : function() {
						        	   					$state.go("app.home");
						           					  }
			          			}]
			         });
			};
		  
		 
		/*$scope.status = fullstatus($localStorage.billgenedataresponse.status);
		$scope.ConnectionID = $localStorage.billgenedataresponse.csIdn;
		$scope.PayingAmount = $localStorage.billgenedataresponse.totalPayableAmount;
		$scope.applnnumber = $localStorage.billgenedataresponse.applicationNumber;  */

console.log("bankdetails--"+JSON.stringify($sessionStorage.response));
$scope.connNumber = $sessionStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);	  
$scope.totalPayableAmount = $sessionStorage.billgenedataresponse.totalPayableAmount;
console.log("totalPayableAmount==" +$scope.totalPayableAmount);
$scope.CSidn = $sessionStorage.spotSearchData.csIdn;
console.log("CsIdn==" +$scope.CSidn);
$scope.applicationNumber = $sessionStorage.billgenedataresponse.applicationNumber
console.log("applicationNumber==" +$scope.applicationNumber);

/*$scope.options = new Array();
for(var i=0;i<$sessionStorage.response.PAY.length;i++){	
	if($sessionStorage.response.PAY[i].lookUpCode == 'D'){
				$scope.options.push({
				id : $sessionStorage.response.PAY[i].lookUpId,
				name : $sessionStorage.response.PAY[i].descLangFirst
		    })
		}else if($sessionStorage.response.PAY[i].lookUpCode == 'C'){
				$scope.options.push({
				id : $sessionStorage.response.PAY[i].lookUpId,
				name : $sessionStorage.response.PAY[i].descLangFirst
		    })
		}else if($sessionStorage.response.PAY[i].lookUpCode == 'Q'){
				$scope.options.push({
				id : $sessionStorage.response.PAY[i].lookUpId,
				name : $sessionStorage.response.PAY[i].descLangFirst
		    })
		}else if($sessionStorage.response.PAY[i].lookUpCode == 'P'){
				$scope.options.push({
				id : $sessionStorage.response.PAY[i].lookUpId,
				name : $sessionStorage.response.PAY[i].descLangFirst
		    })
		}else
			{
				return false;
			}
	}*/

$scope.options = new Array();
for(var i=0;i<$sessionStorage.response.PAY.length;i++){	
		$scope.options.push({
		id : $sessionStorage.response.PAY[i].lookUpId,
		name : $sessionStorage.response.PAY[i].descLangFirst
	})
}

$scope.chequeoptions = new Array();
for(var i=0;i<$sessionStorage.response.BANK.length;i++){	
		$scope.chequeoptions.push({
		chqid : $sessionStorage.response.BANK[i].lookUpId,
		chqname : $sessionStorage.response.BANK[i].lookUpDesc
	})
}

$scope.connNumber = $sessionStorage.spotSearchData.csCcn;
console.log("connNumber==" +$scope.connNumber);
$scope.ConnName = $sessionStorage.spotSearchData.name;
console.log("ConnName==" +$scope.ConnName);

$scope.billpaymentsave = function()
{
	$ionicLoading.show({	template: 'Loading...'		});
	RestService.watersavebillpayment($scope.CSidn,$scope.orgid,$scope.userID,$scope.Rebate,
			$scope.Payamount,$scope.totalPayableAmount).then(function (response) {
		$ionicLoading.hide();
	}, function (err) {
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
};
	
	$scope.payWaterBill = function() {
		
		$sessionStorage.Payamount = $scope.Payamount;
		$sessionStorage.PaymentMode = $scope.PaymentMode;
		console.log($scope.Payamount);
		$ionicLoading.show({			template: 'Loading...'		});
		$scope.billpaymentsave();
		
		console.log("Payamount==" +$scope.Payamount);
	  RestService.billPaymentAtCounter($scope.CSidn,$scope.Payamount,$scope.orgid,$scope.applicationNumber,
		$scope.loginUSername,$scope.userID,$scope.PaymentMode,$scope.chequeNo,$scope.chequeDate,$scope.BankName,$scope.langID)
	    .then(function (response) {
	    	
				if(response.status == "S"){
						alert("Payment Successfully Done.");
						$sessionStorage.paymentresponse = response;
						$state.go("app.BillpayReceipt");
					}
					else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					}
			$ionicLoading.hide();
		}, function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			$ionicLoading.hide();
		})
	};
 
		 $scope.homepage = function()
		 {
		 	$state.go("app.home");
		 }; 

		 
	  var _init = function () {
	      
	    };
	    _init();
  })
  
  
