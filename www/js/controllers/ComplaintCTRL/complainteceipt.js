angular.module('starter')
 
 .controller('complaintreceiptctrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties,$localStorage,$sessionStorage) {
	
	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.loginlastname = $localStorage.responselogindata.lastName;
		var fullName = $scope.loginUSername.concat($scope.loginlastname);
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

		/* $scope.ResposeData = $localStorage.complaintresponse.responseData;
		 $scope.receipttoken = $scope.ResposeData.requestNo;*/
if($sessionStorage.complaintresponse){
	console.log("complaintresponse on reciptpage--"+JSON.stringify($sessionStorage.complaintresponse));
	console.log("from lodge a complaint");
		 $scope.compReceiptdata = $sessionStorage.complaintresponse.complaintAcknowledgementModel;
		 $scope.receipttoken = $scope.compReceiptdata.tokenNumber;
		 $scope.receiptapplname = fullName;
		 $scope.receiptcompdept = $scope.compReceiptdata.department;
		 $scope.compltypereceipt = $scope.compReceiptdata.complaintType;
		 $scope.locationreceipt = $scope.compReceiptdata.ward;
		 $scope.receiptdescrition = $scope.compReceiptdata.description;
	}	
	else{
		console.log(" $sessionStorage.reopensavedata--"+JSON.stringify($sessionStorage.reopensavedata));
		console.log("from reopen")
		 $scope.reOpenReceiptdata = $sessionStorage.reopensavedata.complaintAcknowledgementModel;
		 $scope.receipttoken = $scope.reOpenReceiptdata.tokenNumber;
		 $scope.receiptapplname = $scope.loginUSername;
		 $scope.receiptcompdept = $scope.reOpenReceiptdata.department;
		 $scope.compltypereceipt = $scope.reOpenReceiptdata.complaintType;
		 $scope.locationreceipt = $scope.reOpenReceiptdata.ward;
		 $scope.receiptdescrition = $scope.reOpenReceiptdata.description;
	}
		 
		/* $scope.ResposecareApplicantDetails = $localStorage.complaintresponse.document.careApplicantDetails;
		 $scope.receiptapplname = $scope.ResposecareApplicantDetails.applicantFirstName;
		 $scope.ResposecareDetails = $localStorage.complaintresponse.document.careDetails;
		 $scope.receiptcompdept = $scope.ResposecareDetails.departmentComplaint.department.dpDeptdesc
		 $scope.receiptcomplainttype = $scope.ResposecareDetails.complaintType;
			$scope.receiptcompltype = $localStorage.deptcompltype.complaintTypes;
			for(var i=0;i<$scope.receiptcompltype.length;i++){
				var complID = $scope.receiptcompltype[i].compId;
				if($scope.receiptcomplainttype == complID)
					 $scope.compltypereceipt = $scope.receiptcompltype[i].complaintDesc;
			 }
			
		 $scope.receiptlocation = $scope.ResposecareDetails.location.locId;
		 console.log("location response---"+JSON.stringify($localStorage.locationresponse));
		 for(var i=0;i<$localStorage.locationresponse.length;i++){
			 var locationID = $localStorage.locationresponse[i].locationId;
			 if($scope.receiptlocation == locationID)
			 $scope.locationreceipt = $localStorage.locationresponse[i].locationName;
		 }
		 
		 $scope.receiptdescrition =  $scope.ResposecareDetails.description;*/
		 


	 $scope.homepage = function()
	 {
	 	$state.go("app.home");
	 } 
	 

    var _init = function (){
  
    };
    _init();
  });
