'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('groups', {
    url: '/groups',
    templateUrl: 'js/groups/groups.html',
    controller: 'GroupCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      groups: function(UserGroup, user) {
        return UserGroup.query({userId: user._id}).$promise;
      }
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('GroupCtrl', function($scope, groups) {
  $scope.groups = groups;
});