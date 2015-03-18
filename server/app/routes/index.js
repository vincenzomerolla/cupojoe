'use strict';
var router = require('express').Router();
module.exports = router;

// router.use('/tutorial', require('./tutorial'));
// router.use('/members', require('./members'));
router.use('/file', require('./file.js'));
router.use('/group', require('./group.js'));
router.use('/result', require('./result.js'));
router.use('/test', require('./test.js'));
router.use('/user', require('./user.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});