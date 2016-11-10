var router = require('express').Router();

// router.get('/', function(req, res, next){
//     res.status(200).send({message: 'App is running with no errors.'});
// });

var User = require('../models/user');

// Creates New User
router.post('/', function(req, res){
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'User Created' });
    });
});

// Gets All Users
router.get('/', function(req, res) {
     User.find(function(err, users) {
         if(err) {
             res.send(err);
         }
         res.json(users);
     });
});

// Gets Specific User
router.get('/:user_id', function(req, res) {
     User.findById(req.params.user_id, function(err, user) {
         if(err) {
             res.send(err);
         }
         res.json(user);
     });
});

// Updates Specific User
router.put('/:user_id', function(req, res) {
     User.findById(req.params.user_id, function(err, user) {
         if(err) {
             res.send(err);
         }

         user.firstName = req.body.firstName || user.firstName;
         user.lastName = req.body.lastName || user.lastName;
         user.email = req.body.email || user.email;

         user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Successfully Updated'});
         });
     });
});

// Deletes Specific User
router.delete('/:user_id', function(req, res) {
    User.remove({
           _id: req.params.user_id
       }, function(err, bear) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
});

module.exports = router;
