var Accomplishment = require('../models/accomplishment');
var User = require('../models/user');
var Skill = require('../models/skill');
var PDF = require('html-pdf');
var pug = require('pug');

exports.getData = function(id, fn, res, pdf) {
    // Welcome to nest hell
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

            if(user !== null) {
                data.firstName = user.firstName;
                data.lastName = user.lastName;
                data.github = user.online.github;
                data.email = user.email;
                data.phoneNumber = user.info.phoneNumber;
            }

            Skill.find({userId: id}, function(err, s) {
                if(err) return err;
                var skills = s;

                data.skills = skills;

                if(pdf) {
                    PDF.create(fn(data)).toStream(function(err, stream){
                        if(err) res.send(err);
                        stream.pipe(res);
                    });
                } else {
                    res.send(fn(data));
                }
            });
        });
    });
};

exports.sendJson = function(id, res) {
    // Welcome to nest hell
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

            if(user !== null) {
                data.firstName = user.firstName;
                data.lastName = user.lastName;
                data.github = user.online.github;
                data.email = user.email;
                data.phoneNumber = user.info.phoneNumber;
            }

            Skill.find({userId: id}, function(err, s) {
                if(err) return err;
                var skills = s;

                data.skills = skills;

                res.send(data);
            });
        });
    });
};

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
