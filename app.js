var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var logger     = require('morgan');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config     = require('./config');
var multer     = require('multer');
var cookie     = require('cookie-parser');
var passport   = require('passport');
var app        = express();

app.use(express.static(__dirname + '/public'));

if(process.env.ENV === 'production') {
    app.get('*',function(req,res,next){
      if(req.headers['x-forwarded-proto']!='https')
        res.redirect('https://app.seevee.co'+req.url);
      else
        next(); /* Continue to other routes if we're not redirecting */
    });
}
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
multer();
app.use(logger('dev'));
var envMongoSessionUrl = process.env.MONGO_SESSION_URI || 'mongodb://localhost:27017/seevee-sessions';
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    store: new MongoStore({
        url: envMongoSessionUrl
    })
}));
app.use(cookie());
app.use(passport.initialize());
app.use(passport.session());

var envMongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/seevee';
mongoose.connect(envMongoUrl);

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router



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
