app.directive('testCommands', function(Test, $alert) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-commands/test-commands.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;
      $scope.shellIsFileChanged = false;
      $scope.testIsFileChanged = false;

      $scope.$watch('test.shellCommands', function() {
        if (pageLoad) $scope.shellIsFileChanged = true;
        else pageLoad = true;
      });

      $scope.$watch('test.testCommands', function() {
        if (pageLoad) $scope.testIsFileChanged = true;
        else pageLoad = true;
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
        .$promise.then(function() {
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