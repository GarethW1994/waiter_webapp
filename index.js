'use strict';

//Require external modals
var express = require('express');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var assert = require('assert');
var bodyParser = require('body-parser');

//declare PORT var 3000
var port = process.env.PORT || 5000;

//Initialise Instance of express
var app = express();

//Stacic Files
app.use(express.static('public'));

//init Handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//declare url to mongodb
const mongoURL = process.env.MONGO_DB_URL || "mongodb://Gareth:$gareth@ds147551.mlab.com:47551/waiter_app";


//connect to mongodb
//mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

//Create mongoose Schema
var waiterSchema = new mongoose.Schema({
    waiter_username: {
        type: String,
        required: true
	},
	
	waiter_name: {
		type: String,
		required: true
	},

	waiter_surname: {
		type: String,
	},
	
	waiter_password: {
		type: String,
		required: true
	},
	
	waiter_days: [
		{
		type: String
		}
	]
});

//declare the unique value
waiterSchema.index({waiter_password: 1}, {unique: true});


//Create mongoose model
var waiters = mongoose.model('waiters', waiterSchema);



//login
app.get('/', function (req, res) {
    res.render('login');
});


//get login for users
app.get('/login/:username', function (req, res, next) {
     var user = req.params.username;

     var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	res.render('processDays', {days: dayArr, username: user});
});

app.post('/login/:username', function(req, res, next) {
	var loggedUser = req.params.username;
	var days = req.body.day;
	
	
	
	waiters.find({waiter_username: loggedUser}, function(err, data) {
		if (err) return err;
		
		console.log(data);
		
		waiters.update({waiter_username: loggedUser, waiter_days: JSON.stringify(days)});
		
		res.redirect('/login' + loggedUser);
	});
	//console.log(days);
});




app.get('/days', function(req, res, next) {
	waiters.find({}, function(err, data) {
		res.send(data);
	})
});




///get username
app.post('/login', function(req, res, next) {
    var currentUser = req.body.username;
	var currentPassword = req.body.password;
	
	console.log(currentUser + " " + currentPassword);
	
	var users = "";
	
	if (currentUser !== "") {
		
			waiters.find({waiter_name: currentUser}, function(err, data) {
				if (err) return err;
				
			users = JSON.stringify(data);
				
			}).then(function(){
				
				console.log(users);
				
				if (currentPassword === users.waiter_password) {
			
					console.log(true);
					
					//res.redirect('signup/');
				} else {
					
					console.log(false);
					//res.redirect('login/' + currentUser);
				}
				
			});
		
		
	} else {
		res.redirect('/');
	}
	
});



app.get('/sign-up', function(req, res) {
	res.render('sign-up');
});


app.post('/sign-up', function(req, res) {
	var name = req.body.name;
	var surname = req.body.surname;
	var username = req.body.username;
	var password = req.body.password;
	
	waiters({
		waiter_name: name,
		waiter_surname: surname,
		waiter_username: username,
		waiter_password: password
	}).save(function(err, result) {
		
		if (err) return err;
		
		console.log(result);
		
	}).then( function(){
		res.redirect('/login');
	});
});

app.get('/login', function(req, res) {
	res.render('login');
})








//run server
app.listen(port, function() {
    console.log('server running at http://localhost:' + port);
})