angular.module('starter')

.controller('ChecklistUploadCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter, $state, sharedProperties,$localStorage, $sessionStorage) {
	var arrayListTest	=	new Array();

	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.userID = $localStorage.responselogindata.userId;
	
	$localStorage.Lock	= 0;
	$localStorage.TempArray;
	
	var coupermisetext;
	var coutariftext;
	var actiondetails;
	$scope.COUpaidamt;
	$scope.subjects = $localStorage.checklistResponse.responseObj;
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

	/*File Upload*/
	var verfy;
	$scope.imageupload = function(fileObject){
		var reader = new FileReader();
		var idValue	=	fileObject.getAttribute("id");
		verfy  = fileObject.files[0];
		var maxSize = fileObject.getAttribute('data-max-size');
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
	$scope.uploaddocuments = function(){
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
		
		
		$ionicLoading.show();
		var brmsServiceChargeInput = JSON.parse($stateParams.serviceChargeInput);
		console.log("brmsServiceCharge: "+JSON.stringify(brmsServiceChargeInput));
		RestService.brmsServiceCharge(brmsServiceChargeInput)
		.then(function(serviceChargeResponse) {
			console.log("serviceChargeResponse: "+JSON.stringify(serviceChargeResponse));
			if(serviceChargeResponse.wsStatus == "success"){

				var scResponse = serviceChargeResponse.responseObj;
				$sessionStorage.rnlFinalAmount = 0;
				for(var i=0; i<scResponse.length;i++){
					$sessionStorage.rnlFinalAmount += scResponse[i].flatRate;
				}
	
				RestService.getPayOpt($scope.orgId,$scope.userID)
				.then(function(response){
					console.log("getPayOpt response: "+JSON.stringify(response));
					if(response.status =="success"){
						$sessionStorage.pgList = response.list;
						$ionicLoading.hide();
						$state.go("app.paymentPage");
					}else{
						return false;
					}
					$ionicLoading.hide();
				}, function(err){
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
					$ionicLoading.hide();
				})
			$ionicLoading.hide();
			}	
			else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			}
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			$ionicLoading.hide();
		})
	};
})
