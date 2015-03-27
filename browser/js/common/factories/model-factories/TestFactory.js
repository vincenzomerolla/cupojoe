app.factory('TestFactory', function(FileFactory, Test, User, Session, objIndexOf) {
  var factory = {};

  var objToJSON = function(tableObj, isReadOnlyName, isEditableName) {
    var obj = {};
    obj[isReadOnlyName] = []; obj[isEditableName] = [];

    function rec_objToJSON(node) {
      if (node.children.length) { // is a folder
        node.children.forEach(rec_objToJSON);
      } else {  // is a file
        var key = node.isReadOnly ? isReadOnlyName : isEditableName;
        obj[key].push(node);
      }
    }

    tableObj.forEach(function(node) {
      rec_objToJSON(node);
    });
    return obj;
  };

  factory.getTableObj = function(test, result) {
    var rtn = FileFactory.getTableObj(test.privateFiles);
    if (result) FileFactory.addToTableObj(rtn, result.publicFiles);
    else FileFactory.addToTableObj(rtn, test.publicFiles);
    return rtn;
  };

  factory.getUpdatedTestObj = function(tableObj) {
    return objToJSON(tableObj, 'privateFiles', 'publicFiles');
  };

  factory.deleteTest = function(testId) {
    return Test.delete({id: testId}).$promise.then(function() {
      var ind = Session.user.testIds.indexOf(testId);
      if (ind !== -1) {
        Session.user.testIds.slice(ind, 1);
        return User.update({id: Session.user._id}, Session.user).$promise;
      } else return;
    });
  };

  factory.updateReadOnlyStatus = function(tableObj, node) {
    FileFactory.setAllChildren(node, node.isReadOnly);
    if (!node.isReadOnly) FileFactory.setOnPath(tableObj, node.path, node.isReadOnly);
    else FileFactory.checkOnPath(tableObj, node.path, node.isReadOnly);
  };

  factory.populateUsersWithResults = function(groups, results) {
    var users = [];
    var resultHash = {};

    results.forEach(function(result) {
      resultHash[result.user.username] = result;
    });

    groups.forEach(function(group) {
      group.members.forEach(function(username) {
        if (objIndexOf(users, username, 'username') === -1) {
          var result = resultHash[username] ? resultHash[username] : {status: 'Not Started', score: 0};
          var _id = result.user ? result.user._id : null;
          users.push({username: username, result: result, _id: _id});
        }
      });
    });

    return users;
  };


  return factory;
});