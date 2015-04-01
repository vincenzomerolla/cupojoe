// 'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Result = mongoose.model('Result');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var io = require('../../io');
var docker = require('./docker.js');

module.exports = router;



router.get('/', function(req, res, next) {
  Result.find(req.body).exec().then(function(results) {
    res.json(results);
  }, function(err) {
    next(err);
  });
});

router.put('/', function(req, res, next) {
  Result.update(req.body.query, req.body.updates, {multi: true}, function(err, numAffected, raw) {
    if (err) return next(err);
    console.log(numAffected, 'results changed');
    res.json(raw);
  });
});

router.post('/', function(req, res, next) {
  var r;
  Result.create(req.body).then(function(result) {
    r = result;
    return User.findByIdAndUpdate(r.user, {$push: {takenTests: r._id}}).exec();
  }).then(function() {
    return Test.findByIdAndUpdate(r.test, {$push: {results: r._id}}).exec();
  }).then(function(data) {
    res.json(r);
  }, function(err) {
    next(err);
  });
});


router.use('/:id', function(req, res, next) {
  Result.findById(req.params.id).exec()
  .then(function(result) {
    req.data = result;
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
    Result.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }, function(err) {
      next(err);
    });
  });

router.route('/:id/run')
  .get(function(req, res, next) {
    docker.run(req.data).then(function(result) {
      result.save(function(err, savedResult) {
        if (err) return next(err);
        res.json(savedResult);
      });
      // res.json({output: result});
    });
  });