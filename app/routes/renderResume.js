var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');
var templates = require('../templates/templates.json');
var fs = require('fs');
var pdf = require('html-pdf');
var pug = require('pug');

// Gets All Resume Data
router.post('/', function(req, res) {
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
