app.directive('testCommands', function(Test, $alert) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-commands/test-commands.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;
      $scope.isFileChanged = false;

      $scope.$watch('test.shellCommands', function() {
        if (pageLoad) $scope.isFileChanged = true;
        else pageLoad = true;
      });

      $scope.saveCommandChanges = function(commands) {
        Test.update({id: $scope.test._id}, {shellCommands: commands})
        .$promise.then(function() {
          $scope.isFileChanged = false;
          $alert ({
            title: 'Shell commands updated',
            placement: 'top-right',
            type: 'success',
            duration: 2
          });
        });
      };
    }
  };
});