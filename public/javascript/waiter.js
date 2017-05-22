var days = [];

module.exports = function(data) {
	
	for (var i = 0; i < data.length; i++) {
		data.replace('[', '');
		
		days.push(data[i].waiter_days);
	}
	
	
//	console.log(days[0].replace("r\", ""));
	
	
//	console.log(days[0].replace('\', "/"));
}