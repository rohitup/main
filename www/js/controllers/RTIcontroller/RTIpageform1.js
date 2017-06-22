angular.module('starter')

 .controller('RTIform1Ctrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage) {
	 console.log($localStorage.RTISupportList);

	 $scope.RTIappltype;
	 $scope.RTItitle;
$scope.onlyNumericSixLimitInput = function()
	 {
	 	var pinlimit = document.getElementById("pincodelim").value;
	 	var inputVal = pinlimit;
	 	    var numericReg = /^[0-9]{1,6}$/;
	 	    if(!numericReg.test(inputVal) || inputVal.length>6) 
	 	    {
	 	    	inputVal.slice(0,-1);
	 	    	var inputValSlice = inputVal.slice(0,-1);
	 	    	document.getElementById("pincodelim").value = inputValSlice;
	 	    }
	 }

$scope.tenLimitInputBpl = function()
{
	var BPLno = document.getElementById("BPLno").value;
	var inputVal = BPLno;
	    var numericReg = /^[0-9]{1,10}$/;
	    if(!numericReg.test(inputVal) || inputVal.length>10) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("BPLno").value = inputValSlice;
	    }
}

$scope.onlyNumeric12LimitInput = function()
{
	var adharno = document.getElementById("adharno").value;
	var inputVal = adharno;
	    var numericReg = /^[0-9]{1,12}$/;
	    if(!numericReg.test(inputVal) || inputVal.length>12) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("adharno").value = inputValSlice;
	    }
}

	 
$scope.RTIformpage1 = function(){

	$state.go("app.RTIpageform2");
}
	 
$scope.RTIformpage = function(){
	
	var pincode = document.getElementById("pincodelim").value;
	
	if ($scope.RTIappltype == "" || $scope.RTIappltype == null || $scope.RTIappltype == undefined) {
		alert("Please select Applicant Type");
		return;
	}
	else if ($scope.RTIappltype == "" || $scope.RTIappltype == null || $scope.RTIappltype == undefined) {
			if(applicantType == "2")
			  {
				  if($scope.RTIorgname == "" || $scope.RTIorgname == null || $scope.RTIorgname == undefined)
				  {
					  alert("Please enter your Organisation Name");
					  return ;
				  }
				  if ((/\s\s/.test($scope.RTIorgname)) || (!(/^[a-zA-Z ]+$/.test($scope.RTIorgname)))){
						alert("Please Enter a Valid Organization Name");
						return;
				  }
			  }
	}
	else if ($scope.RTItitle == "" || $scope.RTItitle == null || $scope.RTItitle == undefined) {
		  alert("Please Select a Title");
		  return ;
	}
	else if ($scope.RTIaplname == "" || $scope.RTIaplname == null || $scope.RTIaplname == undefined) {
		alert("Please Enter Your Name");
		  return ;
	}
	else if ($scope.RTIappladdress == "" || $scope.RTIappladdress == null || $scope.RTIappladdress == undefined) {
		 alert("Please Enter Your Address");
		  return ;
	}
	else if ($scope.RTIapplpincode == "" || $scope.RTIapplpincode == null || $scope.RTIapplpincode == undefined) {
		 alert("Please Enter Your Pincode");
		  return ;
	}
	else if(/^\s|\s$/.test(pincode) || !(/^[0-9]{1,6}$/.test(pincode)) || pincode.length != 6){
		alert("Please Enter a Valid Pincode Number");
		return;
  }
	else if ($scope.RTIBpl == "" || $scope.RTIBpl == null || $scope.RTIBpl == undefined) {
		 alert("Please Select Whether Below Poverty Line");
		  return ;
	}
	else if ($scope.RTIBpl == "" || $scope.RTIBpl == null || $scope.RTIBpl == undefined) {
		 if(bpl=="1")
		  {	  
			  if($scope.RTIbplNo == "" || $scope.RTIbplNo == null || $scope.RTIbplNo == undefined)
			  {
				  alert("Please enter BPL No");
				  return ;
			  }
			  else if(/^\s|\s$/.test(aplBplNo) || !(/^[0-9]{1,10}$/.test(aplBplNo)) || aplBplNo.length != 10){
					alert("Please Enter a Valid BPL Number");
					return;
			  }
			 /* if((verificationFile == "" || verificationFile == null || verificationFile == undefined) && tokenNo_BplFile<=0)
			  {
				  alert("Please upload verification document ");
				  return ;
			  }*/
		  }
	}
	else{
	
	$localStorage.RTIappltype = $scope.RTIappltype;
	$localStorage.RTIorgname = $scope.RTIorgname;
	$localStorage.RTItitle = $scope.RTItitle;
	$localStorage.RTIaplname = $scope.RTIaplname;
	$localStorage.RTIappladdress = $scope.RTIappladdress;
	$localStorage.RTIapplpincode = $scope.RTIapplpincode;
	$localStorage.RTIBpl = $scope.RTIBpl;
	$localStorage.RTIbplNo = $scope.RTIbplNo;
	$localStorage.RTIAadharno = $scope.RTIAadharno;
	
	$state.go("app.RTIpageform2");
}
} 



    var _init = function (){
  
    };
    _init();
  });
