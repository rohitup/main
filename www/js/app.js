// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',[
  'ionic',
  'starter.controllers',
  'ui.calendar',
  'ui.bootstrap',
  'LocalStorageModule',
  'pascalprecht.translate',
  'toaster',
  'ngSanitize',
  'ui.utils.masks',
  'ngFileUpload',
  'ngStorage',
  'ngCordova'
  /*'ngMaterial'*/
])
.controller('TodoCtrl', function($scope,$state,$ionicLoading,$ionicHistory,$localStorage,
		$window, $cordovaImagePicker, $ionicPlatform) {
	
	$scope.$on('$ionicView.enter', function(e) {
	    if($localStorage.responselogindata){
	    	$scope.loginUSername = $localStorage.responselogindata.firstName;
    		$scope.loginlast = $localStorage.responselogindata.lastName;
    		$scope.loginName = $scope.loginUSername+ " " + $scope.loginlast;
	    } else {
	        return;
	    }
	});
	
	 $scope.ImageURI = 'Select Image';
	    function UploadPicture(imageURI) {
	        $scope.ImageURI =  imageURI;
	    }

	    $scope.ShowPictures = function() {
	        navigator.camera.getPicture(UploadPicture, function(message) {
	                alert('get picture failed');
	            }, {
	                quality: 50,
	                destinationType: navigator.camera.DestinationType.FILE_URI,
	                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	            }
	        );
	    };
		   
	$scope.logout = function()
	 {
		 $ionicLoading.show({template:'Logging out....'});
		 	$localStorage.$reset();
		 	$window.localStorage.clear();
	        $ionicHistory.clearCache();
	        $ionicHistory.clearHistory();
	        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
	        $ionicLoading.hide();
	        $state.go("app.LoginPage");
	 }
})
  .run(function ($ionicPlatform,ENV,$rootScope,$window,$ionicPopup,$ionicHistory,$location,$state,RestService,toaster,$filter,$ionicLoading,$localStorage,$sessionStorage) {
    $ionicPlatform.ready(function(){
    	/*Get MAC Address Start*/
    	cordova.exec(successCallback, failureCallback, 'MacAddressPlugin',
     			'getMacAddress', []);
    	
    	function successCallback(data){
    		$localStorage.macAddress = data;
    	}
    	function failureCallback(err){
    	}
    	/*Get MAC Address End*/
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    	/*$localStorage.responselogindata = {
    			orgId:"81",
    			userId:"10",
    			title:24,
    			firstName:"Dharti",
    			middleName:"Shantilal",
    			lastName:"Gohil",
    			gender:26,
    			emailId:"dharti.gohil@abmindia.com",
    			addhaarNo:"987654321987",
    			mobileNo:"8898954208"
    	};*/

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if($localStorage.responselogindata == null || 
    		  typeof $localStorage.responselogindata == undefined){
    	  $state.go("app.LoginPage");
      }/*else{
    	  $state.go("app.home");
      }*/
      
    });
	
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	$rootScope.pad = function(s) {return (s < 10) ? '0' + s : s; }
	$rootScope.formatDate = function(myDate) {
		if(myDate == "" || myDate == null || myDate == undefined) return "";
		else 
		{
			var d = new Date(myDate);
			return [pad(d.getDate()),monthNames[d.getMonth()], d.getFullYear()].join('-');
		}
	}
	/*$rootScope.dateToMilli = function(myDate){
		var milliDate = new Date(myDate).getTime();
		return milliDate;
	}*/
  	$rootScope.makeFloat = function(number){
		var num = number;
		if(num != '' || num==0){
			return num+".00";
		}
		else{
			return num;
		}
	}
  	$rootScope.fullmandatory = function(checkkMANDATORY){
		var fullcheckkMANDATORYDesc;
		if(checkkMANDATORY == "Y") fullcheckkMANDATORYDesc = "Mandatory";
		else if(checkkMANDATORY == "N") fullcheckkMANDATORYDesc = "Optional";
		else fullcheckkMANDATORYDesc = "";
		return fullcheckkMANDATORYDesc;
	}
	$rootScope.capitalise = function(string){
	    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	$rootScope.fullGender = function(gender){
		var fullGenderDesc;
		if(gender == "F") fullGenderDesc = "Female";
		else if(gender == "M") fullGenderDesc = "Male";
		else if(gender == "T") fullGenderDesc = "Transgender";
		else fullGenderDesc = "";
		return fullGenderDesc;
	}
	$rootScope.changeDateAttr = function(item,model,placeholder){
		if(model == "" || model == null || model == undefined )
			item.currentTarget.setAttribute("placeholder",placeholder);
		else item.currentTarget.setAttribute("placeholder","");
	}
	$rootScope.homepage = function()
	{
		$location.replace();
		$state.go("app.home");
	}

	$rootScope.readFile = function() {
		var reader = new FileReader();
		var file = e.files[0];
		uploadedFileName = file.name;
		var maxSize = e.getAttribute('data-max-size');
	    var fileSize = file.size;
		var ext = e.value.split('.').pop();
		if(ext){
	    	if(ext == "pdf" || ext == "docx" || ext == "doc"){
	        }
	    	else{
	    		e.value = "";
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
	    	e.value = "";
	        alert('File Size Must Not Be Greater Than 1 MB');
	        $('#iDivBusyLoad').hide();
	        return;
	    }
	    
		reader.onload = function(){
			
			uploadedFile = btoa(reader.result.toString());
			docList.push({
				attachmentId : null,
				documentId : null,
				documentName : uploadedFileName,
				documentSerialNo : null,
				descriptionType : null,
				documentType : null,
				uploadedDocumentPath : null,
				doc_DESC_Mar : null,
				doc_DESC_ENGL : "",
				documentByteCode : uploadedFile,
				checkkMANDATORY : null
			});
		};
		reader.onloadend = function(){$('#iDivBusyLoad').hide();};
		reader.readAsBinaryString(file);
	}
	$rootScope.getCurrentDate = function(){
		RestService.getServerDate()
		.then(function(response){
			$sessionStorage.currentDate = response;
			return response;
		},function(err){
			return [];
		})
	}
	$rootScope.getNonHData = function(lookUpCode,dropdown,orgId){
		$ionicLoading.show();
		RestService.getNHPrefixData(lookUpCode,orgId)
		.then(function(response){
			if(response.length > 0){
				var listResponse = response;
				console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
				$rootScope[dropdown] = new Array();
				for(var i=0;i<listResponse.length;i++){
					$rootScope[dropdown].push({
						value : listResponse[i].lookUpId,
						name : listResponse[i].descLangFirst
					})
				}
				//if(lookUpCode == "SHF"){
					$rootScope["temp"+dropdown] = $rootScope[dropdown];
					$rootScope["main"+dropdown] = response;
				//}
				
				$ionicLoading.hide();
			}
			else {
				$ionicLoading.hide();
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				return [];
			}
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
			return [];
		})
	}
  })
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        
      })
      	/*.state('app.home', {
        	  url: '/home/{index:[a-zA-Z]{0,12}}',
		        views: {
		          'menuContent': {
		            templateUrl: 'templates/states/home.html',
		            controller: 'HomeCtrl'
		          }
		        }
		})*/
         .state('app.home', {
          url: '/home/{index:[a-zA-Z]{0,12}}',
          views: {
            'menuContent': {
              templateUrl: 'templates/states/home.html'

            }
          }
        })
        .state('app.LoginPage', {
          url: '/LoginPage',
          views: {
            'menuContent': {
              templateUrl: 'templates/LoginPage.html'
            }
          }
        })
       .state('app.publicnotices', {
        url: '/publicnotices',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/publicnotices.html'
          }
        }
      })
      
       .state('app.faq', {
        url: '/faq',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/faq.html'
          }
        }
      })
      
       .state('app.contactus', {
        url: '/contactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/contactus.html'
          }
        }
      })
      
      .state('app.AboutUs', {
        url: '/AboutUs',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/AboutUs.html'
          }
        }
      })
      
      .state('app.ApplnDetail', {
        url: '/ApplnDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/ApplnDetail.html'
          }
        }
      })
    
        .state('app.Register', {
        url: '/Register',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/Register.html'
          }
        }
      })
    

      .state('app.forgotpassword', {
        url: '/forgotpassword',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/forgotpassword.html'
          }
        }
      })
      
   
     /*complaint start */ 
  
  /*   .state('app.complaintpage', {
        url: '/complaintpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complaintpage.html',
            controller: 'complaintpagectrl'
          }
        }
      }) 
      
    .state('app.complaintreg', {
        url: '/complaintreg',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complaintreg.html',
            controller: 'ComplaintCtrl'
          }
        }
      }) 
      
        .state('app.complaintstatus', {
        url: '/complaintstatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complaintstatus.html',
            controller: 'Complaintstatusctrl'
          }
        }
      }) */
      
      /* new */ 
       .state('app.complaintPage', {
        url: '/complaintPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/complaintPage.html'
          }
        }
      }) 
      
    .state('app.LodgeComplaint', {
        url: '/LodgeComplaint',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint.html'
          }
        }
      })
      
      .state('app.complaintreceipt', {
        url: '/complaintreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/complaintreceipt.html'
          }
        }
      })
      
      .state('app.complaintstatus', {
        url: '/complaintstatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/complaintstatus.html'
          }
        }
      })
      
       .state('app.compstatusdetail', {
        url: '/compstatusdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/compstatusdetail.html'
          }
        }
      }) 
      
       .state('app.reopentokenpage', {
        url: '/reopentokenpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/reopentokenpage.html'
          }
        }
      }) 
      
      /* new */
      
   /* dept*/   
      
      .state('app.complainttaskpage', {
        url: '/complainttaskpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complainttaskpage.html'
          }
        }
      })
      
        .state('app.complaintcarepage', {
        url: '/complaintcarepage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complaintcarepage.html'
          }
        }
      })
      
      
        .state('app.complaintdeptartment', {
        url: '/complaintdeptartment',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/complaintdeptartment.html'
          }
        }
      })
      
       .state('app.citizencomplreceipt', {
        url: '/citizencomplreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/citizencomplreceipt.html'
          }
        }
      })
      
        .state('app.tokenpage', {
        url: '/tokenpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/tokenpage.html'
          }
        }
      })
      
        .state('app.reopenpage', {
        url: '/reopenpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/reopenpage.html'
          }
        }
      })
      
      /*complaint end*/
 
      .state('app.waterbillpay', {
        url: '/waterbillpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/waterbillpay.html'
          }
        }
      })

  /*change of usages start*/
      
    .state('app.changeofusage', {
        url: '/changeofusage',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/changeofusage.html'
          }
        }
      })
    /*change of usages end*/ 
      
      .state('app.changeofowner', {
        url: '/changeofowner',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/changeofownership.html'
          }
        }
      })
      
    .state('app.spotbilling', {
        url: '/spotbilling',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/spotbilling.html'
          }	
        }
      })
      
      
 /*newwaterconn start*/
      
     .state('app.imagepage', {
          url: '/imagepage',
          views: {
            'menuContent': {
              templateUrl: 'templates/states/imagepage.html'
            }
          }
        })
        
      .state('app.newWaterconn', {
        url: '/newWaterconn',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/newWaterconn.html'
          }
        }
      })
