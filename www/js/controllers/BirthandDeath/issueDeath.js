angular.module('starter')
.controller('IssueDeathCtrl', function ($scope, $http, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		ENV, $state, sharedProperties,$localStorage){
	
	$scope.PostalCode = $localStorage.postaldata;
	/*Global Functions Start*/	
	$scope.changeAttr = function(item){
		if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
			item.currentTarget.setAttribute("placeholder","Date of Birth");
		else item.currentTarget.setAttribute("placeholder","");
	}
	$scope.eighteendigit1 = function()
	{
		var deathapplNo = document.getElementById("deathapplNo").value;
	    var inputVal = deathapplNo;
	    var numericReg = /^[0-9]{1,18}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>18) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("deathapplNo").value = inputValSlice;
	    }
	}
	$scope.eighteendigit = function()
	{
		var deathregno = document.getElementById("deathregno").value;
	    var inputVal = deathregno;
	    var numericReg = /^[0-9]{1,18}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>18) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("deathregno").value = inputValSlice;
	    }
	}
	$scope.fourdigit = function()
	{
		var deathyearofreg = document.getElementById("deathyearofreg").value;
	    var inputVal = deathyearofreg;
	    var numericReg = /^[0-9]{1,4}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>4) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("deathyearofreg").value = inputValSlice;
	    }
	}
	$scope.twodigit = function()
	{
		var deathnoofcopies = document.getElementById("deathnoofcopies").value;
	    var inputVal = deathnoofcopies;
	    var numericReg = /^[0-9]{1,2}$/;
	    
	    if(!numericReg.test(inputVal) || inputVal.length>2) 
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("deathnoofcopies").value = inputValSlice;
	    }
	}
	
	
	
	/*Global Functions End*/
	/*Variable Declaration Start*/

	$scope.orgId = "100";
	$scope.empId = "1";
	$scope.langId = "1";
	$scope.deathapplnumber = "";
	$scope.deathregnumber = "";
	$scope.deathyearofreg = "";
	$scope.deathnumberofcopies = "";
	$scope.deathdeliverycode = "";
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
	
$scope.issueDeath = function()
{
	var deathapplNo =document.getElementById('deathapplNo').value;
	console.log($scope.deathapplnumber);
	var deathregNo = document.getElementById('deathregno').value;
	console.log($scope.deathregnumber);
	console.log($scope.deathyearofreg);
	console.log($scope.deathnumberofcopies);
	console.log($scope.deathdeliverycode);
	
	if(deathapplNo.length == 0 && deathregNo.length == 0)
	{
		alert("Please Enter Application No. Or Registration No.");
		return;
	}
	if(deathapplNo){
		if(!(/^[0-9]{1,18}$/.test(deathapplNo)) || deathapplNo <= 0){
			alert("Please Enter a Valid Application Number");
			return;
		}
	}
	if(deathregNo){
		if(!(/^[0-9]{1,18}$/.test(deathregNo)) || deathregNo <= 0){
			alert("Please Enter a Valid Death Registration Number");
			return;
		}
		else if($scope.deathyearofreg=="" || $scope.deathyearofreg==null || $scope.deathyearofreg==undefined)
		{
			alert("Please Enter Registration Year");
			return;
		}else if(!(/^[0-9]{1,4}$/.test($scope.deathyearofreg)) || $scope.deathyearofreg < 1000){
			alert("Please Enter a Valid Registration Year");
			return;
		}
	}
	if($scope.deathnumberofcopies=="" || $scope.deathnumberofcopies==null || $scope.deathnumberofcopies==undefined)
	{
		alert("Please Enter Number of Copies");
		return;
	}else if(!(/^[0-9]{1,2}$/.test($scope.deathnumberofcopies)) || $scope.deathnumberofcopies <= 0)
	{
		alert("Please Enter Valid Number of Copies");
		return;
	}else if($scope.deathdeliverycode == "" || $scope.deathdeliverycode == null || $scope.deathdeliverycode == undefined){
		alert("Please Select Delivery Mode");
		return;
	}
		$ionicLoading.show({	template: 'Loading...'		});	
		RestService.issueDeathdetails($scope.deathapplnumber,$scope.deathnumberofcopies,$scope.deathregnumber,$scope.deathyearofreg,
				$scope.orgId,$scope.empId,$scope.langId,$scope.deathdeliverycode).then(function(issueDeathresponse){
						
						if(issueDeathresponse.status == "success"){
							$localStorage.IssueDeathresponse = issueDeathresponse;
							console.log("issueDeathresponse data: "+JSON.stringify($localStorage.IssueDeathresponse));
							$state.go("app.IssueDeathReceipt");
						}
						else{
							toaster.error($filter('translate')(''), issueDeathresponse.deathApplicationStatus);
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