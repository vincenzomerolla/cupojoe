app.factory('Populate', function($resource) {
  return $resource('/api/:model/:id/:field', {}, {});
});