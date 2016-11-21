var router = require('express').Router();
var ResumeTemplate = require('../models/resumeTemplate');

// Gets All Accomplishments
router.get('/', function(req, res) {
    res.json([
        {
            'title': 'Work Focused',
            'description': 'Only shows work Accomplishments',
            'html': "<div style='padding: 20px'><div style='text-align: center; font-size: 30px'>{{firstName}} {{lastName}}</div><br><br><div ng-repeat='item in items'>{{item.title}}<br>{{item.description}}<br><br></div></div>"
        },
        {
            'title': 'First Name',
            'description': 'This template will only show your first name',
            'html': '<div>{{firstName}}</div>'
        },
        {
            'title': 'Last Name',
            'description': 'This template will only show your last name',
            'html': '<div>{{lastName}}</div>'
        }
    ]);

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
