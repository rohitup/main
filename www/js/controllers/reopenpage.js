angular.module('starter')
  .controller('ReOpenCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties) {
	
	/*function start*/
	$scope.compdescription = false;
//    $scope.show = 1;
    
    $scope.reopencomplaint = function(){
    	$scope.compdescription = true;
    }   
    
    var _init = function (){
  
    };
    _init();
  });
