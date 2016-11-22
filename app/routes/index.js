var router = require('express').Router();
router.use('/accomplishment', require('./accomplishment'));
router.use('/renderResume', require('./renderResume'));
router.use('/resumeItem', require('./resumeItem'));
router.use('/resumeTemplate', require('./resumeTemplate'));
router.use('/user', require('./user'));
module.exports = router;
