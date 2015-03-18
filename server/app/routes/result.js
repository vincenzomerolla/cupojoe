'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Result = mongoose.model('Result');

module.exports = router;



router.get('/', function(req, res, next) {
  Result.find().exec().then(function(results) {
    res.json(results);
  }).catch(function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  Result.create(req.body).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(err);
  });
});





router.use('/:id', function(req, res, next) {
  Result.findById(req.params.id).exec()
  .then(function(result) {
    req.data = result;
  }).catch(function(err) {
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
    req.item.save(function(err, item) {
      if (err) return next(err);
      res.json(item);
    });
  })

  .delete(function(req, res, next) {
    Result.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }).catch(function(err) {
      next(err);
    });
  });