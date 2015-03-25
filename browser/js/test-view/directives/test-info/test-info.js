app.directive('testInfo', function(Test, $alert, TestFactory, $state) {
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
        var updateParams = {status: status};
        if (!$scope.test.testType) updateParams.testType = 'mocha';

        Test.update({id: testId}, updateParams).$promise.then(function(test) {
          $scope.test = test;
          $alert({
            title: 'Test Status Changed',
            type: 'success'
          });
          $state.go('dashboard');
        });
      };
    }
  };
});