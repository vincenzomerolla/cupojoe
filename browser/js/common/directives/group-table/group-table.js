app.directive('groupTable', function(GithubFactory, Session, $alert, UserGroup, GroupFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/group-table/group-table.html',
    scope: {
      groups: '='
    },
    link: function($scope, elem, attr) {
      $scope.showAddButton = true;

      var updateGroups = function() {
        $scope.groups = UserGroup.query({userId: Session.user._id});
        $scope.groups.forEach(function(group) {
          group.members = group.members.map(function(member) {
            return {text: member};
          });
        });
      };

      $scope.toggleAddGroup = function() {
        $scope.showAddButton = !$scope.showAddButton;
      };

      $scope.toggleEditGroup = function(editFlag) {
        editFlag.flag = !editFlag.flag;
      }

      $scope.getGithubMembers = function(searchStr) {
        var data = GithubFactory.getUsers(searchStr);
        return data;
      };

      $scope.submitGroup = function(group) {
        GroupFactory.submitGroup(group).then(function() {
          updateGroups();
          $scope.showAddButton = true;
          $alert({
            title: 'Group saved',
            type: 'success'
          });
        });
      }

      $scope.saveGroup = function(group, editFlag) {
        GroupFactory.saveGroup(group).then(function() {
          $scope.toggleEditGroup(editFlag);
          $alert({
            title: 'Group updated',
            type: 'success'
          });
        });
      }

      $scope.deleteGroup = function(groupId) {
        GroupFactory.deleteGroup(groupId).then(function() {
          updateGroups();
          $alert({
            title: 'Group deleted',
            type: 'danger'
          });
        });
      };
    }
  };
});