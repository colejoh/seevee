var Accomplishment = require('../models/accomplishment');
var fs = require('fs');
var pdf = require('html-pdf');
var pug = require('pug');
var router = require('express').Router();
var templates = require('../templates/templates.json');
var path = require('path');
var controller = require('../controllers/resumeItem');


/*
 * GET: Sends all the templates
 */
router.get('/templates', function(req, res) {
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
});

/*
 * GET: Sends the data that is going to be filled in the resume
 */
router.get('/items', function(req, res) {
    var sessionId = req.session.passport.user._id;
    Accomplishment.find({userId: sessionId}, function(err, accomplishments) {
        if(err) {
            res.send(err);
        }
        res.json(accomplishments);
    });
});

/*
 * POST: Renders the resume and sends back a PDF
 */
router.post('/render', function(req, res) {
    var data = {};

    var pathBase = "app/templates/";
    var pugCode = fs.readFileSync(pathBase + templates[req.body.id].pugPath, "utf8");

    var fn = pug.compile(pugCode);
    var html = fn(data);

    pdf.create(html).toStream(function(err, stream){
      stream.pipe(res);
    });
});

module.exports = router;
