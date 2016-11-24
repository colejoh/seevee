var router = require('express').Router();
var Accomplishment = require('../models/accomplishment');

// Creates New Accomplishment
router.post('/', function(req, res){
    if(req.session.passport.user === null) {
        req.sendStatus(401);
    } else {
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
        accomplishment.userId = req.session.passport.user._id;


        accomplishment.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Accomplishment Created' });
        });
    }
});

// Gets All Accomplishments
router.get('/', function(req, res) {
    if(req.session.passport.user === null) {
        res.sendStatus(401);
    } else {
        var sessionId = req.session.passport.user._id;
        Accomplishment.find({userId: sessionId}, function(err, accomplishments) {
            if(err) {
                res.send(err);
            }
            res.json(accomplishments);
        });
    }
});

// Gets Specific Accomplishment
router.get('/:accomplishment_id', function(req, res) {
    if(req.session.passport.user === null) {
        res.sendStatus(401);
    } else {
        Accomplishment.findById(req.params.accomplishment_id, function(err, accomplishment) {
            if(err) {
                res.send(err);
            }
            res.json(accomplishment);
        });
    }
});

// Updates Specific Accomplishment
router.put('/:accomplishment_id', function(req, res) {
    if(req.session.passport.user === null) {
        res.sendStatus(401);
    } else {
        Accomplishment.findById(req.params.accomplishment_id, function(err, accomplishment) {
            if(err) {
                res.send(err);
            }

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
    }
});

// Deletes Specific Accomplishment
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
