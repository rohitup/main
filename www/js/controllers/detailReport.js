angular.module('starter')
  .controller('reportdetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties,$http,localStorageService) {
	var propDetailResponse = new Array();
	console.log($stateParams.response);
	propDetailResponse = JSON.parse($stateParams.response);
	$scope.sum = 0;
	$scope.prop = {};
	$scope.prop.reports = [];
	for(var i=0;i<propDetailResponse.length;i++){
		$scope.sum = $scope.sum + parseInt(Math.round(propDetailResponse[i].receiptAmt));
	}
	for(var i=0;i<propDetailResponse.length;i++){
		//alert(res[i]);
		var cc = propDetailResponse[i].receiptDate;
		//var recDate = new Date(cc).toUTCString();						
		//var parts =recDate.toLocaleString().split(',');
		var recDate = new Date(cc);

					function pad(s) { return (s < 10) ? '0' + s : s; }
			var date=[pad(recDate.getDate()),pad(recDate.getMonth()+1), recDate.getFullYear().toString().substr(2,2)].join('.');
   
		var recDate = cc.split("-");
		var getDate = recDate[2]+"-"+recDate[1]+"-"+recDate[0].toString().substr(2,2);
		var obj = {
          receiptDate: getDate,
		  receiptNo : propDetailResponse[i].receiptNo,
		  propertyNo : propDetailResponse[i].propertyNo,
		  receiptAmt : propDetailResponse[i].receiptAmt,
		  
        };
          //$scope.banner.push(obj);
			$scope.prop.reports.push(obj);
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

	$scope.propprintDetail = function(){
		
	var bluetooth = localStorageService.get('bluetoothname');
	  
	 if(bluetooth.match("MP80")){
		 
		sorgname = localStorageService.get('orgName');
    var musername = "Org Name:-"+sorgname;
    
    //bluetoothSerial.write(data);
   // bluetoothSerial.write(musername);
    //bluetoothSerial.write(data);
      
       var dailpropertytaxx = "-----PROPERTY TAX------"
		 //var propmainMenu = $("#testprop ul.propmainMenu");
		 var navItem;
		 var dateprint = '';
		 
		 var data = new Uint8Array(1);
		data[0] = 0x0A;
		bluetoothSerial.write(data);
		bluetoothSerial.write("      "+sorgname);
		bluetoothSerial.write(data);
		bluetoothSerial.write("      Daily Update Collection Report     ");
		
		function print_datelarge(recorddate){
			 if(dateprint == '' || dateprint != recorddate){
				 dateprint = recorddate;
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("----------------------------------------");
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("         Date: "+dateprint);
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("----------------------------------------");
				 
				 var tempvar ='Receipt Number | Property Number | Amount';
				 bluetoothSerial.write(data);
				 bluetoothSerial.write(tempvar);
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("----------------------------------------");
			 }
		 }
		 
		 var spacereceipt = " ";
		 var spaceproperty = " ";
		 var spaceamount = " ";
		function print_receipt(val,len){
			spacereceipt = '';
			
			var vallength = len - val.toString().length;
			//var arr_length = new Array(Math.round(vallength));
			//alert(arr_length.length);
			for(var i=0;i<vallength;i++){
				spacereceipt = spacereceipt + " ";
			}
			
			return spacereceipt+""+val;
		}
		
		
		var propertyDetails = propDetailResponse;
		 for(var i = 0; i < propertyDetails.length; i++){
		     var navItem = propertyDetails[i];
		   
		     	var cc = navItem.receiptDate;
				//var recDate = new Date(cc).toUTCString();						
				//var parts =recDate.toLocaleString().split(',');
				var recDate = new Date(cc);

							function pad(s) { return (s < 10) ? '0' + s : s; }
					var date=[pad(recDate.getDate()),pad(recDate.getMonth()+1), recDate.getFullYear()].join('-');
					
					var recDate = cc.split("-");
								var getDate = recDate[2]+"-"+recDate[1]+"-"+recDate[0].toString().substr(2,2);
			print_datelarge(getDate);
			var receiptAmt = navItem.receiptAmt;
			
			var tempvar1 = print_receipt(navItem.receiptNo,14)+'|'+print_receipt(navItem.propertyNo,18)+'|'+print_receipt(makeFloat(navItem.receiptAmt),6);
			
			bluetoothSerial.write(data);
			bluetoothSerial.write(tempvar1);
			//bluetoothSerial.write(data);
			//bluetoothSerial.write("--------------------------------");
			 
		 }
		 var collectorname = localStorageService.get('EmpName');
		 bluetoothSerial.write(data);
		 bluetoothSerial.write("----------------------------------------");
		bluetoothSerial.write(data);
		bluetoothSerial.write("Total Amount                       "+makeFloat($scope.sum));
		bluetoothSerial.write(data);
		bluetoothSerial.write("Collector Name :"+collectorname);
		bluetoothSerial.write(data);
		 var tempvar2 = '--------------Thank You---------------';
		bluetoothSerial.write(tempvar2);
		bluetoothSerial.write(data);
		bluetoothSerial.write(data);
		bluetoothSerial.write(data);
		bluetoothSerial.write(data);
	 }else{
		 
		 sorgname = localStorageService.get('orgID');
    var musername = "Org Name:-"+sorgname;
    
    //bluetoothSerial.write(data);
   // bluetoothSerial.write(musername);
    //bluetoothSerial.write(data);
      
       var dailpropertytaxx = "-----PROPERTY TAX------"
		 //var propmainMenu = $("#testprop ul.propmainMenu");
		 var navItem;
		 var dateprint = '';
		 
		 var data = new Uint8Array(1);
		data[0] = 0x0A;
		bluetoothSerial.write(data);
		bluetoothSerial.write(" "+sorgname);
		bluetoothSerial.write(data);
		bluetoothSerial.write(" Daily Update Collection Report");
		function print_date(recorddate){
			 if(dateprint == '' || dateprint != recorddate){
				 dateprint = recorddate;
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("--------------------------------");
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("       Date: "+dateprint);
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("--------------------------------");
				 
				 var tempvar ='Receipt No.|Property No.|Amount';
				 bluetoothSerial.write(data);
				 bluetoothSerial.write(tempvar);
				 bluetoothSerial.write(data);
				 bluetoothSerial.write("--------------------------------");
			 }
		 }
		var spacereceipt = " ";
		 var spaceproperty = " ";
		 var spaceamount = " ";
		function print_receipt(val,len){
			spacereceipt = '';
			
			var vallength = len - val.toString().length;
			//var arr_length = new Array(Math.round(vallength));
			//alert(arr_length.length);
			for(var i=0;i<vallength;i++){
				spacereceipt = spacereceipt + " ";
			}
			
			return spacereceipt+""+val;
		}
		
		var propertyDetails = propDetailResponse;
		 for(var i = 0; i < propertyDetails.length; i++){
		     var navItem = propertyDetails[i];
		   
		     	var cc = navItem.receiptDate;
				//var recDate = new Date(cc).toUTCString();						
				//var parts =recDate.toLocaleString().split(',');
				var recDate = new Date(cc);

							function pad(s) { return (s < 10) ? '0' + s : s; }
					var date=[pad(recDate.getDate()),pad(recDate.getMonth()+1), recDate.getFullYear()].join('-');
					
					var recDate = cc.split("-");
								var getDate = recDate[2]+"-"+recDate[1]+"-"+recDate[0].toString().substr(2,2);
			print_date(getDate);
			//var tempvar1 = navItem.receiptNo +'|'+ navItem.propertyNo +'|'+ navItem.receiptAmt;
			var tempvar1 = print_receipt(navItem.receiptNo,6)+'|'+print_receipt(navItem.propertyNo,5)+'|'+print_receipt(makeFloat(navItem.receiptAmt),4);
			
			bluetoothSerial.write(data);
			bluetoothSerial.write(tempvar1);
			//bluetoothSerial.write(data);
			//bluetoothSerial.write("--------------------------------");
			 
		 }
		 var collectorname = localStorageService.get('EmpName');
		 bluetoothSerial.write(data);
		 bluetoothSerial.write("--------------------------------");
		bluetoothSerial.write(data);
		bluetoothSerial.write("Total Receipt Amount  "+makeFloat($scope.sum));
		bluetoothSerial.write(data);
		bluetoothSerial.write("Collector Name :"+collectorname);		
		bluetoothSerial.write(data);
		 var tempvar2 = '-----------Thank You------------';
		bluetoothSerial.write(tempvar2);
		bluetoothSerial.write(data);
		bluetoothSerial.write(data);
		bluetoothSerial.write(data);
		 bluetoothSerial.write(data);
	 }
		
	};
	
	
    var _init = function (){
		
  
  
    };
    _init();
  });
