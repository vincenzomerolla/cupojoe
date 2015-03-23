'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Group = mongoose.model('Group');

var github = require('./github/githubObj.js');

module.exports = router;



router.get('/', function(req, res, next) {
  var promise;
  if (req.query.username) {
    promise = Group.find({members: {$in: [req.query.username]}}).exec()
      .then(function(foundGroups) {
        return foundGroups.map(function(group) {
          return group._id;
        });
      }).then(function(groups) {
        return Test.find({groups: {$in: groups}}).exec();
      });
  } else {
    promise = Test.find().exec();
  }

  promise.then(function(tests) {
    res.json(tests);
  }, function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {

  var t;

  Test.create(req.body).then(function(test) {
    t = test;
    return User.findByIdAndAddTest(test.owner, test).exec();
  }).then(function(user) {
    return t.populateFiles();
  }).then(function(test) {
    res.json(test);
  }).then(null, function(err) {
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