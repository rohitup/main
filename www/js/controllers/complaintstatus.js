angular.module('starter')
  .controller('Complaintstatusctrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, $ionicPopup) {

	  $scope.showPopup = function() {
	      $scope.data = {}
	    
	      // Custom popup
	      var myPopup = $ionicPopup.show({
	         template: '<input type = "text" ng-model = "data.model" placeholder="Thank you for giving valuable feedback!!!">',
	         title: 'FeedBack',
//	         subTitle: 'Subtitle',
	         scope: $scope,
				
	         buttons: [
	            { text: 'Cancel' }, {
	               text: '<b>Save</b>',
	               type: 'button-positive',
	                  onTap: function(e) {
							
	                     if (!$scope.data.model) {
	                        //don't allow the user to close unless he enters model...
	                           e.preventDefault();
	                     } else {
	                        return $scope.data.model;
	                     }
	                  }
	            }
	         ]
	      });

	      myPopup.then(function(res) {
	         console.log('Tapped!', res);
	      });    
	   };
	  
	  $scope.showtable = function() {
		  
		  var tempvar = '<tr>'+
			'<th class="head" width="100%" colspan="2"><div align="center">Complaint Status</div></th>'+
			'<th>Date</th>'+
			'<th>From Employee</th>'+
			'<th>To Employee</th>'+
			'<th>Action Taken</th>'+
			'</tr>';
		  
			tempvar = tempvar +
			'<tr>'+
			'<td><span>19-12-2016</span></td>'+
			'<td><span>ABC</span></td>'+
			'<td><span>XYZ</span></td>'+
			'<td><span>aaaa</span></td>'+
			'</tr>';
			
			var tempvar = '<table class="gridtable">'+tempvar+'</table>';

			doctable = doctable+tempvar;
			
			document.getElementById('DocData').innerHTML	=	doctable;
			
	  };
	  
	  $scope.showPopuptable = function() {
	      $scope.data = {}
	    
	      // Custom popup
	      var myPopup = $ionicPopup.show({
	         template: '<table class="gridtable">'+
	   		 '<tr>'+
	            '<th>Complaint No</th>'+
	            '<th>Date</th>'+
	            '<th>Status</th>'+
//	           '<th>Remarks</th>'+
	         '</tr>'+
	                     
	         '<tr>'+
	             '<td>123</td>'+
	             '<td>19-12-2016</td>'+
	             '<td>Closed</td>'+
//	             '<td></td>'+
	          '</tr>',
	         title: 'FeedBack',
//	         subTitle: 'Subtitle',
	         scope: $scope,
				
	         buttons: [
	            { text: 'Cancel' }, {
	               text: '<b>Ok</b>',
	               type: 'button-positive',
	                  onTap: function(e) {
							
	                     if (!$scope.data.model) {
	                        //don't allow the user to close unless he enters model...
	                           e.preventDefault();
	                     } else {
	                        return $scope.data.model;
	                     }
	                  }
	            }
	         ]
	      });

	      myPopup.then(function(res) {
	         console.log('Tapped!', res);
	      });    
	   };
	  
    	
    var _init = function (){
  
    };
    _init();
  });