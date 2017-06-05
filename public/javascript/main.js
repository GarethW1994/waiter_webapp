module.exports = function main(getDays, panel) {
	var dayMap = {day: '', numberWaiters: 0};
	var splitDays = getDays.split(',');
	
	for (var i = 0; i < splitDays.length; i++) {
		if (dayMap.day[splitDays[i]] === undefined) {
			dayMap.numberWaiters[splitDays[i]] = 0;
		}

		dayMap[splitDays[i]] += 1;
	}
	
	var newDayMap = {day: ""};
	
	for (x in dayMap) {
		
	}
	
		return newDayMap;
}