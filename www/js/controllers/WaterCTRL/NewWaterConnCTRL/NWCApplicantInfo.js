angular.module('starter')

  .controller('NewWaterconnInfoCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage,$rootScope) {
	  $scope.data_ = {};
	
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
		  $scope.twelveLimitInput = function()
		  {
		  	var mobileno = document.getElementById("adharNO").value;
		  	var inputVal = mobileno;
		  	    var numericReg = /^[0-9]{1,12}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>12) 
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("adharNO").value = inputValSlice;
		  	    }
		  }

		  $scope.tenLimitInputBpl = function()
		  {
		  	var mobileno = document.getElementById("mobileno").value;
		  	var inputVal = mobileno;
		  	    var numericReg = /^[0-9]{1,10}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>10) 
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("mobileno").value = inputValSlice;
		  	    }
		  }
		  
		  $scope.sixteenLimitBpl = function()
		  {
		  	var bplNumber = document.getElementById("bplNumber").value;
		  	var inputVal = bplNumber;
		  	    var numericReg = /^[A-Za-z0-9/s,.'-@]{1,16}$/;
		  	    if(!numericReg.test(inputVal) || inputVal.length>16) 
		  	    {
		  	    	inputVal.slice(0,-1);
		  	    	var inputValSlice = inputVal.slice(0,-1);
		  	    	document.getElementById("bplNumber").value = inputValSlice;
		  	    }
		  }
		  
		  $scope.permttemp = {};
	        $scope.permttemp = [
	            { value: "P", label: "Permanent" }
	            ,
	            { value: "T", label: "Temporary" }
	        ];
	        $scope.WNCtemporary = $scope.permttemp[0].value;	
	        
		  $scope.bpldata = {};
	        $scope.bpldata = [
	            { value: "Y", label: "Yes" }
	            ,
	            { value: "N", label: "No" }
	        ];
	        $scope.WNCBpl = $scope.bpldata[1].value;
/*prefix data start*/
	        $scope.aptoptions = new Array();
		    for(var i=0;i<$localStorage.response.length;i++){	
				$scope.aptoptions.push({
				aptid : $localStorage.response[i].lookUpId,
				aptvalue: $localStorage.response[i].descLangFirst,
				aptname : $localStorage.response[i].descLangFirst
			   })
		    } 
			   /* $scope.WWZoptions = new Array();
			    for(var i=0;i<$localStorage.responseWWZ.length;i++){	
						$scope.WWZoptions.push({
						wwzid : $localStorage.responseWWZ[i].lookUpId,
						wwzname : $localStorage.responseWWZ[i].descLangFirst
				   })
			    } */
			    
			 $scope.selectzone= function(){ 
					  console.log($scope.WNCZone);
					  $scope.$watch('WNCZone', function(newVal) {
						  var lookUpCode = "WWZ";
						  var level = "2";
				            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (resposeward) {
							  console.log("resposeward=="+resposeward);
							$scope.wardoptions = new Array();
							    for(var i=0;i<resposeward.length;i++)
							    	if(resposeward[i].lookUpParentId == $scope.WNCZone)
							    	{
							    	 console.log("resposeward=="+resposeward[i]);
										$scope.wardoptions.push({
										wardid : resposeward[i].lookUpId,
										wardname : resposeward[i].descLangFirst
								   })
							    }
							},function (err){ 
						})
				    });
				};
			    
		/*if($localStorage.WNCwaterconn == "Y")
				{*/
//					 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
					  $scope.WNCselecttitle = $localStorage.responselogindata.title;
//					  $("#ttloptions").val($scope.WNCselecttitle).change();
					  $localStorage.WNCselecttitle = $scope.WNCselecttitle;
					  $scope.WNCFirstname = $localStorage.responselogindata.firstName;
					  $localStorage.WNCFirstname = $scope.WNCFirstname;
					  $scope.WNCMiddlename = $localStorage.responselogindata.middleName;
					  $localStorage.WNCMiddlename = $scope.WNCMiddlename;
					  $scope.WNCLastname = $localStorage.responselogindata.lastName;
					  $localStorage.WNCLastname = $scope.WNCLastname;
					  $scope.WNCgender = $rootScope.fullGender($localStorage.responselogindata.gender);
					

					  $localStorage.WNCgender = $scope.WNCgender;
					  $scope.WNCmobile = $localStorage.responselogindata.mobileNo;
					  $localStorage.WNCmobile = $scope.WNCmobile;
					  $scope.WNCemailid = $localStorage.responselogindata.emailId;
					  $localStorage.WNCemailid = $scope.WNCemailid;
					  $scope.WNCaadharnumber = $localStorage.responselogindata.addhaarNo;
					  $localStorage.WNCaadharnumber = $scope.WNCaadharnumber;
					  $localStorage.WNCBpl =  $scope.WNCBpl;
					  $scope.WNCbplno = $localStorage.responselogindata;
					  $localStorage.WNCbplno = $scope.WNCbplno;
					  
					  /*$scope.genoptions = new Array();
						if($localStorage.getprefixdataresponsegen == undefined){
							return false;
						}else
						    for(var i=0;i<$localStorage.getprefixdataresponsegen.length;i++){	
									$scope.genoptions.push({
									genid : $localStorage.getprefixdataresponsegen[i].lookUpCode,
									genname : $localStorage.getprefixdataresponsegen[i].descLangFirst
							   })
						    } */
						
						/*$scope.ttloptions = new Array();
						    for(var i=0;i<$localStorage.getprefixdataresponsettl.length;i++){	
									$scope.ttloptions.push({
									ttlid : $localStorage.getprefixdataresponsettl[i].lookUpId,
									ttlname : $localStorage.getprefixdataresponsettl[i].descLangFirst
							   })
						    } */
						    
						  
