var router = require('express').Router();
var ResumeTemplate = require('../models/resumeTemplate');

// Gets All Accomplishments
router.get('/', function(req, res) {
     ResumeTemplate.find(function(err, templates) {
         if(err) {
             res.send(err);
         }
         res.json(templates);
     });
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
