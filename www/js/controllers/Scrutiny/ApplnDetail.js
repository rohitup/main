angular.module('starter')
  .controller('applicationDetailCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, $state, sharedProperties, $localStorage,$sessionStorage,$ionicPopup) {


	  $scope.disabled= true;
	  
	  $scope.edit = function(){ 
		  
		  $ionicLoading.show({ template: 'Loading...' });
		    $scope.disabled = false;
		    $ionicLoading.hide();
		    
		};

var _init = function (){
  
    };
    _init();
  });