/*water module*/
     .state('app.watermodule', {
        url: '/watermodule',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/watermodule.html',
          }
        }
     })
      
   /*Birth & Death*/  
     .state('app.birthNDeathHome', {
        url: '/birthNDeathHome',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/birthNDeathHome.html'
          }
        }
     })
     .state('app.birthRegistration', {
        url: '/birthRegistration',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/birthRegistration.html',
            controller: 'BirthRegistrationCtrl'
          }
        }
     })
     .state('app.birthRegistrationView', {
        url: '/birthRegistrationView/:response',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/birthRegistrationView.html',
            controller: 'BirthRegistrationViewCtrl'
          }
        }
     })
      .state('app.deathRegistration', {
        url: '/deathRegistration',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/deathRegistration.html',
            controller: 'DeathRegistrationCtrl'
          }
        }
     })
     .state('app.deathRegistrationViewdetails', {
        url: '/deathRegistrationViewdetails/:response',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/deathRegistrationViewdetails.html',
            controller: 'DeathRegistrationViewCtrl'
          }
        }
     })
     /*issue birth*/
      .state('app.IssueBirth', {
        url: '/IssueBirth',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueBirth.html',
            controller: 'IssueBirthCtrl'
          }
        }
     })
      .state('app.IssueBirthReceipt', {
        url: '/IssueBirthReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueBirthReceipt.html',
            controller: 'IssueBirthReceiptCtrl'
          }
        }
     })
      .state('app.IssueBirthPayReceipt', {
        url: '/IssueBirthPayReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueBirthPayReceipt.html',
            controller: 'IssueBirthPayReceiptCtrl'
          }
        }
     })
  /*issue death*/   
      .state('app.IssueDeath', {
        url: '/IssueDeath',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueDeath.html',
            controller: 'IssueDeathCtrl'
          }
        }
     })
      .state('app.IssueDeathReceipt', {
        url: '/IssueDeathReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueDeathReceipt.html',
            controller: 'IssueDeathReceiptCtrl'
          }
        }
     })
      .state('app.IssueDeathPayReceipt', {
        url: '/IssueDeathPayReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/BirthandDeath/IssueDeathPayReceipt.html',
            controller: 'IssueDeathPayReceiptCtrl'
          }
        }
     })
     
