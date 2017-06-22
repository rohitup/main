angular.module('starter')
 
 .controller('RTIapplnstatusCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {

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
			var licenseIDno = document.getElementById("RTiapplNo").value;
		    var inputVal = licenseIDno;
		    var numericReg = /^[0-9]{1,18}$/;
		    
		    if(!numericReg.test(inputVal) || inputVal.length>18) 
		    {
		    	inputVal.slice(0,-1);
		    	var inputValSlice = inputVal.slice(0,-1);
		    	document.getElementById("RTiapplNo").value = inputValSlice;
		    }
		}
		/*Global Functions End*/ 	 
	 
	 $scope.RTIapplStatusSearch = false;
	 
	$scope.orgid = "100";
	$scope.empId = "3198";
	$scope.RTIapplnsearch = ""; 
	
	 
	$scope.RTIapplicationsearch1 = function() { 
		alert("gg");
		 H = window.open('https://www.google.com', '_blank', 'location=yes');
		
		$scope.RTIapplStatusSearch = true;
		}
	
	 $scope.RTIapplicationsearch = function() 
	 {
		 if($scope.RTIapplnsearch == "" || $scope.RTIapplnsearch == null || $scope.RTIapplnsearch == undefined) 
			{
				alert("Please enter RTI Number");
				return;
			}
			if(!(/^[0-9]{1,18}$/.test($scope.RTIapplnsearch)) || $scope.RTIapplnsearch <= 0){
				alert("Please Enter a Valid RTI Application Number");
				return;
			}else{
				$ionicLoading.show({ template: 'Loading...'	});
				RestService.RTIapplnStatus($scope.RTIapplnsearch,$scope.orgid,$scope.empId).then(function(applnstatusdata){
				console.log("statusdata---"+JSON.stringify(applnstatusdata));
				$ionicLoading.hide();
				if(applnstatusdata.status == "success")
					{
						$scope.RTInumber = applnstatusdata.rtiNo;
						$scope.RTIapplicantType = applnstatusdata.applicantType;
						$scope.RTIapplName = applnstatusdata.applicantName;
						$scope.RTIAplBplName = applnstatusdata.aplBplName;
						$scope.RTIsubsType = applnstatusdata.subscriptionType;
						$scope.RTImobileNo = applnstatusdata.mobileNo;
						$scope.RTIEmailID = applnstatusdata.emailId;
						$scope.RTISubject = applnstatusdata.subject;
						$scope.RTIDetails = applnstatusdata.rtiDetails
						$scope.RTIApplndate = applnstatusdata.applicationDate
						$scope.RTIApplnDATE = formatDate($scope.RTIApplndate);
						$scope.RTIpayStatus = applnstatusdata.paymentStatus;
						$scope.RTIApplnStatus = applnstatusdata.applicationStatus;
						
						 $scope.RTIapplStatusSearch = true;
					}
					else{
						alert("Please Enter Valid Application Number");
					}
						$ionicLoading.hide();
					},function (err){
							 $ionicLoading.hide();
							 alert("Something went wrong!!");
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
