app.directive('testCommands', function(Test, ResultFactory, $alert) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-commands/test-commands.html',
    link: function($scope, elem, attr) {
      var shellPageLoad = false;
      var testPageLoad = false;
      var typePageLoad = false;
      $scope.shellIsFileChanged = false;
      $scope.testIsFileChanged = false;

      $scope.testOptions = ['jasmine', 'mocha'];

      $scope.$watch('test.shellCommands', function() {
        if (shellPageLoad) $scope.shellIsFileChanged = true;
        else shellPageLoad = true;
      });

      $scope.$watch('test.testCommands', function() {
        if (testPageLoad) $scope.testIsFileChanged = true;
        else testPageLoad = true;
      });

      $scope.$watch('test.testType', function() {
        if ($scope.test.status === 'Available' && typePageLoad) {
          Test.update({id: $scope.test._id}, {testType: $scope.test.testType})
          .$promise.then(function(test) {
            return ResultFactory.updateTestParams({testType: test.testType}, test._id);
          }).then(function() {
            $alert ({
              title: 'Test type updated',
              type: 'success'
            });
          });
        } else typePageLoad = true;
      });

      $scope.saveShellCommandChanges = function(commands) {
        Test.update({id: $scope.test._id}, {shellCommands: commands})
        .$promise.then(function() {
          $scope.shellIsFileChanged = false;
          $alert ({
            title: 'Shell commands updated',
            type: 'success',
          });
        });
      };
      $scope.saveTestCommandChanges = function(commands) {
        Test.update({id: $scope.test._id}, {testCommands: commands})
        .$promise.then(function(test) {
          if (test.status === 'Available') {
            return ResultFactory.updateTestParams({testCommands: test.testCommands}, test._id);
          }else return test;
        }).then(function(test) {
          $scope.testIsFileChanged = false;
          $alert ({
            title: 'Test commands updated',
            type: 'success',
          });
        });
      };
    }
  };
});