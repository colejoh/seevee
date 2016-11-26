var router = require('express').Router();
var User = require('../models/user');

/*
 * GET: Returns the logged in user
 * This has to be the first method in the user route
 * I have no fucking clue why
 */
router.get('/loggedin',function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

/*
 * GET: Useable for ADMIN to check signed up users
 */
router.get('/', function(req, res) {
     User.find(function(err, users) {
         if(err) res.send(err);
         res.json(users);
     });
});

/*
 * GET: Returns the specific user.
 */
router.get('/:user_id', function(req, res) {
     User.findById(req.params.user_id, function(err, user) {
         if(err) res.send(err);
         res.json(user);
     });
});

/*
 * PUT: Updates the user
 */
router.put('/:user_id', function(req, res) {
    if(req.params.user_id == req.session.passport.user._id) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            }

            user.firstName = req.body.user.firstName || user.firstName;
            user.lastName = req.body.user.lastName || user.lastName;
            user.email = req.body.user.email || user.email;

            user.address.addressLine1 = req.body.address.addressLine1 || user.address.addressLine1;
            user.address.addressLine2 = req.body.address.addressLine2 || user.address.addressLine2;
            user.address.city = req.body.address.city || user.address.city;
            user.address.state = req.body.address.state || user.address.state;
            user.address.zip = req.body.address.zip || user.address.zip;

            user.save(function(err) {
               if(err) {
                   res.send(err);
               }
               res.json({message: 'Successfully Updated'});
            });
        });
    } else {
        res.sendStatus(401);
    }

});

/*
 * DELETE: Deletes the specific user
 */
router.delete('/:user_id', function(req, res) {
    User.remove({_id: req.params.user_id}, function(err, bear) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

/*
 * POST: Updates the user with info specic to them
 */
router.post('/logout', function(req, res) {
    req.logOut();
    res.sendStatus(200);
});

module.exports = router;
