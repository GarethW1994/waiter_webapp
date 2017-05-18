///create server
var express = require('express');
var bodyParser = require('body-parser');

var mongooose = require('mongoose');


var app = express();

var port =













//run server
app.use(port, function() {
    console.log('server running at http://localhost:' + port);
})