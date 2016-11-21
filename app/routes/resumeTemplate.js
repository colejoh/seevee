var router = require('express').Router();
var ResumeTemplate = require('../models/resumeTemplate');
var templates = require('../templates/templates.json');
var fs = require('fs');

// Gets All Accomplishments
router.get('/', function(req, res) {
    var resTemplates = [];
    var pathBase = "app/templates/";
    for(var i = 0; i < templates.length; i++) {
        var tmpObj = {};
        tmpObj.title = templates[i].title;
        tmpObj.description = templates[i].description;
        tmpObj.html = fs.readFileSync(pathBase + templates[i].htmlPath, "utf8");
        resTemplates.push(tmpObj);
    }
    res.json(resTemplates);
});

// Allows addition of new templates
router.post('/', function(req, res){
    var template = new ResumeTemplate();

    template.title = req.body.title;
    template.description = req.body.description;
    template.html = req.body.html;

    template.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'Template Created' });
    });
});

module.exports = router;
