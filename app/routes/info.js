var router = require('express').Router();
var User = require('../models/user');
var Skill = require('../models/skill');

/*
 * PUT: Updates the user with info specic to them
 */
router.put('/your', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        var sessionId = req.session.passport.user._id;
        User.findOne({_id: sessionId}, function(err, user) {
            user.info.displayName = req.body.name || user.info.displayName;
            user.info.industry = req.body.industry || user.info.industry;

            var phoneNumber = req.body.number || user.info.phoneNumber;
            user.info.phoneNumber = formatPhoneNumber(phoneNumber);

            user.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.sendStatus(200);
            });
        });
    }
});

/*
 * PUT: Updates the user's skills
 */
router.put('/skills', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
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
    }
});

/*
 * PUT: Updates the user's online profiles
 */
router.put('/online', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
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
    }
});

/*
 * makeSkillsArray: Chops string into an array
 * params  - skills: String of skills user thinks they have
 * returns - Array
 */
function makeSkillsArray(skills) {
    var arr = skills.split(',');
    for(var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}

function formatPhoneNumber(number) {
    if(number.length == 10) {
        var areaCode = "(" + number.substring(0,3) + ") ";
        var prefix = number.substring(3,6) + "-";
        var lineNumber = number.substring(6, 10);
        return areaCode + prefix + lineNumber;
    } else {
        return number;
    }
}

module.exports = router;
