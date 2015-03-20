app.directive('testInfo', function(Test, $alert) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-info/test-info.html',
    link: function($scope, elem, attr) {
      var pageLoad = false;

      $scope.$watch('test.deadline', function() {
        if (pageLoad) {
          Test.update({id: $scope.test._id}, $scope.test).$promise
          .then(function() {
            $alert({
              title: 'Deadline updated',
              placement: 'top-right',
              type: 'success',
              duration: 2
            });
          });
        } else pageLoad = true;
      });
    }
  };
});