'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');

module.exports = router;



router.get('/', function(req, res, next) {
  Test.find().exec().then(function(tests) {
    res.json(tests);
  }, function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  Test.create(req.body).then(function(test) {
    res.json(test);
  }, function(err) {
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