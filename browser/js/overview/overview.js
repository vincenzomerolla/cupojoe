'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testOverview', {
    url: '/test/:testId/overview',
    templateUrl: 'js/overview/overview.html',
    controller: 'OverviewCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      test: function(Test, $stateParams) {
        return Test.get({id: $stateParams.testId}).$promise;
      },
      groups: function(Populate, test) {
        return Populate.query({
          model: 'test',
          id: test._id,
          field: 'group'
        }).$promise;
      },
      results: function(Populate, test) {
        return Populate.query({
          model: 'test',
          id: test._id,
          field: 'result'
        }).$promise;
      },
      users: function(TestFactory, groups, results) {
        var users = [];
        return TestFactory.populateUsersWithResults(groups, results);
      }
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('OverviewCtrl', function($scope, $state, users, test, user, groups, Socket) {
  if (user._id !== test.owner) $state.go('home');

  $scope.users = users;
  $scope.test = test;
  $scope.groups = groups;

  function reloadState(data) {
    console.log(data)
    if (data._id === test._id) $state.reload();
  } 
  Socket.on('test:updated', reloadState);


  $scope.refilterList = function(groupId) {
    if (groupId) {
      $scope.users = users.filter(function(user) {
        return user.groups.some(function(group) {
          return group._id === groupId
        });
      });
    } else $scope.users = users;
  };
});