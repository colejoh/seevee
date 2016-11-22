var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');
var templates = require('../templates/templates.json');
var fs = require('fs');
var pdf = require('html-pdf');

// Gets All Resume Data
router.post('/', function(req, res) {
    var pathBase = "app/templates/";
    var html = fs.readFileSync(pathBase + templates[req.body.id].htmlPath, "utf8");

    pdf.create(html).toStream(function(err, stream){
      stream.pipe(res);
    });
});

module.exports = router;
