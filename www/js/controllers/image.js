angular.module('starter')

  .controller('ImageCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

	  
	  $scope.imageuplod = function(){
		  alert("fhg");  
		  
		  RestService.imgup().then(function (response) {
			 alert("ander call ayaya");
			 alert("=====-"+response);
			 
			 alert("staus---"+response.status)
			 
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
		
	  };
	  
	  $scope.imageupload = function(fileObject){
			 
		 var idValue	=	fileObject.getAttribute("id");
		 verfy  = fileObject.files[0];
			
			var reader = new FileReader();
			reader.onload = function(e){
			console.log("about to encode");
			$scope.encoded_file = window.btoa(e.target.result.toString());  
			console.log("encoded byte--"+$scope.encoded_file);

		 };
			reader.readAsBinaryString(verfy);
		};  
			
		
	  	
	/*	$scope.imageuplod11 = function($file){
			  var verfy =  document.getElementById('verfiyFile').files[0];  
			  $scope.selectfilename = verfy.name;
			  console.log("name=----"+$scope.selectfilename);
			  var reader = new FileReader();
			  reader.onload = function(e){
			    console.log("about to encode");
			    $scope.encoded_file = window.btoa(e.target.result.toString());  
			    console.log("encoded byte--"+$scope.encoded_file);
//			    alert("encoded byte--"+$scope.encoded_file);
			  };
			  reader.readAsBinaryString(verfy);
		  };*/
	  

  })
