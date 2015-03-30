app.directive('testInfo', function(Test, $alert, TestFactory, $state, Result, ResultFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-info/test-info.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;
      $scope.isSubmitted = ($scope.result) ? $scope.result.status === 'Submitted' : true;
      $scope.max = 1;


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

        $scope.load.promise = Test.update({id: testId}, updateParams).$promise;
        $scope.load.message = 'Test uploading to server...';
        $scope.load.promise.then(function(test) {
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
        $scope.result.output = 'Test starting';
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
        $scope.result.output = 'Test starting';
        ResultFactory.submitTest($scope.result._id).then(function(result) {
          $alert({
            title: 'Test successfully submitted!',
            type: 'success'
          });
          $state.go('dashboard');
        });
      };

      $scope.repullTest = function() {
        $scope.load.promise = TestFactory.repullTest($scope.test);
        $scope.load.message = 'Test being updated from Github...';

        $scope.load.promise.then(function(test) {
          $state.go('testView.fileView.edit', {testId: test._id});
        });
      };
    }
  };
});