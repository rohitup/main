angular.module('starter')
  .controller('reportCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, 
		  ENV, $state, sharedProperties,$http,localStorageService) {
		$scope.reportSelect = {};	
		$scope.data_ = {};
				
		$scope.changeAttr = function(item){
		if($scope.data_.reportDate == "" || $scope.data_.reportDate == null || $scope.data_.reportDate == undefined )
			item.currentTarget.setAttribute("placeholder","Date*");
		else item.currentTarget.setAttribute("placeholder","");
		}

		$scope.viewReport = function(){
			
		if($scope.data_.reportDate != null){
		
			$ionicLoading.show({
				template: 'Loading...'
			});
			
		var recDate = new Date($scope.data_.reportDate);

		function pad(s) { return (s < 10) ? '0' + s : s; }
		var date=[recDate.getFullYear(),pad(recDate.getMonth()+1),pad(recDate.getDate())].join('-');
			//alert(date);
			var orgId = localStorageService.get('orgID');
			var empId = localStorageService.get('empId');
		RestService.dailyCollectionReport(date,orgId).then(function (response) {
						console.log(JSON.stringify(response));
						if(response.resStatus == "success"){
						
							
						$state.go('app.detailreport',{response: JSON.stringify(response.dailyCollectionReportResDTOList)});
						}else{
							
							toaster.error(response.resMsg);
						}
						$ionicLoading.hide();
					}, function (err) {
						toaster.error(err);
						$ionicLoading.hide();
					})
			
			}else{
				toaster.error("Please Select date to view report");
			}
		}
	
    var _init = function (){
	
    };
    _init();
  });
