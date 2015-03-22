'use strict';
app.factory('UserTest', function($resource) {
  return $resource('/api/user/:userId/test/:testId', {}, {update: {method: 'PUT'}});
});