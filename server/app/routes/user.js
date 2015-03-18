'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = router;



router.get('/', function(req, res, next) {
  User.find().exec().then(function(users) {
    res.json(users);
  }).catch(function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  User.create(req.body).then(function(user) {
    res.json(user);
  }).catch(function(err) {
    next(err);
  });
});





router.use('/:id', function(req, res, next) {
  User.findById(req.params.id).exec()
  .then(function(user) {
    req.data = user;
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
    User.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }).catch(function(err) {
      next(err);
    });
  });