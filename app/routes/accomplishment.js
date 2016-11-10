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
    accomplishment.dateStart = req.body.dateStart;
    accomplishment.dateEnd = req.body.dateEnd;
    accomplishment.origin = req.body.origin;
    accomplishment.userId = req.body.userId;


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

         accomplishment.title = req.body.title || accomplishment.title;
         accomplishment.description = req.body.description || accomplishment.description;
         accomplishment.dateStart = req.body.dateStart || accomplishment.dateStart;
         accomplishment.dateEnd = req.body.dateEnd || accomplishment.dateEnd;
         accomplishment.origin = req.body.origin || accomplishment.origin;
         accomplishment.userId = req.body.userId || accomplishment.userId;

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

module.exports = router;
