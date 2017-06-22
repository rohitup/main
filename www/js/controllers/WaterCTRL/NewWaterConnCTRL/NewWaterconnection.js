angular.module('starter')

  .controller('NewWaterconnCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage) {
	  $scope.data_ = {};
	
	  $scope.WNCtemporary;
		var tempTest = 0;
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  
		 $scope.changeAttr = function(item){
				if($scope.data_.WNCfromdate == "" || $scope.data_.WNCfromdate == null || $scope.data_.WNCfromdate == undefined )
					item.currentTarget.setAttribute("placeholder","From Date");
				else item.currentTarget.setAttribute("placeholder","");
			} 
		  $scope.tochangeAttr = function(item){
				if($scope.data_.WNCtodate == "" || $scope.data_.WNCtodate == null || $scope.data_.WNCtodate == undefined )
					item.currentTarget.setAttribute("placeholder","To Date");
				else item.currentTarget.setAttribute("placeholder","");
			}

		   $scope.permttemp = {};
	        $scope.permttemp = [
	            { value: "P", label: "Permanent" }
	            ,
	            { value: "T", label: "Temporary" }
	        ];
	        $scope.WNCtemporary = $scope.permttemp[0].value;	
/*prefix data start*/
		 $scope.aptoptions = new Array();
		    for(var i=0;i<$localStorage.response.length;i++){	
				$scope.aptoptions.push({
				aptid : $localStorage.response[i].lookUpId,
				aptvalue: $localStorage.response[i].descLangFirst,
				aptname : $localStorage.response[i].descLangFirst
			   })
		    } 

		  
	 $scope.newwaterconn = function() { 
				 
		  /*$scope.WNCwaterconn;
		  $localStorage.WNCwaterconn = $scope.WNCwaterconn;*/
		  $scope.WNCapplicantype;
		  $localStorage.WNCapplicantype = $scope.WNCapplicantype;
		  var sel = document.getElementById("apltype");
		  apptypetext= sel.options[sel.selectedIndex].text;
		  $localStorage.apptypetext = apptypetext;

		  $scope.data_.WNCorgname;
		  $localStorage.WNCorgname = $scope.data_.WNCorgname;
		  
		  $scope.WNCtemporary;
		  $localStorage.WNCtemporary = $scope.WNCtemporary;
		  $scope.data_.WNCfromdate;
		  $localStorage.WNCfromdate = $scope.data_.WNCfromdate;
		  $scope.data_.WNCtodate;
		  $localStorage.WNCtodate = $scope.data_.WNCtodate;
		
		  $ionicLoading.show({
				template: 'Loading...'
			});
			
			var lookUpCode = "GEN";
			 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsegen) {
				  console.log("getprefixdataresponsegen=="+getprefixdataresponsegen);
				  if(getprefixdataresponsegen==undefined || getprefixdataresponsegen == null || getprefixdataresponsegen=="")
				  {
					  tempTest	=	1;
				  	 return false;
				  }
				  else
				  {
					  $localStorage.getprefixdataresponsegen = getprefixdataresponsegen;
					  if(tempTest==0)
//						  $state.go("app.NWCApplicantInfo");
					  $ionicLoading.hide();
				  }
				  				  
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})
		 
				var lookUpCode = "TTL";
		  	RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsettl) {
				  console.log("getprefixdataresponsettl=="+getprefixdataresponsettl);
				  if(getprefixdataresponsettl==undefined || getprefixdataresponsettl == null || getprefixdataresponsettl=="")
				  {
					  tempTest	=	1;
				  	 return false;
				  }
				  else
				  {
					  $localStorage.getprefixdataresponsettl = getprefixdataresponsettl;
					  if(tempTest==0)
						  $state.go("app.NWCApplicantInfo");
					  $ionicLoading.hide();
				  }
				
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})
		
	  }; 
	  
	
	  var _init = function ()
	  { 
		  
		  var lookUpCode = "WWZ";
		  var level = "1";
		  	RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (responseWWZ) {
				  console.log("getprefixdataresponsettl=="+responseWWZ);
				  if(responseWWZ==undefined || responseWWZ == null || responseWWZ=="")
				  {
					  tempTest	=	1;
				  	 return false;
				  }
				  else
				  {
					  $localStorage.responseWWZ = responseWWZ;
					  if(tempTest==0)
					  $ionicLoading.hide();
				  }
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})  
	     }
	  
 _init();  
  
  }) /*controler ends*/
  
