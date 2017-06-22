angular.module('starter')

  .controller('COdocUploadCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties,$localStorage) {
	 /* $scope.orgid = "81";
	  $scope.userID = "1"; */
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	  /*$scope.orgid = "81";
		$scope.userID = "1";
		$scope.loginUSername = "2";
		$scope.LoginMobileNo = "2";*/
	  
	  var arrayListTest	=	new Array();
	  $localStorage.Lock	= 0;
	  $localStorage.TempArray;
		
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
		var cosconnsizetext;
		var costariftext;
		var cospermisetext;
		$scope.selectfilename;
		$scope.newtransfermode;
		/*old data*/
		$scope.oldCOWconnName;
		$scope.oldtitle;
		$scope.oldconnNo;
		$scope.oldcsidn;
		$scope.oldCOUconnSize;
		$scope.oldcodDwzid1;
		$scope.oldcodDwzid2;
		$scope.oldCOUtarifCate;
		$scope.oldCOUpermiseType;
		$scope.oldCOUmetertype;
		$scope.oldCOUapplicantType;

		
		$scope.subjects = $localStorage.responsechecklistdata.responseObj;
					  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//					  alert("subjects ::: "+JSON.stringify($scope.subjects));
					  
					  $scope.docsitems = [];
					  /*var tempvar = '<tr>'+
//						'<th class="head" width="100%" colspan="2"><div align="center">Upload Document</div></th>'+
						'<th style="width: 40%;">Sr.No</th>'+
						'<th>DocID</th>'+
						'<th>Description</th>'+
						'<th>Mandatory</th>'+
						'<th>Upload Doc</th>'+
						'</tr>';*/
					  var ownerdoctable = "";
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
//							alert("docdata-->"+JSON.stringify(docdata));
						/*tempvar = tempvar +
						'<tr id="'+$scope.subjects[i].documentId+'">'+
						'<td><span>'+$scope.subjects[i].documentSerialNo+'</span></td>'+
						'<td><span>'+$scope.subjects[i].documentId+'</span></td>'+
						'<td><span>'+$scope.subjects[i].doc_DESC_ENGL+'</span></td>'+
						'<td><span>'+fullmandatory($scope.subjects[i].checkkMANDATORY)+'</span></td>'+
						'<td><input type="file" class="filecss " id="'+ $scope.subjects[i].documentId +'" ng-model="COUdocupload" onchange="angular.element(this).scope().imageupload(this)"/></td>'+
						'</tr>';*/
					 }
						
		
var verfy;

$scope.imageupload = function(fileObject){
	var reader = new FileReader();
	var idValue	=	fileObject.getAttribute("id");
	verfy  = fileObject.files[0];
	var maxSize = 1000000;
    var fileSize = verfy.size;
	
	var ext = fileObject.value.split('.').pop();
	/*if(ext){
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
    }*/
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
	$scope.couwrNewRatestartDate= new Date().getTime();
				 $ionicLoading.show({
						template: 'Loading...'
					});
				 console.log("documentObjectArray---"+JSON.stringify($localStorage.documentObjectArray));
/*	 RestService.COSservicecharge($localStorage.TFMtext,$localStorage.costariftext,$localStorage.cospermisetext,$localStorage.wrusageSubtype3,$localStorage.wrusageSubtype4,$localStorage.wrusageSubtype5,
			 $localStorage.wrConnType,$localStorage.wrRoadType,$localStorage.wrDisConnType,$localStorage.wrfactor1,$localStorage.wrfactor2,$localStorage.wrfactor3,$localStorage.wrfactor4,
			 $localStorage.TaxType,$localStorage.TaxCode,$localStorage.TaxCategory,$localStorage.TaxSubcategory,
			 $scope.couwrNewRatestartDate,$localStorage.cosconnsizetext,$scope.orgid).then(function (responseservicechargedata) {*/

					
				    RestService.servicecharge($localStorage.serviceCode,
				    	$localStorage.deptCode,
						  $localStorage.costariftext,
						  $localStorage.cospermisetext,
						  $localStorage.wrusageSubtype3,
						  $localStorage.wrusageSubtype4,
						  $localStorage.wrusageSubtype5,
						  $localStorage.applmeterread,
						  $localStorage.wrConnType,
						  $localStorage.WNCBpl,
						  $localStorage.wrRoadType,
						  $localStorage.TFMtext,
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
						  $localStorage.oldCOUconnSize,
						  $scope.couwrNewRatestartDate,$scope.orgid)
						 .then(function (responseservicechargedata){		 
				 
				 if(responseservicechargedata.wsStatus == "success"){
					
					$localStorage.responseservicechargedata = responseservicechargedata;
					
					RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
						console.log("dash==="+response);
						$localStorage.Bankresponse = response;
					$ionicLoading.hide();
						}, function (err) {	$ionicLoading.hide();	})
						 $state.go("app.COpay");
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
	  

  })
