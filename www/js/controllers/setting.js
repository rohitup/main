angular.module('starter')
  .controller('settingCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties,$http,localStorageService) {
	var navItem = "";
	var macAddress = "";	
	$scope.item = {};
	$scope.item.checked = "false";
	//$scope.item.set = "false";
	$scope.connected = "disabled";
	if(localStorageService.get('bluetoothname')){
		//alert("get bluetooth name");
		$scope.item.checked = "false";
		$scope.item.set = "false";
		$scope.connected = "Connected";
	}
	
	$scope.toggleChange = function(){
		//alert($scope.item.checked);
		
			//bluetooth serial 
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
					

						if(name.match("BlueTooth Printer")){
									navItem = device.id;
									//alert(navItem);
									console.log('hum device id lekar aaya '+navItem);
									//window.localStorage.setItem("bluetoothname",name);
									localStorageService.set('bluetoothname',name)
								 }
					})
				},showError);
				bluetoothSerial.isConnected(disconnect, connect);
				}

				// if isEnabled returns failure, this function is called:
				var notEnabled = function() {
					//alert("Unable to connect.Please switch on your bluetooth")
					alert("Unable to connect.Please switch on your bluetooth");
					$scope.connected = "Disconnected";
					$scope.item.checked = "false";
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
					$scope.item.set = "false";
					
				};

						
				var showError= function(error) {
					alert("Unable to connect.Device is not found "+error);
					$scope.item.set = "false";
					$scope.connected = "Disconnected";
					$ionicLoading.hide();
					//app.display(error);
				}
				// disconnect() will get called only if isConnected() (below)
				// returns success  In other words, if  connected, then disconnect:
				var disconnect = function () {
					//alert("attempting to disconnect");
					// if connected, do this:
					bluetoothSerial.disconnect(
						closePort,     // stop listening to the port
						showError      // show the error if you fail
					);
					$ionicLoading.hide();
					
					localStorageService.remove('bluetoothname');
				};

				// here's the real action of the manageConnection function:
				
				var openPort = function() {
				// if you get a good Bluetooth serial connection:
				//alert("Connected to: " + macAddress);
				// change the button's name:
				//connectButton.innerHTML = "Disconnect";
				$scope.connected = "Connected";
				$ionicLoading.hide();
			   // connecttableButton.innerHTML = "Disconnect";
				// set up a listener to listen for newlines
				// and display any new data that's come in since
				// the last newline:
				bluetoothSerial.subscribe('\n', function (data) {
					
					//alert(data);
				});
			}
			
			var closePort = function() {
					// if you get a good Bluetooth serial connection:
					//alert("Disconnected from: " + macAddress);
					
					// change the button's name:
					//connectButton.innerHTML = "Connect";
					$scope.connected = "Disconnected";
					$ionicLoading.hide();
				 //   connecttableButton.innerHTML = "Connect";
					// unsubscribe from listening:
					bluetoothSerial.unsubscribe(
							function (data) {
								//alert(data);
							},
							showError
					);
				}
		
		
	};
	
	$scope.propprintTest = function(){
		//alert("test print");
		var breakline = new Uint8Array(1);
             breakline[0] =  0x0A;
		bluetoothSerial.write("Test Print");
         bluetoothSerial.write(breakline);
		 bluetoothSerial.write(breakline);
		 bluetoothSerial.write(breakline);
		
		
	};
	
	
    var _init = function (){
		
  
  
    };
    _init();
  });
