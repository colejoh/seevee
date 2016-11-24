var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');

// Gets All Resume Data
router.get('/', function(req, res) {
    var sessionId = req.session.passport.user._id;
    Accomplishment.find({userId: sessionId}, function(err, accomplishments) {
        if(err) {
            res.send(err);
        }
        res.json(accomplishments);
    });
});

module.exports = router;
