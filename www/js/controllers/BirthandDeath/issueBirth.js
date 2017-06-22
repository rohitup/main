angular.module('starter')
.controller('IssueBirthCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		ENV, $state, sharedProperties,$localStorage){
	
	$scope.PostalCode = $localStorage.postaldata;
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Birth");
		else item.currentTarget.setAttribute("placeholder","");
	}
	/*var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	function pad(s) { return (s < 10) ? '0' + s : s; }
	function formatDate(myDate) {
		if(myDate == "" || myDate == null || myDate == undefined) return "";
		else 
		{
			var d = new Date(myDate);
			return [pad(d.getDate()),monthNames[d.getMonth()], d.getFullYear()].join('-');
		}
	}*/
	$scope.eighteendigit1 = function()
	{
		var birthapplNo = document.getElementById("birthapplNo").value;
	    var inputVal = birthapplNo;
	    var numericReg = /^[0-9]{1,18}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>18) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("birthapplNo").value = inputValSlice;
	    }
	}
	$scope.eighteendigit = function()
	{
		var birthregno = document.getElementById("birthregno").value;
	    var inputVal = birthregno;
	    var numericReg = /^[0-9]{1,18}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>18) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("birthregno").value = inputValSlice;
	    }
	}
	$scope.fourdigit = function()
	{
		var yearofreg = document.getElementById("yearofreg").value;
	    var inputVal = yearofreg;
	    var numericReg = /^[0-9]{1,4}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>4) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("yearofreg").value = inputValSlice;
	    }
	}
	$scope.twodigit = function()
	{
		var noofcopies = document.getElementById("noofcopies").value;
	    var inputVal = noofcopies;
	    var numericReg = /^[0-9]{1,2}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>2) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("noofcopies").value = inputValSlice;
	    }
	}
	
	
	
	/*Global Functions End*/
	/*Variable Declaration Start*/

	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.birthapplnumber = "";
	$scope.birthregnumber = "";
	$scope.birthyearofreg = "";
	$scope.birthnumberofcopies = "";
	$scope.birthdeliverycode = "";
	/*Variable Declaration End*/
	
	/*Function Declaration Start*/
	
$scope.postaldeliverycode = function()
	{
		$ionicLoading.show({ template: 'Loading...'	});
	   console.log("Postal Code=="+JSON.stringify($scope.PostalCode));
		if($scope.PostalCode.status == "success"){
			 $ionicLoading.hide();
//			$localStorage.postaldata = postaldata;
	 		  $scope.postaldataoption = new Array();
	 		    for(var i=0;i<$scope.PostalCode.postalCodeLookup.length;i++){	
	 					$scope.postaldataoption.push({
	 						lookUpId : $scope.PostalCode.postalCodeLookup[i].lookUpId,
	 						lookUpDesc : $scope.PostalCode.postalCodeLookup[i].descLangFirst
	 			   })
	 		    }  
			}else{
				$ionicLoading.hide();
				alert("We are facing some issues retrieving details. Please try again after sometime.");
			}
	 		   $ionicLoading.hide();
		
	};
	
$scope.issueBirth = function()
{
	var birthapplNo =document.getElementById('birthapplNo').value;
	console.log($scope.birthapplnumber);
	var birthregNo = document.getElementById('birthregno').value;
	console.log($scope.birthregnumber);
	console.log($scope.birthyearofreg);
	console.log($scope.birthnumberofcopies);
	console.log($scope.birthdeliverycode);
	
	if(birthapplNo.length == 0 && birthregNo.length == 0)
	{
		alert("Please Enter Application No. Or Registration No.");
		return;
	}
	if(birthapplNo){
		if(!(/^[0-9]{1,18}$/.test(birthapplNo)) || birthapplNo <= 0){
			alert("Please Enter a Valid Application Number");
			return;
		}
	}
	if(birthregNo){
		if(!(/^[0-9]{1,18}$/.test(birthregNo)) || birthregNo <= 0){
			alert("Please Enter a Valid Birth Registration Number");
			return;
		}
		else if($scope.birthyearofreg=="" || $scope.birthyearofreg==null || $scope.birthyearofreg==undefined)
		{
			alert("Please Enter Registration Year");
			return;
		}else if(!(/^[0-9]{1,4}$/.test($scope.birthyearofreg)) || $scope.birthyearofreg < 1000){
			alert("Please Enter a Valid Registration Year");
			return;
		}
	}
	if($scope.birthnumberofcopies=="" || $scope.birthnumberofcopies==null || $scope.birthnumberofcopies==undefined)
	{
		alert("Please Enter Number of Copies");
		return;
	}else if(!(/^[0-9]{1,2}$/.test($scope.birthnumberofcopies)) || $scope.birthnumberofcopies <= 0)
	{
		alert("Please Enter Valid Number of Copies");
		return;
	}else if($scope.birthdeliverycode == "" || $scope.birthdeliverycode == null || $scope.birthdeliverycode == undefined){
		alert("Please Select Delivery Mode");
		return;
	}
		$ionicLoading.show({	template: 'Loading...'		});	
		RestService.issueBirthdetails($scope.birthapplnumber,$scope.birthnumberofcopies,$scope.birthregnumber,$scope.birthyearofreg,
				$scope.orgId,$scope.empId,$scope.langId,$scope.birthdeliverycode).then(function(issueBirthresponse){
						
						if(issueBirthresponse.status == "success"){
							$localStorage.IssueBirthresponse = issueBirthresponse;
							console.log("issueBirthresponse data: "+JSON.stringify($localStorage.IssueBirthresponse));
							$state.go("app.IssueBirthReceipt");
						}
						else{
							toaster.error($filter('translate')(''), issueBirthresponse.birthApplicationStatus);
						}
						
						$ionicLoading.hide();
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	};
	
	
	/*Function Declaration End*/
	
	var _init = function (){
    };
    _init();
});