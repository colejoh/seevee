var router = require('express').Router();
var Skill = require('../models/skill');

// Gets All Resume Data
router.get('/', function(req, res) {
    var sessionId = req.session.passport.user._id;
    Skill.find({userId: sessionId}, function(err, skills) {
        if(err) res.send(err);
        res.send(skills);
    });
});

module.exports = router;
