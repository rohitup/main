angular.module('starter')
  .controller('ComplaintCareCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,
		  $state, sharedProperties) {

	  $scope.empcareData = sharedProperties.getCareData();
//	  $scope.empcareData = sharedProperties.getselectedtaskapplnID();
	  
	/*function start*/
	
   console.log(" $scope.empcareDataCAREPAGE-->"+JSON.stringify($scope.empcareData));
    	
   $scope.show = 1; 
   
   $scope.Deptdetails = $scope.empcareData.careDetails.department;
   $scope.CompTypedetails = $scope.empcareData.careDetails.complaintSubType;
   $scope.CompDescriptiondetails = $scope.empcareData.careDetails.description;
   $scope.CompPincodedetails = $scope.empcareData.careDetails.pincode2;
   $scope.CompLocationdetails = $scope.empcareData.careDetails.location;
   $scope.CompLandmarkdetails = $scope.empcareData.careDetails.landmark;
   $scope.CompDocumentdetails = $scope.empcareData.careDetails.document;
   
   $scope.submit = function(){
   }   
    var _init = function (){
  
    };
    _init();
  });
