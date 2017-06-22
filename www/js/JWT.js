//$scope.orgid = sharedProperties.getorgID();

// Defining our token parts
var header = {
  'alg': 'HS256',
  'typ': 'JWT'
};
 
/*var data = {
  "id": 1337,
  "username": "john.doe"
};*/

//var data = {"applicationId":123123123,"orgId":100,"empId":1,"langId":1};

/*var data = { orgId: "81", lookUpCode :"APT" }*/

/*var data ={ orgId: "81", lookUpCode :"TRF",level:"1"}

var secret = "My very confidential secret!!!";
*/
function base64url(source) {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);
  
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');
  
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');
  
  return encodedSource;
}


function retriveJWTString(data, secretKey)
{
	var tempVar	=	JSON.stringify(header);
	console.log("hehehe---"+tempVar);

	var stringifiedHeader = CryptoJS.enc.Utf8.parse(tempVar);
//	var herdbtoa = window.btoa(tempVar);
//	console.log("herdbtoa---"+herdbtoa);
    console.log("stringifiedHeader--"+stringifiedHeader);
	var encodedHeader = base64url(stringifiedHeader);
	console.log("encodedHeader--"+encodedHeader);
//	document.getElementById("header").innerText =  encodedHeader;
	var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	var encodedData = base64url(stringifiedData);
//	document.getElementById("payload").innerText = encodedData;

	var signature = encodedHeader + "." + encodedData;
	signature = CryptoJS.HmacSHA256(signature, secretKey);
	signature = base64url(signature);
	               
//	alert("---signature---"+signature);
	
	 
	var  jwtToken	=	encodedHeader + "." + encodedData  + "." + signature;
	
//	makeAjaxCall(signature);
	return jwtToken;
}




/*
function makeAjaxCall(jwtToken)
{
	alert("make Ajax Call");
//	var jwtString	=	retriveJWTString();
	
//	var propData	=	{maverick:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywidXNlcm5hbWUiOiJqb2huLmRvZSJ9.EvTdOJS-fbffGHLyND3BMDwWE22zUBOCRspPZEHlNEw'};
	var propData	=	{maverick:jwtToken};

	$.ajax({
			url : "http://192.168.100.88/BIHAR_PROJ/traceApplicationController/getApplicationStatus.ws",
			type : "POST",
			data: propData,
		    contentType: "application/json",
			success : function(data, textStatus, jqXHR) {

				
				
			},
			error : function(XMLHttpRequest, textStatus,
					errorThrown) {if(errorThrown == "abort"){return;}
				$('#iDivBusyLoad').hide();
				alert("Failed to connect server!");
				console.log("XMLHttpRequest ::: "+ JSON.stringify(XMLHttpRequest));
				console.log("textStatus ::: "+ JSON.stringify(textStatus));
				console.log("errorThrown ::: "+ JSON.stringify(errorThrown));
			}
	 	});
}

*/
