'use strict';

var router = require('express').Router();


module.exports = function(github) {

  router.route('/users')
  .get(function(req, res, next) {
    
    github.search.users({
      q: req.query.q
    }, function (err, response) {
      if (err) return next(err);
      res.json(response);
    });
  });

  return router;
};
