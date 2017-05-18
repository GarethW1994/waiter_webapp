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
const mongoURL = process.env.MONGO_DB_URL || "mongodb://GarethW:$ninja123!@ds143191.mlab.com:43191/waiter_app";

//connect to mongodb
mongoose.connect(mongoURL);

//Create mongoose Schema
var waitersSchema = new mongoose.Schema({
    waiter_username: {
        type: String,
        required: true
    }
});

//declare the unique value
waitersSchema.index({waiter_username: 1}, {unique: true});

//Create mongoose model
var waiters = mongoose.model('waiters', waitersSchema);


//login
app.get('/', function (req, res) {
    res.render('login');
});


//get login for users
app.get('/login/:username', function (req, res, next) {
     var user = req.params.username;


});


///get username
app.post('/login', function(req, res, next) {
    var currentUser = req.body.username;

    waiters({
        waiter_username: currentUser
    }).save(function(err, result){
        if (err) return err;

        console.log(result);

        res.redirect('login/'+ currentUser);
    });


    // console.log(username);
});


//run server
app.listen(port, function() {
    console.log('server running at http://localhost:' + port);
})