app.factory('GroupFactory', function(Group, Session, User) {
  var factory = {};

  factory.submitGroup = function(groupObj) {
    var newGroup = new Group();
    newGroup.name = groupObj.name;
    newGroup.creator = Session.user._id;
    newGroup.members = groupObj.members.map(function(user) {
      return user.text;
    });
    return newGroup.$save().then(function(savedGroup) {
      Session.user.groups.push(savedGroup._id);
      return User.update({id: Session.user._id}, Session.user).$promise;
    });
  };

  factory.saveGroup = function(group) {
    group.members = group.members.map(function(member) {
      return member.text;
    });
    return Group.update({id: group._id}, group).$promise;
  };

  factory.deleteGroup = function(groupId) {
    Group.delete({id: groupId}).$promise.then(function() {
      var ind = Session.user.groups.indexOf(groupId);
      if (ind !== -1) {
        Session.user.groups.splice(ind, 1);
        return User.update({id: Session.user._id}, Session.user).$promise;
      } else return;
    });
  };

  return factory;
});