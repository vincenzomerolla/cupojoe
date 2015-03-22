app.factory('GithubFactory', function ($http, Session) {
  var factory = {};
  var BASE_URL = '/api/github';

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

  factory.getUserRepos = function(user) {
    return $http.get([BASE_URL, 'users', user.username,'repos'].join('/')).then(function(res) {
      return res.data;
    });
  };

  return factory;
});