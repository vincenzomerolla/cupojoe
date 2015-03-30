app.filter('groupDisplay', function() {
  return function(arr, key) {
    return arr.map(function(member) {
      return member[key];
    }).join(', ');
  };
});