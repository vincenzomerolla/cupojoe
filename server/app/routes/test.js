'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');

var GithubApi = require('github');
var config = require('../../env/').GITHUB;

module.exports = router;



var github = new GithubApi({  
  version: '3.0.0',  
});

github.authenticate({
  type: 'oauth',
  key: config.clientID,
  secret: config.clientSecret
})




router.get('/', function(req, res, next) {
  Test.find().exec().then(function(tests) {
    res.json(tests);
  }, function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {

  var t;

  Test.create(req.body).then(function(test) {
    t = test;
    return User.findByIdAndAddTest(req.session.passport.user, test).exec();
  })
  .then(function(user) {
    res.json(t);
  })
  .then(null, function(err) {
    next(err);
  });
});





router.use('/:id', function(req, res, next) {
  Test.findById(req.params.id).exec()
  .then(function(test) {
    req.data = test;
    next();
  }, function(err) {
    next(err);
  });
});

router.route('/:id')
  .get(function(req, res, next) {
    res.json(req.data);
  })

  .put(function(req, res, next) {
    for (var key in req.body) {
      req.data[key] = req.body[key];
    }
    req.data.save(function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  })

  .delete(function(req, res, next) {
    Test.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }, function(err) {
      next(err);
    });
  });