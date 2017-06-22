angular.module('starter')
 .controller('LodgeComplaintCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties,$localStorage,$sessionStorage,$ionicPopup) {

//	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	/*$scope.orgid = 81;
	$scope.userID= 1;
	 */
	 
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
	 };
	
	$scope.onlyNumbers = /^\d+$/;
	/*care details*/
	$scope.NewCompDeptdetails;
	$scope.NewCompPincode;
	$scope.NewCompType;
	$scope.NewCompDescription;
	$scope.NewCompLocation;
	$scope.NewCompLandmark;
	

$scope.content = "New Complaint";

/* data for reopen  */
console.log("allgrievance--->"+($sessionStorage.allgrievanceresponse));
$scope.allgrievanceresponse = $sessionStorage.allgrievanceresponse;


$scope.SelectedTask = null;
 $scope.setSelected = function (SelectedTask) {
	console.log("--SelectedTask--"+SelectedTask);
	$scope.SelectedTask = SelectedTask;
 $ionicLoading.show({		template: 'Loading...'	});
	RestService.actionHistorybyDocID($scope.SelectedTask).then(function (actionhistoryresponse) {
				var tempTest = 0;
		if(actionhistoryresponse==undefined || actionhistoryresponse == null || actionhistoryresponse=="")
		  {
			  tempTest	=	1;
			  $ionicLoading.hide();
		  	 return false;
		  }
		  else
		  {
			  $sessionStorage.SelectedTask = SelectedTask;
			  $sessionStorage.actionhistoryresponse = actionhistoryresponse;
			  if(tempTest==0)
				  $state.go("app.reopentokenpage")
			  $ionicLoading.hide();
		  }
		$ionicLoading.hide();
	},
	function (err) {
		$ionicLoading.hide();
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
	})
}

//console.log("$scope.deptoptions=-"+JSON.stringify($scope.deptoptions));

/* prefix for dept*/
$scope.deptoptions = new Array();
	for(var i=0;i<$sessionStorage.deptresponse.length;i++){  
		$scope.deptoptions.push({
		deptid : $sessionStorage.deptresponse[i].department.dpDeptid,
		deptname : $sessionStorage.deptresponse[i].department.dpDeptdesc
	})
} 
/*prefix for location*/	
$scope.locationoptions = new Array();
	for(var i=0;i<$sessionStorage.locationresponse.length;i++){  
		$scope.locationoptions.push({
		locationid : $sessionStorage.locationresponse[i].locationId,
		locationname : $sessionStorage.locationresponse[i].locationName
	})
	
} 	

