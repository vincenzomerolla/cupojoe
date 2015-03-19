'use strict';
app.factory('User', function($resource) {
  return $resource('/api/user/:id', {}, {update: {method: 'PUT'}});
});