var router = require('express').Router();

router.use('/accomplishment', require('./accomplishment'));
router.use('/auth', require('./auth'));
router.use('/info', require('./info'));
router.use('/skill', require('./skill'));
router.use('/resume', require('./resume'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/pages', require('./pages'));

module.exports = router;