$scope.selectAction = function(){
 console.log($scope.NewCompDeptdetails);
  $scope.$watch('NewCompDeptdetails', function(newVal) {
	$ionicLoading.show({	template: 'Loading...'	});
	  RestService.finddeptcompltype($scope.NewCompDeptdetails,$scope.orgid).then(function (complsubtyperesponse) {
		console.log("complsubtyperesponse>->-"+JSON.stringify(complsubtyperesponse));
						if(complsubtyperesponse==undefined || complsubtyperesponse == null || complsubtyperesponse=="")
						  {
							 $ionicLoading.hide();
						  	 return false;
						  }
						  else
						  {
							  $scope.compresponse = complsubtyperesponse;
								$scope.deptcompltype = $scope.compresponse.complaintTypes;
								$sessionStorage.deptcompltype = $scope.compresponse;
								$scope.compltypeoption = new Array();
									for(var i=0;i<$scope.deptcompltype.length;i++){
											$scope.compltypeoption.push({
											comptypeID : $scope.deptcompltype[i].compId,
											comptypeDesc : $scope.deptcompltype[i].complaintDesc
										})
									 }
							$ionicLoading.hide();
						  }
					},function (err) {
						$ionicLoading.hide();
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
		    });
1 		};		  
		  
 $scope.locationperfix = function(){
	 $scope.NewCompPincode;
	 console.log("$scope.NewCompPincode---"+$scope.NewCompPincode);
 			$scope.$watch('NewCompPincode', function(newVal) {
 				 $ionicLoading.show({			template: 'Loading...'		});
 				RestService.pincodeprefix($scope.NewCompPincode).then(function (response) {
					  console.log("deptprefixresponselocation-->"+JSON.stringify(response));
					  if(response==undefined || response == null || response=="")
					  {
						 $ionicLoading.hide();
					  	 return false;
					  }
					  else
					  {
						  $sessionStorage.locationresponse = response;
							$scope.locationoptions = new Array();
							    for(var i=0;i<response.length;i++){	
										$scope.locationoptions.push({
										locationid : response[i].locationId,
										locationname : response[i].locationName
								   })
							    }
							    $ionicLoading.hide();
					  	}
					  $ionicLoading.hide();
					},function (err) {
 							$ionicLoading.hide();
// 							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
 					})
 			    });
 	 		};
		  
$scope.locationpincode = function(){
 console.log("NewCompLocation---"+$scope.NewCompLocation);
	$scope.$watch('NewCompPincode', function(newVal) {
	 for(var i=0;i<$sessionStorage.locationresponse.length;i++){ 
		 if($scope.NewCompLocation == $sessionStorage.locationresponse[i].locationId)
		 {
			 var locationPincode = $sessionStorage.locationresponse[i].pincode
			 $scope.NewCompPincode = locationPincode;
		 }
	 }
  }); 
} 		
 	 		
$scope.savecomplaint = function(){
  $ionicLoading.show({			template: 'Loading...'		});
  
var loginData = $localStorage.responselogindata;
 var careApplicantDetails =	{
		      id: null,
		      applicantTitle: loginData.title,
		      applicantFirstName: loginData.firstName,
		      applicantMiddleName: loginData.middleName,
		      applicantLastName: loginData.lastName,
		      gender: loginData.gender,
		      mobileNo: loginData.mobileNo,
		      emailId: loginData.emailId,
		      flatBuildingNo: loginData.address,
		      roadName: "",
		      blockName: "",
		      areaName: $scope.NewCompAreName,
		      villageTownSub: $scope.NewCompVillage,
		      pinCode: "400706",
		      aadharNo: loginData.addhaarNo,
		      panNumber: ""
	    }	
console.log("careApplicantDetails---"+JSON.stringify(careApplicantDetails));

var employee = {
	    id: null,
	    empId: loginData.userId,
	    fname: loginData.firstName,
	    mname: loginData.middleName,
	    lname: loginData.lastName,
	    empLoginName: loginData.mobileNo,
	    empPassword: null,
	    designation: null,
	    locNameReg: null,
	    emppayrollnumber: null,
	    empisecuritykey: null,
	    emppiservername: null,
	    empemail: loginData.emailId,
	    empAddress: loginData.address,
	    empAddress1: loginData.address,
	    lockUnlock: null,
	    loggedIn: null,
	    empmobno: loginData.mobileNo,
	    empphoneno: null,
	    lgIpMac: null,
	    lgIpMacUpd: null,
	    langId: 0,
	    emplType: 29,
	    empnew: null,
	    empdob: loginData.dob,
	    empuwmsowner: null,
	    empregistry: null,
	    emprecord: null,
	    empnetwork: null,
	    empoutward: null,
	    empuid: null,
	    empGender: loginData.gender,
	    isUploaded: null,
	    panCardNo: null,
	    autEmail: "N",
	    type: null,
	    onlsOrgname: null
	  }
//console.log("employee---"+JSON.stringify(employee));	
	var complaintType =  document.getElementById('first').value; 	
	RestService.lodgecomplaintsave($scope.NewCompPincode,$scope.NewCompDeptdetails,$scope.NewCompType,
		$scope.NewCompDescription,$scope.NewCompLocation,$scope.encoded_file,$scope.orgid,
		$scope.userID,complaintType,careApplicantDetails,employee)
			.then(function(complaintresponse){
				  console.log("complaintresponse--->"+JSON.stringify(complaintresponse));
				  if(complaintresponse.response == "Success"){
					 
//					  alert("Your Complaint Have Been Successfully Registered");
					  
					  var confirmPopup = $ionicPopup.show({
							 title : 'Change Of Usage',
					         template : '<b> Your Complaint is Successfully Submitted.</b>',
					         buttons : [{
					             text : 'Proceed',
					             type : 'button-balanced',
					             onTap : function(){
					            	 $sessionStorage.complaintresponse = complaintresponse;
									  $state.go("app.complaintreceipt");
									  $ionicLoading.hide();
					             }
				          		}]
							}); 
					  
					  
//					  $sessionStorage.complaintresponse = complaintresponse;
//					  $state.go("app.complaintreceipt");
					
					 $ionicLoading.hide();
				  }
			 else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
					$ionicLoading.hide();
			 }
		},function (err) { 
			$ionicLoading.hide();
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		})
	};	  

 $scope.imageupload = function($file){
	    var reader = new FileReader();
		var verfy =  document.getElementById('verfiyFile').files[0];  
		$scope.selectfilename = verfy.name;
		console.log("name=----"+$scope.selectfilename);
		
		var maxSize = 1000000;
	    var fileSize = verfy.size;
		
	    if(fileSize > maxSize){
	    	fileObject.value = "";
	        alert('File Size Must Not Be Greater Than 1 MB');
	        $('#iDivBusyLoad').hide();
	        return;
	    }
		
		reader.onload = function(e){
		console.log("about to encode");
		$scope.encoded_file = window.btoa(e.target.result.toString());  
//		console.log("encoded byte--"+$scope.encoded_file);
	 };
		reader.readAsBinaryString(verfy);
	}  
	
    var _init = function(){
    };
    _init();
    
  });
