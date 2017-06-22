angular.module('starter')
  .controller('reopenTokenCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties,$localStorage,$sessionStorage) {
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  
//$scope.orgid = 81;
//$scope.userID= 1;
$scope.tokenNumber = "";
$scope.reply = "";
$scope.data = {};
$scope.selectfilename;
$scope.encoded_file;

console.log("allgrievance--->"+JSON.stringify($sessionStorage.allgrievanceresponse));
var allgrievanceresponse = $sessionStorage.allgrievanceresponse;

for(var i=0;i<allgrievanceresponse.length;i++){
	if($sessionStorage.SelectedTask == allgrievanceresponse[i].requestNo)
	{	
		$scope.tokenNumber = allgrievanceresponse[i].requestNo;
		$scope.department = allgrievanceresponse[i].descriptions.GRIEVANCE_DEPARTMENT.description;
		$scope.complainttype = allgrievanceresponse[i].descriptions.GRIEVANCE_COMPLAINT_TYPE.description;
		$scope.compdesc = allgrievanceresponse[i].descriptions.GRIEVANCE_DESCRIPTION.description;
		$scope.status = allgrievanceresponse[i].processStatus;
	}
}

console.log("$sessionStorage.actionhistoryresponse--"+$sessionStorage.actionhistoryresponse);
var actionhistoryresponse = $sessionStorage.actionhistoryresponse;
var counter = 1;

var tempvar = '<tr>'+
	'<th>Sr.No</th>'+
	'<th>Date</th>'+
	'<th>Replied By</th>'+
	'<th>Action</th>'+
	'</tr>';
var usagedoctable = "";
for (var i = 0; i < actionhistoryresponse.length; i++) {
		
		var date = formatDate(actionhistoryresponse[i].dateOfAction);
		var fname = actionhistoryresponse[i].actor.fname;
		var lname = actionhistoryresponse[i].actor.lname;
//		var fullname = fname.concat(lname);
		var fullname = fname+ " " +lname;
		var comments = capitalise(actionhistoryresponse[i].decision);
	
	tempvar = tempvar +
	'<td><span>'+ counter++ +'</span></td>'+
	'<td><span>'+ date +'</span></td>'+
	'<td><span>'+ fullname +'</span></td>'+
	'<td><span>'+ comments +'</span></td>'+
	'</tr>';
}

var tempvar = '<table class="gridtable">'+tempvar+'</table>';
document.getElementById('ReplyDocIDData').innerHTML = tempvar;

/*function start*/

$scope.compdescription = false;

$scope.reopencomplaint = function(){
	$scope.tokenNumber;
	 $ionicLoading.show({ template: 'Loading...' });
	RestService.getCareRequestByRequestNo($scope.tokenNumber).then(function (response) {
		  if(response==undefined || response == null || response=="")
		  {
			 $ionicLoading.hide();
		  	 return false;
		  }
		  else
		  {
			  $sessionStorage.RequestNoresponse = response;
			  $scope.compdescription = true;
			 /* if($sessionStorage.RequestNoresponse.reopenComplaintDetails ==  null ||
			     $sessionStorage.RequestNoresponse.reopenComplaintDetails == "" ||
			     $sessionStorage.RequestNoresponse.reopenComplaintDetails == undefined){
				  $ionicLoading.hide();
//				  alert("Getting null");
				  $scope.compdescription = true;
			  }else{
				  $ionicLoading.hide();
				  $scope.compdescription = true;
			  }*/
		  }
		    $ionicLoading.hide();
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			$ionicLoading.hide();
		})
}   
	
$scope.reopencompsave = function()
{
	var complaintType = "Reopen Complaint"; 	
	console.log("selectfilename=--"+$scope.selectfilename);
	console.log("$scope.encoded_file=--"+$scope.encoded_file);
	$scope.data.reply;
	
	 var reopendata = {
			  id: null,
		      description: $scope.data.reply,
		      document: $scope.encoded_file,
		      fileName: $scope.selectfilename,
		      file:null
	 }
	 
	 $sessionStorage.RequestNoresponse.reopenComplaintDetails = reopendata;
	
	/*$sessionStorage.RequestNoresponse.reopenComplaintDetails.description = $scope.data.reply;
	$sessionStorage.RequestNoresponse.reopenComplaintDetails.document = $scope.encoded_file;
	$sessionStorage.RequestNoresponse.reopenComplaintDetails.fileName = $scope.selectfilename;*/
	$sessionStorage.RequestNoresponse.complaintTypeDescription = complaintType;
console.log("--reopencompsave--"+JSON.stringify($sessionStorage.RequestNoresponse.reopenComplaintDetails));
//console.log("--complaintTypeRequestNoresponse--"+JSON.stringify($sessionStorage.RequestNoresponse.complaintTypeDescription));
var loginData = $localStorage.responselogindata;
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
	    langId: 1,
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

$ionicLoading.show({		template: 'Loading...'	});
RestService.reopenedSaveGrievances($sessionStorage.RequestNoresponse,$scope.orgid,employee).then(function (response) {
	  if(response.response == "Success"){
		  alert("Your Complaint Have Been Successfully Registered");
		  $sessionStorage.reopensavedata = response;
			$state.go("app.complaintreceipt");
			$ionicLoading.hide();
	  }
	  else{
		  	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			$ionicLoading.hide();
	  }
	    $ionicLoading.hide();
	},function (err) { 
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		$ionicLoading.hide();
	})

}

$scope.imageupload = function($file){
	var verfy =  document.getElementById('verfiyFile').files[0];  
	$scope.selectfilename = verfy.name;
	console.log("name=----"+$scope.selectfilename);
	var reader = new FileReader();
	reader.onload = function(e){
	console.log("about to encode");
//	$scope.encoded_file = window.btoa(e.target.result.toString());  
	$scope.encoded_file ="asadsvdDTHDHDDTHDTHDHfg";  
	console.log("encoded byte--"+$scope.encoded_file);
 };
	reader.readAsBinaryString(verfy);
} 

    var _init = function (){
  
    };
    _init();
  });
