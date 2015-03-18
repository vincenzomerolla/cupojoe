'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var File = mongoose.model('File');

module.exports = router;



router.get('/', function(req, res, next) {
  File.find().exec().then(function(files) {
    res.json(files);
  }).catch(function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  File.create(req.body).then(function(file) {
    res.json(file);
  }).catch(function(err) {
    next(err);
  });
});





router.use('/:id', function(req, res, next) {
  File.findById(req.params.id).exec()
  .then(function(file) {
    req.data = file;
    next();
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
    File.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }).catch(function(err) {
      next(err);
    });
  });