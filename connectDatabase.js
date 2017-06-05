//require mongoose
var mongoose = require('mongoose');

module.exports = function connection(url) {
	
	//connect to database
	mongoose.connect(url);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function () {
		//connected to database
		console.log('connected successfully to database!');
	});
}