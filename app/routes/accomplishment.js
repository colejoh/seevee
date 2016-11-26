var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');
var controller = require('../controllers/accomplishment');

/*
 * POST: Used for adding new accomplishments.
 * req.body: contains {title, origin, date, description, importance, type}
 */
router.post('/', function(req, res){
    var a = controller.set(null, req.body, req.session.passport.user);
    a.save(function(err){
        if(err) res.send(err);
        res.json({message: "Success!"});
    });
});

/*
 * GET: Sends all accomplishments for the current logged in user
 */
router.get('/', function(req, res) {
    console.log(req.session);
    if(req.session.passport.user === null) res.sendStatus(401);

    var sessionId = req.session.passport.user._id;
    Accomplishment.find({userId: sessionId}, function(err, accomplishments) {
        if(err) {
            res.send(err);
        }
        res.json(accomplishments);
    });
});

/*
 * PUT: Updates the specified accomplishment
 */
router.put('/:accomplishment_id', function(req, res) {
    if(req.session.passport.user === null) res.sendStatus(401);

    Accomplishment.findById(req.params.accomplishment_id, function(err, acc) {
        if(err) res.send(err);

        if(acc._userId != req.session.passport.user._id) res.sendStatus(401);

        var a = controller.set(acc, req.body, req.session.passport.user);

        a.save(function(err) {
           if(err) res.send(err);

           res.json({message: 'Successfully Updated'});
        });
    });
});

/*
 * DELETE: Deletes Specific Accomplishment
 */
router.delete('/:accomplishment_id', function(req, res) {
    if(req.session.passport.user === null) {
        res.sendStatus(401);
    } else {
        Accomplishment.remove({_id: req.params.accomplishment_id}, function(err, accomplishment) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    }
});




module.exports = router;
