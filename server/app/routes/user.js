'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');

module.exports = router;



router.get('/', function(req, res, next) {
  User.find().exec().then(function(users) {
    res.json(users);
  }, function(err) {
    next(err);
  });
});

router.post('/', function(req, res, next) {
  User.create(req.body).then(function(user) {
    res.json(user);
  }, function(err) {
    next(err);
  });
});


router.param('id', function(req, res, next, id) {
  User.findById(id).exec()
  .then(function(user) {
    req.data = user;
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
    req.item.save(function(err, item) {
      if (err) return next(err);
      res.json(item);
    });
  })

  .delete(function(req, res, next) {
    User.findByIdAndRemove(req.data._id).exec()
    .then(function() {
      res.status(200).end();
    }, function(err) {
      next(err);
    });
  });


router.get('/:id/group', function(req, res, next) {
  User.populate(req.data, 'groups').then(function(user) {
    console.log(user);
    res.json(user.groups);
  });
});
