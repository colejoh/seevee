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

var envMongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/seevee';
mongoose.connect(envMongoUrl);

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

app.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Prefixes API with /api. Also directs routes to the route package
app.use('/api', require('./app/routes'));

// These are for pages if the user his the refresh button
// It will send them to the current page, not the root url
app.get('/login', function(req, res) { res.redirect('/#/login'); });
app.get('/info', function(req, res) { res.redirect('/#/info'); });
app.get('/resumes', function(req, res) { res.redirect('/#/resumes'); });
app.get('/account', function(req, res) { res.redirect('/#/account'); });
app.get('/admin', function(req, res) { res.redirect('/#/admin'); });
app.get('/pages', function(req, res) { res.redirect('/#/pages'); });
app.get('*', function(req, res) { res.redirect('/'); });

app.listen(port);
console.log('Starting app on port: ' + port);
