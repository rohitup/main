
var datePicker = angular.module('starter');
datePicker.controller('propAssessmentCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $sessionStorage,$rootScope,$stateParams,$ionicModal,$localStorage,$window){
	$scope.view = 'Owner_Detail';
	$scope.allowAdd = true;
	$scope.receiptCollections = new Array();
	
	 $scope.receiptCollections = [
       {
            "Name" : "Alfreds Futterkiste",
            "Country" : "Germany"
        },{
            "Name" : "Berglunds snabbköp",
            "Country" : "Sweden"
        },{
            "Name" : "Centro comercial Moctezuma",
            "Country" : "Mexico"
        },{
            "Name" : "Ernst Handel",
            "Country" : "Austria"
        }
    ]
	
	
	$scope.views = function(event){
		if(event.target.id == 'Owner_Detail'){
			
			
			$scope.view = 'Owner_Details';
		}else if(event.target.id == 'Owner_Details'){
			$scope.details = 'show';
			//$scope.view = 'Property_Details';
		}else if(event.target.id == 'Property_Details'){
			$scope.view = 'Property_Address_Details';
		}else if(event.target.id == 'Property_Address_Details'){
			$scope.view = 'Correspondence_Address';
		}else if(event.target.id == 'Correspondence_Address'){
			$scope.view = 'Last_Payment_Details';
		}
	}
	
	$scope.prevView = function(event){
		if(event.target.id == 'Owner_Details'){
			$scope.view = 'Owner_Detail';
		}else if(event.target.id == 'Property_Details'){
			$scope.view = 'Owner_Details';
		}else if(event.target.id == 'Property_Address_Details'){
			$scope.view = 'Property_Details';
		}else if(event.target.id == 'Correspondence_Address'){
			$scope.view = 'Property_Address_Details';
		}else if(event.target.id == 'Last_Payment_Details'){
			$scope.view = 'Correspondence_Address';
		}
	}
	
	var _init = function(){
	};
	_init();
});