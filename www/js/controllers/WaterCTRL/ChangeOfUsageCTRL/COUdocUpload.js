angular.module('starter')

  .controller('COUdocUploadCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage) {
/*declare start*/
	  
	  var arrayListTest	=	new Array();

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		
		$localStorage.Lock	= 0;
		$localStorage.TempArray;
	/*$scope.custinfo;
	  $scope.connNo;
	  $scope.fname;
	  $scope.Mname;
	  $scope.Lname;
	  $scope.COUconnName;
	  $scope.COUconnSize;
	  $scope.COUtarifCate;
	  $scope.COUpermiseType;
	  $scope.newCOUtarifnew;
	  $scope.appltitle;
	  $scope.applFName;
	  $scope.applMname;
	  $scope.applLname;
	  $scope.appladdress;
	  $scope.applRoadname;
	  $scope.applmobileno;
	  $scope.applConntype;
	  $scope.applnoofUsers;
	  $scope.applConnsize;
	  $scope.applnoofTaps;
	  $scope.applmeterread;
	  $scope.applListatus;
	  $scope.applDwzid1;
	  $scope.applDwzid2;
	  $scope.applcategory1;
	  $scope.applbplflag;
	  $scope.applbplno;
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.isOutStandingPending;
	  $scope.isExistingConnectionOrConsumerNo
	  $scope.isExistingProperty;
	  $scope.disConnectionType;
	  $scope.factor1;
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;
	  $scope.oldCOWconnName;
	  $scope.oldCOWadharName;
	  $scope.oldCOUtarifCate;
	  $scope.oldCOUpermiseType;
	  $scope.oldCOUconnSize;*/
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;
	  
	  /*water rate master*/
	 	/*$scope.couwrorgId;
		$scope.couwrusageSubtype1;
		$scope.couwrusageSubtype2;
		$scope.couwrusageSubtype3;
		$scope.couwrusageSubtype4;
		$scope.couwrusageSubtype5;
		$scope.couwrfactor1;
		$scope.couwrfactor2;
		$scope.couwrfactor3;
		$scope.couwrfactor4;
		$scope.couwrisBPL;
		$scope.couwrServiceCode;
		$scope.couwrDeptCode;
		$scope.couwrTaxType;
		$scope.couwrTaxCode;
		$scope.couwrTaxCate;
		$scope.couwrTaxSubCate;
		$scope.couwrMeterType;
		$scope.couwrChargeAppl;
		$scope.couwrConnSize;
		$scope.couwrConnType;
		$scope.couwrRoadType;
		$scope.couwrtransferMode;
		$scope.couwrDisConnType;
		$scope.couwrRatestartDate;
		$scope.couwrNewRatestartDate;
//		$scope.WNCConnSize;
		$scope.couTaxType;
		$scope.couTaxCode;
		$scope.couTaxCategory;
		$scope.couTaxSubcategory;
		$scope.COUFlatRate;*/
		$scope.subjects;
	  
/*declare end*/	  

	  
/*new details*/  
		
	  $scope.subjects = $localStorage.responsechecklistdata.responseObj;
	  console.log("subjects ::: "+JSON.stringify($scope.subjects));
	  
	  $scope.docsitems = [];

	  var usagedoctable = "";
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
		
$scope.uploaddocuments = function() {
	
	console.log("arrayListTest---"+JSON.stringify(arrayListTest));
	if(arrayListTest.length>0)
	for(var i = 0; i < arrayListTest.length; i++)
	{
		if(arrayListTest[i].checkkMANDATORY == "Y")
		{
			if(arrayListTest[i].documentByteCode ==	null)
			{
				alert("Please Upload Mandatory Documents.");
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
	
	$localStorage.couwrNewRatestartDate= new Date().getTime();
	 $ionicLoading.show({
			template: 'Loading...'
		});
	
   RestService.servicecharge(
		   $localStorage.serviceCode,
		   $localStorage.deptCode,
		    $localStorage.coutariftext,
		    $localStorage.coupermisetext,
		    $localStorage.couwrusageSubtype3,
		    $localStorage.couwrusageSubtype4,
			$localStorage.couwrusageSubtype5,
			$localStorage.applmeterread,
			$localStorage.couwrConnType,
			$localStorage.applbplflag,
			$localStorage.couwrRoadType,
			$localStorage.couwrtransferMode,
			$localStorage.couwrDisConnType,
			$localStorage.couwrfactor1,
			$localStorage.couwrfactor2,
			$localStorage.couwrfactor3,
			$localStorage.couwrfactor4,
			$localStorage.couTaxType,
			$localStorage.couTaxCode,
			$localStorage.couTaxCategory,
			$localStorage.couTaxSubcategory,
			$localStorage.chargeApplicableAt,
			$localStorage.couwrConnSize,
			$localStorage.couwrNewRatestartDate,
			$scope.orgid).then(function (responseservicechargedata) {
//		alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
		if(responseservicechargedata.wsStatus == "success"){
			
			$localStorage.responseservicechargedata = responseservicechargedata;
			
			$scope.COUFlatRate = responseservicechargedata.responseObj[0].flatRate;
			 
			RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
				console.log("dash==="+response);
				if(response.status =="success"){
					$localStorage.Bankresponse = response;
					$ionicLoading.hide();
					$state.go("app.COUpay");
				}else{
					return false;
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
//			alert("Problem occurred while processing to find Checklist");	
			toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			$ionicLoading.hide();
		     })
	  };
	  
  })
