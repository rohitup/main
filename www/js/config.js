"use strict";

 angular.module("starter")
   .constant("ENV", {
     name: "production",
  /* baseURL: "http://103.199.131.203:8080",      //service
   eipURL: "http://103.199.131.203:8080",		//portal
   brmsURL: "http://103.199.131.203:8090",		//BRMS
*/

     
     /*eipURL: "http://abmmainet.biharnagarseva.com",
	 baseURL: "http://abmmainet.biharnagarseva.com",
	 brmsURL: "http://abmmainet.biharnagarseva.com",*/
	 eipURL: "http://192.168.100.230:8080",
	 baseURL: "http://192.168.100.230:8080",
	 brmsURL: "http://192.168.100.198:8090", 
     /*eipURL: "http://182.18.168.246",
	 baseURL: "http://182.18.168.246",
	 brmsURL: "http://182.18.168.246:9100",*/
     /*eipURL: "http://192.168.100.230:8080",
	 baseURL: "http://192.168.100.230:8080",
	 brmsURL: "http://192.168.100.243:8090",*/
	 

	/*prefixURL: "http://192.168.100.48:8080",
	 usageURL: "http://192.168.100.230:8080",*/

//	 biharURL: "http://192.168.100.221:8082/BIHAR_PROJ/",
//	 biharURL: "http://192.168.100.88:8080/BIHAR_PROJ/",
	 biharURL: "http://mock.biharnagarseva.com/udhd/",

     bucket: 'stove-arstist',
     accessKeyId: 'AKIAJSK66SZMN3RRNS2Q',
     secretKey: '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',
     PUSHBOTS_APP_ID: "56779c061779594a6d8b456f",
     GCM_SENDER_ID: "1084889111210"
   });
 