angular.module('starter')
  .controller('complaintpagectrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties, $localStorage) {
	  
	  
	  $scope.findtask = function(){
//		  ui-sref="app.complaintresolution"
		  $ionicLoading.show({
				template: 'Loading...'
			});
		  
		  RestService.employeefindtaskservice().then(function (taskresponse) {
			  $scope.emptaskdata = taskresponse;
			  console.log("emptaskdata-->"+JSON.stringify($scope.emptaskdata));
	
			  sharedProperties.setTaskData($scope.emptaskdata);
			  $state.go("app.complainttaskpage");
			  
			  
			  $ionicLoading.hide();
			},
			function (err) {
				 $ionicLoading.hide();
				 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
	  	}

    	
    var _init = function (){
  
    };
    _init();
  });
