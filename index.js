'use strict';

//Require external modals
var express = require('express');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var assert = require('assert');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');

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

//flash messages
app.use(cookieParser('keyboard cat'));
app.use(cookieParser('secretString'));
app.use(session({cookie: {maxAge: 60000}}));
app.use(session());
app.use(flash());
app.use(cookieParser());


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


//admin schema
var adminSchema = new mongoose.Schema({
	admin_username: {
        type: String,
        required: true
	},
	
	admin_name: {
		type: String,
		required: true
	},

	admin_surname: {
		type: String,
	},
	
	admin_password: {
		type: String,
		required: true
	}
});


//declare the unique value
waiterSchema.index({waiter_password: 1}, {unique: true});
adminSchema.index({admin_password: 1}, {unique: true});

//Create mongoose model
var waiters = mongoose.model('waiters', waiterSchema);
var admin = mongoose.model('admin', adminSchema);

//flash middleware
app.use(function(req, res, next) {
	res.locals.flash = req.flash();

	next();
});

//home route
app.get('/', function(req, res) {
	res.render('login');
	req.flash('success', "Welcome");
});


//get login for users
app.get('/login/:username', function (req, res, next) {
     var user = req.params.username;

     var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	res.render('processDays', {days: dayArr, username: user});
});



app.post('/update/:username', function(req, res, next) {
	var loggedUser = req.params.username;
	var days = req.body.days;
	
	
	waiters.find({waiter_username: loggedUser}, function(err, data) {
		if (err) return err;
	
	waiters.update({waiter_days: data[0].waiter_days = JSON.stringify(days)}, function(err, result) {
		if (err) return err;
		
		console.log(result);
	});
	}).then(function(result){
		
		res.redirect('/login/'+loggedUser);
	});
	
	//res.send(days);
});





///get username
app.post('/login', function(req, res, next) {
    var currentUser = req.body.username;
	var currentPassword = req.body.password;
	
	var users = "";
	
	if (currentUser !== "") {
		if (currentUser === 'Admin') {
			admin.find({admin_username: currentUser}, function(err, data) {
					if (err) return err;
			}).then(function(data) {
				
			if (data[0].admin_password == currentPassword) {
				console.log(true);
				
				res.redirect('days/' + data[0].admin_name);
			} else {
				console.log(false);
				
				res.render('login', {error: 'Incorrect Password'});
			}
			});
		} else {
		waiters.find({waiter_username: currentUser}, function(err, data) {
			if (err) return err;
			
			//res.send(data);
		}).then(function(data) {
			users = JSON.stringify(data);
		

			if (data[0].waiter_password == currentPassword) {
				console.log(true);
				
				res.redirect('login/' + currentUser);
			} else {
				console.log(false);
				
				res.render('login', {error: 'Incorrect Password'});
			}
		});
		}
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
	
	if (username === 'Admin') {
		admin({
		admin_name: name,
		admin_surname: surname,
		admin_username: username,
		admin_password: password
			
		}).save(function(err, result) {
		if (err) return err;
		
		console.log(result);
			
		}).then( function(){
		res.redirect('/login');
	});	
	} else {
		
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
	}
	
});

app.get('/login', function(req, res) {
	res.render('login');
})


var filterData = require('./public/javascript/waiter');

app.get('/days/:user', function(req, res) {
	waiters.find({}, function(err, data) {
		if (err) return err;
		
		//var waiterData = data;
		
	}).then(function(waiterData) {
		
	//	console.log(filterData(waiterData));
		
		res.render('adminPanel', {data: waiterData, days: waiterData[0].waiter_days});
	});
});





//run server
app.listen(port, function() {
    console.log('server running at http://localhost:' + port);
})