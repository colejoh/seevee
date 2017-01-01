var router = require('express').Router();
var User = require('../models/user');
var Accomplishment = require('../models/accomplishment');

router.get('/:pageName', function(req, res) {
    User.findOne({pageName: req.params.pageName}, function(err, user) {
        if (err) res.send(err);
        if(user) {
            Accomplishment.find({userId: user._id}, function(err, accomplishments) {
                var work = [];
                for(var i = 0; i < accomplishments.length; i++) {
                    if(accomplishments[i].type === 'work') work.unshift(accomplishments[i]);
                }
                work = sortByKey(work, "dateEnd");

                var data = {};
                data.firstName = user.firstName;
                data.lastName = user.lastName;
                data.workTitle = work[0].title;
                data.workOrigin = work[0].origin;

                res.json(data);
            });
        } else {
            User.findOne({_id: req.params.pageName}, function(err, user) {
                Accomplishment.find({userId: user._id}, function(err, accomplishments) {
                    var work = [];
                    for(var i = 0; i < accomplishments.length; i++) {
                        if(accomplishments[i].type === 'work') work.unshift(accomplishments[i]);
                    }
                    work = sortByKey(work, "dateEnd");

                    var data = {};
                    data.firstName = user.firstName;
                    data.lastName = user.lastName;
                    data.workTitle = work[0].title;
                    data.workOrigin = work[0].origin;

                    res.json(data);
                });
            });
        }
    });
});

router.post('/url', function(req, res){
    User.find({pageName: req.body.slug}, function(err, user) {
        if(user.length === 0) {
            User.findOne({_id: req.session.passport.user._id}, function(err, u) {
                u.pageName = req.body.slug;
                u.save(function(err) {
                    res.json(u);
                });
            });
        }
    });
});

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

module.exports = router;
