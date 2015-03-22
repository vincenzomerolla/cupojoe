'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');


module.exports = router;


//router.use('/search', require('./search'));
router.use('/repos', require('./repos'));