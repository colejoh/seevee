var router = require('express').Router();
var User = require('../models/user');

// Creates New User
router.post('/', function(req, res){
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.facebookId = req.body.facebookId;
    user.googleId = req.body.googleId;
    user.addressLine1 = req.body.addressLine1;
    user.addressLine2 = req.body.addressLine2;
    user.city = req.body.city;
    user.state = req.body.state;
    user.phoneNumber = req.body.phoneNumber;
    user.website = req.body.website;
    user.github = req.body.github;
    user.linkedIn = req.body.linkedIn;

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
         user.addressLine1 = req.body.addressLine1 || user.addressLine1;
         user.addressLine2 = req.body.addressLine2 || user.addressLine2;
         user.city = req.body.city || user.city;
         user.state = req.body.state || user.state;
         user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
         user.website = req.body.website || user.website;
         user.github = req.body.github || user.github;
         user.linkedIn = req.body.linkedIn || user.linkedIn;

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
