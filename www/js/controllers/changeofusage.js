angular.module('starter')

  .controller('ChangeofUsageCtrl', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster, 
		  $filter, ENV, dateFilter, $state, sharedProperties) {
/*declare start*/
	  $scope.orgid = sharedProperties.getorgID();
	  $scope.userID = sharedProperties.getuserID();
	  
	  $scope.custinfo;
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
	  $scope.oldCOUconnSize;
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;
	  
	  /*water rate master*/
	 	$scope.couwrorgId;
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
		$scope.WNCConnSize;
		$scope.couTaxType;
		$scope.couTaxCode;
		$scope.couTaxCategory;
		$scope.couTaxSubcategory;
		$scope.COUFlatRate;
		$scope.subjects;
	  
/*declare end*/	  
	  
	  $scope.show = 1;
	  
	  $scope.searchchangeusages1 = function() {$scope.show = 2;}
	  $scope.confrmproceed1 = function() {$scope.show = 3;}
	  $scope.uploaddocuments1 = function() {$scope.show = 4;}

	  $scope.searchchangeusages = function() {
		  if(!$scope.changeusages == ""){
				$ionicLoading.show({
					template: 'Loading...'
				});
				RestService.changeusageservice($scope.changeusages,$scope.orgid).then(function (usageresponse) {
//					if(response.status == "S"){
						$scope.custinfo = usageresponse.customerInfoDTO;
						//alert("$scope.custinfo--"+$scope.custinfo);
					
						/* search data from getconn service start  */
						
						$scope.csidn = $scope.custinfo.csIdn;
						$scope.connNo = $scope.custinfo.csCcn;
						var fname = $scope.custinfo.csName;
						var Mname = $scope.custinfo.csMname;
						var Lname = $scope.custinfo.csLname;
						var res = fname.concat(Mname).concat(Lname);
						$scope.COUconnName = res;
						$scope.COUconnSize = $scope.custinfo.csCcnsize;
						$scope.COUtarifCate = $scope.custinfo.trmGroup1;
						$scope.COUpermiseType = $scope.custinfo.trmGroup2;
						$scope.appltitle = $scope.custinfo.csTitle;
						$scope.applFName = $scope.custinfo.csName;
						$scope.applMname = $scope.custinfo.csMname;
						$scope.applLname = $scope.custinfo.csLname;
						$scope.appladdress = $scope.custinfo.csAdd;
						$scope.applRoadname = $scope.custinfo.csRdcross;
						$scope.applmobileno = $scope.custinfo.csContactno;
						
						$scope.applConntype = $scope.custinfo.csCcntype;
						$scope.applnoofUsers = $scope.custinfo.csNoofusers;
						$scope.applConnsize = $scope.custinfo.csCcnsize;
						$scope.applnoofTaps = $scope.custinfo.csNooftaps;
						$scope.applmeterread = $scope.custinfo.csMeteredccn;
						$scope.applListatus = $scope.custinfo.csListatus;
						$scope.applDwzid1 = $scope.custinfo.codDwzid1;
						$scope.applDwzid2 = $scope.custinfo.codDwzid2;
						$scope.applcategory1 = $scope.custinfo.csCcncategory1;
						$scope.applbplflag = $scope.custinfo.bplFlag;
						$scope.applbplno = $scope.custinfo.bplNo;
						
						/* search data from getconn service ended */
						
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
								    $("#cszoptions").val(COUconnSize).change();
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
									    $("#trfoptions").val(COUtarifCate).change();
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
									    $("#permiseoptions").val(COUpermiseType).change();
									},function (err) { 
									})
						 $scope.show = 2;
					$ionicLoading.hide();
				}, function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
			}
			else { alert ("Please Enter Valid Connection Number"); }
	  }
	  
