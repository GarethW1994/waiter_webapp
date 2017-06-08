module.exports = function main(getDays, panel) {

	var newList = [];

	getDays.forEach(function (day) {
		for (var i = 0; i < day.length; i++) {
			newList.push(day[i]);
		};
	});
	
	var dayMap = {};

	for (var i = 0; i < newList.length; i++) {
		if (dayMap[newList[i]] === undefined) {
			dayMap[newList[i]] = 0;
		}
		
		dayMap[newList[i]] += 1;
	}

	var newMap = {};
	
	for (x in dayMap) {
		if (dayMap[x] == 3) {
			newMap[x] = 'green';
		} else if (dayMap[x] < 3) {
			newMap[x] = 'orange';
		} else {
			newMap[x] = 'red';
		}
	}
	
	var weekReport = {};
	var daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	for (var i = 0; i < daysArr.length; i++) {
			weekReport[daysArr[i]] = {
				day: daysArr[i],
				status: newMap[daysArr[i]],
				number: dayMap[daysArr[i]]
			};
	
		if (dayMap[daysArr[i]] === undefined) {
			weekReport[daysArr[i]].number = 0;
		}
	}
	
	return weekReport;
}