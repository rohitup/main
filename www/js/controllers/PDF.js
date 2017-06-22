angular.module('starter')

 
 .controller('PDFCtrl', function ($scope, RestService, $ionicLoading, $stateParams, 
		  toaster, $filter, ENV, $state, sharedProperties) {


	  
		  
		  
 $scope.convertPDf = function()
 {
	 
	/* html2canvas(document.getElementById('PDFtableconvert'), {
         onrendered: function (canvas) {
             var data = canvas.toDataURL("image/png");
             alert("dadadad--"+data);
             var docDefinition = {
                 content: [{
                     image: data,
                     width: 500,
                 }]
             };
             pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
         }
     });*/
	 html2canvas(document.getElementById("PDFtableconvert"), {
	        onrendered: function (canvas) {
	            var data = canvas.toDataURL("image/png");
	            
	            var docDefinition = {                      
	                content: [
	                    {
	                        image: data,
	                        width: 525,
	                        alignment: "center"
	                    }
	                ],
	                pageSize: "letter",
	                pageOrientation: "portrait",
	                styles: {
	                    footer: {
	                        fontSize: 8,
	                        alignment: "center",
	                        margin: [0, 0, 0, 80]
	        }
	                }
	            };
	            window.open(data);
	            pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
	        }
	    });
 }	  
		  

		
	
    var _init = function (){
  
    };
    _init();
  });
