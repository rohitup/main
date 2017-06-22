angular.module('starter')
 
 .controller('TradeandlicenseCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
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
//		/^[A-Za-z0-9/]{1,18}$/;
		
		
		$scope.eighteendigit = function()
		{
			var licenseIDno = document.getElementById("licenseID").value;
		    var inputVal = licenseIDno;
		    var numericReg = /^[A-Za-z0-9/]{1,18}$/;
		    
		    if(!numericReg.test(inputVal) || inputVal.length>18) 
		    {
		    	inputVal.slice(0,-1);
		    	var inputValSlice = inputVal.slice(0,-1);
		    	document.getElementById("licenseID").value = inputValSlice;
		    }
		}
		
		/*Global Functions End*/ 
		
$scope.RTIapplStatusSearch = false;
	 
$scope.orgid = "711";
$scope.empId = "1";
$scope.langID = "1";
$scope.licensenumbersearch = ""; 
	 
$scope.tradelicensenumbersearch1 = function() { 
	/*	 if ($scope.licensenumbersearch == "" || $scope.licensenumbersearch == null || $scope.licensenumbersearch == undefined) {
				alert("Please Enter License Number");
				return;
			}*/
		$scope.licenseStatus = true;
		
}
	
	$scope.tradelicensenumbersearch = function() 
	 {
	  if ($scope.licensenumbersearch == "" || $scope.licensenumbersearch == null || $scope.licensenumbersearch == undefined){
			alert("Please Enter License Number");
			return;
		}
		else{
			$ionicLoading.show({ template: 'Loading...'	});
			 RestService.tradelicensedetail($scope.licensenumbersearch,$scope.orgid,$scope.empId,$scope.langID)
			.then(function(tradelicensedata){
				console.log("tradelicensedata---"+JSON.stringify(tradelicensedata));
				$ionicLoading.hide();
				if(tradelicensedata.status == "success")
				{
					$scope.lastPaidDate;
					$scope.MLapplicationId;
					$scope.MLapplicationId = tradelicensedata.applicationId;
					
					var d = tradelicensedata.lastPaidDate;
					if(d == null || d == undefined || d == ""){
						$scope.lastPaidDate = "";
					}
					else $scope.lastPaidDate = formatDate(d);
					
					
					var dd = tradelicensedata.dueDate;
					if(dd == null || dd == undefined || dd == ""){
						$scope.dueDate = "";
					}
					else $scope.dueDate = formatDate(dd);
					
					if($scope.MLapplicationId == 0) $scope.MLapplicationId = "";
					
					$scope.LicenseNumber = tradelicensedata.lincenseNo;
					$scope.businessname = tradelicensedata.bussinessName;
					$scope.businessaddress = tradelicensedata.bussinessAddress;
					$scope.serviceName = tradelicensedata.serviceName;
					$scope.LastPaidAmt = tradelicensedata.lastPaidAmount;
					$scope.LastPaid = makeFloat($scope.LastPaidAmt);
					$scope.LicenseExpiry = tradelicensedata.dueDate;
					$scope.Payableamt = tradelicensedata.payableAmount;
					$scope.payamt = makeFloat($scope.Payableamt);
					
					$scope.licenseStatus = true;
					 
				}else{
					alert("No Records Found");
					return ;
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
