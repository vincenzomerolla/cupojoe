app.factory('FileFactory', function() {
  var factory = {};

  var TreeNode = function(name, body) {
    this.name = name;
    this.body = body;
    this.children = [];
  };

  Array.prototype.indexOfTreeArray = function(name) {
    return this.reduce(function(prev, cur, ind) {
      return (cur.name === name) ? ind : prev;
    }, -1);
  };

  factory.addToTree = function(root, file) {
    var newFile = new TreeNode(file.name, file.body);
    var curNodeArr = root;
    if (file.path !== '/') {
      var pathArr = file.path.split('/');
      pathArr.shift(); pathArr.pop();

      while (pathArr.length) {
        var folderName = pathArr.shift();
        var ind = curNodeArr.indexOfTreeArray(folderName);
        if (ind === -1) {
          var newFolder = new TreeNode(folderName);
          curNodeArr.push(newFolder);
          curNodeArr = newFolder.children;
        } else {
          curNodeArr = curNodeArr[ind].children;
        }
      }
    }
    curNodeArr.push(newFile);
  };

  factory.getTableObj = function(fileArr) {
    var rtn = [];
    fileArr.forEach(function(file) {
      factory.addToTree(rtn, file);
    });
    return rtn;
  };

  factory.addToTableObj = function(tableObj, fileArr) {
    fileArr.forEach(function(file) {
      factory.addToTree(tableObj, file);
    });
  };

  return factory;
});