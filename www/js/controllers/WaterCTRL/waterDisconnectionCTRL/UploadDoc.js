angular.module('starter')

  .controller('UploadDocCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,sharedProperties, $localStorage,$sessionStorage) {
	  
	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		var serviceCode = "WCC";
		var arrayListTest	=	new Array();

		$localStorage.Lock	= 0;
		$localStorage.TempArray	;

console.log("responsechecklistdata--"+JSON.stringify($sessionStorage.responsechecklistdata));
	$scope.documentlist = $sessionStorage.responsechecklistdata.responseObj;
		  console.log("documentlist ::: "+JSON.stringify($scope.documentlist));
		  $scope.docsitems = [];
		  var newconndoctable = "";
			for (var i = 0; i < $scope.documentlist.length; i++) {
				var docdata = {   
				    attactID: $scope.documentlist[i].attachmentId,
		            docID: $scope.documentlist[i].documentId,
		            docName: $scope.documentlist[i].documentName,
		            docSerialNo: $scope.documentlist[i].documentSerialNo,
		            docDescType: $scope.documentlist[i].descriptionType,
		            docType: $scope.documentlist[i].documentType, 
		            docDescMar: $scope.documentlist[i].doc_DESC_Mar,
		            docDesceng: $scope.documentlist[i].doc_DESC_ENGL,
		            docByteCode: $scope.documentlist[i].documentByteCode,
		            docMandatory: fullmandatory($scope.documentlist[i].checkkMANDATORY)
				   }
				$scope.docsitems.push(docdata);
			}
		
	  var verfy;

	  $scope.imageupload = function(fileObject){
	  		 var idValue	=	fileObject.getAttribute("id");
	  		 verfy  = fileObject.files[0];
	  		var reader = new FileReader();
	  		reader.onload = function(e){
	  		console.log("about to encode");
	  		$scope.encoded_file = window.btoa(e.target.result.toString());
//	  		$scope.encoded_file = "DISCONNECTION";
//	  		console.log("encoded byte--"+$localStorage.encoded_file);
	  		
	  		for(var k=0;k<$scope.documentlist.length;k++)
	  		{
	  			var documentObject	=
	  				{  
	  					attachmentId: $scope.documentlist[k].attachmentId,
	  					documentId: $scope.documentlist[k].documentId,
	  					documentName: null,
	  					documentSerialNo: $scope.documentlist[k].documentSerialNo,
	  					descriptionType: $scope.documentlist[k].descriptionType,
	  					documentType: $scope.documentlist[k].documentType, 
	  					doc_DESC_Mar: $scope.documentlist[k].doc_DESC_Mar,
	  					doc_DESC_ENGL: $scope.documentlist[k].doc_DESC_ENGL,
	  					documentByteCode: null,
	  					checkkMANDATORY: $scope.documentlist[k].checkkMANDATORY		
	  				};
	  			
	  			if($localStorage.Lock == 0)
				{
					if($scope.documentlist[k].documentId == idValue)
					{
						documentObject.documentName		=	verfy.name;
						documentObject.documentByteCode	=	$scope.encoded_file;
					}
					arrayListTest.push(documentObject);
					if((k+1)==$scope.documentlist.length)
					{
						$localStorage.Lock = 1;
					}
				}
	  			else
				{
					 for (var l=0; l <arrayListTest.length; l++) {
					        if (arrayListTest[l].documentId == idValue && $scope.documentlist[k].documentId == idValue) 
					        {
					        	arrayListTest[l].documentName		=	verfy.name;
					        	arrayListTest[l].documentSerialNo 	= 	$scope.documentlist[k].documentSerialNo;
					        	arrayListTest[l].doc_DESC_Mar 		=	$scope.documentlist[k].doc_DESC_Mar;
					        	arrayListTest[l].doc_DESC_ENGL 		=	$scope.documentlist[k].doc_DESC_ENGL;
					        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
					        	arrayListTest[l].checkkMANDATORY 	= 	$scope.documentlist[k].checkkMANDATORY;
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
		  
			$sessionStorage.startDate= new Date().getTime();
		
		  	 $ionicLoading.show({	template: 'Loading...'	});
		  	
		    RestService.servicecharge(
		    	  $sessionStorage.serviceCode,
		    	  $sessionStorage.deptCode,
		    	  $sessionStorage.TarifText,
		    	  $sessionStorage.PermiseText,
		    	  $sessionStorage.initializedmodeldata.responseObj[1].usageSubtype3,
		    	  $sessionStorage.initializedmodeldata.responseObj[1].usageSubtype4,
		    	  $sessionStorage.initializedmodeldata.responseObj[1].usageSubtype5,
				  $sessionStorage.MeterType,
				  $sessionStorage.initializedmodeldata.responseObj[1].connectionType,
				  $sessionStorage.applbplflag,
				  $sessionStorage.initializedmodeldata.responseObj[1].roadType,
				  $sessionStorage.initializedmodeldata.responseObj[1].transferMode,
				  $sessionStorage.disConnectionType,
				  $sessionStorage.initializedmodeldata.responseObj[1].factor1,
				  $sessionStorage.initializedmodeldata.responseObj[1].factor2,
				  $sessionStorage.initializedmodeldata.responseObj[1].factor3,
				  $sessionStorage.initializedmodeldata.responseObj[1].factor4,
				  $sessionStorage.TaxType,
				  $sessionStorage.TaxCode,
				  $sessionStorage.TaxCategory,
				  $sessionStorage.TaxSubcategory,
				  $sessionStorage.chargeApplicableAt,
				  $sessionStorage.ConnSize,
				  $sessionStorage.startDate,
				  $scope.orgid)
				  .then(function (responseservicechargedata){
				console.log("responseservicechargedata--"+responseservicechargedata);
				if(responseservicechargedata.wsStatus == "success"){
					
					$localStorage.responseservicechargedata = responseservicechargedata;
					
					RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
						console.log("dash==="+response);
						if(response.status == "success"){
						$localStorage.Bankresponse = response;
						$ionicLoading.hide();
							$state.go("app.DisconnPay");
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
  
