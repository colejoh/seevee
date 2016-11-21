var moment = require('moment');
var router = require('express').Router();

// router.get('/', function(req, res, next){
//     res.status(200).send({message: 'App is running with no errors.'});
// });

var Accomplishment = require('../models/accomplishment');

// Creates New Accomplishment
router.post('/', function(req, res){
    var accomplishment = new Accomplishment();
    accomplishment.title = req.body.title;
    accomplishment.description = req.body.description;
    accomplishment.dateStart = getFromDate(req.body.date);
    accomplishment.dateEnd = getToDate(req.body.date);
    accomplishment.origin = req.body.origin;
    accomplishment.type = req.body.type;
    accomplishment.importance = req.body.importance;
    accomplishment.facebookId = req.body.facebookId || accomplishment.facebookId;
    accomplishment.googleId = req.body.googleId || accomplishment.googleId;


    accomplishment.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'Accomplishment Created' });
    });
});


// Gets All Accomplishments
router.get('/', function(req, res) {
     Accomplishment.find(function(err, accomplishments) {
         if(err) {
             res.send(err);
         }
         res.json(accomplishments);
     });
});

// Gets Specific Accomplishment
router.get('/:accomplishment_id', function(req, res) {
     Accomplishment.findById(req.params.accomplishment_id, function(err, accomplishment) {
         if(err) {
             res.send(err);
         }
         res.json(accomplishment);
     });
});

// Updates Specific Accomplishment
router.put('/:accomplishment_id', function(req, res) {
     Accomplishment.findById(req.params.accomplishment_id, function(err, accomplishment) {
         if(err) {
             res.send(err);
         }

         console.log(req.body);

         accomplishment.title = req.body.title;
         accomplishment.description = req.body.description;
         accomplishment.dateStart = getFromDate(req.body.date);
         accomplishment.dateEnd = getToDate(req.body.date);
         accomplishment.origin = req.body.origin;
         accomplishment.type = req.body.type;
         accomplishment.importance = req.body.importance;

         accomplishment.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Successfully Updated'});
         });
     });
});

// Deletes Specific Accomplishment
router.delete('/:accomplishment_id', function(req, res) {
    Accomplishment.remove({
           _id: req.params.accomplishment_id
       }, function(err, accomplishment) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
});

function getFromDate(date) {
    var str = date.substring(0, date.indexOf('-'));
    str = str.trim();
    str = str.toLowerCase();
    return str.replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
    });
}

function getToDate(date) {
    var str = date.substring(date.indexOf('-')+1, date.length);
    str = str.trim();
    str = str.toLowerCase();
    return str.replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
    });
}


module.exports = router;
