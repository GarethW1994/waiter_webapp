'use strict';
//require express
var express = require('express');

//require mongoose module
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//declare url to mongodb
const mongoURL = process.env.MONGO_DB_URL || "mongodb://Ninja:IT1994!@ds147551.mlab.com:47551/waiter_app";

//Initialise Instance of express
var app = express();

//init Handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Stacic Files
app.use(express.static('public'));


//call external function
var databaseConnection = require('./connectDatabase');
var models = require('./modules');
var appRoutes = require('./routes/appRoutes');

//connect to database
var connection = databaseConnection(mongoURL);

//save schema models
var waiterSchema = models().waiterData;
var adminSchema = models().adminData;

//call routes function
var routes = appRoutes(waiterSchema(), adminSchema());


////////////////////GET ROUTES///////////////////////////
app.get('/', routes.index);

//login route
app.get('/login', routes.login);

//sign-up route
app.get('/sign-up', routes.signUp);

//get login for users
app.get('/login/:username', routes.loggedIn);

//reset data
app.get('/admin/resetData', routes.resetData);

////////////////////////POST ROUTES///////////////////
app.post('/login', routes.userLogin);

app.post('/sign-up', routes.newUser); 

app.post('/update/:username', routes.updateDays);

app.get('/days/:user', routes.adminDashboard);


//declare PORT localhost:5000
var port = process.env.PORT || 5000;

//run server
app.listen(port, function () {
	console.log('server running at http://localhost:' + port);
});