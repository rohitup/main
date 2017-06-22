angular.module('starter')

  .controller('NewWaterconnUploadDocCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage) {
	  
	 /* $scope.orgid = "81";
	  $scope.userID = "1";*/
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		
		var arrayListTest	=	new Array();

		$localStorage.Lock	= 0;
		$localStorage.TempArray	;
		  $scope.checklist ='';
		  $scope.WNCtarif;
		  $scope.WNCpermise;
		  $scope.WNCapplicantype;
		  $scope.WNCexistconsumerdetail;
		  $scope.WNCexistproperty;
		  $scope.WNCBpl;
		  $scope.settemp;
		  $scope.usageSubtype3;
		  $scope.usageSubtype4;
		  $scope.usageSubtype5;
		  $scope.noOfDays;
		  $scope.isOutStandingPending;
		  $scope.disConnectionType;
		  $scope.factor1; 
		  $scope.factor2;
		  $scope.factor3;
		  $scope.factor4;
	  
	  var apptypetext;
	  var tariftext;
	  var permisetext;
	 
	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
		$scope.selectfilename;
	

console.log("$localStorage.responsechecklistdata--"+JSON.stringify($localStorage.responsechecklistdata));
	$scope.subjects = $localStorage.responsechecklistdata.responseObj;
		  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//		  alert("subjects ::: "+JSON.stringify($scope.subjects));
		  
		  $scope.docsitems = [];

		  var newconndoctable = "";
			for (var i = 0; i < $scope.subjects.length; i++) {
				
				var docdata = {   
				    attactID: $scope.subjects[i].attachmentId,
		            docID: $scope.subjects[i].documentId,
		            docName: $scope.subjects[i].documentName,
		            docSerialNo: $scope.subjects[i].documentSerialNo,
		            docDescType: $scope.subjects[i].descriptionType,
		            docType: $scope.subjects[i].documentType, 
		            docDescMar: $scope.subjects[i].doc_DESC_Mar,
		            docDesceng: $scope.subjects[i].doc_DESC_ENGL,
		            docByteCode: $scope.subjects[i].documentByteCode,
		            docMandatory: fullmandatory($scope.subjects[i].checkkMANDATORY)
				   }
				$scope.docsitems.push(docdata);
		 }
		
	  var verfy;

	  $scope.imageupload = function(fileObject){
	  				 
		  var reader = new FileReader();
			var idValue	=	fileObject.getAttribute("id");
			verfy  = fileObject.files[0];
			var maxSize = 1000000;
		    var fileSize = verfy.size;
			
			var ext = fileObject.value.split('.').pop();
			if(ext){
		    	if(ext == "pdf" || ext == "docx" || ext == "doc"){
		        }
		    	else{
		    		fileObject.value = "";
		        	alert('Only pdf, doc, docx extension file(s) allowed.');
		            $('#iDivBusyLoad').hide();
		            return;
		    	}
		    }else{
		    	alert("Please uplaod a valid verification document");
		    	$('#iDivBusyLoad').hide();
		    	return;
		    }
		    if(fileSize > maxSize){
		    	fileObject.value = "";
		        alert('File Size Must Not Be Greater Than 1 MB');
		        $('#iDivBusyLoad').hide();
		        return;
		    }
	  		reader.onload = function(e){
	  		console.log("about to encode");
	  		$scope.encoded_file = window.btoa(e.target.result.toString());
//	  		$scope.encoded_file = "ASDD";
	  		
	  		for(var k=0;k<$scope.subjects.length;k++)
	  		{
	  			var documentObject	=
	  				{  
	  					attachmentId: $scope.subjects[k].attachmentId,
	  					documentId: $scope.subjects[k].documentId,
	  					documentName: null,
	  					documentSerialNo: $scope.subjects[k].documentSerialNo,
	  					descriptionType: $scope.subjects[k].descriptionType,
	  					documentType: $scope.subjects[k].documentType, 
	  					doc_DESC_Mar: $scope.subjects[k].doc_DESC_Mar,
	  					doc_DESC_ENGL: $scope.subjects[k].doc_DESC_ENGL,
	  					documentByteCode: null,
	  					checkkMANDATORY: $scope.subjects[k].checkkMANDATORY		
	  				};
	  			
	  			if($localStorage.Lock== 0)
				{
					if($scope.subjects[k].documentId == idValue)
					{
						documentObject.documentName		=	verfy.name;
						documentObject.documentByteCode	=	$scope.encoded_file;
					}
					arrayListTest.push(documentObject);
					if((k+1)==$scope.subjects.length)
					{
						$localStorage.Lock = 1;
					}
				}
	  			else
				{
					 for (var l=0; l <arrayListTest.length; l++) {
					        if (arrayListTest[l].documentId == idValue && $scope.subjects[k].documentId == idValue) 
					        {
					        	arrayListTest[l].documentName		=	verfy.name;
					        	arrayListTest[l].documentSerialNo 	= 	$scope.subjects[k].documentSerialNo;
					        	arrayListTest[l].doc_DESC_Mar 		=	$scope.subjects[k].doc_DESC_Mar;
					        	arrayListTest[l].doc_DESC_ENGL 		=	$scope.subjects[k].doc_DESC_ENGL;
					        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
					        	arrayListTest[l].checkkMANDATORY 	= 	$scope.subjects[k].checkkMANDATORY;
					        }
					    }
				}
	  			
	  		}
	  		console.log("Final $localStorage.TempArray-----"+JSON.stringify(arrayListTest));
	  	 };
	  		reader.readAsBinaryString(verfy);
	  	};  
	  
	  	
$scope.uploadattch = function() {
		 
	console.log("arrayListTest---"+JSON.stringify(arrayListTest));
			if(arrayListTest.length>0)
			for(var i = 0; i < arrayListTest.length; i++)
			{
				if(arrayListTest[i].checkkMANDATORY == "Y")
				{
					if(arrayListTest[i].documentByteCode ==	null)
					{
						alert("Please Upload Mandatory Document.");
						return false;
					}
					else
					{
						$localStorage.documentObjectArray	=	arrayListTest;
					}
				}
			}
			else
			{
				alert("Please Upload Mandatory Documents.");
				return false;
			}
		  
		  $scope.wrNewRatestartDate= new Date().getTime();
		
		  	console.log("UPLOAD documentObjectArray---"+JSON.stringify($localStorage.documentObjectArray));
			
		  	 $ionicLoading.show({template: 'Loading...'});
		  
		    RestService.servicecharge($localStorage.serviceCode,
		    	  $localStorage.deptCode,
				  $localStorage.tariftext,
				  $localStorage.permisetext,
				  $localStorage.wrusageSubtype3,
				  $localStorage.wrusageSubtype4,
				  $localStorage.wrusageSubtype5,
				  $localStorage.wrMeterType,
				  $localStorage.wrConnType,
				  $localStorage.WNCBpl,
				  $localStorage.wrRoadType,
				  $localStorage.wrtransferMode,
				  $localStorage.wrDisConnType,
				  $localStorage.wrfactor1,
				  $localStorage.wrfactor2,
				  $localStorage.wrfactor3,
				  $localStorage.wrfactor4,
				  $localStorage.TaxType,
				  $localStorage.TaxCode,
				  $localStorage.TaxCategory,
				  $localStorage.TaxSubcategory,
				  $localStorage.chargeApplicableAt,
				  $localStorage.selconSizetext,
				  $scope.wrNewRatestartDate,$scope.orgid)
				  .then(function (responseservicechargedata){
				console.log("responseservicechargedata--"+JSON.stringify(responseservicechargedata));
				if(responseservicechargedata.wsStatus == "success"){
					$localStorage.responseservicechargedata = responseservicechargedata;
					
					RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
						console.log("dash==="+response);
						if(response.status == "success"){
						$localStorage.Bankresponse = response;
						$ionicLoading.hide();
							$state.go("app.NWCpay");
						}else{
							return false;
							$ionicLoading.hide();
						}
						$ionicLoading.hide();
					}, function (err) {
						$ionicLoading.hide();
					})
					 $ionicLoading.hide();
					}	
					else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						}  
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
					$ionicLoading.hide();
				})
	  };
	
  }) /*controler ends*/
  
