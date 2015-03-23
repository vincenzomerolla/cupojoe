app.directive('testDescription', function(Test, $alert) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-description/test-description.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;
      $scope.descIsFileChanged = false;

      $scope.$watch('test.instructions', function() {
        if (pageLoad) $scope.descIsFileChanged = true;
        else pageLoad = true;
      });

      $scope.saveInstructionChanges = function(instructions) {
        Test.update({id: $scope.test._id}, {instructions: instructions})
        .$promise.then(function() {
          $scope.descIsFileChanged = false;
          $alert({
            title: 'Description updated',
            placement: 'top-right',
            type: 'success',
            duration: 2
          });
        });
      };
    }
  };
});