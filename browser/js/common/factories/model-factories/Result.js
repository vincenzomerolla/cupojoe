'use strict';
app.factory('Result', function($resource) {
  return $resource('/api/result/:id', {}, {update: {method: 'PUT'}});
});