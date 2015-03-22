'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');


var GithubApi = require('github');
var config = require('../../../env/').GITHUB;
var github = new GithubApi({  
  version: '3.0.0',  
});

github.authenticate({
  type: 'oauth',
  key: config.clientID,
  secret: config.clientSecret
})


module.exports = router;


router.use('/search', require('./search')(github));
router.use('/repos', require('./repos')(github));