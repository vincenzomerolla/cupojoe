app.directive('testInfo', function(Test, $alert, TestFactory, $state, Result, ResultFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-info/test-info.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;
      $scope.isSubmitted = ($scope.result) ? $scope.result.status === 'Submitted' : true;


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
        else updateParams.testType = $scope.test.testType;

        Test.update({id: testId}, updateParams).$promise.then(function(test) {
          $scope.test = test;
          $alert({
            title: 'Test Status Changed',
            type: 'success'
          });
          $state.go('dashboard');
        });
      };

      $scope.runTest = function() {
        $alert({
          title: 'Test sent to server...',
          type: 'info'
        });
        Result.run({id: $scope.result._id}).$promise.then(function(result) {
          $scope.result.output = result.output;
          $alert({
            title: 'Test ouput returned from server, score is ' + Math.round(result.score * 100) + '%',
            type: 'info'
          });
        });
      };

      $scope.submitTest = function() {
        $alert({
          title: 'Test sent to server...',
          type: 'info'
        });
        ResultFactory.submitTest($scope.result._id).then(function(result) {
          $alert({
            title: 'Test successfully submitted!',
            type: 'success'
          });
          $state.go('dashboard');
        });
      };
    }
  };
});