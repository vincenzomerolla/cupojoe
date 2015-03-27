app.filter('groupDisplay', function() {
  return function(arr) {
    return arr.map(function(member) {
      return member.text;
    }).join(', ');
  };
});