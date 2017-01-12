var Accomplishment = require('../models/accomplishment');
var fs = require('fs');
var pdf = require('html-pdf');
var pug = require('pug');
var router = require('express').Router();
var templates = require('../templates/templates.json');
var path = require('path');
var controller = require('../controllers/resumeItem');
var sampleData = require('../templates/sample.json');
var handlebars = require('handlebars');

/*
 * GET: Sends all the templates
 */
router.get('/templates', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        var resTemplates = [];
        var pathBase = "app/templates/";
        for(var i = 0; i < templates.length; i++) {
            var tmpObj = {};
            tmpObj.id = templates[i].id;
            tmpObj.title = templates[i].title;
            tmpObj.description = templates[i].description;
            tmpObj.html = fs.readFileSync(pathBase + templates[i].htmlPath, "utf8");
            resTemplates.push(tmpObj);
        }
        res.json(resTemplates);
    }
});

/*
 * GET: Sends the data that is going to be filled in the resume
 */
router.get('/items', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        var sessionId = req.session.passport.user._id;
        controller.sendJson(sessionId, res);
    }
});

/*
 * POST: Renders the resume and sends back a PDF
 */
router.post('/render', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        var pathBase = "app/templates/";
        var template = handlebars.compile(
            fs.readFileSync(pathBase + templates[req.body.id].handlebarsPath, "utf8"));


        controller.getData(req.session.passport.user._id, template, res, true);
    }
});

/*
 * GET: Web preview as you build templates
 */
router.get('/template/:id', function(req, res) {
    var id = req.params.id;
    var pathBase = "app/templates/";
    var handlebarsCode = fs.readFileSync(pathBase + templates[id].handlebarsPath, "utf8");
    var template = handlebars.compile(handlebarsCode);


    controller.getData("5836a74f6a46c46345e4b002", template, res, false);

});

module.exports = router;
