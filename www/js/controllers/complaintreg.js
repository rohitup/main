angular.module('starter')

.directive('myMaxlength', function() {
	  return {
	    require: 'ngModel',
	    link: function (scope, element, attrs, ngModelCtrl) {
	      var maxlength = Number(attrs.myMaxlength);
	      function fromUser(text) {
	          if (text.length > maxlength) {
	            var transformedInput = text.substring(0, maxlength);
	            ngModelCtrl.$setViewValue(transformedInput);
	            ngModelCtrl.$render();
	            return transformedInput;
	          } 
	          return text;
	      }
	      ngModelCtrl.$parsers.push(fromUser);
	    }
	  }; 
	})

.directive('restrictInput', [function(){

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var ele = element[0];
                var regex = RegExp(attrs.restrictInput);
                var value = ele.value;

                ele.addEventListener('keyup',function(e){
                    if (regex.test(ele.value)){
                        value = ele.value;
                    }else{
                        ele.value = value;
                    }
                });
            }
        };
    }])   

.directive('numbersOnly', function(){
       return {
         require: 'ngModel',
         link: function(scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function (inputValue) {

           if(parseInt(inputValue) <= 6 && parseInt(inputValue) >= 0){
             modelCtrl.$setValidity('numbersOnly', true);
             return inputValue;
           } else {
             modelCtrl.$setValidity('numbersOnly', false);
             return modelCtrl.$modelValue;
           }

       });
     }
   };
})
    
 .controller('ComplaintCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {

	$scope.orgid = sharedProperties.getorgID();
	$scope.userID = sharedProperties.getuserID();
	
	$scope.onlyNumbers = /^\d+$/;
	/*care details*/
	$scope.NewCompDeptdetails;
	$scope.NewCompPincode;
	$scope.NewCompType;
	$scope.NewCompDescription;
	$scope.NewCompLocation;
	$scope.NewCompLandmark;

/*	
$scope.keyPress = function(){
		var ttt	;
		var pin = document.getElementById("pincodeno").value;
		alert(pin);
		alert("pin.length--"+pin.length);
		if(pin.length <= 6)
			{ 
			ttt= pin;
			alert("ggg");
			return true;}
		else
		{	
			 document.getElementById("pincodeno").value = pin;
			return false; } 
	}
	*/

$scope.content = "first";
$scope.tokennumber = "123456";
$scope.complaintype = "Pipeline leakage";
$scope.compldesc = "Complaint Description";
	
$scope.deptartmmentperfix = function(){ 
	 $ionicLoading.show({
			template: 'Loading...'
		});
		RestService.deptprefix().then(function (response) {
				  $scope.deptresponse = response;
				  console.log("$scope.resdept111--"+JSON.stringify($scope.deptresponse));
			    	$scope.deptoptions = new Array();
				    for(var i=0;i<$scope.deptresponse.length;i++){  
							$scope.deptoptions.push({
							deptid : $scope.deptresponse[i].department.dpDeptid,
							deptname : $scope.deptresponse[i].department.dpDeptdesc
					   })
				    } $ionicLoading.hide();
				},function (err) { 
					alert("err function call");
					$ionicLoading.hide();
				})
		  };
		  
 $scope.selectAction = function() {
		console.log($scope.NewCompDeptdetails);
		$scope.$watch('NewCompDeptdetails', function(newVal) {
			RestService.finddeptcompltype($scope.NewCompDeptdetails).then(function (complsubtyperesponse) {
				console.log("complsubtyperesponse>->-"+JSON.stringify(complsubtyperesponse));
				$scope.compresponse = complsubtyperesponse;
//				alert("$scope.compresponse-->"+$scope.compresponse);
				$scope.deptcompltype = $scope.compresponse.complaintTypes;
				$scope.compltypeoption = new Array();
					for(var i=0;i<$scope.deptcompltype.length;i++){
						$scope.compltypeoption.push({
						comptypeID : $scope.deptcompltype[i].compId,
						comptypeDesc : $scope.deptcompltype[i].complaintDesc
							})
						 }
					},function (err) { 
				})
		    });
 		};		  
		  
		  
 $scope.locationperfix = function(){ 
	 $ionicLoading.show({
			template: 'Loading...'
		});
	 
	 $scope.NewCompPincode;
	 console.log("$scope.NewCompPincode---"+$scope.NewCompPincode);
	 
				RestService.pincodeprefix($scope.NewCompPincode).then(function (response) {
						  console.log("deptprefixresponselocation-->"+JSON.stringify(response));
						$scope.locationoptions = new Array();
						    for(var i=0;i<response.length;i++){	
									$scope.locationoptions.push({
									locationid : response[i].locationId,
									locationname : response[i].locationName
							   })
						    }
						    $ionicLoading.hide();
						},function (err) { 
							alert("err function call");
							$ionicLoading.hide();
						})
		 };	  
		  
/*				  
$scope.pincode = function() {
	 $ionicLoading.show({
			template: 'Loading...'
		});
	 console.log("$scope.NewCompPincode---"+$scope.NewCompPincode);
		$scope.$watch('NewCompPincode', function(newVal) {
	
			RestService.pincodeprefix().then(function (response) {
				 $ionicLoading.hide();
				  console.log("deptprefixresponselocation-->"+JSON.stringify(response));
				 alert("deptprefixresponselocation-->"+JSON.stringify(response));
				$scope.locationoptions = new Array();
				    for(var i=0;i<response.length;i++){	
							$scope.locationoptions.push({
							locationid : response[i].locationId,
							locationname : response[i].locationName
					   })
				    } $ionicLoading.hide();
				},function (err) { 
					 $ionicLoading.hide();
					alert("err function call");
				})
		});
	};			  
		*/		  
				  
	$scope.savecomplaint = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
	
		console.log("$scope.compresponse-->"+JSON.stringify($scope.compresponse));
		
	RestService.lodgecomplaintsave($scope.NewCompPincode,$scope.NewCompType,$scope.NewCompDescription,
			$scope.NewCompLocation,$scope.NewCompLandmark,$scope.encoded_file,$scope.compresponse).then(function(complaintresponse){
				  console.log("COUresponse=="+complaintresponse);
				  if(complaintresponse.response == "Success"){
					 alert("Successfully Save...");
					  
					 $scope.ResposeData = complaintresponse.responseData;
					 $scope.receipttoken = $scope.ResposeData.requestNo;
					 $scope.ResposecareApplicantDetails = complaintresponse.document.careApplicantDetails;
					 $scope.receiptapplname = $scope.ResposecareApplicantDetails.applicantFirstName;
					 $scope.ResposecareDetails = complaintresponse.document.careDetails;
					 $scope.receiptcompdept = $scope.ResposecareDetails.departmentComplaint.dpDeptdesc
					 $scope.receiptcomplainttype = $scope.ResposecareDetails.complaintType;
					 $scope.receiptlocation = $scope.ResposecareDetails.location;
					 $scope.receiptdescrition =  $scope.ResposecareDetails.description;
					 
					 alert(" $scope.receiptcompdept-->"+ $scope.receiptcompdept);
					 
					 $scope.IsHidden = $scope.IsHidden ? false : true;
					 
					 $scope.show = 2;
//					$state.go("app.citizencomplreceipt");complaintType
					 $ionicLoading.hide();
				  }
				  else{
					  alert("not working---");
						$ionicLoading.hide();
				  }
				},function (err) { 
					$ionicLoading.hide();
			})
		
	};	  

$scope.imageupload = function($file){
		var verfy =  document.getElementById('verfiyFile').files[0];  
		$scope.selectfilename = verfy.name;
		console.log("name=----"+$scope.selectfilename);
		var reader = new FileReader();
		reader.onload = function(e){
		console.log("about to encode");
		$scope.encoded_file = window.btoa(e.target.result.toString());  
		console.log("encoded byte--"+$scope.encoded_file);
	 };
		reader.readAsBinaryString(verfy);
	};  
		
	
    var _init = function (){
  
    };
    _init();
  });
