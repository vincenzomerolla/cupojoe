'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Group = mongoose.model('Group');

module.exports = router;



router.get('/', function(req, res, next) {
  Group.find().exec().then(function(groups) {
    res.json(groups);
  }, function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  Group.create(req.body).then(function(group) {
    res.json(group);
  }, function(err) {
    next(err);
  });
});





router.use('/:id', function(req, res, next) {
  Group.findById(req.params.id).exec()
  .then(function(group) {
    req.data = group;
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
    Group.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }, function(err) {
      next(err);
    });
  });