/*RTI PAGES*/ 
      
    .state('app.RTIpage', {
        url: '/RTIpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/RTI/RTIpage.html',
            controller:  'RTIpagectrl'
          }
        }
      })
      
      .state('app.RTIpageform1', {
        url: '/RTIpageform1',
        views: {
          'menuContent': {
            templateUrl: 'templates/RTI/RTIpageform1.html',
            controller: 'RTIform1Ctrl'
          }
        }
      })
      
      .state('app.RTIpageform2', {
        url: '/RTIpageform2',
        views: {
          'menuContent': {
            templateUrl: 'templates/RTI/RTIpageform2.html',
            controller: 'RTIform2Ctrl'
          }
        }
      })
      
      .state('app.RTIapplnreceipt', {
        url: '/RTIapplnreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/RTI/RTIapplnreceipt.html',
            controller: 'RTIReceiptCtrl'
          }
        }
      })
      
       .state('app.RTIapplnstatus', {
        url: '/RTIapplnstatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/RTI/RTIapplnstatus.html',
            controller: 'RTIapplnstatusCtrl'
          }
        }
      })
      
   /*application status*/
      
       .state('app.applicationstatus', {
        url: '/applicationstatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/ApplicationStatus/applicationstatus.html',
            controller: 'ApplnStatusCtrl'
          }
        }
      })
      
    /* Trade and License */
      
      .state('app.tradeandlicense', {
        url: '/tradeandlicense',
        views: {
          'menuContent': {
            templateUrl: 'templates/TradeandLicense/tradeandlicense.html',
            controller: 'TradeandlicenseCtrl'
          }
        }
      })
      
      /*LOI Details*/
    
      .state('app.LOIDetailspage', {
        url: '/LOIDetailspage',
        views: {
          'menuContent': {
            templateUrl: 'templates/LOIDetails/LOIDetailspage.html',
            controller: 'LOIDetailspageCTRL'
          }
        }
      })
    
    .state('app.loidetails', {
        url: '/loidetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/LOIDetails/loidetails.html',
            controller: 'LOIDetailsCtrl'
          }
        }
      })  
      
      .state('app.LOIDetailPay', {
        url: '/LOIDetailPay',
        views: {
          'menuContent': {
            templateUrl: 'templates/LOIDetails/LOIDetailPay.html',
            controller: 'LOIDetailPayCtrl'
          }
        }
      })  
     
	  /*property tax module*/
      .state('app.propertyTax', {
        url: '/propertyTax',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/propertyPayment.html',
			controller: 'propertyTaxCtrl'
            
          }
        }
      })
	  .state('app.propertyTaxDetails', {
        url: '/propertyTaxDetails/:response',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/propertydetails.html',
			controller: 'propertyTaxDetailsCtrl'
            
          }
        }
      })
      
    /*  water module */  
      
    .state('app.WaterModule', {
        url: '/WaterModule',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterModule.html'
          }
        }
     })
     /*water bill*/
     .state('app.waterBillpay', {
        url: '/waterBillpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterBill/waterBillpay.html'
          }
        }
     })
     .state('app.billpayPage', {
        url: '/billpayPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterBill/billpayPage.html'
          }
        }
     })
     .state('app.taxdetail', {
        url: '/taxdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterBill/taxdetail.html'
          }
        }
     })
  /*spot bill*/
    .state('app.SpotBilling', {
        url: '/SpotBilling',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/SpotBilling/SpotBilling.html',
            controller:	'SpotBillCtrl'
          }
        }
     })
     .state('app.meterRead', {
        url: '/meterRead',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/SpotBilling/meterRead.html',
            controller:	'MeterReadDeatilCtrl'
          }
        }
     })
      .state('app.BillGenerate', {
        url: '/BillGenerate',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/SpotBilling/BillGenerate.html',
            controller:	'generateBillCtrl'
          }
        }
     })
     .state('app.SpotBillpay', {
        url: '/SpotBillpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/SpotBilling/SpotBillpay.html',
            controller:	'SpotBillpayCtrl'
          }
        }
     })
     /*change of usage*/
      .state('app.ChangeofUsage', {
        url: '/ChangeofUsage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/ChangeofUsage.html'
          }
        }
     })
     .state('app.COUoldnewdetails', {
        url: '/COUoldnewdetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUoldnewdetails.html'
          }
        }
     })
      .state('app.COUuploaddoc', {
        url: '/COUuploaddoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUuploaddoc.html'
          }
        }
     })
     .state('app.COUpay', {
        url: '/COUpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUpay.html'
          }
        }
     })
     
     /*change of owner*/
     
       .state('app.ChangeofOwner', {
        url: '/ChangeofOwner',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/ChangeofOwner.html'
          }
        }
     })
     .state('app.COoldnewdetails', {
        url: '/COoldnewdetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COoldnewdetails.html'
          }
        }
     })
      .state('app.COuploaddoc', {
        url: '/COuploaddoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COuploaddoc.html'
          }
        }
     })
     .state('app.COpay', {
        url: '/COpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COpay.html'
          }
        }
     })
     
     /* new water conn */
      .state('app.NewWaterConnection', {
        url: '/NewWaterConnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NewWaterConnection.html'
          }
        }
     })
     .state('app.NWCApplicantInfo', {
        url: '/NWCApplicantInfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCApplicantInfo.html'
          }
        }
     })
     .state('app.NWCApplicantAddress', {
        url: '/NWCApplicantAddress',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCApplicantAddress.html'
          }
        }
     })
     .state('app.NWCExistConndetails', {
        url: '/NWCExistConndetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCExistConndetails.html'
          }
        }
     })
     .state('app.NWCuploadoc', {
        url: '/NWCuploadoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCuploadoc.html'
          }
        }
     })
      .state('app.NWCpay', {
        url: '/NWCpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCpay.html'
          }
        }
     })
