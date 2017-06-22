angular.module('starter')
.controller('PaymentGatewayCtrl', function ($scope, $http, RestService, $ionicLoading, toaster, $filter, $state, sharedProperties,$sessionStorage){
	/*Fetch below variables from parent page
		$scope.pgServiceId
		$scope.pgServiceType
		$scope.pgAppId
		$scope.pgAmount
	*/
	/*Variable Declaration Start*/
	/*$scope.orgId = sharedProperties.getorgID();
	$scope.empId = sharedProperties.getuserID();*/
	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.empFullName = "Dharti Gohil";
	$scope.empEmail = "dharti.gohil@gmail.com";
	$scope.empMobile = "8898954208";
	/*Variable Declaration End*/

	/*Retrieving Bank List Start*/
	$ionicLoading.show();
	RestService.getBankList($scope.orgId,$scope.empId)
	.then(function(response){
		$scope.bankListResponse = response;
	/*var bankurl = 'js/services/getBankListResponse.json';
    $http.get(bankurl).then(function(bank){
    	$scope.bankListResponse = bank.data;*/
    	console.log("bankListResponse: "+JSON.stringify($scope.bankListResponse));
		$scope.bankList = new Array();
		for(var i=0;i<$scope.bankListResponse.length;i++){
			$scope.bankList.push({
				bankValue : $scope.bankListResponse[i].bankId,
				bankName : $scope.bankListResponse[i].cbbankname
			})
		}
		$ionicLoading.hide();
		console.log("$scope.bankList: "+JSON.stringify($scope.bankList));
	},function(bankerr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
	/*Retrieving Bank List End*/
	$scope.retrieveBankDetail = function(item){
    	for(var i = 0; i < $scope.bankListResponse.length; i++) {
    	    var bankId = $scope.bankListResponse[i].bankId;
    	    if($scope.paymentGatewaySelect == bankId){
    	    	$scope.pgBankName = $scope.bankListResponse[i].cbbankname;
    		    console.log("bankName ::: "+$scope.pgBankName);
    		    
    		    $scope.pgBankUrl = $scope.bankListResponse[i].pbbankurl;
    		    console.log("bankpgurl ::: "+$scope.pgBankUrl);
    		    
    		    $scope.pgSalt = $scope.bankListResponse[i].salt;
    		    console.log("banksalt ::: "+$scope.pgSalt);
    		    
    		    $scope.pgKey = $scope.bankListResponse[i].key;
    		    console.log("bankkey ::: "+$scope.pgKey);
    		    
    		    $scope.pgSecurtiyId = $scope.bankListResponse[i].securityId;
    		    console.log("banksecurtiyID ::: "+$scope.pgSecurtiyId);
    		    $scope.pgBankId = bankId;
    	    }
    	}
	}
	$scope.paymentGateway = function(){
		/*hash*/
		var hashString = "";
		var hash = "";
		/*$scope.pgKey = "gtKFFx";
		$scope.pgSalt = "eCwWELxi";*/
		hashString = String($scope.pgKey + "|" + $scope.pgAmount + "|" + $scope.empFullName + "|" + $scope.empEmail + "|" + $scope.pgServiceId + "|" + $scope.pgAppId + "|" + $scope.orgId + "|" + $scope.empId + "|" + $scope.pgServiceType + "|" + $scope.pgSalt);
		console.log("hashString: "+hashString);
		hash = String(CryptoJS.HmacSHA256(hashString,$scope.pgSalt));
		console.log("hash: "+hash);
		/*hash*/
		$ionicLoading.show();
		RestService.saveOnlinePayment($scope.empFullName,$scope.empEmail,$scope.empMobile,$scope.pgServiceId,$scope.pgServiceType,$scope.pgAppId,$scope.pgAmount,$scope.pgSecurtiyId,$scope.pgKey,$scope.pgSalt,$scope.pgBankId,$scope.pgBankUrl,$scope.pgBankName,hash,$scope.orgId,$scope.empId)
		.then(function(onlinePaymentResponse){
			/*var bankurl = 'js/services/savePaymentDetailResponse.json';
	    $http.get(bankurl).then(function(bank){
	    	onlinePaymentResponse = bank.data;*/
	    	console.log("bankListResponse: "+JSON.stringify(onlinePaymentResponse));
			console.log("$scope.bankList: "+JSON.stringify($scope.bankList));
			$ionicLoading.hide();
			if($scope.pgBankName == "PAYU"){
				var payuurl = onlinePaymentResponse.payuUrl;
				var payukey = onlinePaymentResponse.key;
				var payuhash = onlinePaymentResponse.hash;
				var payutxnid = onlinePaymentResponse.txnid;
				var payusurl = onlinePaymentResponse.surl;
				var payufurl = onlinePaymentResponse.furl;
				var payucurl = onlinePaymentResponse.curl;
				var payupg = onlinePaymentResponse.pg;

				var payuudf1 = onlinePaymentResponse.udf1;
				var payuudf2 = onlinePaymentResponse.udf2;
				var payuudf3 = onlinePaymentResponse.udf3;
				var payuudf4 = onlinePaymentResponse.udf4;
				var payuudf5 = onlinePaymentResponse.udf5;
				var payuudf6 = onlinePaymentResponse.udf6;	
				var payuudf7 = onlinePaymentResponse.udf7;	
				var payuudf8 = onlinePaymentResponse.udf8;
				var payuudf9 = onlinePaymentResponse.udf9;
				var payuudf10 = onlinePaymentResponse.udf10;

				var payufirstname = onlinePaymentResponse.firstname;
				var payuemail = onlinePaymentResponse.email;
				var payuphone = onlinePaymentResponse.phone;
				var payuamount = onlinePaymentResponse.amount;
				$sessionStorage.PaymentReceiptData.productinfo = onlinePaymentResponse.productinfo;
				$sessionStorage.transactionId = payutxnid;
				console.log("payuurl ::: "+payuurl+"|payukey ::: "+payukey+"|payuhash ::: "+payuhash+"|payutxnid ::: "+payutxnid+"|payusurl ::: "+payusurl+"|payufurl ::: "+payufurl+"|payucurl ::: "+payucurl+"|payupg ::: "+payupg+"|payuudf1 ::: "+payuudf1+"|payusur2 ::: "+payuudf2+"|payuudf3 ::: "+payuudf3+"|payuudf4 ::: "+payuudf4+"|payuudf5 ::: "+payuudf5+"|payuudf6 ::: "+payuudf6+"|payuudf7 ::: "+payuudf7+"|payuudf8 ::: "+payuudf8+"|payuudf9 ::: "+payuudf9+"|payuudf10 ::: "+payuudf10+"|payufirstname ::: "+payufirstname+"|payuemail ::: "+payuemail+"|payuphone ::: "+payuphone+"|payuamount ::: "+payuamount+"|payuproductinfo ::: "+$sessionStorage.PaymentReceiptData.productinfo);

				var param = "#action1="+payuurl+"&key="+payukey+"&hash="+payuhash+"&txnid="+payutxnid+"&surl="+payusurl+"&furl="+payufurl+"&curl="+payucurl+"&pg="+payupg+"&udf1="+payuudf1+"&udf2="+payuudf2+"&udf3="+payuudf3+"&udf4="+payuudf4+"&udf5="+payuudf5+"&udf6="+payuudf6+"&udf7="+payuudf7+"&udf8="+payuudf8+"&udf9="+payuudf9+"&udf10="+payuudf10+"&amount="+payuamount+"&firstname="+payufirstname+"&email="+payuemail+"&phone="+payuphone+"&productinfo="+$sessionStorage.PaymentReceiptData.productinfo;
				console.log("Payu Param ::: "+param);
				$scope.openpgWindow("payupaymentcall.html",param);
			}
			else{
				var actionUrl = SERVER_URL + "mobileOnlinePaymentController/goBilldesk.ws";
				//var x = onlinePaymentResponse.dueAmt;
				//var x = "2";
				//var tokenNo =12525;
				var pgovkey = onlinePaymentResponse.key;
				var pgovsalt = onlinePaymentResponse.salt;
				var pgovsecurityID = onlinePaymentResponse.securityId;
				var pgovbkURL = onlinePaymentResponse.bankUrl;
				var pgovfirstname = onlinePaymentResponse.firstname;
				var pgovudf1 = onlinePaymentResponse.udf1;
				var pgovudf2 = onlinePaymentResponse.udf2;
				var pgovudf3 = onlinePaymentResponse.udf3;
				var pgovudf4 = onlinePaymentResponse.udf4;
				var pgovudf5 = onlinePaymentResponse.udf5;
				var pgovsurl = onlinePaymentResponse.surl;

				$sessionStorage.transactionId = onlinePaymentResponse.trackId;
				
				console.log("pgovkey ::: "+pgovkey+"|pgovsalt ::: "+pgovsalt+"|pgovsecurityID ::: "+pgovsecurityID+"|pgovbkURL ::: "+pgovbkURL+"|pgovfirstname ::: "+pgovfirstname+"|pgovudf1 ::: "+pgovudf1+"|pgovudf2 ::: "+pgovudf2+"|pgovudf3 ::: "+pgovudf3+"|pgovudf4 ::: "+pgovudf4+"|pgovudf5 ::: "+pgovudf5+"|pgovsurl ::: "+pgovsurl+"|onlinePaymentResponse.dueAmt ::: "+onlinePaymentResponse.dueAmt);
				
				var actionParam = String(pgovkey + "|" + $sessionStorage.transactionId + "|NA|" + onlinePaymentResponse.dueAmt + "|NA|NA|NA|INR|NA|" + $scope.empFullName + "|" + pgovsecurityID + "|NA|NA|F|" + pgovudf1 + "|" + pgovudf2 + "|" + pgovudf3 + "|" + pgovudf4 + "|" + pgovudf5 + "|NA|NA|" +  pgovsurl);
				console.log("actionParam " +actionParam);
				
				var hash = CryptoJS.HmacSHA256(actionParam,pgovsalt)+"";
				ucHash = hash.toUpperCase();
				console.log("hashString "+ucHash);
				actionParam = actionParam +"|"+ucHash;				
				
				var param = "#action1=" + actionUrl + "&msg=" + actionParam +"&bankUrl=" + pgovbkURL + "&orgId=" + pgovudf3 + "&tokenNo=" + $sessionStorage.transactionId;
				console.log("param " + param);
				$scope.openpgWindow("testing.html",param);	            
			}
		},function(onlinePaymentErr){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
	$scope.openpgWindow = function(url,param)
	{
		var pgWindow = window.open(url + param, '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
		console.log("hhh ::: "+pgWindow);
		pgWindow.addEventListener('exit', iabExit);
        pgWindow.addEventListener('loadstop', iabLoadStop);
		function iabExit(event) 
		{
			$scope.generatePayReceipt();
			pgWindow.removeEventListener('exit', iabExit); 
		}
		function iabLoadStop(event){
			if(event.url.match("mobile/close")) {
				pgWindow.close();
				pgWindow.removeEventListener('loadstop', iabLoadStop);
			}
		}
	}
	$scope.generatePayReceipt = function()
	{
		RestService.getPaymentReceipt($scope.orgId, $scope.empId, $sessionStorage.transactionId).then(function(paymentreceiptData){
			console.log("getPaymentReceipt data: "+JSON.stringify(paymentreceiptData));
 			if(paymentreceiptData.status =="success")
 			{
 				$sessionStorage.PaymentReceiptData = paymentreceiptData;
 			} else {
 				$sessionStorage.PaymentReceiptData.status = "failure";
 			}
 			console.log("$sessionStorage.PaymentReceiptData: "+JSON.stringify($sessionStorage.PaymentReceiptData));
 			$state.go("app.paymentreceipt");
		},function (err){
			toaster.error($filter('translate')('ERROR'), "We are facing some issues generating the receipt. Kindly contact ULB for further support");
			setTimeout(function(){  $state.go("app.home");}, 3000);
		})
	};
	var _init = function(){
    };
    _init();
});