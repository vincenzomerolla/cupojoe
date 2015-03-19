'use strict';
app.factory('Test', function($resource) {
  return $resource('/api/test/:id', {}, {update: {method: 'PUT'}});
});