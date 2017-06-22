angular.module('starter')

  .controller('newWaterconnCtrl', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage) {
	  
	  
	  $scope.orgid = sharedProperties.getorgID();
//	  $scope.UserId = sharedProperties.getuserID();
	  $scope.userID = sharedProperties.getuserID();
	  
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
		  
		$scope.show = 1;
	  	  
/*prefix data start*/
		
$scope.commoncall = function(a){
console.log("commoncall--"+a);
//ng-click="commoncall('APT')"
RestService.commonRetriveNonHData(a).then(function (response) {
console.log("retriveHData---"+response);
$scope.aptoptions = new Array();
for(var i=0;i<response.length;i++){	
$scope.aptoptions.push({
aptid : response[i].lookUpId,
aptvalue: response[i].descLangFirst,
aptname : response[i].descLangFirst
})
} $ionicLoading.hide();
}, function (err) {
toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
$ionicLoading.hide();
})
};	

$scope.appltype = function(){
 RestService.retriveNonHDataAPT($scope.orgid).then(function (response) {
	 console.log("retriveHData---"+response);
	$scope.aptoptions = new Array();
	    for(var i=0;i<response.length;i++){	
			$scope.aptoptions.push({
			aptid : response[i].lookUpId,
			aptvalue: response[i].descLangFirst,
			aptname : response[i].descLangFirst
		   })
	    } $ionicLoading.hide();
	}, function (err) {
		toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
		$ionicLoading.hide();
	})
};
	  
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
			    } 
			},function (err) { 
				//$ionicLoading.hide();
			})
	  };
	  
	$scope.selecttariff= function(){ 
		  console.log($scope.WNCtarif);
//		 alert($scope.WNCtarif);
		  $scope.$watch('WNCtarif', function(newVal) {
	            RestService.prefixHdatapremise($scope.orgid).then(function (prefixdataresponsepermise) {
				  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
				  
				$scope.permiseoptions1 = new Array();
				    for(var i=0;i<prefixdataresponsepermise.length;i++)
				    	if(prefixdataresponsepermise[i].lookUpParentId == $scope.WNCtarif)
				    	{
				    	 console.log("prefixdataresponsepermise=="+prefixdataresponsepermise[i]);
							$scope.permiseoptions1.push({
							permiseid1 : prefixdataresponsepermise[i].lookUpId,
							permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
							permisename1 : prefixdataresponsepermise[i].descLangFirst
					   })
				    }
				},function (err){ 
			})
	    });
	};
	
	$scope.selectpermise1 = function(){
			console.log($scope.WNCpermise);
	}  
	  
   $scope.CCGprefix = function(){ 
		  RestService.prefixHdataCCG($scope.orgid).then(function (getprefixdataresponseCCG) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponseCCG);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.ccgoptions = new Array();
			    for(var i=0;i<getprefixdataresponseCCG.length;i++){	
						$scope.ccgoptions.push({
						ccgid : getprefixdataresponseCCG[i].lookUpId,
						ccgname : getprefixdataresponseCCG[i].descLangFirst
				   })
			    } 
			},function (err) { 
			//$ionicLoading.hide();
			})
	  };
	  
  $scope.cszprefix = function(){ 
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
			},function (err) { 
				//$ionicLoading.hide();
			})
	  };
	  
	  $scope.Genprefix = function(){ 
		  RestService.retriveNonHDataGEN($scope.orgid).then(function (getprefixdataresponsegen) {
			  console.log("getprefixdataresponseTRF=="+getprefixdataresponsegen);
			 		//alert("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			$scope.genoptions = new Array();
			    for(var i=0;i<getprefixdataresponsegen.length;i++){	
						$scope.genoptions.push({
						genid : getprefixdataresponsegen[i].lookUpCode,
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
	   /*prefix data end*/  
	  
	  $scope.newwaterconn = function() { 
		  $scope.WNCwaterconn;
		  console.log("wncwaterconn--"+$scope.WNCwaterconn);
		  $scope.WNCapplicantype;
		  console.log("WNCapplicantype--"+$scope.WNCapplicantype);
		  var sel = document.getElementById("apltype");
		  apptypetext= sel.options[sel.selectedIndex].text;
		  console.log(sel.options[sel.selectedIndex].text);

		  $scope.WNCorgname;
		  console.log("WNCorgname--"+$scope.WNCorgname);
		  $scope.WNCtemporary;
		  console.log("wnctempconn---"+$scope.WNCtemporary);
		  $scope.WNCfromdate;
		  console.log("WNCfromdate---"+$scope.WNCfromdate);
		  $scope.WNCtodate;
		  console.log("WNCtodate---"+$scope.WNCtodate);
		  
		  $scope.show = 2;
	  }; 
	  
	  $scope.applicantinfo = function() {
		  $scope.WNCselecttitle; 
		  console.log("WNCselecttitle---"+$scope.WNCselecttitle);
		  $scope.WNCFirstname;
		  console.log("WNCFirstname-=-"+$scope.WNCFirstname);
		  $scope.WNCMiddlename;
		  console.log("WNCMiddlename---"+$scope.WNCMiddlename);
		  $scope.WNCLastname;
		  console.log("WNCLastname---"+$scope.WNCLastname);
		  $scope.WNCgender;
		  console.log("WNCgender---"+$scope.WNCgender);
		  $scope.WNCmobile;
		  console.log("WNCmobile---"+$scope.WNCmobile);
		  $scope.WNCemailid;
		  console.log("WNCemailid---"+$scope.WNCemailid);
		  $scope.WNCaadharnumber;
		  console.log("WNCaadharnumber---"+$scope.WNCaadharnumber);
		  $scope.WNCBpl;
		  console.log("WNCBpl---"+$scope.WNCBpl);
		  $scope.WNCbplno;
		  console.log("WNCbplno---"+$scope.WNCbplno);
		  
		   $scope.show = 3;
	  };
	  
	  
	  $scope.applicantinfoaddress = function() {
		 
		  $scope.WNCroadname;
		  console.log("WNCroadname---"+$scope.WNCroadname);
		  $scope.WNCareaname;
		  console.log("WNCareaname---"+$scope.WNCareaname);
		  $scope.WNCtowncity;
		  console.log("WNCtowncity---"+$scope.WNCtowncity);
		  $scope.WNCpincode;
		  console.log("WNCpincode---"+$scope.WNCpincode);
		  $scope.addinfochecked;
		  console.log("addinfochecked---"+$scope.addinfochecked);
		  $scope.WNCbillroadname;
		  console.log("WNCbillroadname---"+$scope.WNCbillroadname);
		  $scope.WNCbillareaname;
		  console.log("WNCbillareaname---"+$scope.WNCbillareaname);
		  $scope.WNCbilltowncity;
		  console.log("WNCbilltowncity---"+$scope.WNCbilltowncity);
		  $scope.WNCbillpincode;
		  console.log("WNCbillpincode---"+$scope.WNCbillpincode);
		  
		  $scope.show = 4;
	  };
	  
	  /*---------------------------------------------------------------------------*/	  
	  var actiondetails;
	   
	 $scope.initialzedmodel = function(){
		 
		 $scope.WNCexistconsumerdetail;
		 console.log("WNCexistconsumerdetail---"+$scope.WNCexistconsumerdetail);
		 $scope.WNCexistproperty;
		 console.log("WNCexistproperty---"+$scope.WNCexistproperty);
		 $scope.WNCconntype;
		 console.log("WNCconntype---"+$scope.WNCconntype);
		 $scope.WNCnooffamily;
		 console.log("WNCnooffamily---"+$scope.WNCnooffamily);
		 $scope.WNCnoofusers;
		 console.log("WNCnoofusers---"+$scope.WNCnoofusers);
		 $scope.WNCtarif;
		 console.log("WNCtarif---"+$scope.WNCtarif);
		 var seltarif = document.getElementById("seltarif");
		 tariftext= seltarif.options[seltarif.selectedIndex].text;
		 console.log(seltarif.options[seltarif.selectedIndex].text);
	 		 		 
		 $scope.WNCpermise;
		 console.log("WNCpermise---"+$scope.WNCpermise);
		 var selpermise = document.getElementById("selpermise");
		 permisetext= selpermise.options[selpermise.selectedIndex].text;
		 console.log(selpermise.options[selpermise.selectedIndex].text);
		 
		 $scope.WNCConnSize;
		 console.log("WNCConnSize---"+$scope.WNCConnSize);
		 $scope.WNCnooftaps;
		 console.log("WNCnooftaps---"+$scope.WNCnooftaps);
		 
		  $scope.checklist ='';
		  
	    	$ionicLoading.show({
					template: 'Loading...'
				});
			RestService.getinitializedmodel().then(function (responsedata){
				console.log("resposeaayaainitial--"+responsedata); 
//				alert("resposeaayaainitial.wsStatus--"+responsedata.wsStatus)

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
			
			
		RestService.checklistcall(tariftext,permisetext,apptypetext,$scope.WNCexistconsumerdetail,
				$scope.WNCexistproperty,$scope.WNCBpl,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
				$scope.noOfDays,$scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,
				$scope.factor2,$scope.factor3,$scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			console.log("responsechecklistdata--"+responsechecklistdata);
//			alert("responsechecklistdata.wsStatus--"+responsechecklistdata.wsStatus)
			if(responsechecklistdata.wsStatus == "success"){
				
				$ionicLoading.show({
					template: 'Loading...'
				});
					/*$scope.documentlist = responsechecklistdata.responseObj;
					console.log("documentlist ::: "+$scope.documentlist);
					
					var i = 0;
	
					for (; i < $scope.documentlist.length; i++) {
						$scope.documentlist[i].index = i;
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
						newconndoctable = newconndoctable+tempvar;
						document.getElementById('NewConnDocData').innerHTML =	newconndoctable;
						
				
				  RestService.setdepentparams($scope.orgid).then(function (setdependresponse) {
					  console.log("setdependresponse=="+setdependresponse);
					  if(setdependresponse.wsStatus == "success"){
					  $scope.TaxType = setdependresponse.responseObj[0].taxType;
					  $scope.TaxCode = setdependresponse.responseObj[0].taxCode;
					  $scope.TaxCategory = setdependresponse.responseObj[0].taxCategory;
					  $scope.TaxSubcategory = setdependresponse.responseObj[0].taxSubCategory;
					 
					  $scope.show = 5;
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
	  
/*-------------------------------------------------------*/	  
	  
	  
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
//	  			alert("$scope.subjects[k].documentId-"+$scope.subjects[k].documentId);
	  			
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
//	  		alert("encoded byte--"+JSON.stringify($scope.documentObjectArray));
//	  		 $scope.documentObjectArray.push(documentObject);
	  		 
	  	 };
	  		reader.readAsBinaryString(verfy);
	  	};  
	  
	  
	  $scope.uploadattch = function() {
		  $scope.wrNewRatestartDate= new Date().getTime();
//		  alert("recDate"+ $scope.wrNewRatestartDate);
		  	 console.log("recDate"+ $scope.wrNewRatestartDate);
			 console.log("WNCexistconsumerdetail---"+$scope.WNCexistconsumerdetail);
			 console.log("WNCexistproperty---"+$scope.WNCexistproperty);
			 console.log("WNCconntype---"+$scope.WNCconntype);
			 console.log("WNCnooffamily---"+$scope.WNCnooffamily);
			 console.log("WNCnoofusers---"+$scope.WNCnoofusers);
			 console.log("WNCtarif---"+$scope.WNCtarif);
			 console.log("WNCpermise---"+$scope.WNCpermise);
			 console.log("WNCConnSize---"+$scope.WNCConnSize);
			 console.log("WNCnooftaps---"+$scope.WNCnooftaps);
			 console.log("WNCConnSize---"+$scope.WNCConnSize);		  
			 console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));
			 $ionicLoading.show({
					template: 'Loading...'
				});
			 
		  RestService.servicecharge(tariftext,permisetext,$scope.wrusageSubtype3,$scope.wrusageSubtype4,$scope.wrusageSubtype5,$scope.wrMeterType,
				$scope.wrConnType,$scope.WNCBpl,$scope.wrRoadType,$scope.wrtransferMode,$scope.wrDisConnType,$scope.wrfactor1,$scope.wrfactor2,$scope.wrfactor3,$scope.wrfactor4,$scope.TaxType,
		    	$scope.TaxCode,$scope.TaxCategory,$scope.TaxSubcategory,$scope.WNCConnSize,$scope.wrNewRatestartDate,$scope.orgid).then(function (responseservicechargedata){
				console.log("responseservicechargedata--"+responseservicechargedata);
//				alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
				if(responseservicechargedata.wsStatus == "success"){
					$scope.FlatRate = responseservicechargedata.responseObj[0].flatRate;
//					 alert("$scope.FlatRate----"+$scope.FlatRate);
					 
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
					 $scope.show = 6;
					 $ionicLoading.hide();
					}	
					else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						}  
				},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
					$ionicLoading.hide();
				})
//			$scope.show = 6;
	  };
	  
 $scope.savedata = function(){
		  $ionicLoading.show({
				template: 'Loading...'
			});
		  console.log("documentObjectArray---"+JSON.stringify($scope.documentObjectArray));  
		  RestService.savewaterconndata($scope.WNCwaterconn,$scope.WNCapplicantype,$scope.WNCorgname,$scope.WNCtemporary,
				  $scope.WNCfromdate,$scope.WNCtodate,$scope.WNCselecttitle,$scope.WNCFirstname,$scope.WNCMiddlename,
				  $scope.WNCLastname,$scope.WNCgender,$scope.WNCmobile,$scope.WNCemailid,$scope.WNCaadharnumber,$scope.WNCBpl,
				  $scope.WNCbplno,$scope.addinfochecked,$scope.WNCroadname,$scope.WNCareaname,$scope.WNCtowncity,$scope.WNCpincode,
				  $scope.WNCbillroadname,$scope.WNCbillareaname,$scope.WNCbilltowncity,$scope.WNCbillpincode,$scope.WNCpropertyno,
				  $scope.WNCexistproperty,$scope.WNCexistconsumerdetail,$scope.WNCexistconnno,$scope.WNCconstype,$scope.WNCnoofusers,
				  $scope.WNCtarif,$scope.WNCpermise,$scope.WNCConnSize,$scope.WNCnooftaps,$scope.selectfilename,
				  $scope.encoded_file,$scope.orgid,$scope.userID,$scope.documentObjectArray).then(function (newwaterconnresponse){
			  console.log("newwaterconnresponse=="+newwaterconnresponse.status);
//			 alert("newwaterconnresponse----"+newwaterconnresponse.status);
			  $ionicLoading.hide();
			  if(newwaterconnresponse.status == "success"){
				//  $scope.show =4;
			
				/*  RestService.savePayReq($scope.data_.payingAmount,$scope.data_.paymentGateway,$scope.CSidn,$scope.orgid,$scope.userID).then(function (response) {
					  alert("response.status---->>"+response.status);
					  if(response.status == "success"){
							alert(response.payRequestMsg);
							var H= null;
							H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
							H.addEventListener('loadstop', function(event) {        
								if (event.url.match("mobile/close")) {
									H.close();
									}
								});
							
							 $state.go("app.home");
						}
						else{
							toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
						}
						$ionicLoading.hide();
					}, function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})*/
				  
				  alert("successfully save data......");
				  $state.go("app.home");
				  $ionicLoading.hide();
			  }
				  else{
					  alert("Something went wrong---");
					  $ionicLoading.hide();
				  }
			  
			},function (err) { 
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//					alert("not working---error");
					$ionicLoading.hide();
				})
	  		};
	  	
	  	
		$scope.imageuplod11 = function($file){
			  var verfy =  document.getElementById('verfiyFile').files[0];  
			  $scope.selectfilename = verfy.name;
			  console.log("name=----"+$scope.selectfilename);
			  var reader = new FileReader();
			  reader.onload = function(e){
			    console.log("about to encode");
			    $scope.encoded_file = window.btoa(e.target.result.toString());  
			    console.log("encoded byte--"+$scope.encoded_file);
//			    alert("encoded byte--"+$scope.encoded_file);
			  };
			  reader.readAsBinaryString(verfy);
		  };
	  
	  $scope.goBack = function(){
		  $location.path('app');
	  };
  
  }) /*controler ends*/
  
