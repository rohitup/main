angular.module('starter')
  .controller('CitizenCompReceipt', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, sharedProperties) {
	
	/*function start*/
$scope.receipttoken = "163-1-208-5";
$scope.receiptcomplaint = "Mr. Ruhit Kumar";
$scope.receiptcomplainttype = "Water Department";
$scope.receiptcpmplaintsubtype = "Contaminated Water";
$scope.receiptward = "Head Office";
$scope.receiptdescrition = "The health effects of drinking contaminated water can range from no physical impact to severe illness or even death. ";
	  
	  
    $scope.homepage = function(){$state.go("app.home");}
    	
    var _init = function (){
  
    };
    _init();
  });
