var router = require('express').Router();
var templates = require('../templates/templates.json');
var fs = require('fs');

// Gets All Accomplishments
router.get('/', function(req, res) {
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

module.exports = router;
