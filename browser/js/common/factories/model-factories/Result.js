'use strict';
app.factory('Result', function($resource) {
  return $resource('/api/result/:id', {}, {
    update: {method: 'PUT'},
    run: {method: 'GET', url: '/api/result/:id/run'},
    updateQuery: {method: 'PUT'}
  });
});