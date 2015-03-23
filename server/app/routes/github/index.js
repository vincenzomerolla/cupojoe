'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');

var github = require('./githubObj.js');


module.exports = router;


router.use('/search', require('./search')(github));
router.use('/repos', require('./repos')(github));