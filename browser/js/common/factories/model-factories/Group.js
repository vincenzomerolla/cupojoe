'use strict';
app.factory('Group', function($resource) {
  return $resource('/api/group/:id', {}, {update: {method: 'PUT'}});
});