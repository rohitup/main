angular.module('starter')

  .controller('HomeCtrl', function ($scope, RestService, $ionicLoading, $state, $stateParams, $ionicHistory,
		  $ionicNavBarDelegate,$ionicPlatform,$localStorage,$window,$ionicPopup) {
	//$ionicNavBarDelegate.showBackButton(false);
	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
		      function() {
		    	
		    	  var confirmPopup = $ionicPopup.show({
			           
		    		  title : 'MAINeT?',
			          template : 'Are You Sure Want To Logout?',
			           
			          buttons : [/*{
			        	  			text : 'Cancel',
			        	  			type : 'button-assertive',
			          			}, */
			          		{
					             text : 'Ok',
					             type : 'button-balanced',
					             
					             onTap : function() {
					            	 	$localStorage.$reset();
					    			 	$window.localStorage.clear();
					    			    $ionicHistory.clearCache();
					    			    $ionicHistory.clearHistory();
					    			 $state.go('app.LoginPage');
//					            	 ionic.Platform.exitApp();
					             	}
			          		}]
		           });
		    
		      }, 100
		    );
		    $scope.$on('$destroy', deregisterSecond);
	/*	    
		    var deregisterSecond    =   $ionicPlatform.registerBackButtonAction(function(e) {
		          e.preventDefault();
		          function showConfirm() {
		           var confirmPopup = $ionicPopup.show({
				            title : 'Exit MaiNet?',
				            template : 'Are you sure you want to exit App?',
				            buttons : [{
				             text : 'Cancel',
				             type : 'button-assertive',
				            }, {
				             text : 'Ok',
				             type : 'button-balanced',
				             onTap : function() {
				              ionic.Platform.exitApp();
			             }
			            }]
			           });
		          };

		       if ($ionicHistory.backView()) {
		           // Go back in history
		        	  	$ionicHistory.backView().go();
		         
		          } else {
		           // This is the last page: Show confirmation popup
		           showConfirm();
		          }
		          
		          return false;
		         }, 101);*/
		    
		    $scope.$on('$destroy', deregisterSecond);

	$scope.checklist = '';   
    $scope.store = {};
    $scope.store.products = [];
	$scope.tabname = '';
    $scope.predicate = 'name';
    $scope.reverse = true;
   
    $scope.myInterval = 3000;
    $scope.slides = [
      {
        image: '../www/img/1.jpg'
      },
      {
        image: '../www/img/2.jpg'
      },
      {
        image: '../www/img/3.jpg'
      },
      {
        image: '../www/img/4.jpg'
      },
      {
          image: '../www/img/5.jpg'
      },
      {
          image: '../www/img/6.jpg'
      }
      
    ];
	/*in app browser loader start n stop*/
$scope.inappbrowserlinnk=function(link){

	var inAppBrowserbRef = null;
	
	inAppBrowserbRef = window.open(encodeURI(link), '_blank', 'location=no,toolbar=no');
	
		inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
        inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
        inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
        inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);
		
         
		 
		 
   function inAppBrowserbLoadStart(event) {
	    
		 //navigator.notification.activityStart("Please Wait", "Its loading....");
      cordova.exec(null, null, 'Notification', 'activityStart', [ "Please Wait", "Its loading...." ]);
		
    }

    function inAppBrowserbLoadStop(event) {
		 //navigator.notification.activityStop();
        cordova.exec(null, null, 'Notification', 'activityStop', []);
		
    }

    function inAppBrowserbLoadError(event) {
	     navigator.notification.activityStop();
        
    }

    function inAppBrowserbClose(event) {
	   
         inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
         inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
         inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
         inAppBrowserbRef.removeEventListener('exit', iabClose);
    }

}
/*IN app browser end*/
	
	
    var _init = function () {

    };

    _init();

  });
