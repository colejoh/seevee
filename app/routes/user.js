var router = require('express').Router();
var User = require('../models/user');
var Accomplishment = require('../models/accomplishment');

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
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        User.find(function(err, users) {
            if(err) res.send(err);
            res.json(users);
        });
    }
});

/*
 * GET: Returns the specific user.
 */
router.get('/:user_id', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        User.findById(req.params.user_id, function(err, user) {
            if(err) res.send(err);
            res.json(user);
        });
    }
});

/*
 * PUT: Updates the user
 */
router.put('/:user_id', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
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
    }
});

/*
 * DELETE: Deletes the specific user
 */
router.delete('/:user_id', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        if(req.session.passport.user.email === 'cjohnson199@gmail.com') {
            User.remove({_id: req.params.user_id}, function(err, bear) {
                if (err) res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        } else {
            res.json({error: "You Have No Right!"});
        }
    }
});

/*
 * POST: Logs out the user
 */
router.post('/logout', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
        else {
        req.logOut();
        res.sendStatus(200);
    }
});

router.get('/accomplishments/:userId', function(req, res) {
    if(typeof req.session.passport == 'undefined') res.json({error: 'Not Authenticated'});
    else {
        Accomplishment.find({userId: req.params.userId}, function(err, a) {
            res.json(a);
        });
    }
});

module.exports = router;
