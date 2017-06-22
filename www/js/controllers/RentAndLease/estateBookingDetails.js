angular.module('starter').controller('EstateBookingDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, $state, $sessionStorage,$localStorage,$ionicPopup,$rootScope) {
	var disabledDates = JSON.parse($stateParams.disabledDates);
	$ionicLoading.show();
	$scope.bookNow = function()
	{
		$ionicLoading.show();
		RestService.getRNLPropData($stateParams.propId,$scope.orgId)
		.then(function(response){
			console.log("getRNLPropData response: "+JSON.stringify(response));
			if(!$sessionStorage.currentDate){
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
				return;
			}
			$state.go("app.estateBookProp",{response:JSON.stringify(response), "disabledDates":JSON.stringify(disabledDates)});
			
			/*Set Checklist and Service Charge Parameter*/
			$sessionStorage.rnlusageSubtype1 = response.usage;
			$sessionStorage.rnlusageSubtype3 = response.type;
			$sessionStorage.rnlusageSubtype4 = response.subType;
			$sessionStorage.rnlfactor1 = response.occupancy;
			$sessionStorage.rnlfactor2 = response.floor;
			//$sessionStorage.rnlfactor2 = "2nd Floor";
			$sessionStorage.rnlroadType = response.roadType;
			
			$ionicLoading.hide();
		},function(categoryerr){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	};
	$scope.orgId = $localStorage.responselogindata.orgId;
	$rootScope.getCurrentDate();
	$scope.eventSources2 = JSON.parse($stateParams.response);
	console.log("$scope.eventSources2 in details: "+JSON.stringify($scope.eventSources2));
	$scope.uiConfig = {
      calendar:{
        height: "auto",
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick
      }
    };
	$scope.alertOnEventClick = function( date, jsEvent, view){
		$ionicLoading.show();
        RestService.getRNLShiftDetail(date.id,$scope.orgId)
    	.then(function(shiftDetailResponse){
    		console.log(JSON.stringify(shiftDetailResponse));
    		/*Booking Details Popup Start*/
	    	var template = "<table class='gridtable noBorderGridTable'>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'BOOKING_ID' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.bookingId+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'PROP_NAME' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.propName+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'APPL_NAME' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.applicantName+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'CONTACT' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.contactNo+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'AREANAME' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.areaName+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'CITY' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.city+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'PINCODE' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.pinCode+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'PURPOSE' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.bookingPuprpose+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'FROM_DATE' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.fromDate+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'TO_DATE' | translate}}</th>"
	    		+"	<td>"+shiftDetailResponse.toDate+"</td>"
	    		+"</tr>"
	    		+"<tr>"
	    		+"	<th class='noFont'>{{'PERIOD' | translate}}</th>"
	    		+"	<td>"+date.title+"</td>"
	    		+"</tr>"
	    	+"</table>";
	        var alertPopup = $ionicPopup.alert({
	           title: $filter('translate')('APPLICANTINFO'),
	           template: template
	        });
	        $ionicLoading.hide();
    	    /*Booking Details Popup End*/
    	},function(categoryerr){
    		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    		$ionicLoading.hide();
    	})
    };
	RestService.getRNLMapData($stateParams.propId,$scope.orgId)
	.then(function(response){
		$ionicLoading.show();
		console.log("response: "+JSON.stringify(response));
		if(response.propLatitude){
			var lat = parseFloat(response.propLatitude);
			var lng = parseFloat(response.propLongitude);
			console.log("lat: "+lat+"|lng: "+lng);
			
			var mapLatLng = {lat: lat, lng: lng};
			var map = new google.maps.Map(document.getElementById('map'), {
				center: mapLatLng,
				zoom: 15
	        });
			
			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({'location': mapLatLng}, function(results, status){
				if(status === google.maps.GeocoderStatus.OK){
					if(results[1]){
						console.log(results[1].place_id);
			    		var infowindow = new google.maps.InfoWindow();
			    		var service = new google.maps.places.PlacesService(map);
				        service.getDetails({
				        	placeId: results[1].place_id
				        },function(place, status) {
				        	if(status === google.maps.places.PlacesServiceStatus.OK){
				        		var marker = new google.maps.Marker({
					            	map: map,
					            	position: place.geometry.location
					            });
					            google.maps.event.addListener(marker, 'click', function(){
					            	infowindow.setContent('<div><strong>'+place.name+'</strong><br>'+place.formatted_address + '</div>');
					            	infowindow.open(map, this);
					            });
				        	}
				        });
			    	}else {
			    		var marker = new google.maps.Marker({
			    			position: mapLatLng,
			    			map: map
			    		});
			    	}
			    }else{
			    	var marker = new google.maps.Marker({
			    		position: mapLatLng,
			    		map: map
			    	});
			    }
			});
			$ionicLoading.hide();
		}
		else {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		}
		
	},function(categoryerr){
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
		$ionicLoading.hide();
	})
	var _init = function (){
		$('.ui-datepicker').hide();
	    $('.hasDatepicker').blur();
	};
	_init();
});
