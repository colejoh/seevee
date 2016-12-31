var router = require('express').Router();

router.get('/:pageName', function(req, res) {
    res.json({ name : req.params.pageName});
});

module.exports = router;
