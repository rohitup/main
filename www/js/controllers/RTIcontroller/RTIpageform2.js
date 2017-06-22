angular.module('starter')

 .controller('RTIform2Ctrl', function ($scope, RestService, $ionicLoading, $stateParams,toaster, $filter,
	ENV, $state, sharedProperties,$localStorage) {
console.log($localStorage.RTISupportList);

$scope.orgID = "100";
$scope.empID = "9996";
	 
$scope.RTIDeliveryMode;
$scope.RTImediatype;
$scope.RTIalertsubcribe;

$scope.onlyNumericTenLimitInput = function()
{
	var mobileno = document.getElementById("RTImobileNo").value;
	var inputVal = mobileno;
	    var numericReg = /^[0-9]{1,10}$/;
	    if(!numericReg.test(inputVal) || inputVal.length>10) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("RTImobileNo").value = inputValSlice;
	    }
}


$scope.clear = function(){
	
	  if(angular.isDefined($scope.RTIappltype)){
          delete $scope.RTIappltype;
      }
};


/*PAGE 2 JS*/

$scope.deliverymode = function()
{
	$scope.deliveryModeList = $localStorage.RTISupportList.infoDeliveryMode;	  
	console.log("$scope.deliveryModeList :::"+JSON.stringify($scope.deliveryModeList));
	$scope.deliverylist = new Array();
    for(var i=0;i<$scope.deliveryModeList.length;i++){	
			$scope.deliverylist.push({
			listid : $scope.deliveryModeList[i].lookUpId,
			listname : $scope.deliveryModeList[i].descLangFirst
	   })
    }
};

$scope.selectAction = function() 
{
    console.log("$scope.RTIDeliveryMode--"+$scope.RTIDeliveryMode);
    $scope.$watch('RTIDeliveryMode', function(newVal) {
			$scope.mediatypeoptions = new Array();
			for(var i=0;i<$scope.deliveryModeList.length;i++){		
			if($scope.RTIDeliveryMode == $scope.deliveryModeList[i].lookUpId)
			{
			    for(var j=0;j<$scope.deliveryModeList[i].rtiMediaDto.length;j++){
						$scope.mediatypeoptions.push({
						mediaID : $scope.deliveryModeList[i].rtiMediaDto[j].lookUpId,
						mediaName : $scope.deliveryModeList[i].rtiMediaDto[j].descLangFirst
				   })
			    }
			}
		}
    });
};

$scope.subscriptiontype = function()
{
	$scope.subscriptionType = $localStorage.RTISupportList.subscriptionType;	  
	console.log("$scope.deliveryModeList :::"+JSON.stringify($scope.subscriptionType));
	$scope.alerttypelist = new Array();
    for(var i=0;i<$scope.subscriptionType.length;i++){	
			$scope.alerttypelist.push({
			alertid : $scope.subscriptionType[i].lookUpCode,
			alertName : $scope.subscriptionType[i].descLangFirst
	   })
    }
};

$scope.RTIformsubmit = function()
{	
	var mobileno = document.getElementById("RTImobileNo").value;
			/*form 1 data start*/
				console.log("FORM 1 DATA START");
				console.log($localStorage.RTIappltype);
				console.log($localStorage.RTItitle); 
				console.log($localStorage.RTIorgname);
				console.log($localStorage.RTIaplname);
				console.log($localStorage.RTIappladdress);
				console.log($localStorage.RTIapplpincode);
				console.log($localStorage.RTIBpl);
				console.log($localStorage.RTIbplNo);
				console.log($localStorage.RTIAadharno);
				console.log("FORM 1 DATA END");
			/*form 1 data end*/
				
				
			console.log($scope.RTIsubject);
			console.log($scope.RTIparticular);
			console.log($scope.RTIDeliveryMode);
			console.log($scope.RTImediatype);
			console.log($scope.RTIalertsubcribe);
			console.log($scope.RTImobileno);
			console.log($scope.RTIEmailID);
	
if($scope.RTIsubject == "" || $scope.RTIsubject == null || $scope.RTIsubject == undefined)
		{
				alert("Please Enter Subject");
				return ;
		}
else if (/^\s+$/.test($scope.RTIsubject)) {
			alert("Please Enter Valid Subject");
			return;
		} 
else if($scope.RTIparticular == "" || $scope.RTIparticular == null || $scope.RTIparticular == undefined)
	  	{
		  alert("Please Enter Particular Information");
		  return ;
	  	}
else if (/^\s+$/.test($scope.RTIparticular)) {
			alert("Please Enter Valid Particular Information");
			return;
	  	} 
else if($scope.RTIDeliveryMode == "" || $scope.RTIDeliveryMode == null || $scope.RTIDeliveryMode == undefined)
		  {
			  alert("Please Select a Delivery Mode");
			  return ;
		  }
else if($scope.RTImediatype == "" || $scope.RTImediatype == null || $scope.RTImediatype == undefined)
		  {
			  alert("Please Select Media Type");
			  return ;
		  }
if($scope.RTIalertsubcribe == "" || $scope.RTIalertsubcribe == null || $scope.RTIalertsubcribe == undefined)
		  {
			  alert("Please Select Alert Subscription");
			  return ;
		  }
if($scope.RTIalertsubcribe != "" && $scope.RTIalertsubcribe != null && $scope.RTIalertsubcribe != undefined)
{
	  
	  if($scope.RTIalertsubcribe == "S")
	  {
		  if($scope.RTImobileno == "" || $scope.RTImobileno == null || $scope.RTImobileno == undefined)
		  {
			  alert("Please enter your Mobile no");
			  return ;
		  }
	  }
	  else if($scope.RTIalertsubcribe == "E")
	  {
		  if($scope.RTIEmailID == "" || $scope.RTIEmailID == null || $scope.RTIEmailID == undefined)
		  {
			  alert("Please enter your Email Id");
			  return ;
		  }
	  }
	  else if($scope.RTIalertsubcribe == "B")
	  {
		  if($scope.RTIEmailID == "" || $scope.RTIEmailID == null || $scope.RTIEmailID == undefined)
		  {
			  alert("Please enter your Email Id");
			  return ;
		  }else if($scope.RTImobileno == "" || $scope.RTImobileno == null || $scope.RTImobileno == undefined)
		  {
			  alert("Please enter your Mobile no");
			  return ;
		  }
	  }
}			
			
if(($scope.RTIEmailID!="" || $scope.RTIEmailID!=undefined || $scope.RTIEmailID!=null ) && (($scope.RTIalertsubcribe == "B") || ($scope.RTIalertsubcribe == "E")))
{
//		 var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	 var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	 //   alert();
	    if(!emailRegex.test($scope.RTIEmailID)) 
	    {
	    	alert("Please Enter a Valid Email Address");
	    	return;
	    }
}
if(/^\s|\s$/.test(mobileno) || !(/^[0-9]{1,10}$/.test(mobileno)) || mobileno.length != 10)
 {
	  alert("Please Enter a Valid Mobile Number");
	  return;
 }			
			
	
	$ionicLoading.show({		template: 'Loading...'	});
	RestService.RTIapplicationform($scope.orgID,$localStorage.RTIappltype,$localStorage.RTIorgname,$localStorage.RTItitle,$localStorage.RTIaplname,
		$localStorage.RTIappladdress,$localStorage.RTIapplpincode,$localStorage.RTIBpl,$localStorage.RTIbplNo,$localStorage.RTIAadharno,
		$scope.RTIsubject,$scope.RTIparticular,$scope.RTIDeliveryMode,$scope.RTImediatype,$scope.RTIalertsubcribe,
		$scope.RTImobileno,$scope.RTIEmailID).then(function (RTIapplicationformdata){
			console.log("RTIapplicationformdata-->"+JSON.stringify(RTIapplicationformdata));
			  if(RTIapplicationformdata.status == "success"){ 
				  $ionicLoading.hide();
				  alert(RTIapplicationformdata.responseMsg);
				  
				  $localStorage.ServiceName = RTIapplicationformdata.serviceName;
				  $localStorage.ServiceShortName = RTIapplicationformdata.serviceShortName;
				  $localStorage.ServiceId = RTIapplicationformdata.serviceId;
				  
				  $localStorage.RTIapplnformdata = RTIapplicationformdata;
				  $state.go("app.RTIapplnreceipt");
			  }else{
				  alert(RTIapplicationformdata.responseMsg);
			  }
			  $ionicLoading.hide();
			  
			},function (err){
//				 alert(RTIapplicationformdata.responseMsg);
				alert("Something Went Wrong!!!");
				 $ionicLoading.hide();
			})
	};



$scope.homepage = function()
{
	$state.go("app.home");
}

   var _init = function (){
  
    };
    _init();
  });
