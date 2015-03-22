'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/file', require('./file'));
router.use('/group', require('./group'));
router.use('/result', require('./result'));
router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/github', require('./github'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});