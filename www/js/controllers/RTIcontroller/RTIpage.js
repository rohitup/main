angular.module('starter')
    
 .controller('RTIpagectrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage ) {
	
$scope.orgID = "100";
$scope.empID = "9996";
	 
	 
	 
	 $scope.RTIpagedemo = function()
	 {
		 $state.go("app.RTIpageform1");
	 }
	 
	 $scope.RTIpage = function()
	 {
		
		 $ionicLoading.show({ template: 'Loading...' });
		 
		 RestService.RTIgetsupportlist($scope.orgID,$scope.empID).then(function (getsupportlistdata){
			 
			 console.log("getsupportlistdata-->"+JSON.stringify(getsupportlistdata));
			 
			 $scope.responsemsg = getsupportlistdata.errorMsg;
			 console.log("$scope.responsemsg--"+$scope.responsemsg);
			 
			 if($scope.responsemsg == "NA")
				 {
				 	$scope.rtiSupportList = getsupportlistdata;
				 	console.log("rtiSupportListTemp-->"+JSON.stringify($scope.rtiSupportList));
				 	$localStorage.RTISupportList = $scope.rtiSupportList;
				 }
			 
			 $ionicLoading.hide();
			 $state.go("app.RTIpageform1");
			 
		 },function (err){
			 alert("Something went wrong!!");
			 $ionicLoading.hide();
		 })
		 
	 };
	 
	  $scope.TRFprefix = function(){ 
			  RestService.prefixHdataTRF($scope.orgid).then(function (getprefixdataresponseTRF) {
				  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
				$scope.trfoptions = new Array();
				    for(var i=0;i<getprefixdataresponseTRF.length;i++){	
							$scope.trfoptions.push({
							trfid : getprefixdataresponseTRF[i].lookUpId,
							trfvalue : getprefixdataresponseTRF[i].descLangFirst,
							trfname : getprefixdataresponseTRF[i].descLangFirst
					   })
				    }
				},function (err) { 
				})
		  };
	 
	 var _init = function (){
  
    };
    _init();
  });