/*new details*/  

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
	
	  $scope.selectAction = function() {
		    console.log($scope.newCOUtarifnew);
		    $scope.$watch('newCOUtarifnew', function(newVal) {
		            RestService.prefixHdatapremise($scope.orgid).then(function (prefixdataresponsepermise) {
					console.log("prefixdataresponsepermise---"+prefixdataresponsepermise);
					  
					$scope.permiseoptions1 = new Array();
					    for(var i=0;i<prefixdataresponsepermise.length;i++)
					    	if(prefixdataresponsepermise[i].lookUpParentId == $scope.newCOUtarifnew)
					    	{
					    	 console.log("prefixdataresponsepermise=="+prefixdataresponsepermise[i]);
								$scope.permiseoptions1.push({
								permiseid1 : prefixdataresponsepermise[i].lookUpId,
								permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
								permisename1 : prefixdataresponsepermise[i].descLangFirst
						   })
					    }
					},function (err) { 
				})
		    });
	  	};
	
  		$scope.selectpermise = function() {
		    console.log($scope.newCOUpermise);
//		    alert("permise---"+$scope.newCOUpermise);
		};

$scope.confrmproceed = function() {
		  $scope.newCOUtarifnew;
		  console.log("newCOUtarifnew--"+$scope.newCOUtarifnew);
		  var sel = document.getElementById("NCOutarif");
		  coutariftext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);
//		  alert("tarif---"+coutariftext);

		  $scope.newCOUpermise;
		  console.log("newCOUpermise--"+$scope.newCOUpermise);
		  var sel = document.getElementById("NCOUpermise");
		  coupermisetext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);
