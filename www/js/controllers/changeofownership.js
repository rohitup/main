angular.module('starter')

  .controller('ChangeofOwnerShipCtrl', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties) {
	  $scope.orgid = sharedProperties.getorgID();
	  
	 // $scope.waterBillSearch = false;
	  
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
	  
	  $scope.show = 1;
	  
	  $scope.TRFprefix = function(){  
		
		  RestService.prefixHdataTRF($scope.orgid).then(function (getprefixdataresponseTRF) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			  
			$scope.trfoptions = new Array();
			    for(var i=0;i<getprefixdataresponseTRF.length;i++){	
						$scope.trfoptions.push({
						trfid : getprefixdataresponseTRF[i].lookUpId,
						trfvalue : getprefixdataresponseTRF[i].descLangFirst,
						trfname : getprefixdataresponseTRF[i].descLangFirst
				   })
				   $scope.prefix = getprefixdataresponseTRF[i].lookUpId;
			    }
			},function (err) { 
//				$ionicLoading.hide();
			})
	  };

	  $scope.Genprefix = function(){ 
		  RestService.retriveNonHDataGEN($scope.orgid).then(function (getprefixdataresponsegen) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponsegen);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.genoptions = new Array();
			    for(var i=0;i<getprefixdataresponsegen.length;i++){	
						$scope.genoptions.push({
						genid : getprefixdataresponsegen[i].lookUpId,
						genname : getprefixdataresponsegen[i].descLangFirst
				   })
			    } 
			},function (err) { 
				//$ionicLoading.hide();
			})
	  };
	  
	  $scope.ttlprefix = function(){ 
		  RestService.retriveNonHDataTTL($scope.orgid).then(function (getprefixdataresponsettl) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponsettl);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.ttloptions = new Array();
			    for(var i=0;i<getprefixdataresponsettl.length;i++){	
						$scope.ttloptions.push({
						ttlid : getprefixdataresponsettl[i].lookUpId,
						ttlname : getprefixdataresponsettl[i].descLangFirst
				   })
			    } 
			},function (err) { 
				//$ionicLoading.hide();
			})
	  };
	
	  $scope.TFMprefix = function(){ 
		  RestService.retriveNonHDataTFM($scope.orgid).then(function (TFMresponse) {
			  console.log("TFMresponse=="+TFMresponse);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.tfmoptions = new Array();
			    for(var i=0;i<TFMresponse.length;i++){	
						$scope.tfmoptions.push({
						tfmid : TFMresponse[i].lookUpId,
						tfmname : TFMresponse[i].descLangFirst
				   })
			    } 
			},function (err) { 
				//$ionicLoading.hide();
			})
	  };
		
		$scope.imageuplod11 = function($file){
			
			  alert("working");
			  var verfy = document.getElementById('verfiyFile').files[0];  
			  $scope.selectfilename = verfy.name;
			   console.log("name=----"+$scope.selectfilename);
			   alert("name=----"+$scope.selectfilename);
			  var reader = new FileReader();
			  reader.onload = function(e){
			    console.log("about to encode");
			    $scope.encoded_file = btoa(e.target.result.toString());  
			
			    alert("encoded byte--"+$scope.encoded_file);
			  };
//			  reader.readAsArrayBuffer($file);
			  reader.readAsBinaryString(verfy);
		  };
		  
		  $scope.searchchangeowner1 = function() {
			  $scope.show = 2;
		  }
		  
	  $scope.searchchangeowner = function() {
		  if(!$scope.changeowner == ""){
				$ionicLoading.show({
					template: 'Loading...'
				});
				
				RestService.changeofownerservice($scope.changeowner,$scope.orgid).then(function (ownerresponse){
					if(ownerresponse.canApplyOrNot == "Y"){
					
					console.log("ownerresponse---"+ownerresponse);
					
					$scope.oldCOWconnName = ownerresponse.oldOwnerFullName;
					$scope.oldtitle = ownerresponse.cooOtitle;
					$scope.oldconnNo = ownerresponse.connectionNumber;
					$scope.oldcsidn = ownerresponse.conId;
					$scope.oldCOUconnSize = ownerresponse.conSize;
					$scope.oldcodDwzid1 = ownerresponse.codDwzid1;
					$scope.oldcodDwzid2 = ownerresponse.codDwzid2;
					$scope.oldCOUtarifCate = ownerresponse.trmGroup1;
					$scope.oldCOUpermiseType = ownerresponse.trmGroup2;
					$scope.oldCOUmetertype = ownerresponse.meterType;
					$scope.oldCOUapplicantType = ownerresponse.applicantType;
					
					 RestService.retriveNonHDataCSZ($scope.orgid).then(function (getprefixdataresponsecsz) {
						  console.log("getprefixdataresponseTRF=="+getprefixdataresponsecsz);
						$scope.cszoptions = new Array();
						    for(var i=0;i<getprefixdataresponsecsz.length;i++){	
									$scope.cszoptions.push({
									cszid : getprefixdataresponsecsz[i].lookUpId,
									cszvalue : getprefixdataresponsecsz[i].descLangFirst,
									cszname : getprefixdataresponsecsz[i].descLangFirst
							   })
						    } 
						    $("#cszoptions").val(oldCOUconnSize).change();
						   },function (err) { 
							   $ionicLoading.hide();
						})
						
					   RestService.prefixHdataTRF($scope.orgid).then(function (getprefixdataresponseTRF) {
							  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
							$scope.trfoptions = new Array();
							    for(var i=0;i<getprefixdataresponseTRF.length;i++){	
										$scope.trfoptions.push({
										trfid : getprefixdataresponseTRF[i].lookUpId,
										trfvalue : getprefixdataresponseTRF[i].descLangFirst,
										trfname : getprefixdataresponseTRF[i].descLangFirst
								   })
								   $scope.prefix = getprefixdataresponseTRF[i].lookUpId;
							    }
							    $("#trfoptions").val(oldCOUtarifCate).change();
							},function (err) { 
							})
							
							RestService.prefixHdatapremise($scope.orgid).then(function (prefixdataresponsepermise) {
							  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
							$scope.permiseoptions = new Array();
							    for(var i=0;i<prefixdataresponsepermise.length;i++){	
										$scope.permiseoptions.push({
										permiseid : prefixdataresponsepermise[i].lookUpId,
										permisevalue : prefixdataresponsepermise[i].descLangFirst,
										permisename : prefixdataresponsepermise[i].descLangFirst
								   })
								   $scope.prefix = prefixdataresponsepermise[i].lookUpId;
							    }
							    $("#permiseoptions").val(oldCOUpermiseType).change();
							},function (err) { 
							})
					
					$scope.show = 2;
					$ionicLoading.hide();
				}else{
					
					$scope.applyornot = ownerresponse.canApplyOrNot;
					alert($scope.applyornot);
					$ionicLoading.hide();
				}
					
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
				
		  }else{alert ("Please Enter Valid Connection Number");}
	  };
	  
	/*  $scope.confrmproceed = function() {
		  $scope.show = 3;
	  }*/

	  
$scope.confrmproceed = function(){
		
		  $scope.newtransfermode;
		  var sel = document.getElementById("TFMname");
		  TFMtext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);
//		  alert(sel.options[sel.selectedIndex].text);
		  
		  $scope.oldCOUtarifCate;
		  console.log("oldCOUtarifCate--"+$scope.oldCOUtarifCate);
		  var sel = document.getElementById("oldtarifcos");
		  costariftext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);
//		  alert("tarif---"+costariftext);

		  $scope.oldCOUpermiseType;
		  console.log("oldCOUpermiseType--"+$scope.oldCOUpermiseType);
		  var sel = document.getElementById("oldpermisecos");
		  cospermisetext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);
