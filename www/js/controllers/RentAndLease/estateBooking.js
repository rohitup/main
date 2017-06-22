angular.module('starter')
.controller('EstateBookingCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $localStorage, $rootScope) {
	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.level = "2";
	$scope.lookUpCode = "ETY";
	disabledDates = [];
	$scope.eventSources2 = [];
	$scope.showPropDetail = false;
	/*Retrieving Category List Start*/
	$ionicLoading.show();
	RestService.getHPrefixData($scope.lookUpCode,$scope.level,$scope.orgId)
	.then(function(response){
		if(response.length > 0){
			$scope.categoryListResponse = response;
			console.log("categoryListResponse: "+JSON.stringify($scope.categoryListResponse));
			$scope.categoryList = new Array();
			for(var i=0;i<$scope.categoryListResponse.length;i++){
				$scope.categoryList.push({
					categoryValue : $scope.categoryListResponse[i].lookUpId,
					categoryName : $scope.categoryListResponse[i].descLangFirst
				})
			}
		}
		else {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$state.go("app.home");
		}
		$ionicLoading.hide();
		console.log("$scope.categoryList: "+JSON.stringify($scope.categoryList));
	},function(categoryerr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$state.go("app.home");
		$ionicLoading.hide();
	})
	/*Retrieving Category List End*/
	$scope.retrievePropertyList = function(item){
		$scope.showPropDetail = false;
		$ionicLoading.show();
		RestService.getRNLPropFilterList(item,$scope.orgId)
		.then(function(response){
			if(response.estatePropResponseDTOs.length > 0 && response.estatePropResponseDTOs != null){
				$scope.showPropDetail = true;
				$scope.propertyListResponse = response;
				console.log("getRNLPropFilterList: "+JSON.stringify($scope.propertyListResponse));
			}
			else {
				toaster.error($filter('translate')('NO_RECORD'));
			}
			$ionicLoading.hide();
		},function(propertyerr){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
	$scope.checkBookingDetails = function(propId){
		$ionicLoading.show();
		$scope.events = new Array();
		$scope.calEventsExt = new Array();
		RestService.getRNLCalendarData(propId,$scope.orgId)
		.then(function(response){
			console.log("response: "+JSON.stringify(response));
			if(response.bookingDTOs.length > 0){
				$scope.calendarDataResponse = response.bookingDTOs;
				console.log("calendarDataResponse: "+JSON.stringify($scope.calendarDataResponse));
				
				
				$scope.calEventsExt = {
					color: '#eb5055',
					textColor: '#ffffff',
					events: []
				};
				for(var i=0;i<$scope.calendarDataResponse.length;i++){
					var shiftId = $scope.calendarDataResponse[i].id;
					var shiftName = $rootScope.capitalise($scope.calendarDataResponse[i].shiftName);
					var shiftDate = $scope.calendarDataResponse[i].fromDate;
					var fromDate = shiftDate.split("-");
					var fy = fromDate[0];
					var fm = fromDate[1]-1;
					var fd = fromDate[2];

					var toDate = $scope.calendarDataResponse[i].toDate.split("-");
					var ty = toDate[0];
					var tm = toDate[1]-1;
					var td = toDate[2];
					
					var fromfTime = 8;
					var tofTime = 22;
					var fromtTime = 30;
					var totTime = 0;
					var startDate = new Date(fy, fm, fd, fromfTime, tofTime);
					var endDate = new Date(ty, tm, td, fromtTime, totTime);
					if(shiftName == "General"){
						$scope.calEventsExt.events.push({
							id: shiftId,
							title : shiftName,
							start : startDate,
							end : endDate
						})
						for (var d = new Date(startDate);d <= new Date(endDate);d.setDate(d.getDate() + 1)){
							disabledDates.push($.datepicker.formatDate('yy-mm-dd', d));
				        }
					}
					else{
						if(shiftName == "Shift1"){
							fromfTime = 8;
							tofTime = 13;
							fromtTime = 0;
							totTime = 30;
						}else if(shiftName == "Shift2"){
							fromfTime = 13;
							tofTime = 18;
							fromtTime = 30;
							totTime = 30;
						}else{
							fromfTime = 18;
							tofTime = 22;
							fromtTime = 30;
							totTime = 00;
						}
						$scope.events.push({
							id: shiftId,
							title : shiftName,
							start : new Date(fy, fm, fd, fromfTime, tofTime),
							end : new Date(ty, tm, td, fromtTime, totTime)
						})
						var dateSearch = $.map($scope.calendarDataResponse, function(val){
						    return val.fromDate == shiftDate ? val.fromDate : null;
						});
						if(dateSearch.length == 3){
							if(disabledDates.indexOf(shiftDate) == -1) {
								disabledDates.push($.datepicker.formatDate('yy-mm-dd', new Date(shiftDate)));
							}
						}
					}
				}
				console.log("disabledDates: "+JSON.stringify(disabledDates));
				console.log("$scope.calEventsExt: "+JSON.stringify($scope.calEventsExt));
				console.log("$scope.events: "+JSON.stringify($scope.events));

			    $scope.eventSources2 = [$scope.calEventsExt, $scope.events];
				console.log(JSON.stringify($scope.eventSources2));
				
			}
			$state.go("app.estateBookingDetails",{"response":JSON.stringify($scope.eventSources2),"propId":propId,"disabledDates":JSON.stringify(disabledDates)});
			$ionicLoading.hide();
		},function(categoryerr){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	}
    var _init = function (){
    };
    _init();
});
