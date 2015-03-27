app.factory('objIndexOf', function() {
  return function(arr, name, key) {
    return arr.reduce(function(prev, cur, ind) {
      return (cur[key] === name) ? ind : prev;
    }, -1);
  };
});