//		  alert("tarif---"+cospermisetext);
		  
		  
			  $scope.checklist ='';
			  
		    	$ionicLoading.show({
						template: 'Loading...'
					});
				RestService.COSgetinitializedmodel().then(function (responsedata){
					console.log("resposeaayaainitial--"+responsedata); 
//					alert("resposeaayaainitial.wsStatus--"+responsedata.wsStatus)

					if(responsedata.wsStatus == "success"){

								$scope.orgId = responsedata.responseObj[0].orgId;
								$scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
								$scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
								$scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
								$scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
								$scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
								$scope.factor1 = responsedata.responseObj[0].factor1;
								$scope.factor2 = responsedata.responseObj[0].factor2;
								$scope.factor3 = responsedata.responseObj[0].factor3;
								$scope.factor4 = responsedata.responseObj[0].factor4;
								$scope.isBPL = responsedata.responseObj[0].isBPL;
								$scope.noOfDays = responsedata.responseObj[0].noOfDays;
								$scope.serviceCode = responsedata.responseObj[0].serviceCode;
								$scope.deptCode = responsedata.responseObj[0].deptCode;
								$scope.applicantType = responsedata.responseObj[0].applicantType;
								$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
								$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
								$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
								$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
								
								/*water rate master*/
								
								$scope.wrorgId = responsedata.responseObj[1].orgId;
								$scope.wrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
								$scope.wrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
								$scope.wrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
								$scope.wrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
								$scope.wrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
								$scope.wrfactor1 = responsedata.responseObj[1].factor1;
								$scope.wrfactor2 = responsedata.responseObj[1].factor2;
								$scope.wrfactor3 = responsedata.responseObj[1].factor3;
								$scope.wrfactor4 = responsedata.responseObj[1].factor4;
								$scope.wrisBPL = responsedata.responseObj[1].isBPL;
								$scope.wrServiceCode = responsedata.responseObj[1].serviceCode;
								$scope.wrDeptCode = responsedata.responseObj[1].deptCode;
								$scope.wrTaxType = responsedata.responseObj[1].taxType;
								$scope.wrTaxCode = responsedata.responseObj[1].taxCode;
								$scope.wrTaxCate = responsedata.responseObj[1].taxCategory;
								$scope.wrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
								$scope.wrMeterType = responsedata.responseObj[1].meterType;
								$scope.wrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
								$scope.wrConnSize = responsedata.responseObj[1].connectionSize;
								$scope.wrConnType = responsedata.responseObj[1].connectionType;
								$scope.wrRoadType = responsedata.responseObj[1].roadType;
								$scope.wrtransferMode = responsedata.responseObj[1].transferMode;
								$scope.wrDisConnType = responsedata.responseObj[1].disConnectionType;
								$scope.wrRatestartDate = responsedata.responseObj[1].rateStartDate;
					  	}	
					else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							}  
				},function (err) { 
				//	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
				
				
			RestService.COSchecklistcall(costariftext,cospermisetext,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
				$scope.isOutStandingPending,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,$scope.disConnectionType,
				$scope.factor1,$scope.factor2,$scope.factor3,$scope.factor4,$scope.orgid).then(function (responsechecklistdata){
				console.log("responsechecklistdata--"+responsechecklistdata);
//				alert("responsechecklistdata.wsStatus--"+responsechecklistdata.wsStatus);
				if(responsechecklistdata.wsStatus == "success"){
					
					$ionicLoading.show({
						template: 'Loading...'
					});
					
					/*$scope.documentlist = responsechecklistdata.responseObj;
					console.log("documentlist ::: "+$scope.documentlist);
					
					var i = 0;

					for (; i < $scope.documentlist.length; i++) {
						$scope.documentlist[i].index = i;
						documentID = $scope.documentlist[i].documentId;
						alert("documentID--->"+documentID);
					}*/
							
					  $scope.subjects = responsechecklistdata.responseObj;
					  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//					  alert("subjects ::: "+JSON.stringify($scope.subjects));
					  
					  $scope.docsitems = [];
					  var tempvar = '<tr>'+
//						'<th class="head" width="100%" colspan="2"><div align="center">Upload Document</div></th>'+
						'<th style="width: 40%;">Sr.No</th>'+
						'<th>DocID</th>'+
						'<th>Description</th>'+
						'<th>Mandatory</th>'+
						'<th>Upload Doc</th>'+
						'</tr>';
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
					            docMandatory: $scope.subjects[i].checkkMANDATORY
							   }
							$scope.docsitems.push(docdata);
//							alert("docdata-->"+JSON.stringify(docdata));
						tempvar = tempvar +
						'<tr id="'+$scope.subjects[i].documentId+'">'+
						'<td><span>'+$scope.subjects[i].documentSerialNo+'</span></td>'+
						'<td><span>'+$scope.subjects[i].documentId+'</span></td>'+
						'<td><span>'+$scope.subjects[i].doc_DESC_ENGL+'</span></td>'+
						'<td><span>'+$scope.subjects[i].checkkMANDATORY+'</span></td>'+
						'<td><input type="file" class="filecss " id="'+ $scope.subjects[i].documentId +'" ng-model="COUdocupload" onchange="angular.element(this).scope().imageupload(this)"/></td>'+
						'</tr>';
					 }
						
						var tempvar = '<table class="gridtable">'+tempvar+'</table>';
						ownerdoctable = ownerdoctable+tempvar;
						document.getElementById('OwnerDocData').innerHTML =	ownerdoctable;
				
					  RestService.COSsetdepentparams($scope.orgid).then(function (setdependresponse) {
						  console.log("setdependresponse=="+setdependresponse);
						  if(setdependresponse.wsStatus == "success"){
						  $scope.TaxType = setdependresponse.responseObj[0].taxType;
						  $scope.TaxCode = setdependresponse.responseObj[0].taxCode;
						  $scope.TaxCategory = setdependresponse.responseObj[0].taxCategory;
						  $scope.TaxSubcategory = setdependresponse.responseObj[0].taxSubCategory;
						  $scope.show = 3;
						 $ionicLoading.hide();
					  }
					else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						}
					  },function (err) { 
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
	  
	  
$scope.documentObjectArray	=	new Array();  
var verfy;

$scope.imageupload = function(fileObject){
				 
		 var idValue	=	fileObject.getAttribute("id");
		 verfy  = fileObject.files[0];
		
		var reader = new FileReader();
		reader.onload = function(e){
		console.log("about to encode");
		$scope.encoded_file = window.btoa(e.target.result.toString());  
		console.log("encoded byte--"+$scope.encoded_file);
		
		for(var k=0;k<$scope.subjects.length;k++)
		{
			var documentObject	=
			{   
					attachmentId: $scope.subjects[k].attachmentId,
					documentId: $scope.subjects[k].documentId,
					documentName: $scope.subjects[k].documentName,
					documentSerialNo: $scope.subjects[k].documentSerialNo,
					descriptionType: $scope.subjects[k].descriptionType,
					documentType: $scope.subjects[k].documentType, 
					doc_DESC_Mar: $scope.subjects[k].doc_DESC_Mar,
					doc_DESC_ENGL: $scope.subjects[k].doc_DESC_ENGL,
					documentByteCode: $scope.subjects[k].documentByteCode,
					checkkMANDATORY: $scope.subjects[k].checkkMANDATORY		
	   };
//			alert("$scope.subjects[k].documentId-"+$scope.subjects[k].documentId);
			
			if($scope.subjects[k].documentId==idValue)
			{
				documentObject.documentId = $scope.subjects[k].documentId;
				documentObject.documentName	=	verfy.name;
				documentObject.documentSerialNo = $scope.subjects[k].documentSerialNo;
			    documentObject.doc_DESC_Mar = $scope.subjects[k].doc_DESC_Mar;
			    documentObject.doc_DESC_ENGL = $scope.subjects[k].doc_DESC_ENGL;
			    documentObject.documentByteCode	=	$scope.encoded_file;
			    documentObject.checkkMANDATORY = $scope.subjects[k].checkkMANDATORY;
			}
			 $scope.documentObjectArray.push(documentObject);
		}
		console.log("encoded byte--"+JSON.stringify($scope.documentObjectArray));
//		alert("encoded byte--"+JSON.stringify($scope.documentObjectArray));
//		 $scope.documentObjectArray.push(documentObject);
		 
	 };
		reader.readAsBinaryString(verfy);
	};  
		
		  
 $scope.uploaddocuments = function() {
	  
	  var sel = document.getElementById("oldconnsize");
	  cosconnsizetext= sel.options[sel.selectedIndex].text;
	  console.log(sel.options[sel.selectedIndex].text);
	  
	$scope.couwrNewRatestartDate= new Date().getTime();
				 $ionicLoading.show({
						template: 'Loading...'
					});
				 console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
	 RestService.COSservicecharge(TFMtext,costariftext,cospermisetext,$scope.wrusageSubtype3,$scope.wrusageSubtype4,$scope.wrusageSubtype5,
			 $scope.wrConnType,$scope.wrRoadType,$scope.wrDisConnType,$scope.wrfactor1,$scope.wrfactor2,$scope.wrfactor3,$scope.wrfactor4,
			 $scope.TaxType,$scope.TaxCode,$scope.TaxCategory,$scope.TaxSubcategory,
			 $scope.couwrNewRatestartDate,cosconnsizetext,$scope.orgid).then(function (responseservicechargedata) {
//				alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
				if(responseservicechargedata.wsStatus == "success"){
					$scope.COSFlatRate = responseservicechargedata.responseObj[0].flatRate;
//					alert("$scope.COSFlatRate.--"+$scope.COSFlatRate)
						 RestService.getPayOpt($scope.orgid).then(function (response) {
								console.log("dash==="+response);
								
								$scope.options = new Array();
							    for(var i=0;i<response.list.length;i++){							
										$scope.options.push({
										id : response.list[i].bankId,
										name : response.list[i].cbbankname
								    })
							    }
								$ionicLoading.hide();
							}, function (err) {
								$ionicLoading.hide();
							})
						 $scope.show = 4;
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
	  
		  
$scope.changeownersavedata = function() {
	$ionicLoading.show({		
		template: 'Loading...'		
			});
	console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
	
		RestService.changeofownersaveservice($scope.WNCselecttitle,$scope.WNCFirstname,$scope.WNCMiddlename,$scope.WNCLastname,
			$scope.COURemarks,$scope.changeowner,$scope.WNCgender,$scope.oldCOWconnName,$scope.oldtitle,$scope.oldconnNo,$scope.oldcsidn,
			$scope.oldCOUconnSize,$scope.oldcodDwzid1,$scope.oldcodDwzid2,$scope.oldCOUtarifCate,$scope.oldCOUpermiseType,
			$scope.oldCOUmetertype,$scope.oldCOUapplicantType,$scope.newtransfermode,$scope.documentObjectArray).then(function(COWresponse){
			
						 console.log("COUresponse=="+COWresponse);
						 alert("COUresponse.status---"+COWresponse.status)
						 if(COWresponse.status == "success"){
							 alert("Your application for change of ownership has been saved successfully.");
							 $state.go("app.home");
							 $ionicLoading.hide();
						  }
						  else{
							  alert("not working---");
								$ionicLoading.hide();
						  }
						},function (err) { 
							alert("something");
							$ionicLoading.hide();
					})
		 };	  
		  
		  
	  
	  /*  $scope.onFileSelect = function($file){
	  alert("working");
	  var reader = new FileReader();
	  reader.onload = function(e){
	    console.log("about to encode");
	    $scope.encoded_file = btoa(e.target.result.toString());  
	    alert("encoded byte--"+$scope.encoded_file);
	  };
	  reader.readAsBinaryString($file);
	};
	*/
  
//  var fd = new FormData(document.forms.namedItem("fileinfo"));
//  fd.append('file', verificationFileObject.files[0]);
	  
  })
