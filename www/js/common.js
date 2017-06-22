	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	function pad(s) { return (s < 10) ? '0' + s : s; }
	function formatDate(myDate) {
		if(myDate == "" || myDate == null || myDate == undefined) return "";
		else 
		{
			var d = new Date(myDate);
			return [pad(d.getDate()),monthNames[d.getMonth()], d.getFullYear()].join('-');
		}
	}
	function makeFloat(number){
		var num = number;
		if(num != '' || num==0){
			return num+".00";
		}
		else{
			return num;
		}
	}
	function fullmandatory(checkkMANDATORY){
		var fullcheckkMANDATORYDesc;
		if(checkkMANDATORY == "Y") fullcheckkMANDATORYDesc = "Mandatory";
		else if(checkkMANDATORY == "N") fullcheckkMANDATORYDesc = "Optional";
		else fullcheckkMANDATORYDesc = "";
		return fullcheckkMANDATORYDesc;
	}
	function capitalise(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	
	
	