//						    $("#ttloptions").val($scope.WNCselecttitle).change();
					  
	   /*prefix data end*/  
	  
$scope.applicantinfo = function() {
	var mobileno1 = document.getElementById("mobileno").value;
	var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if(/^\s|\s$/.test(mobileno1) || !(/^[0-9]{1,10}$/.test(mobileno1)) || mobileno1.length != 10)
	{
		alert("Please Enter a Valid Mobile Number");
		return;
	}
	 if($scope.WNCemailid!="" || $scope.WNCemailid!=undefined || $scope.WNCemailid!=null )
	{
		var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(!emailRegex.test($scope.WNCemailid)) 
			{
				alert("Please Enter a Valid Email Address");
			  	return;
			 }
		 }
	 
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
	 
				  $scope.WNCselecttitle; 
				  $localStorage.WNCselecttitle = $scope.WNCselecttitle;
				  $scope.WNCFirstname;
				  $localStorage.WNCFirstname = $scope.WNCFirstname;
				  $scope.WNCMiddlename;
				  $localStorage.WNCMiddlename = $scope.WNCMiddlename;
				  $scope.WNCLastname;
				  $localStorage.WNCLastname = $scope.WNCLastname;
				  $scope.WNCgender;
				  $localStorage.WNCgender = $scope.WNCgender;
				  $scope.WNCmobile;
				  $localStorage.WNCmobile = $scope.WNCmobile;
				  $scope.WNCemailid;
				  $localStorage.WNCemailid = $scope.WNCemailid;
				  $scope.WNCaadharnumber;
				  $localStorage.WNCaadharnumber = $scope.WNCaadharnumber;
				  $scope.WNCBpl;
				  $localStorage.WNCBpl = $scope.WNCBpl;
				  $scope.data_.WNCbplno;
				  $localStorage.WNCbplno = $scope.data_.WNCbplno;
				  $scope.WNCZone;
				  $localStorage.WNCZone = $scope.WNCZone;
				  $scope.WNCWard;
				  $localStorage.WNCWard =  $scope.WNCWard;
		  
				$state.go("app.NWCApplicantAddress");
	  };
	  
	  
	var init_ = function()
	{
		var lookUpCode = "GEN";
		 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsegen) {
			  console.log("getprefixdataresponsegen=="+getprefixdataresponsegen);
			  if(getprefixdataresponsegen==undefined || getprefixdataresponsegen == null || getprefixdataresponsegen=="")
			  {
			  	 return false;
			  }
			  else
			  {
				  $localStorage.getprefixdataresponsegen = getprefixdataresponsegen;
				  $scope.genoptions = new Array();
					    for(var i=0;i<$localStorage.getprefixdataresponsegen.length;i++){	
								$scope.genoptions.push({
								genid : $localStorage.getprefixdataresponsegen[i].lookUpCode,
								genname : $localStorage.getprefixdataresponsegen[i].descLangFirst
						   })
					    } 
//					  $state.go("app.NWCApplicantInfo");
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
			  	 return false;
			  }
			  else
			  {
				  $localStorage.getprefixdataresponsettl = getprefixdataresponsettl;
				  $scope.ttloptions = new Array();
				    for(var i=0;i<$localStorage.getprefixdataresponsettl.length;i++){	
							$scope.ttloptions.push({
							ttlid : $localStorage.getprefixdataresponsettl[i].lookUpId,
							ttlname : $localStorage.getprefixdataresponsettl[i].descLangFirst
					   })
				    } 
//					  $state.go("app.NWCApplicantInfo");
				  $ionicLoading.hide();
			  }
			
			},function (err) { 
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
			
			 var lookUpCode = "WWZ";
		     var level = "1";
		  	RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (responseWWZ) {
				  console.log("getprefixdataresponsettl=="+responseWWZ);
				  if(responseWWZ==undefined || responseWWZ == null || responseWWZ=="")
				  {
				  	 return false;
				  }
				  else
				  {
					  $localStorage.responseWWZ = responseWWZ; $scope.WWZoptions = new Array();
					    for(var i=0;i<$localStorage.responseWWZ.length;i++){	
							$scope.WWZoptions.push({
							wwzid : $localStorage.responseWWZ[i].lookUpId,
							wwzname : $localStorage.responseWWZ[i].descLangFirst
					   })
				    } 
					  
					  $ionicLoading.hide();
				  }
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					$ionicLoading.hide();
				})
	}
	init_();
  }) /*controler ends*/
  
