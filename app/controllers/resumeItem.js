var Accomplishment = require('../models/accomplishment');
var User = require('../models/user');
var Skill = require('../models/skill');
var PDF = require('html-pdf');
var pug = require('pug');

var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
            var obj = accomplishments[i];

            if(obj.type === 'work' || obj.type === 'project') {
                obj.dateFromString = MONTH_NAMES[obj.dateFrom.getMonth()] + " " + obj.dateFrom.getFullYear();
                obj.dateToString = MONTH_NAMES[obj.dateTo.getMonth()] + " " + obj.dateTo.getFullYear();
            } else {
                obj.dateString = MONTH_NAMES[obj.date.getMonth()] + " " + obj.date.getFullYear();
            }

            if(obj.type === 'work') work.unshift(obj);
            else if (obj.type === 'project') project.unshift(obj);
            else if (obj.type === 'ed') ed.unshift(obj);
            else if (obj.type === 'honor') honor.unshift(obj);
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
