app.directive('groupTable', function(GithubFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/group-table/group-table.html',
    scope: {
      groups: '='
    },
    link: function($scope, elem, attr) {
      $scope.showAddButton = true;

      $scope.addGroup = function() {
        $scope.showAddButton = false;
      };

      $scope.getGithubMembers = function(searchStr) {
        var data = GithubFactory.getUsers(searchStr);
        return data;
      };
    }
  };
});