var router = require('express').Router();
router.use('/status', require('./status'));
router.use('/user', require('./user'));
router.use('/accomplishment', require('./accomplishment'));
router.use('/resumeItem', require('./resumeItem'));
router.use('/resumeTemplate', require('./resumeTemplate'));
module.exports = router;
