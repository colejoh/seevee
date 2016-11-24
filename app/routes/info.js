var router = require('express').Router();
var User = require('../models/user');
var Skill = require('../models/skill');

// Gets All Resume Data
router.put('/your', function(req, res) {
    var sessionId = req.session.passport.user._id;
    User.findOne({_id: sessionId}, function(err, user) {
        user.info.displayName = req.body.name || user.info.displayName;
        user.info.phoneNumber = req.body.number || user.info.phoneNumber;
        user.info.industry = req.body.industry || user.info.industry;

        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.sendStatus(200);
        });
    });
});

router.put('/skills', function(req, res) {
    var sessionId = req.session.passport.user._id;

    // Delete all existing skills... I hate this too
    Skill.find({userId: sessionId}, function(err, skills) {
        for(var i = 0; i < skills.length; i++) {
            Skill.findOne({_id: skills[i]._id}).remove().exec();
        }
    });

    // Insert new ones
    var skills = makeSkillsArray(req.body.skills);

    for(var i = 0; i < skills.length; i++) {
        var newSkill = new Skill();

        newSkill.title = skills[i];
        newSkill.userId = sessionId;

        newSkill.save();
    }

    res.sendStatus(200);
});

router.put('/online', function(req, res) {
    var sessionId = req.session.passport.user._id;
    User.findOne({_id: sessionId}, function(err, user) {
        user.online.website = req.body.website || user.online.displayName;
        user.online.github = req.body.github || user.online.phoneNumber;
        user.online.linkedIn = req.body.linkedin || user.online.industry;

        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.sendStatus(200);
        });
    });
});

function makeSkillsArray(skills) {
    var arr = skills.split(',');
    for(var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}
module.exports = router;
