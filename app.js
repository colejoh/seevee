var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var logger     = require('morgan');
var session    = require('express-session');
var config     = require('./config');
var multer     = require('multer');
var cookie     = require('cookie-parser');
var passport   = require('passport');
var app        = express();

app.use(express.static(__dirname + '/public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
multer();
app.use(logger('dev'));
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(cookie());
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(mongo.mongo.svc.cluster.local);

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router


// Prefixes API with /api. Also directs routes to the route package
app.use('/api', require('./app/routes'));

app.listen(port);
console.log('Starting app on port: ' + port);