/*water disconnection*/
     .state('app.waterDisconnection', {
        url: '/waterDisconnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/waterDisconnection.html'
          }
        }
     })
      .state('app.UploadDoc', {
        url: '/UploadDoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/UploadDoc.html'
          }
        }
     })
     .state('app.DisconnPay',{
        url: '/DisconnPay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/DisconnPay.html'
          }
        }
     })
     
 /*water reconnection*/
     .state('app.waterReconnection', {
        url: '/waterReconnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterReconnection/waterReconnection.html'
          }
        }
     })    
     /*pdf*/
     .state('app.PDF', {
        url: '/PDF',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/PDF.html'
            
          }
        }
      })
     
     /*rent and lease*/
      .state('app.estateBooking', {
        url: '/estateBooking',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBooking.html',
			controller: 'EstateBookingCtrl'
            
          }
        }
      })
       .state('app.estateBookingDetails', {
        url: '/estateBookingDetails/:response/:propId/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookingDetails.html',
			controller: 'EstateBookingDetailsCtrl'
            
          }
        }
      })
        .state('app.estateBookProp', {
        url: '/estateBookProp/:response/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookProp.html',
			controller: 'EstateBookPropCtrl'
            
          }
        }
      })
        .state('app.BookestateApplnInfo', {
        url: '/BookestateApplnInfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/BookestateApplnInfo.html',
			controller: 'BookestateApplnInfoCTRL'
            
          }
        }
      })
        .state('app.BookingDetails', {
        url: '/BookingDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/BookingDetails.html',
			controller: 'BookingDetailsCTRL'
            
          }
        }
      })
        .state('app.bookeStateDoc', {
        url: '/bookeStateDoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/bookeStateDoc.html',
			controller: 'bookeStateDocCTRL'
            
          }
        }
      })
      .state('app.eststeBookingpay', {
        url: '/eststeBookingpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/eststeBookingpay.html',
			controller: 'eststeBookingpayCTRL'
            
          }
        }
      })
      /*BRMS*/
      .state('app.checklistUpload', {
        url: '/checklistUpload/:serviceChargeInput',
        views: {
          'menuContent': {
            templateUrl: 'templates/BRMS/checklistUpload.html',
			controller: 'ChecklistUploadCTRL'
            
          }
        }
      })
      .state('app.paymentPage', {
        url: '/paymentPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/BRMS/paymentPage.html',
			controller: 'PaymentPageCTRL'
            
          }
        }
      })
      
      /*Property Dues/Bill Payment*/
     .state('app.propertyDuesPayment', {
        url: '/propertyDuesPayment',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/propertyDuesPayment.html',
            controller: 'PropertyDuesPaymentCtrl'
          }
        }
     })

    /*No Change in Assessment*/
     .state('app.noChangePropertySearch', {
        url: '/noChangePropertySearch',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/noChangePropertySearch.html',
            controller: 'NoChangePropertySearchCtrl'
          }
        }
     })
     .state('app.noChangePropertyDetail', {
        url: '/noChangePropertyDetail/:response',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/noChangePropertyDetail.html',
            controller: 'NoChangePropertyDetailCtrl'
          }
        }
     })
     .state('app.noChangePropertyPayment', {
        url: '/noChangePropertyPayment/:response',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/noChangePropertyPayment.html',
            controller: 'NoChangePropertyPaymentCtrl'
          }
        }
     })
     /*payment*/
       .state('app.paymentreceipt', {
        url: '/paymentreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/Paymentreceipt/paymentreceipt.html',
			controller: 'paymentReceiptCtrl'
            
          }
        }
      });
   

