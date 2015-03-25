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
      },
      results: function(Populate, user) {
        return Populate.query({model: 'user', id: user._id, field: 'takenTests'}).$promise;
      }
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('DashboardCtrl', function($scope, Test, myTests, possibleTests, TestFactory, $alert, UserTest, user, results, indexOf) {
  $scope.myTests = myTests;
  $scope.possibleTests = possibleTests.filter(function(test) {
    return test.status !== 'Pending';
  });
  $scope.possibleTests.forEach(function(test) {
    var ind = indexOf(results, test._id, 'test');
    test.status = (ind === -1) ? 'Not Started' : results[ind].status;
  });

  $scope.deleteTest = function(testId) {
    TestFactory.deleteTest(testId).then(function() {
      $scope.myTests = UserTest.query({userId: user._id});
      $scope.possibleTests = Test.query({username: user.username}).filter(function(test) {
        return test.status !== 'Pending';
      });
      $alert({
        title: 'Test deleted',
        type: 'danger'
      });
    });
  };

  $scope.testsss = function(testId) {
    Test.get({id: testId});
  };
});