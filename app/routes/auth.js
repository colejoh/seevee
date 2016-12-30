var router           = require('express').Router();
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook');
var User             = require('../models/user');

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/facebook/callback/',
    passport.authenticate('facebook', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    }));

var envCallbackUrl = process.env.FACEBOOK_CALLBACK || 'http://localhost:8080/api/auth/facebook/callback';

var facebookConfig = {
    clientID        : 1752159591713874,
    clientSecret    : '60bc805973bfdf0d25b40fa9091234b8',
    callbackURL     : envCallbackUrl,
    profileFields   : ['email', 'age_range', 'education', 'gender', 'location', 'name', 'verified']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Facebook
function facebookStrategy(token, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}).then(
        function(user) {
            if(user) {
                return done(null, user);
            } else {
                var newFacebookUser = {
                    firstName:  profile.name.givenName,
                    lastName: profile.name.familyName,
                    email:     profile.emails[0].value,
                    gender:    profile.gender,
                    ageRange: {
                        min: profile._json.age_range.min,
                        max: profile._json.age_range.max
                    },
                    facebookVerified: profile._json.verified,
                    facebook: {
                        id:    profile.id,
                        token: token,
                        name: profile.name.givenName + ' ' + profile.name.familyName,
                        email: profile.emails[0].value
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
