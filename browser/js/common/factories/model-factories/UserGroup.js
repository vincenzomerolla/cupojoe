'use strict';
app.factory('UserGroup', function($resource) {
  return $resource('/api/user/:userId/group/:groupId', {}, {update: {method: 'PUT'}});
});