/*newwaterconn end*/
    
// if none of the above states are matched, use this as the fallback LoginPage
    
    //$urlRouterProvider.otherwise('/app/home/');
    $urlRouterProvider.otherwise('/app/LoginPage');

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
//  $httpProvider.defaults.headers.post['Authorization'] = 'Bearer ' + $localStorage.token;
//  $httpProvider.defaults.headers.post['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDczIiwiaWF0IjoxNDg2NDYzMzUwLCJzdWIiOiI0NDczIiwiaXNzIjoiQUJNIiwiZXhwIjoxNDg2NTEzMzUwfQ.gUit8Dup0I_CJ2WepoipJPAx7hUIhwSOaeh7c7g07nE';
    
   /* $httpProvider.interceptors.push(function($localStorage) {
        return {
         'request': function(config) {
			 if($localStorage.jwtToken){
					config.headers['Authorization'] = $localStorage.jwtToken;
					return config;
			 }else{
				 config.headers['Authorization'] = "";
					return config;
			 }
          }
        };
	});*/
    
    $httpProvider.interceptors.push(function($localStorage) {
    	$localStorage.jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5OTk2IiwiaWF0IjoxNDg4OTU1NDI4LCJzdWIiOiI5OTk2IiwiaXNzIjoiQUJNIiwiZXhwIjoxNDg5MDA1NDI4fQ.L7WxO7tnXxt70kGKAsZdMZPkFosCHnp9ufGnsT1_XWA";
        return {
         'request': function(config) {
			 if($localStorage.jwtToken){
					config.headers['Authorization'] = $localStorage.jwtToken;
					return config;
			 }else{
				 config.headers['Authorization'] = "";
					return config;
			 }
          }
        };
	});
    
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.maxCache(0);

  })
  

/* .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      //                                                                                                                                                                                            key: 'your api key',
      v: '3.20', //defaults to latest 3.X anyhow  
      libraries: 'places' // Required for SearchBox.
    });
  })
*/


