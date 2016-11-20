var passport = require('passport');
var express = require('express');
var facebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.js');

//Configure Facebook passport Strategy
passport.use(new FacebookStrategy({
    clientID: config.fbAppId,
    clientSecret: config.fbAppSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
