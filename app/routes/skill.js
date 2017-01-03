var router = require('express').Router();
var Skill = require('../models/skill');

/*
 * GET: Access the skills document and returns all
 *      that belong to the current user
 */
router.get('/', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        var sessionId = req.session.passport.user._id;
        Skill.find({userId: sessionId}, function(err, skills) {
            if(err) res.send(err);
            res.send(skills);
        });
    }
});

module.exports = router;
