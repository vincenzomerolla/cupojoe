'use strict';

var router = require('express').Router();

module.exports = function(github) {

  router.route('/')
  .get(function(req, res, next) {
    
    github.repos.getFromUser({
      user: req.user.username
    }, function (err, response) {
      if (err) next(err);
      res.json(response);
    })
  })

  return router;
}



