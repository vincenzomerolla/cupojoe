'use strict';
app.config(function ($stateProvider) {
  $stateProvider.state('newTest', {
    url: '/test/new/',
    templateUrl: 'js/new-test/new-test.html',
    controller: 'NewTestCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      repos: function(user, GithubFactory) {
        return GithubFactory.getUserRepos(user);
      },
      groups: function(UserGroup, user) {
        return UserGroup.query({userId: user._id}).$promise;
      }
    }
  });

});

app.controller('NewTestCtrl', function ($scope, $q, $state, user, repos, groups, UserGroup, Test) {
  
  $scope.repos = repos;
  //$scope.groups = groups;


  var test;
  test = $scope.test = new Test();
  test.owner = user._id;
  test.status = 'Pending';

  function saveTest() {
    test.groups = test.groups.map(function(group) {
      return group._id;
    });
    test.$save()
      .then(function(newTest) {
        console.log(newTest);
        $state.go('testView({testId: newTest._id})');
      });
  }

  function loadGroups(q) {
    return $q.when(groups);
  }

  

  $scope.saveTest = saveTest;
  $scope.loadGroups = loadGroups;
 
});

