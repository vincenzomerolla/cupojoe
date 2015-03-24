app.directive('testTitle', function($alert, UserGroup, Test) {
  return {
    restrict: 'E',
    templateUrl: 'js/test-view/directives/test-title/test-title.html',
    link: function($scope, elem, attr) {
      UserGroup.query({userId: $scope.user._id}).$promise.then(function(groups) {
        $scope.groups = groups;
      });

      $scope.loadGroups = function(q) {
        return $scope.groups;
      };

      $scope.saveGroups = function(groups) {
        var groupCopy = angular.copy(groups)
        groupCopy = groupCopy.map(function(group) {
          return group._id;
        });
        Test.update({id: $scope.test._id}, {groups: groupCopy}).$promise
        .then(function() {
          $alert({
            title: 'Groups updated',
            type: 'success'
          });
        });
      };
    }
  };
});