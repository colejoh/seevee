var router = require('express').Router();
var Skill = require('../models/skill');

/*
 * GET: Access the skills document and returns all
 *      that belong to the current user
 */
router.get('/', function(req, res) {
    var sessionId = req.session.passport.user._id;
    Skill.find({userId: sessionId}, function(err, skills) {
        if(err) res.send(err);
        res.send(skills);
    });
});

module.exports = router;
