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
        return UserTest.query({userId: user._id}).$promise;
      },
      possibleTests: function(Test, user) {
        return Test.query({username: user.username}).$promise;
        // return Test.query().$promise;
      }
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('DashboardCtrl', function($scope, myTests, possibleTests, TestFactory, $alert, UserTest, user) {
  $scope.myTests = myTests;
  $scope.possibleTests = possibleTests.filter(function(test) {
    return test.status !== 'Pending';
  });

  $scope.deleteTest = function(testId) {
    TestFactory.deleteTest(testId).then(function() {
      $scope.myTests = UserTest.query({userId: user._id});
      $alert({
        title: 'Test deleted',
        type: 'danger'
      });
    });
  }
});