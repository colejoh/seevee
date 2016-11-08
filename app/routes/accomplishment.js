var router = require('express').Router();

// router.get('/', function(req, res, next){
//     res.status(200).send({message: 'App is running with no errors.'});
// });

var Accomplishment = require('../models/user');

// Creates New Accomplishment
router.post('/', function(req, res){
    var user = new Accomplishment();
    user.name = req.body.name;

    console.log(req.body.name);

    user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'user created' });
    });
});

// Gets All Accomplishments
router.get('/', function(req, res) {
     Accomplishment.find(function(err, users) {
         if(err) {
             res.send(err);
         }
         res.json(users);
     });
});

// Gets Specific Accomplishment
router.get('/:user_id', function(req, res) {
     Accomplishment.findById(req.params.user_id, function(err, user) {
         if(err) {
             res.send(err);
         }
         res.json(user);
     });
});

// Updates Specific Accomplishment
router.put('/:user_id', function(req, res) {
     Accomplishment.findById(req.params.user_id, function(err, user) {
         if(err) {
             res.send(err);
         }

         user.name = req.body.name;

         user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Successfully Updated'});
         });
     });
});

// Deletes Specific Accomplishment
router.delete('/:user_id', function(req, res) {
    Accomplishment.remove({
           _id: req.params.user_id
       }, function(err, bear) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
});

module.exports = router;
