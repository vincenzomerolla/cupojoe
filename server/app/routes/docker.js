'use strict';

var request = require('request');
var DOCKER_URI = require('../../env/').DOCKER_URI;
var Promise = require('bluebird');

var options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var setOptions = function(method, url, data) {
  options.method = method;
  options.url = DOCKER_URI + url;
  options.json = data;
  return options;
};

module.exports = {
  build: function(data, cb) {
    options = setOptions('POST', '/build', data);
    request.post(options, cb);
  },
  run: function(data) {
    options = setOptions('POST', '/run', data);
    return new Promise(function(resolve, reject) {
      request.post(options, function(error, response, body) {
        if (error) return reject(error);
        // expect std:out to return in body as string
        data.output = body;
        resolve(data);
      });
    });
  }
};