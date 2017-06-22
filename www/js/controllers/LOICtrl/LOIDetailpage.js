angular.module('starter')
    
 .controller('LOIDetailspageCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage,$ionicPlatform) {


$scope.loiSelectionType;
$scope.loiTitle;

var deregisterSecond = $ionicPlatform.registerBackButtonAction(
	      function() {
	    	  			$state.go("app.home");
	      }, 100
	    );
	    $scope.$on('$destroy', deregisterSecond);
	    
$scope.loiDetailForm = function(selection, description){
	$scope.loiSelectionType = selection;
	$localStorage.loiSelectionType = $scope.loiSelectionType;
	$scope.loiTitle = description;
	$localStorage.loiTitle = $scope.loiTitle;
	
	 $state.go("app.loidetails");
}
	 
	 var _init = function (){
  
    };
    _init();
  });
