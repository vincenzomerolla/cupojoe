app.factory('GithubFactory', function($http) {
  var factory = {};

  factory.getUsers = function(searchStr) {
    return $http.get('https://api.github.com/search/users', {
      params: {
        q: searchStr
      }
    }).then(function(res) {
      return res.data.items.map(function(user) {
        return user.login;
      });
    });
  };

  return factory;
});