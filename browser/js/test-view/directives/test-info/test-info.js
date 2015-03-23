app.directive('testInfo', function(Test, $alert, TestFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-info/test-info.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;

      $scope.$watch('test.deadline', function() {
        if (pageLoad) {
          Test.update({id: $scope.test._id}, {deadline: $scope.test.deadline}).$promise
          .then(function() {
            $alert({
              title: 'Deadline updated',
              type: 'success',
            });
          });
        } else pageLoad = true;
      });

      $scope.changeTestStatus = function(testId, status) {
        TestFactory.updateTestStatus(testId, status).then(function(test) {
          $scope.test = test;
          $alert({
            title: 'Test Status Changed',
            type: 'success'
          });
        });
      };
    }
  };
});