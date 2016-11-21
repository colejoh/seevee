var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');

// Gets All Accomplishments
router.get('/', function(req, res) {
     Accomplishment.find(function(err, accomplishments) {
         if(err) {
             res.send(err);
         }
         res.json(accomplishments);
     });
});

module.exports = router;
