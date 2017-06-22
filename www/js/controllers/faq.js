angular.module('starter')

  .controller('FaqCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {
	  $scope.groups = [];
	  
	  $scope.groups = [
	                   { 
	                	name: ' If the application is sent through the internet, where should the necessary documents be submitted?', 
	                	items: [{ subId: 'The applicant can attach the necessary scanned documents while submitting the application form online.However, all the mandatory documents necessary for availing the service, are required to be verified in original at the ULB counter.' }
	                	]},
	                	
	                  /* { 
	                	 name: 'How would I know details about how to apply for a service?', 
	                     items: [{ subId: 'Once you login, and navigate to the Service page, "Help" / "?" option would open a page that would provide Help on usage of the Portal for availing the service.' } 
	                   ]},*/
	                   
	                   { 
	                	 name: 'How do I know the status of my application?',
	                	 items: [{ subId: 'You can track your application status through the "Know your application status" facility provided on every ULB landing page.' } 
	                   ]},
	                   
	                   { 
		                  name: 'In what format do I need to upload the documents?',
		                  items: [{ subId: 'Application supports uploading of documents in following formats:.pdf, .doc, .docx, .jpeg, .jpg, .png, .gif, .bmp, .dxf, .dwg, .zip, .rar The documents are uploaded depending upon services requirement. For example, Building Permission support .dxf and .dwg file format, Birth & Death supports .pdf, .jpg, .jepg formats.' } 
		               ]},
		               
		              /* { 
			              name: 'What is e-Municipality, Bihar?',
			              items: [{ subId: 'Urban Development & Housing Department (UD&HD), Government of Bihar has embarked upon an ambitious plan named “e-Municipality” to reach out to its citizens by providing integrated end-to-end services utilizing advanced tools of Information & Communication Technology (ICT) both for citizen-facing service delivery and back-office computerization.' } 
			           ]},*/
	                 ];
	                 
	                 $scope.toggleGroup = function(group) {
	                   if ($scope.isGroupShown(group)) {
	                     $scope.shownGroup = null;
	                   } else {
	                     $scope.shownGroup = group;
	                   }
	                 };
	                 $scope.isGroupShown = function(group) {
	                   return $scope.shownGroup === group;
	                 };
	  
  })
