var router = require('express').Router();
var User = require('../models/user');

router.get('/', function(req, res) {
    if(req.session.passport.user.email === 'cjohnson199@gmail.com') {
        User.find(function(err, users) {
            if(err) res.send(err);
            res.json(users);
        });
    } else {
        res.redirect('/#/');
    }
});

router.get('/isAdmin', function(req, res) {
    if(req.session.passport.user.email === 'cjohnson199@gmail.com') {
        res.json({'isAdmin': true});
    } else {
        res.json({'isAdmin': false});
    }
});

module.exports = router;
