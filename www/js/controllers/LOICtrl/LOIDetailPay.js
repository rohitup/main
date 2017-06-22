angular.module('starter')
    
 .controller('LOIDetailPayCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage) {
	 	console.log("$scope.loiTitle22--"+$localStorage.loiTitle);
		console.log("$scope.loiSelectionType--"+$localStorage.loiSelectionType);
		$scope.HeaderTitle = $localStorage.loiTitle;
		$scope.loishortcode = $localStorage.loiSelectionType;
		
		$scope.orgID = "711";
		$scope.empID = "1";
		$scope.langID = "1";
		
		
			$scope.LOIapplStatusSearch = true;
			$scope.loiHomePayButton = true;
			$scope.loipaymentDiv = true;
			$scope.LOInumber = $localStorage.LOIresponse.loiNo;
			//$scope.Applnumber = $localStorage.LOIresponse.applicationId;
			$scope.applicationID = $localStorage.LOIresponse.applicationId;
			$scope.LOIdate = $localStorage.LOIresponse.loiDate;
			$scope.LOIDate = formatDate($scope.LOIdate);
			$scope.loiPaidDesc;
			
			if($localStorage.LOIresponse.loiPaid == "Y"){
				$scope.loiPaidDesc = "Paid"; 
			}
			else{ 
				$scope.loiPaidDesc = "Unpaid";
			}
			
			$scope.LOIOwnerName = $localStorage.LOIresponse.applicantName;
			$scope.LOImobileNo = $localStorage.LOIresponse.mobileNo;
			$scope.LOIAmount = $localStorage.LOIresponse.finalAmount;
			$scope.applnDueAmount= makeFloat($scope.LOIAmount);
		//	$scope.LOIFinalAmt = makeFloat($scope.LOIAmount);
			
			
			if($localStorage.LOIresponse.loiPaid == "Y" || $scope.LOIAmount <= 0){
		//		$scope.content = "loiHomePayButton" +JSON.stringif;
				$scope.loipaymentDiv = false;
			}
			
			$localStorage.ServiceName = $localStorage.LOIresponse.serviceName;
			$localStorage.ServiceId= $localStorage.LOIresponse.serviceId;
			$localStorage.ServiceShortName = $localStorage.LOIresponse.serviceType;  //serviceshortname
		
			 $scope.loipaydiv = function() 
			 {
			 	RestService.RTIgetBankList($scope.orgID,$scope.empID).then(function(banklistdata){
			 		$scope.loiselectPaymentDiv = true;	
			  		$scope.bankNameList = banklistdata;
			 		  $scope.banknamelistopt = new Array();
			 		    for(var i=0;i<$scope.bankNameList.length;i++){	
			 					$scope.banknamelistopt.push({
			 					bankid : $scope.bankNameList[i].bankId,
			 					bankname : $scope.bankNameList[i].cbbankname
			 			   })
			 		    }  
			 		  
			 	  },function (err){
			 			 $ionicLoading.hide();
			 			 alert("Something went wrong!!");
			 		})
			 };   
			
			 $scope.LOIchange = function(){
			 	$scope.$watch('LOIBanklist', function(newVal) {
			 		console.log("$scope.LOIBanklist--"+$scope.LOIBanklist);
			 		 for(var i=0;i<$scope.bankNameList.length;i++){
			 			 $scope.optbankname = $scope.bankNameList[i].bankId;
			 			 if($scope.LOIBanklist == $scope.optbankname)
			 				 {
			 				 	$scope.pgbankId = $scope.bankNameList[i].bankId;
			 					console.log("pgbankId ::: "+$scope.pgbankId);
			 					$scope.pgName =  $scope.bankNameList[i].cbbankname;
			 					console.log("pgName ::: "+$scope.pgName);
			 					$scope.bankpgurl = $scope.bankNameList[i].pbbankurl;
			 					console.log("bankpgurl ::: "+$scope.bankpgurl);
			 					$scope.banksalt = "eCwWELxi";
//			 					$scope.banksalt = $scope.bankNameList[i].salt;
			 					console.log("banksalt ::: "+$scope.banksalt);
			 					$scope.bankkey = $scope.bankNameList[i].key;
			 					console.log("bankkey ::: "+$scope.bankkey);
			 					$scope.banksecurtiyID = $scope.bankNameList[i].securityId;
			 					console.log("banksecurtiyID ::: "+$scope.banksecurtiyID);
			 					$scope.bankmerchantID = "gtKFFx";
//			 					$scope.bankmerchantID = $scope.bankNameList[i].pbmerchantid;
			 					console.log("bankmerchantID ::: "+$scope.bankmerchantID);
			 				}
			 		 }
			 	});
 			};
		 
		 /*payment function*/
		 
		 $scope.paymentgateway = function()
		 {
			    console.log("$scope.orgID--"+$scope.orgID);
			 	console.log("$scope.LOIBanklist--"+$scope.LOIBanklist); //var paymentGatewayTypeValue = "RTIpaymentgateway";
			 	console.log("$localStorage.ServiceName-->"+$localStorage.ServiceName);
			 	console.log("$localStorage.ServiceShortName-->"+$localStorage.ServiceShortName);
			 	console.log("$localStorage.ServiceId-->"+$localStorage.ServiceId);    //serviceId = rtiapplnServiceID;
			 	console.log("$$scope.applicationID-->"+$scope.applicationID);          //var app_var = rtiapplnID;
			 	console.log("$scope.applnDueAmount-->"+$scope.applnDueAmount);
			 	/*bank*/
			 	console.log("pgbankId ::: "+$scope.pgbankId);
			 	console.log("pgName ::: "+$scope.pgName);
			 	console.log("bankpgurl ::: "+$scope.bankpgurl);
			 	console.log("banksalt ::: "+$scope.banksalt);
			 	console.log("bankkey ::: "+$scope.bankkey);
			 	console.log("banksecurtiyID ::: "+$scope.banksecurtiyID);
			 	console.log("bankmerchantID ::: "+$scope.bankmerchantID);
				
			 	$scope.pgapplfullNAme = "gajendra";
			 	$scope.egEmID = "gajendra@abmindia.com";
			 	$scope.pgMobileNo = "9664611565";
			if($scope.LOIBanklist==null || $scope.LOIBanklist==undefined || $scope.LOIBanklist=="")
			 	{
			 		alert("Please Select Payment Option");
			 		return ;
			 	}
			 else{
			 		
				 	var A = "";
				 	var s = "";

				 	A = String($scope.bankkey + "|" + $scope.applnDueAmount + "|" + $scope.pgapplfullNAme + "|" + $scope.egEmID + "|" + $localStorage.ServiceId + 
				 		"|" + $scope.applicationID + "|" + $scope.orgID  + "|" + "4473" + "|" + $localStorage.ServiceShortName + "|" + $scope.banksalt);
				 	console.log("A: "+A);
				 	s = String(CryptoJS.HmacSHA256(A,$scope.banksalt));
				 	console.log("s---"+s);
				 	
				 	$ionicLoading.show({
						template: 'Loading...'
					});
				RestService.paymentGateway($scope.orgID,$scope.empID,$scope.pgapplfullNAme,$scope.egEmID,$scope.pgMobileNo,
				  $localStorage.ServiceId,$localStorage.ServiceShortName,$scope.applicationID,$scope.applnDueAmount,
				  $scope.banksecurtiyID,$scope.bankkey,$scope.banksalt,s,$scope.pgbankId,$scope.bankpgurl,$scope.pgName)
				 	.then(function(paymentData){
				 				console.log("paymentData--"+JSON.stringify(paymentData));
				 				console.log("paymentData---"+paymentData);
				 				
				 				if($scope.pgName == "PAYU"){
				 					
									payuurl = paymentData.payuUrl;
									console.log("payuurl ::: "+payuurl);
									payukey = paymentData.key;
									console.log("payukey ::: "+payukey);
									payuhash = paymentData.hash;
									console.log("payuhash ::: "+payuhash);
									payutxnid = paymentData.txnid;
									console.log("payutxnid ::: "+payutxnid);
									payusurl = paymentData.surl; 
									console.log("payusurl ::: "+payusurl);
									payufurl = paymentData.furl;
									console.log("payufurl ::: "+payufurl);
									payucurl = paymentData.curl;
									console.log("payucurl ::: "+payucurl);
									payupg = paymentData.pg;
									console.log("payupg ::: "+payupg);
									
									payuudf1 = paymentData.udf1;
									console.log("payuudf1 ::: "+payuudf1);
									payuudf2 = paymentData.udf2;
									console.log("payusur2 ::: "+payuudf2);
									payuudf3 = paymentData.udf3;
									console.log("payuudf3 ::: "+payuudf3);	
									payuudf4 = paymentData.udf4;
									console.log("payuudf4 ::: "+payuudf4);	
									payuudf5 = paymentData.udf5;
									console.log("payuudf5 ::: "+payuudf5);	
									payuudf6 = paymentData.udf6;
									console.log("payuudf6 ::: "+payuudf6);	
									payuudf7 = paymentData.udf7;
									console.log("payuudf7 ::: "+payuudf7);	
									payuudf8 = paymentData.udf8;
									console.log("payuudf8 ::: "+payuudf8);	
									payuudf9 = paymentData.udf9;
									console.log("payuudf9 ::: "+payuudf9);	
									payuudf10 = paymentData.udf10;
									console.log("payuudf10 ::: "+payuudf10);	
									
									payufirstname = paymentData.firstname;
									console.log("payufirstname ::: "+payufirstname);	
									payuemail = paymentData.email;
									console.log("payuemail ::: "+payuemail);	
									payuphone = paymentData.phone;
									console.log("payuphone ::: "+payuphone);	
									payuamount = paymentData.amount;
									console.log("payuamount ::: "+payuamount);	
									payuproductinfo = paymentData.productinfo;
									console.log("payuproductinfo ::: "+payuproductinfo);	
									 
									$localStorage.trackId = payutxnid;
//									alert("$localStorage.trackId--"+$localStorage.trackId);
									 
									var y = "#action1=" + payuurl + "&key=" + payukey + "&hash=" + payuhash + "&txnid=" + payutxnid + 
									 "&surl=" + payusurl + "&furl=" + payufurl + "&curl=" + payucurl + "&pg=" + payupg + "&udf1=" + payuudf1 + "&udf2=" + payuudf2 + "&udf3=" + payuudf3 + "&udf4=" +
									 payuudf4 + "&udf5=" + payuudf5 + "&udf6=" + payuudf6 + "&udf7=" + payuudf7 + "&udf8=" + payuudf8 + "&udf9=" + payuudf9 + "&udf10=" + payuudf10 + 
									 "&amount=" + payuamount + "&firstname=" + payufirstname + "&email=" + payuemail + "&phone=" + payuphone + "&productinfo=" + payuproductinfo;
									 
									console.log("FINAL Y ::: "+JSON.stringify(y));
									var H = null;
									H = window.open("payupaymentcall.html" + y, '_blank', 
										'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
									console.log("hhh ::: "+H);
									H.addEventListener('exit', iabClose);
									H.addEventListener('loadstop', iabClose1);
									function iabClose(event) 
									{
										$scope.PaymentRecieptMethod1();
										H.removeEventListener('exit', iabClose); 
									}
									function iabClose1(event){
										if (event.url.match("mobile/close")) {
//											$scope.PaymentRecieptMethod1();
											H.close();
											H.removeEventListener('loadstop', iabClose1);
										}
									}
								}
				 				
				 				else{
									var S = "http://192.168.100.221:8082/BIHAR_PROJ/mobileOnlinePaymentController/goBilldesk.ws";
									var x = paymentData.dueAmt;
									//var x = "2";
									//var tokenNo =12525;
									var pgovkey = paymentData.key;
									console.log("pgovkey ::: "+pgovkey);
									var pgovsalt = paymentData.salt;
									console.log("pgovsalt ::: "+pgovsalt);
									var pgovsecurityyID = paymentData.securityId;
									console.log("pgovsecurityyID ::: "+pgovsecurityyID);
									/*var pgovbkIDD = paymentData.bankId;
									console.log("pgovIDD ::: "+pgovbkIDD);*/
									var pgovbkURLL = paymentData.bankUrl;
									console.log("pgovbkURLL ::: "+pgovbkURLL);
									var transcID = paymentData.trackId;
									console.log("transcID ::: "+transcID);
									
									/*Assign track Id*/
									$localStorage.trackId = transcID;
									
									var pgovFirtsNAme = paymentData.firstname;
									console.log("pgovFirtsNAme ::: "+pgovFirtsNAme);
									var pgovudf1 = paymentData.udf1;
									console.log("pgovudf1 ::: "+pgovudf1);
									var pgovudf2 = paymentData.udf2;
									console.log("pgovudf2 ::: "+pgovudf2);
									var pgovudf3 = paymentData.udf3;
									console.log("pgovudf3 ::: "+pgovudf3);
									var pgovudf4 = paymentData.udf4;
									console.log("pgovudf4 ::: "+pgovudf4);
									var pgovudf5 = paymentData.udf5;
									console.log("pgovudf5 ::: "+pgovudf5);
									
									var pgovsuceesURL = paymentData.surl; 
									console.log("pgovsuceesURL ::: "+pgovsuceesURL);
									
									var A = String(pgovkey + "|" + transcID + "|NA|" + x + "|NA|NA|NA|INR|NA|" + $scope.pgapplfullNAme + "|" + pgovsecurityyID + "|NA|NA|F|" + pgovudf1 + "|" + pgovudf2 + "|" + pgovudf3 + "|" + pgovudf4 + "|" + pgovudf5 + "|NA|NA|" +  pgovsuceesURL);
									console.log("hashString === " +A);
									var hash = CryptoJS.HmacSHA256(A,pgovsalt)+"";
									r = hash.toUpperCase();
									A = A +"|"+r;
									console.log("SHA512 ::: "+r);
									
									var y = "#action1=" + S + "&msg=" + A +"&bankUrl=" + pgovbkURLL + "&orgId=" + pgovudf3 + "&tokenNo=" + transcID;
									console.log("hashString1111 === " + y);
										            
						            var H = window.open("testing.html" + y, '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
									console.log("hhh ::: "+H);
									H.addEventListener('exit', iabClose);
									H.addEventListener('loadstop', iabClose1);
									function iabClose(event) 
									{
										$scope.PaymentRecieptMethod1();
										H.removeEventListener('exit', iabClose); 
									}
									function iabClose1(event){
										if (event.url.match("mobile/close")) {
											H.close();
											H.removeEventListener('loadstop', iabClose1);
										}
									}
								}
				 				 $ionicLoading.hide();	
				 	  },function (err){
				 			 $ionicLoading.hide();
				 			 alert("Something went wrong!!");
				 		})
				 	}		
			 		
		 };
		 
		 $scope.PaymentRecieptMethod1 = function()
		 {
				RestService.getPaymentReceipt($scope.orgID,$scope.empID,$localStorage.trackId).then(function(paymentreceiptData){

		 			if(paymentreceiptData.status =="success")
		 			{
		 		  		$localStorage.PaymentReceiptData = paymentreceiptData;
		 		  		$state.go("app.paymentreceipt");
		 			}
		 	
				},function (err){
					alert("Something went wrong Receipt !!");
				})	
		 };
		
		 
		 $scope.homepage = function()
		 {
		 	$state.go("app.home");
		 } 
		 	
		 $scope.cancel = function(){
				$scope.loiselectPaymentDiv = false;
			};
				
		
	 var _init = function (){
  
    };
    _init();
  });
