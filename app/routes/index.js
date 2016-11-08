var router = require('express').Router();
router.use('/status', require('./status'));
router.use('/user', require('./user'));
router.use('/accomplishment', require('./accomplishment'));
module.exports = router;
