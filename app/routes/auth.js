var router           = require('express').Router();
var config           = require('./config');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook');
var User             = require('../models/user');

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/facebook/callback/',
    passport.authenticate('facebook', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    }));

var facebookConfig = {
    clientID        : 1752159591713874,
    clientSecret    : '60bc805973bfdf0d25b40fa9091234b8',
    callbackURL     : 'http://localhost:8080/api/auth/facebook/callback'
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Facebook
function facebookStrategy(token, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({'facebook.id': profile.id}).then(
        function(user) {
            if(user) {
                return done(null, user);
            } else {
                var names = profile.displayName.split(" ");
                var newFacebookUser = {
                    lastName:  names[1],
                    firstName: names[0],
                    email:     profile.emails ? profile.emails[0].value:"",
                    facebook: {
                        id:    profile.id,
                        token: token
                    }
                };
                return User.create(newFacebookUser);
            }
        },
        function(err) {
            if (err) { return done(err); }
        }).then(
        function(user){
            return done(null, user);
        },
        function(err){
            if (err) { return done(err); }
        }
    );
}


// Serialize User
function serializeUser(user, done) {
    done(null, user);
}

// Deserialize User
function deserializeUser(user, done) {
    User.findById(user._id, function(err, user) {
        if(err) {
            done(err, null);
        } else {
            done(null, user);
        }
    });
}

module.exports = router;
