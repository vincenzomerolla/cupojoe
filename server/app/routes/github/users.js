'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var GithubApi = require('github');
var config = require('../../../env/').GITHUB;

module.exports = router;



var github = new GithubApi({  
  version: '3.0.0',  
});

github.authenticate({
  type: 'oauth',
  key: config.clientID,
  secret: config.clientSecret
})



router.route('/:username/repos')
.get(function(req, res, next) {
  
  github.repos.getFromUser({
    user: req.params.username
  }, function (err, response) {
    if (err) next(err);
    res.json(response);
  })
})