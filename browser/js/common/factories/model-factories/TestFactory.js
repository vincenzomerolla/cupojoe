app.factory('TestFactory', function(FileFactory) {
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

  factory.getTableObj = function(test) {
    var rtn = FileFactory.getTableObj(test.privateFiles);
    FileFactory.addToTableObj(rtn, test.publicFiles);
    return rtn;
  };

  factory.getUpdatedTestObj = function(tableObj) {
    return objToJSON(tableObj, 'privateFiles', 'publicFiles');
  };



  return factory;
});