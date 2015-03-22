'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'js/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      myTests: function(UserTest, user) {
        return UserTest.query({userId: user._id}).$promise.then(function(user) {
          return user.testIds;
        });
      }
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('DashboardCtrl', function($scope, myTests) {
  $scope.myTests = myTests;
  console.log(myTests);
});