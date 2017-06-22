angular.module('starter')
 
 .controller('ApplnStatusCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {

	 /*Global Functions Start*/	
		$scope.changeAttr = function(item){
			if($scope.dateOfBirth == "" || $scope.dateOfBirth == null || $scope.dateOfBirth == undefined )
				item.currentTarget.setAttribute("placeholder","Date of Birth");
			else item.currentTarget.setAttribute("placeholder","");
		}
		
		$scope.eighteendigit = function()
		{
			var licenseIDno = document.getElementById("applNostatus").value;
		    var inputVal = licenseIDno;
		    var numericReg = /^[0-9]{1,18}$/;
		    
		    if(!numericReg.test(inputVal) || inputVal.length>18) 
		    {
		    	inputVal.slice(0,-1);
		    	var inputValSlice = inputVal.slice(0,-1);
		    	document.getElementById("applNostatus").value = inputValSlice;
		    }
		}
		/*Global Functions End*/ 
		
	 $scope.RTIapplStatusSearch = false;
	 
	$scope.orgid = "711";
	$scope.empId = "1";
	$scope.langID = "1";
	$scope.applnstatussearch = ""; 
	
	var h = null;
	$scope.applicationstatussearch1 = function() { 
		alert("gg");
		
		h = window.open('https://www.google.com', '_blank');
//		$scope.applStatusSearch = true;
		
	
	}
	
	 $scope.applicationstatussearch = function() 
	 {
		 if ($scope.applnstatussearch == "" || $scope.applnstatussearch == null || $scope.applnstatussearch == undefined) 
			{
				alert("Please enter Application Number");
				return;
			}
			if(!(/^[0-9]{1,18}$/.test($scope.applnstatussearch)) || $scope.applnstatussearch <= 0){
				alert("Please Enter a Valid Application Number");
				return;
			}
			else{
					$ionicLoading.show({ template: 'Loading...'	});
					RestService.applicationstatus($scope.applnstatussearch,$scope.orgid,$scope.empId,$scope.langID)
					.then(function(applnstatusdata){
					console.log("statusdata---"+JSON.stringify(applnstatusdata));
					$ionicLoading.hide();
					if(applnstatusdata.successFlag  == "success")
					{
					  
						$scope.apllicationID = applnstatusdata.apmId;
						$scope.applicationDate = applnstatusdata.applicationDate;
						$scope.applnDate = formatDate($scope.applicationDate);
						$scope.applnServiceName = applnstatusdata.apmServiceName;
						$scope.applnName = applnstatusdata.apmName;
						$scope.applicationStatus = applnstatusdata.apmStsFlag;
					
						 $scope.applStatusSearch = true;
					}
					else
					{
						alert("No Such Record Found");
						return ;
					}
					$ionicLoading.hide();
					},function (err){
							 $ionicLoading.hide();
//							 alert("Something went wrong!!");
					})
				}
	 }
	 
	 $scope.homepage = function()
	 {
	 	$state.go("app.home");
	 } 
	 

    var _init = function (){
  
    };
    _init();
  });
