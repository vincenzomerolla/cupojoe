app.directive('groupButton', function(UserGroup) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/group-button/group-button.html',
    scope: {
      user: '='
    },
    link: function($scope, elem, attr) {
      $scope.groups = UserGroup.query({userId: $scope.user._id});
    }
  }
});