//		  alert("permise---"+coupermisetext);

		  $scope.COURemarks;
		  console.log("COURemarks--"+$scope.COURemarks);
		  
		  $scope.checklist ='';
		  
	    	$ionicLoading.show({
					template: 'Loading...'
				});
			RestService.COUgetinitializedmodel().then(function (responsedata){
				console.log("COUresposeaayaainitial--"+responsedata); 
//				alert("COUresposeaayaainitial.wsStatus--"+responsedata.wsStatus)

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
							
							$scope.couwrorgId = responsedata.responseObj[1].orgId;
							$scope.couwrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
							$scope.couwrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
							$scope.couwrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
							$scope.couwrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
							$scope.couwrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
							$scope.couwrfactor1 = responsedata.responseObj[1].factor1;
							$scope.couwrfactor2 = responsedata.responseObj[1].factor2;
							$scope.couwrfactor3 = responsedata.responseObj[1].factor3;
							$scope.couwrfactor4 = responsedata.responseObj[1].factor4;
							$scope.couwrisBPL = responsedata.responseObj[1].isBPL;
							$scope.couwrServiceCode = responsedata.responseObj[1].serviceCode;
							$scope.couwrDeptCode = responsedata.responseObj[1].deptCode;
							$scope.couwrTaxType = responsedata.responseObj[1].taxType;
							$scope.couwrTaxCode = responsedata.responseObj[1].taxCode;
							$scope.couwrTaxCate = responsedata.responseObj[1].taxCategory;
							$scope.couwrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
							$scope.couwrMeterType = responsedata.responseObj[1].meterType;
							$scope.couwrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
							$scope.couwrConnSize = responsedata.responseObj[1].connectionSize;
							$scope.couwrConnType = responsedata.responseObj[1].connectionType;
							$scope.couwrRoadType = responsedata.responseObj[1].roadType;
							$scope.couwrtransferMode = responsedata.responseObj[1].transferMode;
							$scope.couwrDisConnType = responsedata.responseObj[1].disConnectionType;
							$scope.couwrRatestartDate = responsedata.responseObj[1].rateStartDate;
				  	}	                                                                                                                                                                                                                                                                                                                                                                                       
				else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					}  
			},function (err) { 
			//	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
			
		RestService.COUchecklistcall(coutariftext,coupermisetext,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.isOutStandingPending,
		    $scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,$scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
		    $scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			console.log("responsechecklistdata--"+responsechecklistdata);
//			alert("COUresponsechecklistdata.wsStatus--"+responsechecklistdata.wsStatus);
			if(responsechecklistdata.wsStatus == "success"){
			  
			  $scope.subjects = responsechecklistdata.responseObj;
			  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//			  alert("subjects ::: "+JSON.stringify($scope.subjects));
			  
			  $scope.docsitems = [];
			  var tempvar = '<tr>'+
//				'<th class="head" width="100%" colspan="2"><div align="center">Upload Document</div></th>'+
				'<th style="width: 40%;">Sr.No</th>'+
				'<th>DocID</th>'+
				'<th>Description</th>'+
				'<th>Mandatory</th>'+
				'<th>Upload Doc</th>'+
				'</tr>';
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
			            docMandatory: $scope.subjects[i].checkkMANDATORY
					   }
					$scope.docsitems.push(docdata);
//					alert("docdata-->"+JSON.stringify(docdata));
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
				usagedoctable = usagedoctable+tempvar;
				document.getElementById('UsageDocData').innerHTML =	usagedoctable;
				
			 
				  RestService.COUsetdepentparams($scope.orgid).then(function (setdependresponse){
					  console.log("setdependresponse=="+setdependresponse);
					  if(setdependresponse.wsStatus == "success"){
						  $scope.couTaxType = setdependresponse.responseObj[0].taxType;
						  $scope.couTaxCode = setdependresponse.responseObj[0].taxCode;
						  $scope.couTaxCategory = setdependresponse.responseObj[0].taxCategory;
						  $scope.couTaxSubcategory = setdependresponse.responseObj[0].taxSubCategory;
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
	  
	  
$scope.uploaddocuments = function() {
	$scope.couwrNewRatestartDate= new Date().getTime();
	 $ionicLoading.show({
			template: 'Loading...'
		});
	console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
//	alert("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
			 
   RestService.COUservicecharge($scope.couTaxType,$scope.couTaxCode,$scope.couTaxCategory,coutariftext,coupermisetext,
		$scope.couwrusageSubtype3,$scope.couwrusageSubtype4,$scope.couwrusageSubtype5,$scope.couwrNewRatestartDate,
		$scope.couwrConnType,$scope.couwrRoadType,$scope.couwrtransferMode,$scope.couwrDisConnType,$scope.couwrfactor1,
		$scope.couwrfactor2,$scope.couwrfactor3,$scope.couwrfactor4,$scope.orgid).then(function (responseservicechargedata) {
//		alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
		if(responseservicechargedata.wsStatus == "success"){
			$scope.COUFlatRate = responseservicechargedata.responseObj[0].flatRate;
			 
			 RestService.getPayOpt($scope.orgid).then(function (response) {
					console.log("dash==="+response);
//					alert("dash==="+response);
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
	  
$scope.COUsavedata = function(){
	$ionicLoading.show({
		template: 'Loading...'
	});
//	alert("$scope.subjects-->"+$scope.subjects);
//	$scope.subjects
	console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
	
		
	RestService.COUsaveservice($scope.applFName,$scope.applMname,$scope.applLname,$scope.applmobileno,$scope.appltitle,
			$scope.appladdress,$scope.COUpaidamt,$scope.csidn,$scope.applRoadname,$scope.connNo,$scope.applConnsize,
			$scope.COURemarks,$scope.COUtarifCate,$scope.COUpermiseType,$scope.newCOUtarifnew,
			$scope.newCOUpermise,$scope.orgid,$scope.userID,$scope.documentObjectArray).then(function(COUresponse){
			  console.log("COUresponse=="+COUresponse);
//			 alert("COUresponse.status---"+COUresponse.status)
			  if(COUresponse.status == "success"){
				  
				  
				 alert("Successfully done...");
				 $state.go("app.home");
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
//		alert("$scope.subjects[k].documentId-"+$scope.subjects[k].documentId);
		
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
//	alert("encoded byte--"+JSON.stringify($scope.documentObjectArray));
//	 $scope.documentObjectArray.push(documentObject);
	 
 };
	reader.readAsBinaryString(verfy);
};  
			  
	  
  })
