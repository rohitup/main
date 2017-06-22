angular.module('starter')
  .controller('ComplaintstatusDetailctrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, $ionicPopup,$sessionStorage, $localStorage) {
$scope.complaintStatusFormResponse = false;
$scope.esctable = false;
console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
$scope.orgid = $localStorage.responselogindata.orgId;
$scope.userID = $localStorage.responselogindata.userId;
$scope.loginUSername = $localStorage.responselogindata.firstName;
$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
 $scope.data = {}
	    console.log("complaintstatusresponse--"+JSON.stringify($sessionStorage.complaintstatusresponse));
var statusresponse = $sessionStorage.complaintstatusresponse

$scope.organizationName = statusresponse.organizationName;
$scope.tokenNo = statusresponse.tokenNumber;
$scope.Date1 = statusresponse.date;
$scope.date = formatDate(statusresponse.date);
$scope.complainantName = statusresponse.complainantName;
$scope.complaintType = statusresponse.complaintType;
$scope.complaintSubType = statusresponse.complaintSubType;
$scope.ward = statusresponse.ward;
$scope.description = statusresponse.description;

var escalationDetailsList = statusresponse.escalationDetailsList;

var tempTest = 0;
if(escalationDetailsList.length > 0){
if(escalationDetailsList[0].level==undefined || escalationDetailsList[0].level == null || escalationDetailsList[0].level=="")
{	 
	tempTest	=	1;
	$scope.esctable = false;
	$ionicLoading.hide();
	return false;
}
else
{
	$scope.escalDetailsList = [];
	for(var i=0;i<escalationDetailsList.length;i++){
		$scope.escalDetailsList.push({
			level : escalationDetailsList[i].level,
			duration : escalationDetailsList[i].sla,
			empName: escalationDetailsList[i].empName,
			Designation: escalationDetailsList[i].designation,
			Department : escalationDetailsList[i].department,
			Email : escalationDetailsList[i].email,
			Decision : escalationDetailsList[i].decision,
		})
	}   
	$scope.esctable = true;
	if(tempTest==0)
	$ionicLoading.hide();
}
}
/*$scope.escalDetailsList = [];
for(var i=0;i<escalationDetailsList.length;i++){
	$scope.escalDetailsList.push({
		level : escalationDetailsList[i].level,
		duration : escalationDetailsList[i].sla,
		empName: escalationDetailsList[i].empName,
		Designation: escalationDetailsList[i].designation,
		Department : escalationDetailsList[i].department,
		Email : escalationDetailsList[i].email,
		Decision : escalationDetailsList[i].decision,
	})
}   */
    var _init = function (){
  
    };
    _init();
  });