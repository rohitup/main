'use strict';

/**
 * @ngdoc service
 * @name starter.RestService
 * @description
 * # RestService
 * Service in the starter.
 */
angular.module('starter')
  .factory('RestService', function (ENV, $http,$localStorage,$sessionStorage) {

    var api = {};
    api.url = ENV.apiEndpoint + '/api/'
	api.serviceURL = ENV.baseURL + '/MainetService/rest/'
	api.brmsurl = ENV.brmsURL + '/Mainet_BRMS/rest/'
	api.eipUrl = ENV.eipURL + '/portalrest/'
//	api.BiharURL = ENV.biharURL;

    
 /*---------WATER MODULE SERVICES----------*/  
    
    /* water bill payment start */
    
    api.getWPayDet = function (search, orgid){
	  var postData = {ccnNumber: search, orgid: orgid}
      return $http.post(api.serviceURL + 'WaterPaymentRestController/getPaymentData', postData).then(function(data) {
        return data.data;
      });
    };
    
    api.watersavebillpayment = function (CSidn,orgid,userID,Rebate,payingAmount,totalPayableAmount){
  	  var postData = {
			  			csIdn:CSidn,
			  			orgid:orgid,
			  			userId:userID,
			  			rebate:Rebate,
			  			amountPaid:payingAmount,
			  			totalOutstanding:totalPayableAmount,
  			  }
        return $http.post(api.serviceURL + 'WaterPaymentRestController/saveBillPayment', postData).then(function(data) {
          return data.data;
        });
      };

      api.advancewatersavebillpayment = function (CSidn,orgid,userID,Rebate,payingAmount){
    	  var postData = {
  			  			csIdn:CSidn,
  			  			orgid:orgid,
  			  			userId:userID,
  			  			rebate:Rebate,
  			  			amountPaid:payingAmount,
  			  			advancePayment: "A"
    			  }
          return $http.post(api.serviceURL + 'WaterPaymentRestController/getTaxDetailAndCsIdn', postData).then(function(data) {
            return data.data;
          });
        };
      
	api.getPayOpt = function (orgid,userID){
	  var postData = {orgId:orgid,userId:userID,langId:"1"}
	  //return $http.post('http://192.168.100.198:8080/MainetService/rest/mobilePaymentController/getPgList', postData).then(function(data) {
	  return $http.post(api.serviceURL + 'mobilePaymentController/getPgList', postData).then(function(data) {
	  
        return data.data;
      });
    };
	

  /*for payment */  
    api.savePayReq = function (wPaidAmt,wBankId,wConnNumber,CSidn,orgid,userID,loginUSername,LoginMobileNo,ServiceShortName,email) {
	  var postData = {
			  			orgId:orgid,
			  			userId:userID,
			  			langId:"1",
			  			email: email,
			  			applicantName:loginUSername,
			  			mobileNo:LoginMobileNo,
			  			serviceShortName:ServiceShortName,
			  			applicationId:CSidn,
			  			dueAmt:wPaidAmt,
			  			bankId:wBankId,
			  			udf1:wConnNumber
			  		};
	  console.log("postData pay--"+JSON.stringify(postData));
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function(data) {
    	  return data.data;
      });
    };

    api.savePayReqWCU = function (COUpaidamt,COUpaymettype,wConnNumber,CSidn,orgid,userID,loginUSername,LoginMobileNo,ServiceShortName) {
	  var postData = {
			  			orgId:orgid,
			  			userId:userID,
			  			langId:"1",
			  			applicantName:loginUSername,
			  			mobileNo:LoginMobileNo,
			  			serviceShortName:ServiceShortName,
			  			applicationId:CSidn,
			  			dueAmt:COUpaidamt,
			  			bankId:COUpaymettype,
			  			udf1:wConnNumber
			  		};
	  console.log("postData pay--"+JSON.stringify(postData));
      return $http.post(api.serviceURL + 'mobilePaymentController/savePaymentRequest', postData).then(function(data) {
        return data.data;
      });
    };
       

/*BRMS CALL START*/    
api.getinitializedmodel = function(){
	var postdata = {modelName: 'ChecklistModel|WaterRateMaster'}
	return $http.post(api.brmsurl + 'brms/getInitializedModel', postdata).then(function(data){
	return data.data;
  });
}
    
    api.checklistcall = function(serviceCode,deptCode,tariftext,permisetext,apptypetext,WNCexistconsumerdetail,WNCexistproperty,WNCBpl,usageSubtype3,
    		usageSubtype4,usageSubtype5,noOfDays,isOutStandingPending,disConnectionType,factor1,factor2,factor3,factor4,orgid){
    	
    	var postdata = {
    			dataModel:{
    				orgId: orgid,
    				serviceCode: serviceCode,
    				deptCode: deptCode,
    				usageSubtype1: tariftext,
    				usageSubtype2: permisetext,
    				usageSubtype3: usageSubtype3,
    				usageSubtype4: usageSubtype4,
    				usageSubtype5: usageSubtype5,
    				applicantType: apptypetext,                         //WNCapplicantype,
    				noOfDays: noOfDays,
    				isOutStandingPending: isOutStandingPending,
    				isExistingConnectionOrConsumerNo: WNCexistconsumerdetail,
    				isExistingProperty: WNCexistproperty,
    				isBPL: WNCBpl,
    				disConnectionType: disConnectionType,
    				factor1: factor1,
    				factor2: factor2,
    				factor3: factor3,
    				factor4: factor4
    				}};
    	console.log("checklistdata--"+JSON.stringify(postdata));
		    	return $http.post(api.brmsurl + 'brms/getCheckList', postdata).then(function(data){
		    		return data.data;
		  	});
    }
    
    api.setdepentparams = function(orgid,serviceCode,chargeApplicableAt){
    	var postdata = {
    		dataModel:	{
				    		orgId: orgid,
				    		serviceCode: serviceCode,
				    		chargeApplicableAt: chargeApplicableAt
    					}
    				}
    	console.log("setdepentparams--"+JSON.stringify(postdata));
    	return $http.post(api.brmsurl + 'water/setDependentParamForServiceCharge', postdata).then(function(data){
	  		  return data.data;
    	});
    }
    
    api.servicecharge = function(serviceCode,deptCode,tariftext,permisetext,wrusageSubtype3,wrusageSubtype4,wrusageSubtype5,wrMeterType,
    		wrConnType,WNCBpl,wrRoadType,wrtransferMode,wrDisConnType,wrfactor1,wrfactor2,wrfactor3,wrfactor4,TaxType,
    		TaxCode,TaxCategory,TaxSubcategory,chargeApplicableAt,WNCConnSize,wrNewRatestartDate,orgid){
    	var postdata = {
		    				dataModel:[{
		    				orgId: orgid,
		    				serviceCode: serviceCode,
		    				deptCode: deptCode, 
		    				taxType: TaxType,
		    				taxCode: TaxCode,
		    				taxCategory: TaxCategory,
		    				taxSubCategory: TaxSubcategory,
		    				usageSubtype1: tariftext,
		    				usageSubtype2: permisetext,
		    				usageSubtype3: wrusageSubtype3,
		    				usageSubtype4: wrusageSubtype4,
		    				usageSubtype5: wrusageSubtype5,
		    				meterType: wrMeterType,
		    				rateStartDate: wrNewRatestartDate,
		    				chargeApplicableAt: chargeApplicableAt,
		    				connectionSize: WNCConnSize,
		    				connectionType: wrConnType,
		    				isBPL: WNCBpl,
		    				roadType: wrRoadType,
		    				transferMode: wrtransferMode,
		    				disConnectionType: wrDisConnType,
		    				factor1: wrfactor1,
		    				factor2: wrfactor2,
		    				factor3: wrfactor3,
		    				factor4: wrfactor4
    				}]
    		}
    	 console.log("servicecharge----"+JSON.stringify(postdata));
    	return $http.post(api.brmsurl + 'water/getServiceCharge', postdata).then(function(data){
    		return data.data;
    	});
    }
/*BRMS CALL END*/
    
 /*New Water Connection Start*/    
/*    api.savewaterconndata = function(WNCwaterconn,WNCapplicantype,WNCorgname,WNCtemporary,WNCfromdate,WNCtodate,
    		WNCselecttitle,WNCFirstname,WNCMiddlename,WNCLastname,WNCgender,WNCmobile,WNCemailid,WNCaadharnumber,WNCBpl,
    		WNCbplno,addinfochecked,WNCroadname,WNCareaname,WNCtowncity,WNCpincode,WNCbillroadname,WNCbillareaname,
    		WNCbilltowncity,WNCbillpincode,WNCexistconsumerdetail,WNCexistconnno,WNCexistproperty,WNCpropertyno,
    		WNCconstype,WNCnoofusers,WNCtarif,WNCpermise,WNCConnSize,WNCnooftaps,selectfilename,WNCnooffamily,orgid,userID,
    		documentObjectArray,ServiceShortName,WNCZone,WNCWard,WNCconntype,macAddress,applnDate){*/
    	
    api.savewaterconndata = function(WNCapplicantype,WNCorgname,WNCtemporary,WNCfromdate,
		WNCtodate,WNCselecttitle,WNCFirstname,WNCMiddlename,WNCLastname,WNCgender,WNCmobile,WNCaadharnumber,
		WNCBpl,WNCbplno,addinfochecked,WNCroadname,WNCareaname,WNCtowncity,WNCpincode,WNCbillroadname,
		WNCbillareaname,WNCbilltowncity,WNCbillpincode,WNCexistconsumerdetail,WNCexistconnno,WNCexistproperty,
		WNCpropertyno,WNCconstype,WNCnoofusers,WNCtarif,WNCpermise,WNCConnSize,WNCnooftaps,selectfilename,
		WNCnooffamily,orgid,userID,ServiceShortName,WNCZone,WNCWard,WNCconntype,macAddress,applnDate,WNCemailid,
		documentObjectArray,FlatRate,free,PlumberDetail){
    	
    		var postdata = {
    			  fName: WNCFirstname,
    			  mName: WNCMiddlename,
    			  lName: WNCLastname,
    			  mobileNo: WNCmobile,
    			  phone: null,
    			  email: WNCemailid,
    			  orgId: orgid,
    			  deptId: 200000024,
    			  empId: null,
    			  applicationId: null,
    			  challanNo: null,
    			  txnId: null,
    			  licenseNo: null,
    			  serviceId: 1,
    			  userId: userID,
    			  langId: 1,
    			  payStatus: null,
    			  payAmount: null,
    			  macId: null,
    			  updatedBy: userID,
    			  serviceShortCode: null,
    			  tenant: null,
    			  documentList: documentObjectArray,
    			  dirPath: null,
    			  titleId: WNCselecttitle,
    			  blockNo: null,
    			  floor: null,
    			  wing: null,
    			  bldgName: "",
    			  houseComplexName: null,
    			  roadName: WNCroadname,
    			  areaName: WNCareaname,
    			  pincodeNo: WNCpincode,
    			  applicationType: WNCapplicantype,
    			  phone1: null,
    			  phone2: null,
    			  wardNo: WNCWard,
    			  bplNo: WNCbplno,
    			  gender: WNCgender,
    			  aadhaarNo: WNCaadharnumber,
    			  zoneNo: WNCZone,
    			  blockName: "",
    			  flatBuildingNo: "",
    			  cityName: WNCtowncity,
    			  uid: null,
    			  free: free,
    			  isConsumer: "Y",
    			  isBillingAddressSame: addinfochecked,
    			  pinCode: null,
    			  billingPinCode: WNCbillpincode,
    			  billingAdharNo: null,
    			  existingConsumerNumber: WNCexistconsumerdetail,
    			  consumerNo: WNCexistconnno,
    			  existingPropertyNo: WNCexistproperty,
    			  propertyNo: WNCpropertyno,
    			  consumerType: null,
    			  plumberName: "",
    			  lgIpMac: macAddress,
    			  isULBRegisterd: PlumberDetail,
    			  applicantType: null,
    			  charges: FlatRate,
    			  payMode: "Y",
    			  dto: null,
    			  applicantDTO: {
    			    organizationName: WNCorgname,
    			    applicantFirstName: WNCFirstname,
    			    applicantMiddleName: WNCMiddlename,
    			    applicantLastName: WNCLastname,
    			    gender: WNCLastname,
    			    mobileNo: WNCmobile,
    			    emailId: WNCemailid,
    			    pinCode: WNCpincode,
    			    buildingName: "",
    			    roadName: WNCroadname,
    			    applicantTitle: WNCselecttitle,
    			    areaName:WNCareaname,
    			    blockName: "",
    			    housingComplexName: null,
    			    wing: null,
    			    floorNo: null,
    			    phone1: null,
    			    phone2: null,
    			    contactPersonName: null,
    			    villageTownSub: WNCtowncity,
    			    cfcCitizenId: null,
    			    povertyLine: null,
    			    orgId: "",
    			    langId: "",
    			    userId: "",
    			    bplNo: WNCbplno,
    			    flatBuildingNo: "",
    			    codTryId1: null,
    			    codTryId2: null,
    			    codTryId3: null,
    			    codTryId4: null,
    			    codTryId5: null,
    			    aadharNo: "",
    			    dwzid1: WNCZone,
    			    dwzid2: WNCWard,
    			    dwzid3: null,
    			    dwzid4: null,
    			    dwzid5: null,
    			    isBPL: WNCBpl,
    			    panNo: null
    			  },
    			  ownerList: [],
    			  linkDetails: [
    			    {
    			      csIdn: null,
    			      lcOldccn: "",
    			      lcOldccnsize: null,
    			      lcOldtaps: null,
    			      lcId: "",
    			      orgIds: "",
    			      userIds: "",
    			      langId: "",
    			      lmodDate: null,
    			      updatedBy: null,
    			      updatedDate: null,
    			      lgIpMac: null,
    			      lgIpMacUpd: null,
    			      isDeleted: null
    			    }
    			  ],
    			  csmrInfo: {
    			    csIdn: "",
    			    csCcn: null,
    			    csApldate: applnDate,
    			    csOldccn: null,
    			    pmPrmstid: null,
    			    csTitle: WNCselecttitle,
    			    csName: WNCFirstname,
    			    csMname: WNCMiddlename,
    			    csLname: WNCLastname,
    			    csOrgName: WNCorgname,
    			    csAdd: WNCtowncity,
    			    csFlatno: null,
    			    csBldplt: "",
    			    csLanear: WNCtowncity,
    			    csRdcross: "",
    			    csContactno: WNCmobile,
    			    csOtitle: null,
    			    csOname: null,
    			    csOmname: null,
    			    csOlname: null,
    			    csOorgName: null,
    			    csOadd: null,
    			    csOflatno: null,
    			    csObldplt: null,
    			    csOlanear: null,
    			    csOrdcross: null,
    			    csOcontactno: null,
    			    csHousetype: null,
    			    csCcntype: WNCconstype,
    			    csNoofusers: WNCnoofusers,
    			    csCcnsize: WNCConnSize,
    			    csRemark: null,
    			    trdPremise: null,
    			    csNooftaps: WNCnooftaps,
    			    csMeteredccn: null,
    			    pcFlg: null,
    			    pcDate: null,
    			    plumId: null,
    			    csCcnstatus: null,
    			    csFromdt: null,
    			    csTodt: null,
    			    orgId: orgid,
    			    userId: userID,
    			    langId: 1,
    			    lmodDate: null,
    			    updatedDate: null,
    			    csPremisedesc: null,
    			    csBbldplt: "",
    			    csBlanear: WNCtowncity,
    			    csBrdcross: "",
    			    csBadd: WNCtowncity,
    			    regno: null,
    			    meterreader: null,
    			    ported: null,
    			    electoralWard: null,
    			    csListatus: null,
    			    codDwzid1: WNCZone,
    			    codDwzid2: WNCZone,
    			    codDwzid3: null,
    			    codDwzid4: null,
    			    codDwzid5: null,
    			    csPowner: null,
    			    cpaCscid1: null,
    			    cpaCscid2: null,
    			    cpaCscid3: null,
    			    cpaCscid4: null,
    			    cpaCscid5: null,
    			    cpaOcscid1: null,
    			    cpaOcscid2: null,
    			    cpaOcscid3: null,
    			    cpaOcscid4: null,
    			    cpaOcscid5: null,
    			    cpaBcscid1: null,
    			    cpaBcscid2: null,
    			    cpaBcscid3: null,
    			    cpaBcscid4: null,
    			    cpaBcscid5: null,
    			    trmGroup1: WNCtarif,
    			    trmGroup2: WNCpermise,
    			    trmGroup3: null,
    			    trmGroup4: null,
    			    trmGroup5: null,
    			    csCcncategory1: WNCconntype,
    			    csCcncategory2: null,
    			    csCcncategory3: null,
    			    csCcncategory4: null,
    			    csCcncategory5: null,
    			    lgIpMac: macAddress,
    			    lgIpMacUpd: null,
    			    wtV1: null,
    			    wtV2: null,
    			    wtV3: null,
    			    wtV4: null,
    			    wtV5: null,
    			    csCfcWard: null,
    			    wtN2: null,
    			    wtN3: null,
    			    wtN4: null,
    			    wtN5: null,
    			    wtD1: null,
    			    wtD2: null,
    			    wtD3: null,
    			    wtLo1: null,
    			    wtLo2: null,
    			    wtLo3: null,
    			    csBhandwaliFlag: null,
    			    csOldpropno: null,
    			    csSeqno: null,
    			    csEntryFlag: null,
    			    csOpenSecdepositAmt: null,
    			    csBulkEntryFlag: null,
    			    gisRef: null,
    			    csUid: null,
    			    applicationNo: null,
    			    typeOfApplication:WNCtemporary,
    			    fromDate: WNCfromdate,
    			    toDate: WNCtodate,
    			    bplFlag: WNCBpl,
    			    bplNo: WNCbplno,
    			    noOfFamilies: WNCnooffamily,
    			    applicantType: WNCapplicantype,
    			    csBcityName: WNCtowncity,
    			    ownerList: null,
    			    roadList: null,
    			    linkDetails: null,
    			    distribution: null
    			  },
    			  csmrrCmd: {
    			    csId: null,
    			    csIdn: null,
    			    rcDistpres: null,
    			    rcDisttimefr: null,
    			    rcDisttimeto: null,
    			    rcDistccndif: null,
    			    rcDailydischg: null,
    			    rcGranted: null,
    			    rcStatus: null,
    			    rcLength: null,
    			    rcRecommended: null,
    			    rcDailydischgc: null,
    			    lmodDate: null,
    			    rcRhgl: null,
    			    rcAhgl: null,
    			    rcDispWt: null,
    			    lgIpMac: null,
    			    lgIpMacUpd: null,
    			    wtV1: null,
    			    wtV2: null,
    			    wtV3: null,
    			    wtV4: null,
    			    wtV5: null,
    			    wtN1: null,
    			    wtN2: null,
    			    wtN3: null,
    			    wtN4: null,
    			    wtN5: null,
    			    wtD1: null,
    			    wtD2: null,
    			    wtD3: null,
    			    wtLo1: null,
    			    wtLo2: null,
    			    wtLo3: null,
    			    instId: null,
    			    codId1: null,
    			    codId2: null,
    			    codId3: null,
    			    codId4: null,
    			    codId5: null,
    			    rcTotdisttime: null
    			  },
    			  scrutinyApplicable: false,
    			  paymentModeOnline: true
    			}
    	 console.log("NEW Water conn----"+JSON.stringify(postdata));
    	return $http.post(api.serviceURL + 'newWaterConnectionForm/saveNewWaterConnection', postdata).then(function(data){
    		return data.data;
    	});
    }
                                                
/*NEw Water Connection Ended*/   
    
 /*Change of usage start*/

    api.changeusageservice = function(changeusages,orgid){
    	var postdata = {orgId: orgid,connectionNo:changeusages}
    	return $http.post(api.serviceURL + 'ChangeOfUsage/getConnectionData', postdata).then(function(data){
       	 return data.data;
       	});
    }
    
    api.COUsaveservice = function(applFName,applMname,applLname,applmobileno,appltitle,appladdress,COUpaidamt,csidn,
			  applRoadname,connNo,applConnsize,COURemarks,COUtarifCate,COUpermiseType,newCOUtarifnew,newCOUpermise,
			  orgid,userID,documentObjectArray,applbplflag,couwrNewRatestartDate,macAddress){
    	var postdata ={
    			  fName : null,
    			  mName : null,
    			  lName : null,
    			  mobileNo : null,
    			  phone : null,
    			  email : null,
    			  orgId : orgid,
    			  deptId : null,
    			  empId : userID,
    			  applicationId : null,
    			  challanNo : null,
    			  txnId : null,
    			  licenseNo : null,
    			  serviceId : 4,
    			  userId : userID,
    			  langId : 1,
    			  payStatus : null,
    			  payAmount : COUpaidamt,
    			  macId : null,
    			  updatedBy : null,
    			  serviceShortCode : null,
    			  tenant : null,
    			  dirPath : null,
    			  titleId : null,
    			  blockNo : null,
    			  floor : null,
    			  wing : null,
    			  bldgName : null,
    			  houseComplexName : null,
    			  roadName : null,
    			  areaName : null,
    			  pincodeNo : null,
    			  applicationType : null,
    			  phone1 : null,
    			  phone2 : null,
    			  wardNo : null,
    			  bplNo : null,
    			  gender : null,
    			  aadhaarNo : null,
    			  zoneNo : null,
    			  blockName : null,
    			  flatBuildingNo : null,
    			  cityName : null,
    			  uid : null,
    			  free : false,
    			  applicant : {  
    			    organizationName : null,
    			    applicantFirstName : applFName,
    			    applicantMiddleName : applMname,
    			    applicantLastName : applLname,
    			    gender : "",
    			    mobileNo : applmobileno,
    			    emailId : "",
    			    pinCode : "123456",
    			    buildingName : "",
    			    roadName : "",
    			    applicantTitle : appltitle,
    			    areaName : appladdress,
    			    blockName : appladdress,
    			    housingComplexName : null,
    			    wing : null,
    			    floorNo : null,
    			    phone1 : null,
    			    phone2 : null,
    			    contactPersonName : null,
    			    villageTownSub : applRoadname,
    			    cfcCitizenId : null,
    			    povertyLine : null,
    			    orgId : orgid,
    			    langId : null,
    			    userId : userID,
    			    bplNo : "",
    			    flatBuildingNo : "",
    			    codTryId1 : null,
    			    codTryId2 : null,
    			    codTryId3 : null,
    			    codTryId4 : null,
    			    codTryId5 : null,
    			    aadharNo : "",
    			    dwzid1 : null,
    			    dwzid2 : null,
    			    dwzid3 : null,
    			    dwzid4 : null,
    			    dwzid5 : null,
    			    isBPL : applbplflag
    			  },
    			  connectionNo : connNo,
    			  connectionSize : applConnsize,
    			  changeOfUsage : {
    			    cisId :null,
    			    csIdn : csidn,
    			    statusofwork : null,
    			    dateofcomp : null,
    			    plumId : null,
    			    remark : COURemarks,
    			    useType : null,
    			    orgId : orgid,
    			    userId : userID,
    			    langId : 1,
    			    lmoddate :couwrNewRatestartDate,
    			    updatedBy : null,
    			    updatedDate : null,
    			    couGranted : null,
    			    apmApplicationId : null,
    			    apmApplicationDate : null,
    			    trdPremise : null,
    			    couGrantedDt : null,
    			    oldTrdPremise : null,
    			    oldTrmGroup1 : COUtarifCate,
    			    oldTrmGroup2 : COUpermiseType,
    			    oldTrmGroup3 : null,
    			    oldTrmGroup4 : null,
    			    oldTrmGroup5 : null,
    			    newTrmGroup1 : newCOUtarifnew,
    			    newTrmGroup2 : newCOUpermise,
    			    newTrmGroup3 : null,
    			    newTrmGroup4 : null,
    			    newTrmGroup5 : null,
    			    lgIpMac : macAddress,
    			    lgIpMacUpd : null,
    			    chanGrantFlag : null,
    			    chanAprvdate : null,
    			    chanApprovedby : null,
    			    chanExecdate : null
    			  },
    			  fileList : [ "", "", "", "", "" ],
    			  documentList : documentObjectArray
    			}
    	console.log("change of usage--"+JSON.stringify(postdata));
    	return $http.post(api.serviceURL + 'ChangeOfUsage/saveChangeData', postdata).then(function(data){
    		return data.data;
    	});
    }
    
/*Change of usage end*/    
    
/*Change of owner start*/
    
    api.changeofownerservice = function(changeowner,orgid){
    	var postdata = {orgnId: orgid,connectionNo:changeowner}
    	return $http.post(api.serviceURL + 'ChangeOfOwnerWaterConnection/getOldConnectionData', postdata).then(function(data){
       	 return data.data;
       	});
    }
    
    api.changeofownersaveservice = function(WNCselecttitle,WNCFirstname,WNCMiddlename,WNCLastname,COURemarks,
  		  changeowner,WNCgender,oldCOWconnName,oldtitle,oldconnNo,oldcsidn,oldCOUconnSize,oldcodDwzid1,oldcodDwzid2,
  		  oldCOUtarifCate,oldCOUpermiseType,oldCOUmetertype,oldCOUapplicantType,newtransfermode,
  		  documentObjectArray,orgid,userID,applicantinfo,canApplyOrNot,macAddress){
  	  var postdata = {
  			      orgnId:orgid,
  				  csIdn:oldcsidn,
  				  apmApplicationId:null,
  				  cooApldate:null,
  				  cooNotitle:WNCselecttitle,
  				  cooNoname:WNCFirstname,
  				  cooNomname:WNCMiddlename,
  				  cooNolname:WNCLastname,
  				  cooOtitle:null,
  				  cooOname:null,
  				  cooOomname:null,
  				  cooOolname:null,
  				  cooRemark:COURemarks,
  				  cooGranted:null,
  				  userEmpId:userID,
  				  langId:1,
  				  cooNotitleCopy:null,
  				  lgIpMac:macAddress,
  				  cooUidNo:null,
  				  conUidNo:null,
  				  serviceId:2,
  				  amount:null,
  				  documentSize:null,
  				  onlineOfflineCheck:null,
  				  responseDto:[],
  				  applicant: applicantinfo,
  				  /*{
  					  organizationName:null,
  					  applicantFirstName:"Kailash",
  					  applicantMiddleName:"K",
  					  applicantLastName:"Agarwal",
  					  gender:"M",
  					  mobileNo:"9004745332",
  					  emailId:"kailash.dalmiya@gmail.com",
  					  pinCode:"336541",
  					  buildingName:"rishabh",
  					  roadName:"motinagar",
  					  applicantTitle:22,
  					  areaName:"risbhbh",
  					  blockName:"bldg",
  					  housingComplexName:null,
  					  wing:null,
  					  floorNo:null,
  					  phone1:null,
  					  phone2:null,
  					  contactPersonName:null,
  					  villageTownSub:"BHAYANDER",
  					  cfcCitizenId:null,
  					  povertyLine:null,
  					  orgId:orgid,
  					  langId:1,
  					  userId:userID,
  					  bplNo:"",
  					  flatBuildingNo:"101",
  					  codTryId1:null,
  					  codTryId2:null,
  					  codTryId3:null,
  					  codTryId4:null,
  					  codTryId5:null,
  					  aadharNo:"",
  					  dwzid1:0,
  					  dwzid2:0,
  					  dwzid3:null,
  					  dwzid4:null,
  					  dwzid5:null,
  					  isBPL:"N"}*/
  					  fileList:["","","","",""],
  					  uploadedDocList: documentObjectArray,
  						departmenttId:"",
  						connectionNo:changeowner,
  /*newdetails*/			gender:WNCgender,
  						additionalOwners:[{
  							ownerTitle:null,
  							ownerFirstName:null,
  							ownerMiddleName:null,
  							ownerLastName:null,
  							cao_id:null,
  							csIdn:null,
  							cao_address:null,
  							cao_contactno:null,
  							orgid:null,
  							userId:null,
  							langId:null,
  							lmoddate:null,
  							updatedBy:null,
  							updatedDate:null,
  							lgIpMac:macAddress,
  							lgIpMacUpd:null,
  							gender:null,
  							caoUID:null,
  							caoNewTitle:0,
  							caoNewFName:"",
  							caoNewMName:"",
  							caoNewLName:"",
  							caoNewGender:0,
  							caoNewUID:null,
  							isDeleted:null
  						}],
  						oldOwnerInfo:{
  							pinCode:null,
  							email:null,
  							phone:null,
  							registrationNo:null,
  							registrationYear:null,
  							noOfCopies:null,
  							applicationNo:null,
  							amount:null,
  							applicationDate:null,
  							status:null,
  							errorMsg:null,
  							errorCode:null,
  							cause:null,
  							wsInputErrorList:null,
  							checkList:null,
  							ruleResults:null,
  							cooOtitle:oldtitle,
  							cooOname:null,
  							cooOomname:null,
  							cooOolname:null,
  							cooUidNo:null,
  							connectionNumber:oldconnNo,
  							conId:oldcsidn,
  							conType:null,
  							conSize:oldCOUconnSize,
  							conCategory:null,
  							codDwzid1:oldcodDwzid1,
  							codDwzid2:oldcodDwzid2,
  							codDwzid3:null,
  							codDwzid4:null,
  							trmGroup1:oldCOUtarifCate,
  							trmGroup2:oldCOUpermiseType,
  							trmGroup3:null,
  							trmGroup4:null,
  							trmGroup5:null,
  							oldOwnerFullName:oldCOWconnName,
  							csOGender:null,
  							canApplyOrNot:canApplyOrNot,
  							meterType:oldCOUmetertype,
  							applicantType:oldCOUapplicantType,
  							taxCategory:null,
  							taxSubCategory:null
  							},
  							ownerTransferMode:newtransfermode,
  						}

  	  return $http.post(api.serviceURL + 'ChangeOfOwnerWaterConnection/saveChangeData', postdata).then(function(data){
//  		 alert("changeofowner--->"+data);
  		  return data.data;
  	  });
    }
/*Change of owner End*/    
    
/*  water disconnection */    
    
    api.disconnsearchConnectionDetails = function(orgid,connectionNosearch){ 
    	var postdata =
    			{
	    			orgId: orgid,
	    			connectionNo: connectionNosearch
    			}
      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/searchConnectionDetails',postdata)
      	.then(function(data){
      		return data.data;
      	});
      } 
    
    api.validatePlumber = function(plumberNo){ 
      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/validatePlumberLinceOutsideULB',plumberNo)
      	.then(function(data){
      		return data.data;
      	});
      }
    
    api.disconnsave = function(orgid,userID,
    		applicantTitle,
			applicantFirstName,
			applicantMiddleName,
			applicantLastName,
			mobileNo,
			bplNo,
			housingComplexName,
			roadName,
			areaName,
			csIdn,
			csApldate,
			documentObjectArray,
			applbplflag,
			DisConn_Type,
			disfromdate,
			distodate,
			disConnReason,
			disPlumberDetail,
			startDate,
			plumberNo,
			free
			){ 
    	var postdata ={
    			  fName: null,
    			  mName: null,
    			  lName: null,
    			  mobileNo: null,
    			  phone: null,
    			  email: null,
    			  orgId: orgid,
    			  deptId: null,
    			  empId: null,
    			  applicationId: null,
    			  challanNo: null,
    			  txnId: null,
    			  licenseNo: null,
//    			  serviceId: 3,
    			  userId: userID,
    			  langId: 1,
    			  payStatus: null,
    			  payAmount: null,
    			  macId: null,
    			  updatedBy: null,
    			  serviceShortCode: null,
    			  tenant: null,
    			  documentList: documentObjectArray,
    			  dirPath: null,
    			  titleId: null,
    			  blockNo: null,
    			  floor: null,
    			  wing: null,
    			  bldgName: null,
    			  houseComplexName: null,
    			  roadName: null,
    			  areaName: null,
    			  pincodeNo: null,
    			  applicationType: null,
    			  phone1: null,
    			  phone2: null,
    			  wardNo: null,
    			  bplNo: null,
    			  gender: null,
    			  aadhaarNo: null,
    			  zoneNo: null,
    			  blockName: null,
    			  flatBuildingNo: null,
    			  cityName: null,
    			  uid: null,
    			  free: free,
    			  connectionNo: null,
    			  freeService: free,
    			  uploadDocument: null,
    			  disconnectionEntity: {
    			    discId: 0,
    			    csIdn: csIdn,
    			    apmApplicationId: null,
    			    discAppdate: csApldate,
    			    discReason: disConnReason,
    			    discType: DisConn_Type,
    			   /* discMethod: 318,*/
    			    discGrantFlag: null,
    			    discAprvdate: null,
    			    discApprovedby: null,
    			    discExecdate: null,
    			    orgId: orgid,
    			    userId: userID,
    			    langId: 0,
    			    lmodDate: startDate,
    			    updatedBy: null,
    			    updatedDate: null,
    			    lgIpMac: macAddress,
    			    lgIpMacUpd: null,
    			    wlbWrPrflg: null,
    			    wtV2: null,
    			    wtV3: null,
    			    wtV4: null,
    			    wtV5: null,
    			    wlbWkno: null,
    			    wtN2: null,
    			    wtN3: null,
    			    wtN4: null,
    			    wtN5: null,
    			    wlbWkdt: null,
    			    wtD2: null,
    			    wtD3: null,
    			    wtLo1: null,
    			    wtLo2: null,
    			    wtLo3: null,
    			    plumId: plumberNo,
    			    disconnectFromDate: disfromdate,
    			    disconnectToDate: distodate,
    			    fileList: [
    			      "",
    			      "",
    			      "",
    			      "",
    			      ""
    			    ]
    			  },
    			  applicantDetailsDto: {
    			    organizationName: null,
    			    applicantFirstName: applicantFirstName,
    			    applicantMiddleName: applicantMiddleName,
    			    applicantLastName: applicantLastName,
    			    gender: "25",
    			    mobileNo:mobileNo,
    			    emailId: "",
    			    pinCode: "676796",
    			    buildingName: "",
    			    roadName: "",
    			    applicantTitle: applicantTitle,
    			    areaName: areaName,
    			    blockName: "",
    			    housingComplexName: null,
    			    wing: null,
    			    floorNo: null,
    			    phone1: null,
    			    phone2: null,
    			    contactPersonName: null,
    			    villageTownSub: roadName,
    			    cfcCitizenId: null,
    			    povertyLine: null,
    			    orgId: orgid,
    			    langId: 0,
    			    userId: userID,
    			    bplNo: bplNo,
    			    flatBuildingNo: "",
    			    codTryId1: null,
    			    codTryId2: null,
    			    codTryId3: null,
    			    codTryId4: null,
    			    codTryId5: null,
    			    aadharNo: "",
    			    dwzid1: null,
    			    dwzid2: null,
    			    dwzid3: null,
    			    dwzid4: null,
    			    dwzid5: null,
    			    isBPL: applbplflag,
    			    panNo: null
    			  },
    			  connectionInfo: null
    			}
    	
    	console.log("dissConn--"+JSON.stringify(postdata));
      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterDisconnection/saveDisconnectionDetails',postdata)
      	.then(function(data){
      		return data.data;
      	});
      } 
/* reconnection service */
    api.reconnectionsearch = function(orgid,userID){ 
    	var postdata = 
    	    {
    			orgId: orgid,
    			userId:userID
    		}
      	return $http.post('http://192.168.100.48:8180/MainetService/rest/WaterReconnection/searchReconnectionDetails',postdata)
      	.then(function(data){
      		return data.data;
      	});
      }  
    
/*Login service and registration start*/
    
  api.ulbService = function(){ 
  	  console.log("api.eipUrl-"+api.eipUrl);
    	return $http.post(api.eipUrl + 'organisationsListController/getOrganisationsList').then(function(data){
    		return data.data;
    	});
    }
    
  api.loginservice = function(loginmobileNo,loginPassword,ULBid){ 
        	var postdata = {
				userName : loginmobileNo,
				passWord : loginPassword,
				langId : "1",
				orgId : ULBid
			}
        	console.log("postdata--"+JSON.stringify(postdata));
        	return $http.post(api.eipUrl + 'registrationController/AuthenticationProcess',postdata).then(function(data){
        		return data.data;
        	});
        }
    
  api.registerservice = function(orgid,regfirstname,reglastname,reggender,regdob,regmobile,regemailid,regaadharnumber){ 
  	var postdata = {
  			orgId : orgid,
			langId : "1",
			firstName : regfirstname,
			lastName : reglastname,
			gender : reggender,
			dob : regdob,
			mobileNo : regmobile,
	        emailId : regemailid,
			addhaarNo : regaadharnumber
		}
  	return $http.post(api.eipUrl + 'registrationController/doRegistration', postdata).then(function(data){
  		return data.data;
  	});
  }
  
  api.optservice = function(regmobile,regotp,RegorgId,regUserID){
	  console.log("regorgId--->"+RegorgId);
	  console.log("reguserId---."+regUserID);
	  var postdata = {
				langId : "1",
				userId : regUserID,
				orgId : RegorgId,
				mobileNo : regmobile,
				otpPass : regotp,		
	  		}
	  return $http.post(api.eipUrl + 'registrationController/doOTPVerification', postdata).then(function(data){
		  return data.data;
	  });
  }
  
  api.passwordservice = function(regmobile,regpassword,RegorgId,regUserID){
	  var postdata = {
			    langId : "1",
				userId : regUserID,
				orgId : RegorgId,
				mobileNo : regmobile,
				otpPass : regpassword,		
	  		}
	  return $http.post(api.eipUrl + 'registrationController/setPassword', postdata).then(function(data){
		  return data.data;
	  });
  }
  
 /*forgot password*/ 
  api.forgotoptservice = function(orgid,forgotmobileNo){
	  var postdata = {
				langId : "1",
				orgId : orgid,
				mobileNo : forgotmobileNo,
	  		}
	  return $http.post(api.eipUrl + 'registrationController/ResendOTP', postdata).then(function(data){
		  return data.data;
	  });
  }
  
  api.forgototpverfiy = function(orgid,userID,forgotmobileNo,forgototp){
	  var postdata = {
				langId : "1",
				userId : userID,
				orgId : orgid,
				mobileNo : forgotmobileNo,
				otpPass : forgototp,		
	  		}
	  return $http.post(api.eipUrl + 'registrationController/doOTPVerification', postdata).then(function(data){
		  return data.data;
	  });
  }
  
  api.forgotpasswordservice = function(orgid,userID,forgotmobileNo,forgotpassword){
	  var postdata = {
			    langId : "1",
				userId : userID,
				orgId : orgid,
				mobileNo : forgotmobileNo,
				otpPass : forgotpassword,
				/*loginType:"C",*/
	  		}
	  return $http.post(api.eipUrl + 'registrationController/setPassword', postdata).then(function(data){
		  return data.data;
	  });
  }
    /*Login Service and registration End*/


/* complaiint service start */
  
  api.deptprefix = function(orgid) {
	    var url = api.serviceURL + 'mobility/fetchDepartmentsByOrgId/' + orgid;
	    return $http.post(url).then(function(response) {
	        return response.data;
	    });
	}
  
  api.fetchalllocation = function(orgid) {
	    var url = api.serviceURL + 'mobility/fetchLocationsByOrgId/' + orgid;
	    return $http.post(url).then(function(response) {
	        return response.data;
	    });
	}
  
  api.finddeptcompltype = function(NewCompDeptdetails,orgid) {
	    var url = api.serviceURL + "mobility/findDepartmentComplaintByDepartmentId/" + NewCompDeptdetails + "/" + orgid;
	    return $http.post(url).then(function(response) {
	        return response.data;
	    });
	}
  
  
  api.pincodeprefix = function(NewCompPincode) {
	    var url = api.serviceURL + "mobility/getLocationByPinCode/" + NewCompPincode;
	    return $http.post(url).then(function(response) {
	        return response.data;
	    });
	}
  
  api.lodgecomplaintsave = function(NewCompPincode,NewCompDeptdetails,NewCompType,NewCompDescription,
		  NewCompLocation,encoded_file,orgid,userID,complaintType,careApplicantDetails,employee){
	  	  	var postdata =		
	  		{
	  		  careRequest: {
	  		    dateOfRequest: null,
	  		    id: null,
	  		    createdDate: null,
	  		    modifiedDate: null,
	  		    requestNo: null,
	  		    processSessionId: null,
	  		    status: null,
	  		    processStatus: null,
	  		    processName: "",
	  		    processId: null,
	  		    processVersion: null,
	  		    orgId: orgid,
	  		    descriptions: {},
	  		    requestor: null,
	  		    raisedBy: null,
	  		    actionList: [],
	  		    eventList: null,
	  		    returnTo: null,
	  		    actionPerformed: null,
	  		    forwardTo: null,
	  		    sessionId: "",
	  		    careApplicantDetails: careApplicantDetails, 
	  		    /*{
	  		      id: null,
	  		      applicantTitle: "MR",
	  		      applicantFirstName: "First Name",
	  		      applicantMiddleName: "Middle Name",
	  		      applicantLastName: "Last Name",
	  		      gender: "Male",
	  		      mobileNo: "0993047415",
	  		      emailId: "jasvinderbhomra@abmindia.com",
	  		      flatBuildingNo: "Flat No. / Building No",
	  		      buildingName: "Building Name",
	  		      roadName: "Road Name",
	  		      blockName: "Block Name",
	  		      areaName: "Area Name",
	  		      villageTownSub: "Village/Town/City",
	  		      pinCode: "400706",
	  		      aadharNo: "1111 1111 1111",
	  		      panNumber: "ALYPB6871D"
	  		    }*/
	  		    careDetails: {
	  		      id: null,
	  		      departmentComplaint: null,
	  		      complaintType: NewCompType,
	  		      description: NewCompDescription,
	  		      pincode2: NewCompPincode,
	  		      location: null
	  		    },
	  		    careDepartmentAction: null,
	  		    reopenComplaintDetails: null,
	  		    complaintTypeDescription: complaintType,
	  		    requestType: null,
	  		    employee: null,
	  		    reopenedRequest: null,
	  		    roleAllocationDTO: null,
	  		    lastAction: null
	  		  },
	  		  parameter: {
	  		    mode: "",
	  		    organizationId: orgid,
	  		    actionMethod: "submit",
	  		    comments: "",
	  		    decision: "",
	  		    requestType: "Citizen Request",
	  		    reopenedRequest: "",
	  		    taskName: "Requester Action",
	  		    locale: "en",
	  		    taskId: ""
	  		  },
	  		  actionType: "Mobility Requester Action",
	  		  organizationId: orgid,
	  		  departmentId:NewCompDeptdetails,
	  		  locationId:NewCompLocation,
	  		  employee: employee
	  		  /*{
	  		    id: null,
	  		    empId: userID,
	  		    fname: null,
	  		    mname: null,
	  		    lname: null,
	  		    empLoginName: "9004745332",
	  		    empPassword: "BdpD68:<",
	  		    designation: null,
	  		    locNameReg: null,
	  		    emppayrollnumber: null,
	  		    empisecuritykey: "2F2EC43B21394A4360967E3AD047F2D7",
	  		    emppiservername: "192.168.100.205",
	  		    empemail: "requestor@gmail.com",
	  		    empAddress: "A-305,Jui nager,Navi Mumbai",
	  		    empAddress1: "Jui nagar/Navi Mumbai/Thane/Maharashtra",
	  		    lockUnlock: null,
	  		    loggedIn: null,
	  		    empmobno: "9004745332",
	  		    empphoneno: null,
	  		    lgIpMac: null,
	  		    lgIpMacUpd: null,
	  		    langId: 0,
	  		    emplType: 29,
	  		    empnew: null,
	  		    empdob: 334953000000,
	  		    empuwmsowner: null,
	  		    empregistry: null,
	  		    emprecord: null,
	  		    empnetwork: null,
	  		    empoutward: null,
	  		    empuid: null,
	  		    empGender: "M",
	  		    isUploaded: null,
	  		    panCardNo: null,
	  		    autEmail: "N",
	  		    type: null,
	  		    onlsOrgname: null
	  		  }*/
	  		}
	  console.log("postdata-comp--"+JSON.stringify(postdata));
	  	return $http.post(api.serviceURL + 'mobility/saveGrievance', postdata)
	  	.then(function(data){
		  		  return data.data;
	  	});
	  }
  
  /* reopen complaint*/
  
  api.allgrieavance = function(userID){
	  return $http.post(api.serviceURL + 'mobility/getAllGrievanceRaisedByRegisteredCitizen/' + userID)
	  .then(function(data){
	  		return data.data;
	  	});  
  }
  
  api.actionHistorybyDocID = function(SelectedTask){
console.log("--SelectedTask--"+SelectedTask);
	  return $http.post(api.serviceURL + 'mobility/getActionHistoryByDocumentId/' + SelectedTask)
	  .then(function(data){
	  		return data.data;
	  	});  
  }
  
  api.getCareRequestByRequestNo = function(requestNo){
	 console.log("--requestNo--"+requestNo);
	  return $http.post(api.serviceURL + 'mobility/getCareRequestByRequestNo/' + requestNo)
	  .then(function(data){
	  		return data.data;
	  	});  
  }
  
  api.reopenedSaveGrievances = function(RequestNoresponse,orgid,employee){
		var postdata =	
				{
					  careRequest: RequestNoresponse,
					  parameter: {
					    mode: "",
					    organizationId: orgid,
					    actionMethod: "submit",
					    comments: "",
					    decision: "",
					    requestType: "Citizen Request",
					    reopenedRequest: "yes",
					    taskName: "",
					    locale: "en",
					    taskId: ""
					  },
					  actionType: "Mobility Requester Action",
					  organizationId: null,
					  departmentId:null,
					  locationId:null,
					  employee: employee
					  /*{
					    id: null,
					    empId: 36,
					    fname: "jassi",
					    mname: "singh",
					    lname: "bhomra",
					    empLoginName: "9930474154",
					    empPassword: "VcwD68:<",
					    designation: null,
					    locNameReg: null,
					    emppayrollnumber: null,
					    empisecuritykey: "D6FABD3D463EDEC2F323697FE053CB0D",
					    emppiservername: "0:0:0:0:0:0:0:1",
					    empemail: "jassi@gmail.com",
					    empAddress: "nerul",
					    empAddress1: "nerul",
					    lockUnlock: null,
					    loggedIn: null,
					    empmobno: "9930474154",
					    empphoneno: null,
					    lgIpMac: null,
					    lgIpMacUpd: null,
					    langId: 0,
					    emplType: 29,
					    empnew: null,
					    empdob: 339618600000,
					    empuwmsowner: null,
					    empregistry: null,
					    emprecord: null,
					    empnetwork: null,
					    empoutward: null,
					    empuid: null,
					    empGender: "M",
					    isUploaded: null,
					    panCardNo: null,
					    autEmail: "N",
					    type: null,
					    onlsOrgname: null
					  }*/
					}

console.log("postdataReopen--"+JSON.stringify(postdata.careRequest.reopenComplaintDetails));
	 return $http.post(api.serviceURL + 'mobility/reopenedSaveGrievances/',  postdata)
	.then(function(data){
		  	return data.data;
		 });  
	}
  
 /* complaiint service end */
  
  /*complaiint service status start*/
  api.getGrievanceStatus = function(tokennumber){
	  return $http.post(api.serviceURL + 'mobility/getGrievanceStatus/' + tokennumber)
	  //return $http.post('http://192.168.100.205:7498/MainetService/rest/mobility/getGrievanceStatus/' + tokennumber)
	  	.then(function(data){
	  		return data.data;
	  	});
	  }
  
 
  /* RTI SERVICES*/ 
   
  api.RTIgetsupportlist = function(orgID,empID){
 	var postdata = {
 						orgId:orgID,
 						empId:empID,
 						serviceName:"",
 						langId:1
 					};
 	  return $http.post(api.BiharURL + 'RTIApplicationFromController/getRTISupportList.ws', postdata)
 	  	.then(function(data){
 	  		return data.data;
 	  	});
  }
  api.RTIapplicationform = function(orgID,RTIappltype,RTIorgname,RTItitle,RTIaplname,RTIappladdress,RTIapplpincode,RTIBpl,RTIbplNo,RTIAadharno,RTIsubject,RTIparticular,RTIDeliveryMode,RTImediatype,RTIalertsubcribe,RTImobileno,RTIEmailID){
	var iscorrespondenceAdd = 'Y';
 	var postdata = {
		orgId:orgID,
		empId:3198,
		tittle:RTItitle,
		applicantType:RTIappltype,
		organizationNam:RTIorgname,
		applicantName:RTIaplname,
		applicantaddress:RTIappladdress,
		iscorrespondenceAdd:iscorrespondenceAdd,
		pinCode:RTIapplpincode,
		mobileNo:RTImobileno,
		aplbplType:RTIBpl,
		aplBplNo:RTIbplNo,
		subscriptionType:RTIalertsubcribe,
		emailId:RTIEmailID,
		applicantAddharNo:RTIAadharno,
		infoDeliveryMode:RTIDeliveryMode,
		subject:RTIsubject,
		rtiDetails:RTIparticular,
		tokenId:"",
		mediaType:RTImediatype,
		langId:1
	};
	return $http.post(api.BiharURL + 'RTIApplicationFromController/RTIapplicationform.ws', postdata)
  	.then(function(data){
  		return data.data;
  	});
  }

   /*RTI Status*/
  api.RTIapplnStatus = function(RTIapplnsearch,orgid,empId){
	var postdata = {
		applicationId:RTIapplnsearch,
		orgId:orgid,
		empId:empId,
	};
	console.log("postdata--"+JSON.stringify(postdata));
	  return $http.post(api.BiharURL + 'RTIApplicationFromController/RTIApplicationStatus.ws', postdata)
	  .then(function(data){
	  	return data.data;
	  });
  }
   
  /*Payment Services*/
  api.RTIgetBankList = function(orgID,empID){
	var postdata = {
		orgId:orgID,
		empId:empID,
	};
	return $http.post(api.BiharURL + 'mobileOnlinePaymentController/getBankDetailList.ws', postdata)
	.then(function(data){
		return data.data;
	});
  }
   
   api.paymentGateway = function(orgID,empID,pgapplfullNAme,egEmID,pgMobileNo,ServiceId,ServiceShortName,applicationID,
		   applnDueAmount,banksecurtiyID,bankkey,banksalt,s,pgbankId,bankpgurl,pgName){
		var postdata = {
							orgId:orgID,
							empId:empID,
							firstName: pgapplfullNAme,
							email: egEmID,
							phone: pgMobileNo,
							serviceId: ServiceId,
							serviceType: ServiceShortName,
							applicationId: applicationID,
							amount: applnDueAmount,
							securityId: banksecurtiyID, 
							key: bankkey,
							salt: banksalt,
							hash: s,
							bankCode: pgbankId,
							bankUrl: bankpgurl,
							pgName: pgName,
						};
		console.log("postadata---"+JSON.stringify(postdata));
		  return $http.post(api.BiharURL + 'mobileOnlinePaymentController/saveOnlinePaymentRequest.ws', postdata)
		  	.then(function(data){
		  		return data.data;
		  	});
		}
   
   api.getPaymentReceipt = function(orgID,empID,trackId){
	   
		var postdata = {
							orgId:orgID,
							empId:empID,
							trackId:trackId,
						};
		console.log("getPaymentReceipt post: "+JSON.stringify(postdata));
		  return $http.post(api.BiharURL + 'mobileOnlinePaymentController/getPaymentReceipt.ws', postdata)
		  	.then(function(data){
		  		return data.data;
		  	});
		}
   
   /* Application Status */
   api.applicationstatus = function(applnstatussearch,orgid,empId,langID){
		var postdata = {
							applicationId:applnstatussearch,
							orgId:orgid,
							empId:empId,
							langId:langID,
						};
		console.log("postdata--"+JSON.stringify(postdata));
		  return $http.post(api.BiharURL + 'traceApplicationController/getApplicationStatus.ws', postdata)
		  	.then(function(data){
		  		return data.data;
		  	});
		}
 /*Trade & License*/  
   api.tradelicensedetail = function(licensenumbersearch,orgID,empID,langID){
		var postdata = {
							licenseNo:licensenumbersearch,
							orgId:orgID,
							empId:empID,
							langId:langID,
						};
		  return $http.post(api.BiharURL + 'marketLicenseWSController/getLicenseStatus.ws', postdata)
		  	.then(function(data){
		  		return data.data;
		  	});
		}
   
   /*LOi Details*/
	api.LOIapplication = function(LOIapplnsearch,orgid,empID,langID,sendURL){
		var postdata = {
			applicationNo: LOIapplnsearch,
			orgId: orgid,
			empId: empID,
			langId: langID
		};
		return $http.post(api.BiharURL + sendURL, postdata)
		.then(function(data){
			return data.data;
		});
	}
   
	/*Birth Registration Details Start*/
	api.viewBReg = function (childName,fatherName,motherName,hospName,sex,dateOfBirth,orgId,empId,langId){                  
		var postData = {
			childName: childName,
			fatherName: fatherName,
			motherName: motherName,
			hospName: hospName,
			sex: sex,
			date: dateOfBirth,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("viewbirth post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'birthRegistrationWSController/getBirthServiceDetails.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	
	api.viewDeathReg = function (deceasedName,causeofdeath,deathplace,deathsex,dateOfdeath,orgId,empId,langId){
		var postData = {
				patientName: deceasedName,
				reasonOfDeath: causeofdeath,
				hospitalName: deathplace,
				gender: deathsex,
				dateOfDeath: dateOfdeath,
				orgId:orgId,
				empId:empId,
				langId:langId
		}
		console.log("viewdeath post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'deathRegistrationWSController/deathRegistrationDetail.ws', postData)
		.then(function(data) {
			return data.data;
		});
	}
	
	/*issue birth */
	
	api.postalcode = function (orgId,empId,langId){
		var postData = {
				orgId:orgId,
				empId:empId,
				langId:langId
		}
		console.log(" postalcode: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'birthRegistrationWSController/getPostalCodeLookup.ws', postData)
		.then(function(data) {
			return data.data;
		});
	}
	
	api.issueBirthdetails = function (birthapplnumber,birthnumberofcopies,birthregnumber,birthyearofreg,orgId,empId,langId,birthdeliverycode){
		var postData = {
				applicationId: birthapplnumber,
				noOfcopies: birthnumberofcopies,
				birthRegisNo: birthregnumber,
				yearOfRegisration: birthyearofreg,
				orgId: orgId,
				empId: empId,
				langId: langId,
				postalCode: birthdeliverycode
		}
		console.log("issueBirthresponse: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'birthRegistrationWSController/getIssueOfBirthCertificate.ws', postData)
		.then(function(data) {
			return data.data;
		});
	}
	
	api.issueDeathdetails = function (deathapplnumber,deathnumberofcopies,deathregnumber,deathyearofreg,orgId,empId,langId,deathdeliverycode){
		var postData = {
				applicationId: deathapplnumber,
				noOfcopies: deathnumberofcopies,
				deathRegistrationNO: deathregnumber,
				yearOfRegisration: deathyearofreg,
				orgId: orgId,
				empId: empId,
				langId: langId,
				postalCode: deathdeliverycode
		}
		console.log("issueDeathdetails: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'deathRegistrationWSController/getIssueOfDeathCertificate.ws', postData)
		.then(function(data) {
			return data.data;
		});
	}

	/*Birth Registration Details End*/
	
	
	/*Get Payment Gateway List Start*/
	api.getBankList = function(orgId,empId){
		var postData = {
			orgId:orgId,
			empId:empId
		};
		console.log("getBankList post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'mobileOnlinePaymentController/getBankDetailList.ws', postData)
		.then(function(data){
			return data.data;
		});
	}
	api.saveOnlinePayment = function(empFullName,empEmail,empMobile,pgServiceId,pgServiceType,pgAppId,pgAmount,pgSecurtiyId,pgKey,pgSalt,pgBankId,pgBankUrl,pgBankName,hash,orgId,empId){
		var postPaymentData = {
			firstName: empFullName,
			email: empEmail,
			phone: empMobile,
			serviceId: pgServiceId,
			serviceType: pgServiceType,
			applicationId: pgAppId,
			amount: pgAmount,
			securityId: pgSecurtiyId, 
			key: pgKey,
			salt: pgSalt,
			bankCode: pgBankId,
			bankUrl: pgBankUrl,
			pgName: pgBankName,
			hash: hash,
			orgId: orgId,
			empId: empId
		};
		$sessionStorage.PaymentReceiptData = postPaymentData;
		console.log("saveOnlinePayment post: "+JSON.stringify(postPaymentData));
		return $http.post(api.BiharURL  + 'mobileOnlinePaymentController/saveOnlinePaymentRequest.ws', postPaymentData)
		.then(function(data){
			return data.data;
		});
	}
    /*Get Payment Gateway List End*/
    /*Property Dues / Bill Payment Start*/
	api.viewPropertyDet = function (searchProperty,orgId,empId,langId){                  
		var postData = {
			propertyNo: searchProperty,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("viewPropertyDet post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'propertyWSController/propertyKnowDues.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.savePropertyDet = function (propertyNo,propSuccessFlag,propServiceCode,propServiceUrl,propPayService,propTotalPay,propPayType,finalPropPayableAmount,orgId,empId,langId){
		var postData = {
				propertyNo:propertyNo,
				orgId:orgId,
				langId:langId,
				empId:empId,
				successMessage:"",
				succesFlag:propSuccessFlag,
				serviceCode:propServiceCode,
				serviceUrl:propServiceUrl,
				payService:propPayService,
				saveOrUpdateDataReqDTO:
				{
					totalPay:propTotalPay,
					payType:propPayType,
					amountToBePay:finalPropPayableAmount
				}
	 		}
		console.log("savePropertyDet post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'NoChangeAssessmentController/savePropertyDetails.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	/*Property Dues / Bill Payment End*/

	/*Authentication Process Bihar Start*/
	api.authenticateBihar = function (){
		var postData = {
			empLoginName:"8898954208",
			passWord:"aaaaaaaa",
			loginType:"C",
			orgId:"711",
			langId:"1"
		}
		console.log("authenticateBihar post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL + 'CitizenLoginController/AuthenticationProcess.ws', postData)
		.then(function(data) {
			 $localStorage.jwtToken = data.headers('jwtToken');
			return data.data;
		});
	};
	/*Authentication Process Bihar Start*/
	 /*No Change in Assessment Start*/
    api.getDataByProp = function (searchPropNo,searchPID,optionType,orgId,empId,langId){                  
		var postData = {
			propertyNo: searchPropNo,
			oldPropertyId: searchPID,
			optionaType: optionType,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("getDataByProp post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'NoChangeAssessmentController/getDataByPropNo.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.sendNCPropOtp = function (searchPropNo,assessEmail,assessMobile,orgId,empId,langId){                  
		var postData = {
			propertyNo: searchPropNo,
			oldPropertyId:"",
			emailNo: assessEmail,
			mobileNo: assessMobile,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("sendNCPropOtp post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'NoChangeAssessmentController/sendOTPBase.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.validateAssessDet = function (searchPropNo,optionType,orgId,empId,langId){                  
		var postData = {
			propertyNo: searchPropNo,
			oldPropertyId:null,
			optionaType: optionType,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("validateAssessDet post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'NoChangeAssessmentController/validatePropNo.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.viewAssessDet = function (searchPropNo,lastPay,assessSuccessFlag,serviceCode,serviceUrl,payService,status,successMessage,requestType,hideBankId,amountToPay,payModeIn,bmChqDDNo,bmChqDDDate,bmBankAccountId,bmDrawOn,saveOrUpdateDataReqDTO,orgId,empId,langId){                  
		var postData = {
			propertyNo: searchPropNo,
			oldPropertyId:null,
			lastPay: lastPay,
			succesFlag: assessSuccessFlag,
            serviceCode: serviceCode,
            serviceUrl: serviceUrl,
            payService: payService,
            status: status,
            successMessage: successMessage,
            requestType: requestType,
            hideBankId: hideBankId,
            amountToPay: amountToPay,
            payModeIn: payModeIn,
            bmChqDDNo: bmChqDDNo,
            bmChqDDDate: bmChqDDDate,
            bmBankAccountId: bmBankAccountId,
            bmDrawOn: bmDrawOn,
            saveOrUpdateDataReqDTO: saveOrUpdateDataReqDTO,
			orgId: orgId,
			empId: empId,
			langId: langId
		}
		console.log("validateAssessDet post: "+JSON.stringify(postData));
		return $http.post(api.BiharURL  + 'NoChangeAssessmentController/getCompleteDetail.ws', postData)
		.then(function(data) {
			return data.data;
		});
	};
    /*No Change in Assessment End*/
	/*Rent and Lease Start*/
	api.getRNLPropFilterList = function (lookUpId,orgId){                  
		var postData = {
			type:lookUpId,
			orgId:orgId
		}
		console.log("getRNLPropFilterList post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/property/filterList', postData)
		.then(function(data){
			return data.data;
		});
	};
	api.getRNLCalendarData = function (propId,orgId){                  
		var postData = {
			propId:propId,
			orgId:orgId
		}
		console.log("getRNLCalendarData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/getCalendarData', postData)
		.then(function(data){
			return data.data;
		});
	};
	api.getRNLShiftDetail = function (bookingId,orgId){                  
		var postData = {
			propId:bookingId,
			orgId:orgId
		}
		console.log("getRNLCalendarData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/propertyInfo', postData)
		.then(function(data){
			return data.data;
		});
	};
	api.getRNLMapData = function (propId,orgId){                  
		var postData = {
				propId:propId,
				orgId:orgId
		}
		console.log("getRNLMapData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/getMapData', postData)
		.then(function(data){
			return data.data;
		});
	};
	api.getRNLPropData = function (propId,orgId){                  
		var postData = {
				propId:propId,
				orgId:orgId
		}
		console.log("getRNLPropData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/getProperty', postData)
		.then(function(data){
			return data.data;
		});
	};
	api.getRNLShifts = function (propId,fromDate,toDate,orgId){                  
		var postData = {
				propId:propId,
				fromDate:fromDate,
				toDate:toDate,
				orgId:orgId
		}
		console.log("getRNLShifts post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL + 'estateBooking/getShiftsBasedOnDate', postData)
		.then(function(data){
			return data.data;
		});
	};
	/*Rent and Lease End*/
	/*BRMS Call Start*/
	 api.initializeModel = function(modelName){
    	var postData = {modelName: modelName}
    	return $http.post(api.brmsurl + 'brms/getInitializedModel', postData).then(function(data){
    		  return data.data;
    	});
    }
    api.getChecklistCall = function(postData){
	    return $http.post(api.brmsurl + 'brms/getCheckList', postData)
	    .then(function(data){
	    		return data.data;
	  	});
    }
    api.dependentParams = function(orgId, serviceCode, chargeApplicableAt){
    	var postData = {
    		dataModel:	{
    			orgId: orgId,
    			serviceCode: serviceCode,
    			chargeApplicableAt: chargeApplicableAt
			}
		}
    	return $http.post(api.brmsurl + 'rnl/setDependentParamForServiceCharge', postData).then(function(data){
  	  		  return data.data;
    	});
    }
	api.brmsServiceCharge = function(postData){
		console.log("brmsServiceCharge postData: "+postData);
		return $http.post(api.brmsurl + 'rnl/getServiceCharge', postData)
		.then(function(data){
			return data.data;
		});
	}
	api.saveRNLService = function(postData){
		console.log("saveRNLService postData: "+JSON.stringify(postData));
		//return $http.post('http://192.168.100.43:8080/MainetService/rest/estateBooking/saveEstateBooking', postData)
		return $http.post(api.serviceURL + 'estateBooking/saveEstateBooking', postData)
		.then(function(data){
			return data.data;
		});
	}
	/*BRMS Call End*/
	/*Global*/
	api.getHPrefixData = function (lookUpCode,level,orgId){
		var postData = {
			lookUpCode:lookUpCode,
			level: level,
			orgId: orgId
		}
		console.log("getHPrefixData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL  + 'commonService/retriveHData', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.getNHPrefixData = function (lookUpCode,orgId){
		var postData = {
			lookUpCode:lookUpCode,
			orgId: orgId
		}
		console.log("getNHPrefixData post: "+JSON.stringify(postData));
		return $http.post(api.serviceURL  + 'commonService/retriveNonHData', postData)
		.then(function(data) {
			return data.data;
		});
	};
	api.getServerDate = function (){
		//return $http.post(api.serviceURL  + 'commonService/getServerDate')
		return $http.post('http://192.168.100.198:8080/MainetService/rest/commonService/getServerDate')
		.then(function(data) {
			return data.data;
		});
	};
	/*Global*/
    return api;
  });


/*GLOBAL VAlue */

angular.module('starter')
.service('sharedProperties', function () {
    var ORGID = null;
    var USERID = null;
    var regorgID = null;
    var reguserid = null;
    var taskdata = null;
    var caredata = null;
    var userLoginData = null;
//    var setapplnID = null;
    
    return {
    	
    	getuserData: function () {
            return userLoginData;
        },
        userData: function(responselogindata) {
       	 userLoginData = responselogindata;
        },
        
    	
    	 getTaskData: function () {
             return taskdata;
         },
         setTaskData: function(emptaskdata) {
        	 taskdata = emptaskdata;
         },
         
         getCareData: function () {
             return caredata;
         },
         setCareData: function(careEmpIDdata) {
        	 caredata = careEmpIDdata;
         },
    	
        getorgID: function () {
            return ORGID;
        },
        setorgID: function(OrgID) {
        	ORGID = OrgID;
        },
        
        getuserID: function () {
            return USERID;
        },
        setuserID: function(UserID) {
        	USERID = UserID;
        },
      
        getRegorgId: function () {
            return regorgID;
           
        },
        setregorgID: function(REGORGID) {
        	regorgID = REGORGID;
        },
        
        getreguserID: function () {
            return reguserid;
        },
        setreguserID: function(regUserID) {
        	reguserid = regUserID;
        }
    };
    
    
});

