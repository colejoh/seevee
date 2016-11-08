var router = require('express').Router();

router.get('/', function(req, res, next){
    res.status(200).send({message: 'App is running with no errors.'});
});

module.exports = router;
