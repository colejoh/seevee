var router         = require('express').Router();
var User           = require('../models/user');
var Accomplishment = require('../models/accomplishment');

router.get('/:pageName', function(req, res) {
    User.findOne( { pageName: req.params.pageName }, function(err, userByPageName) {
        if (err) res.send(err);
        if(userByPageName) {
            parseFullData(userByPageName._id, res);
        } else {
            User.findOne({_id: req.params.pageName}, function(err, userById) {
                if(userById) {
                    parseFullData(userById._id, res);
                } else {
                    res.json({status: 404});
                }
            });
        }
    });
});

function parseData(res, user, accomplishments) {
    var work = [],
        ed = [],
        project = [],
        honor = [];

    for(var i = 0; i < accomplishments.length; i++) {
        if(accomplishments[i].type === 'work') work.unshift(accomplishments[i]);
        if(accomplishments[i].type === 'ed') ed.unshift(accomplishments[i]);
        if(accomplishments[i].type === 'project') project.unshift(accomplishments[i]);
        if(accomplishments[i].type === 'honor') honor.unshift(accomplishments[i]);
    }

    work     = sortByKey(work, "dateEnd");
    project  = sortByKey(project, "dateEnd");
    ed       = sortByKey(ed, "date");
    honor    = sortByKey(honor, "date");

    var color = '';
    if(user.page.color === 'red') color = '#F44336';
    else if (user.page.color === 'blue') color = '#2196F3';
    else if (user.page.color === 'green') color = '#4CAF50';
    else if (user.page.color === 'black') color = '#373737';

    var data = {
        firstName: user.firstName,
        lastName: user.lastName,
        work: {
            title: work[0].title,
            origin: work[0].origin
        },
        project: {
            title: project[0].title,
        },
        ed: {
            title: ed[0].title,
            origin: ed[0].origin
        },
        honor: {
            title: honor[0].title,
            origin: honor[0].origin
        },
        settings: {
            showWork: user.page.showWork,
            showProject: user.page.showProject,
            showEd: user.page.showEd,
            showHonor: user.page.showHonor,
            color: color
        },
        status: 200
    };

    res.json(data);
}

function parseFullData(id, res) {
    var data = {};
    Accomplishment.find({userId: id}, function(err, a) {
        if(err) return err;
        var accomplishments = sortByKey(a, "importance");
        var work = [];
        var project = [];
        var ed = [];
        var honor = [];

        for(var i = 0; i < accomplishments.length; i++) {
            if(accomplishments[i].type === 'work') work.unshift(accomplishments[i]);
            else if (accomplishments[i].type === 'project') project.unshift(accomplishments[i]);
            else if (accomplishments[i].type === 'ed') ed.unshift(accomplishments[i]);
            else if (accomplishments[i].type === 'honor') honor.unshift(accomplishments[i]);
        }

        data.work = work;
        data.project = project;
        data.ed = ed;
        data.honor = honor;

        User.findOne({_id: id}, function(err, user) {
            if(err) return err;

            var color = '';
            if(user.page.color === 'red') color = '#F44336';
            else if (user.page.color === 'blue') color = '#2196F3';
            else if (user.page.color === 'green') color = '#4CAF50';
            else if (user.page.color === 'black') color = '#373737';
            user.page.color = color;

            data.user = user;

            res.send(data);
        });
    });
}

router.post('/url', function(req, res){
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        User.find({pageName: req.body.slug}, function(err, user) {
            if(user.length === 0) {
                User.findOne({_id: req.session.passport.user._id}, function(err, u) {
                    u.pageName = req.body.slug;
                    u.save(function(err) {
                        res.json(u);
                    });
                });
            } else {
                res.json({error: 'Page already exists with that name'});
            }
        });
    }
});

router.post('/settings', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        User.findOne({_id: req.session.passport.user._id}, function(err, u) {
            u.page.showWork    = req.body.work;
            u.page.showProject = req.body.project;
            u.page.showEd      = req.body.ed;
            u.page.showHonor   = req.body.honor;

            u.save(function(err) {
                if(err) res.send(err);
                res.json(u);
            });
        });
    }
});

router.post('/theme', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        User.findOne({_id: req.session.passport.user._id}, function(err, u) {
            var color = req.body.color;
            if(color === 'red' || color === 'blue' || color === 'black' || color === 'green') {
                u.page.color = color;

                u.save(function(err) {
                    if(err) res.send(err);
                    res.json(u);
                });
            } else {
                res.json({status: 500});
            }
        });
    }
});

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

module.exports = router;
