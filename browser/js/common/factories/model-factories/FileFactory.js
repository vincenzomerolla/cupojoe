app.factory('FileFactory', function() {
  var factory = {};

  var TreeNode = function(name, body, path) {
    this.name = name;
    this.body = body;
    this.path = path;
    this.children = [];
  };

  var bubbleDown = function(curNodeArr, pathArr) {
    var folderName = pathArr.shift();
    var ind = curNodeArr.indexOfTreeArray(folderName);
    if (ind === -1) {
      var newFolder = new TreeNode(folderName);
      curNodeArr.push(newFolder);
      curNodeArr = newFolder.children;
    } else {
      curNodeArr = curNodeArr[ind].children;
    }
    return curNodeArr;
  };

  Array.prototype.indexOfTreeArray = function(name) {
    return this.reduce(function(prev, cur, ind) {
      return (cur.name === name) ? ind : prev;
    }, -1);
  };

  factory.addToTree = function(root, file) {
    var newFile = new TreeNode(file.name, file.body, file.path);
    var curNodeArr = root;
    if (file.path !== '/') {
      var pathArr = file.path.split('/');
      pathArr.shift(); pathArr.pop();

      while (pathArr.length) {
        curNodeArr = bubbleDown(curNodeArr, pathArr);
      }
    }
    curNodeArr.push(newFile);
  };

  factory.getBodyFromPath = function(root, fullPath) {
    var pathArr = fullPath.split('/');
    pathArr.shift();
    var curNodeArr = root;

    while(pathArr.length > 1) {
      curNodeArr = bubbleDown(curNodeArr, pathArr);
    }
    var ind = curNodeArr.indexOfTreeArray(pathArr[0]);
    return curNodeArr[ind].body;
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