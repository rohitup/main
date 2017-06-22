angular.module('starter')
  .controller('propertyTaxReceiptCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties,$http,$ionicPlatform,localStorageService) {
	var propDetailResponse = new Array();
	console.log($stateParams.response);
	propDetailResponse = JSON.parse($stateParams.response);
	var NCTotalPayable = propDetailResponse.totalPayable;
	var AmountPay = propDetailResponse.amountPay;
	var date = '';
			var cc = propDetailResponse.receiptDate;
				
			var recDate = new Date(cc).toUTCString();
//						alert(recDate);
			 
			var parts =recDate.toLocaleString().split(',');
			//current date
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd
			} 

			if(mm<10) {
				mm='0'+mm
			} 

			today = dd+'/'+mm+'/'+yyyy;

			var cc = propDetailResponse.toDayDate;
				
			var recDate = new Date(cc);

			function pad(s) { return (s < 10) ? '0' + s : s; }
			 date=[pad(recDate.getDate()),pad(recDate.getMonth()+1), recDate.getFullYear().toString().substr(2,2)].join('-');
			
			
			$scope.proreceiptpNo = propDetailResponse.propertyNo;
			$scope.iPropreceiptno = propDetailResponse.receiptNo;
			$scope.propReceiptOwnerPhNo = propDetailResponse.propPhNo;
			$scope.iPropreceiptDate = date;
			$scope.propReceiptOwnerName = propDetailResponse.propOwnerName;
			$scope.propReceiptPayAmo = makeFloat(propDetailResponse.amountPay);
			$scope.propReceiptpaidamo = makeFloat(propDetailResponse.totalPayable);
			$scope.propReceiptpaymode = propDetailResponse.paymentMode;

			var propTotalDuesIf =  NCTotalPayable - AmountPay;
			if(AmountPay > NCTotalPayable){
				
			
				$scope.propReceiptoutsamo = makeFloat("0");
				$scope.propReceiptadvaamo= Math.abs(propTotalDuesIf.toFixed(2));
				
				
			}else if(AmountPay < NCTotalPayable){
				
				
				$scope.propReceiptoutsamo = makeFloat(propTotalDuesIf);
				$scope.propReceiptadvaamo=makeFloat("0");
			}else{
				
				
				$scope.propReceiptoutsamo = makeFloat("0");
				$scope.propReceiptadvaamo = makeFloat("0");
			}
	
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

	$scope.connect = function(){
		$ionicLoading.show({
				template: 'Loading...'
			});
		var listPorts = function() {
            // list the available BT ports:
           bluetoothSerial.discoverUnpaired(function(devices) {
			devices.forEach(function(device) {
				console.log(device.id);
				//alert("unpaired device"+device.name);
				var name = device.name;
				if(name.match("MP")){
							navItem = device.id;
							//alert(navItem);
							console.log('hum device id lekar aaya '+navItem);
							window.localStorage.setItem("bluetoothname",name);
						 }
			})
		},showError);
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            //alert("Unable to connect.Please switch on your bluetooth")
			alert("Unable to connect.Please switch on your bluetooth");
			$ionicLoading.hide();
        }

         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
		
		
		
		 
				var connect = function () {
            // if not connected, do this:
            // clear the screen and display an attempt to connect
//            app.clear();
			
        	
            /*app.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");*/
				setTimeout(function(){
					$('#iDivBusyLoad').hide();
            macAddress = navItem;
            // attempt to connect:
            bluetoothSerial.connect(
            	macAddress,  // device to connect to
                openPort,    // start listening if you succeed
                showError    // show the error if you fail
            );
			}, 20000);
        };

				
        var showError= function(error) {
			alert("Unable to connect.Device is not found "+error);
			//app.display(error);
		}
        // disconnect() will get called only if isConnected() (below)
        // returns success  In other words, if  connected, then disconnect:
        var disconnect = function () {
            alert("attempting to disconnect");
            // if connected, do this:
            bluetoothSerial.disconnect(
                closePort,     // stop listening to the port
                showError      // show the error if you fail
            );
			$ionicLoading.hide();
        };

        // here's the real action of the manageConnection function:
        bluetoothSerial.isConnected(disconnect, connect);
	};

	$scope.propprintDetail = function(){
		var propTAX = "----------PROPERTY TAX----------";
 
    
     sorgname = window.localStorage.getItem('sorgname');
    var orgname = localStorageService.get('orgName');
	var wNo = "Property No :";
	
//	var iPropreceiptno = document.getElementById('iPropreceiptno');
//	var wRecptNo ="Receipt No :"+$("#iPropreceiptno").text();

	var wRecptNo ="Receipt No :";
  
	var wRecpDat = "Receipt Date :"+$scope.PropreceiptDate;
	var wOwPhone = "Phone No. :"+$scope.propReceiptOwnerPhNo;
	var wRecpPayAm = "Paid Amount :"+$scope.propReceiptPayAmo;
	var wPaidAm = "Tax Amount :"+$scope.propReceiptpaidamo;
	var wToDu = "Outstanding Amount :"+$scope.propReceiptoutsamo;
	var wRtZ = "Advance Amount :"+$scope.propReceiptadvaamo;
	var WpAMode = "Payment Mode :"+$scope.propReceiptpaymode;
	
	var collectorname = localStorageService.get('EmpName');
	

          var thanks="<----------Thank You---------->";
            	var status = "Txn Status :SUCCESS";
            	var notes = "Note: Subject to Realization of Cheque";
            	var breakline = new Uint8Array(1);
                       breakline[0] =  0x0A;
				var data = new Uint8Array(1);
                       data[0] =  0x0A;   
                    var BoldH = new Uint8Array(2);
					BoldH[0] = 0x1B;
					BoldH[1] = 0x21;
					BoldH[2] = 0x09;
					
					var BoldL = new Uint8Array(2);
					BoldL[0] = 0x1B;
					BoldL[1] = 0x21;
					BoldL[2] = 0x0A;
					
					var ValueFont = new Uint8Array(2);
					ValueFont[0] = 0x1B;
					ValueFont[1] = 0x21;
					ValueFont[2] = 0x02;
					
				var unBold = new Uint8Array(3);
					unBold[0] = 0x0A;
					unBold[1] = 0x21;
					unBold[2] = 0x22;
					
				var Linefeed = new Uint8Array(1);
					
					Linefeed[0] = 0x0A;
					Linefeed[0] = 0x0A;
					Linefeed[0] = 0x0A;
				
		if($scope.propReceiptpaymode == "Cheque"){
		
//cordova.exec(sayHelloSuccess,sayHelloFailure,"HelloWorldPlugin","sayHello",[wOwNam]);
		//function sayHelloSuccess(data){
		//bluetoothSerial.write(data);
		//}

		//function sayHelloFailure(data){
		//alert("Success"+data);
		//}		
		setTimeout(function() {
         bluetoothSerial.write(orgname);
         bluetoothSerial.write(data);
         bluetoothSerial.write(propTAX);
         bluetoothSerial.write(data);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Property No. :"+propDetailResponse.propertyNo);
         bluetoothSerial.write(data);                   
         bluetoothSerial.write("Receipt No. :"+propDetailResponse.receiptNo);
		 bluetoothSerial.write(data);
		 bluetoothSerial.write("Owner Name :"+propDetailResponse.propOwnerName);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Receipt Date :"+date);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wRecpPayAm);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wPaidAm);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wToDu);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wRtZ);
         bluetoothSerial.write(data);
         bluetoothSerial.write(WpAMode);
         bluetoothSerial.write(data);
         bluetoothSerial.write(status);
         bluetoothSerial.write(data);
         bluetoothSerial.write(notes);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Collector Name :"+collectorname);
         bluetoothSerial.write(data);
         bluetoothSerial.write("<----------Thank You---------->");
         bluetoothSerial.write(data);
		 bluetoothSerial.write(data);
		 bluetoothSerial.write(data);
    	 }, 200);
     }else{ 
    	 
         //bluetoothSerial.write(wOwNam);
		//cordova.exec(sayHelloSuccess,sayHelloFailure,"HelloWorldPlugin","sayHello",[wOwNam]);
		//function sayHelloSuccess(data){
		//bluetoothSerial.write(data);
		//}

		//function sayHelloFailure(data){
		//alert("Success"+data);
		//}
		setTimeout(function() {
		
		bluetoothSerial.write(orgname);
         bluetoothSerial.write(data);
         bluetoothSerial.write(propTAX);
         bluetoothSerial.write(data);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Property No. :"+propDetailResponse.propertyNo);
         bluetoothSerial.write(data);                   
         bluetoothSerial.write("Receipt No. :"+propDetailResponse.receiptNo);
		 bluetoothSerial.write(data);
		 bluetoothSerial.write("Owner Name :"+propDetailResponse.propOwnerName);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Receipt Date :"+date);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wRecpPayAm);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wPaidAm);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wToDu);
         bluetoothSerial.write(data);
         bluetoothSerial.write(wRtZ);
         bluetoothSerial.write(data);
         bluetoothSerial.write(WpAMode);
         bluetoothSerial.write(data);
         bluetoothSerial.write(status);
         bluetoothSerial.write(data);
         bluetoothSerial.write("Collector Name :"+collectorname);
         bluetoothSerial.write(data);
         bluetoothSerial.write("<----------Thank You---------->");
         bluetoothSerial.write(data);
		 bluetoothSerial.write(data);
		 bluetoothSerial.write(data);
		}, 200);
         
         
     }
		
	};
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	  if($state.current.name=="home"){
		alert("button back");
	  }
	}, 100);
    var _init = function (){
		
  
  
    };
    _init();
  });
