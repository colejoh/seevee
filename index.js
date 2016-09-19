// Setting up dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOveride = require('method-override');
var _ = require('lodash');

// Creating the application
var app = express();

// Adding middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOveride('X-HTTP-Method-Override'));

// CORS Support - CORS makes it a public API (this more middleware)
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Uncomment below to test the server
// app.use('/hello', function(req, res, next){
//     res.send('Hello World!');
//     next();
// });

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/seevee');
mongoose.connection.once('open', function() {

    // Loading the models
    app.models = require('./models/index');

    // Load routes
    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log('listening on port 3000...');
    app.listen(3000);
});
