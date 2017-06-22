angular.module('starter')
 
 .controller('LOIDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties,$localStorage) {
	 
	console.log("$scope.loiTitle22--"+$localStorage.loiTitle);
	console.log("$scope.loiSelectionType--"+$localStorage.loiSelectionType);
	
	$scope.HeaderTitle = $localStorage.loiTitle;
	$scope.loishortcode = $localStorage.loiSelectionType;
	 
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
		}
		
		function makeFloat(number){
			var num = number;
			if(num != '' || num==0){
				return num+".00";
			}
			else{
				return num;
			}
		}*/
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
		
	$scope.LOIapplStatusSearch = false;
	$scope.orgID = "711";
//	$scope.empId =  "4473";
	$scope.empID = "1";
	$scope.langID = "1";
	$scope.LOIapplnsearch = ""; 
	 
	$scope.loiapplicationsearch1 = function() { 
		$scope.loipaymentDiv = true;
		$scope.loiHomePayButton = true; 
		$scope.LOIapplStatusSearch = true;
	}
	
	$scope.loipaydiv = function()
	{		
		$scope.loiselectPaymentDiv = true;	
	};
	
	
	 $scope.loiapplicationsearch = function() 
	 {
		
		 console.log("$scope.LOIapplnsearch--"+$scope.LOIapplnsearch); 
//		 $scope.contentloipay = "loipaymentDiv";
//		 $scope.content = "loiHomePayButton";
		 
//		 $scope.loiHomePayButton = true;
//		 $scope.loipaymentDiv = true;
		 
		 if ($scope.LOIapplnsearch == "" || $scope.LOIapplnsearch == null || $scope.LOIapplnsearch == undefined) 
			{
				alert("Please enter Application Number");
				return;
			}
		 else{
			 if(!(/^[0-9]{1,18}$/.test($scope.LOIapplnsearch)) || $scope.LOIapplnsearch <= 0){
					alert("Please Enter a Valid Application Number");
					return;
				}
			 
			 $scope.sendURL;
				if($scope.loishortcode == "RTI"){
					$scope.sendURL = "mobileOnlinePaymentController/getLoiRTIDetail.ws";
				}
				else if($scope.loishortcode == "TP"){
					$scope.sendURL = "mobileOnlinePaymentController/getLoiTPDetail.ws";
				}
				else{
					$scope.sendURL =  "mobileOnlinePaymentController/getLoiDetail.ws";
				}
				
				$ionicLoading.show({ template: 'Loading...'	});
				
				RestService.LOIapplication($scope.LOIapplnsearch,$scope.orgID,$scope.empID,$scope.langID,$scope.sendURL)
				.then(function(LOIresponse){
					console.log("statusdata---"+JSON.stringify(LOIresponse));
				
					if(LOIresponse.status == "success"){	
				
						$localStorage.LOIresponse = LOIresponse;
						$state.go("app.LOIDetailPay");
					
				/*	if(LOIresponse.status == "success"){
						$ionicLoading.hide();
						$scope.LOIapplStatusSearch = true;
						$scope.loiHomePayButton = true;
						$scope.loipaymentDiv = true;
						$scope.LOInumber = LOIresponse.loiNo;
						//$scope.Applnumber = LOIresponse.applicationId;
						$scope.applicationID = LOIresponse.applicationId;
						$scope.LOIdate = LOIresponse.loiDate;
						$scope.LOIDate = formatDate($scope.LOIdate);
						$scope.loiPaidDesc;
						
						if(LOIresponse.loiPaid == "Y"){
							$scope.loiPaidDesc = "Paid"; 
						}
						else{ 
							$scope.loiPaidDesc = "Unpaid";
						}
						
						$scope.LOIOwnerName = LOIresponse.applicantName;
						$scope.LOImobileNo = LOIresponse.mobileNo;
						$scope.LOIAmount = LOIresponse.finalAmount;
						$scope.applnDueAmount= makeFloat($scope.LOIAmount);
//						$scope.LOIFinalAmt = makeFloat($scope.LOIAmount);
						
						
						if(LOIresponse.loiPaid == "Y" || $scope.LOIAmount <= 0){
//							$scope.content = "loiHomePayButton";
							$scope.loipaymentDiv = false;
						}
						
						$localStorage.ServiceName = LOIresponse.serviceName;
						$localStorage.ServiceId= LOIresponse.serviceId;
						$localStorage.ServiceShortName = LOIresponse.serviceType;  //serviceshortname*/
					}
					else
					{
						$ionicLoading.hide();
						alert(LOIresponse.errorMsg);
						  return;
					}
					
					$ionicLoading.hide();
					},function (err){
						$ionicLoading.hide();
						 alert("Something went wrong!!");
					})
				
		 		}
	 	};
	 /*
	 	$scope.loipaydiv = function()
		{		
			$scope.loiselectPaymentDiv = true;	
		};*/
	 	

	 
	 $scope.homepage = function()
	 {
	 	$state.go("app.home");
	 } 
	 
    var _init = function (){
  
    };
    _init();
  });
