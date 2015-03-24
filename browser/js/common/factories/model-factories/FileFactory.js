app.factory('FileFactory', function() {
  var factory = {};

  var TreeNode = function(name, body, path, isReadOnly) {
    this.name = name;
    this.body = body;
    this.path = path;
    this.fullPath = path + name;
    this.isReadOnly = isReadOnly;
    this.children = [];
  };

  var bubbleDown = function(curNodeArr, pathArr, path, isReadOnly) {
    var folderName = pathArr.shift();
    var ind = indexOfTreeArray(curNodeArr, folderName);
    if (ind === -1) {
      var newFolder = new TreeNode(folderName, null, path, isReadOnly);
      curNodeArr.push(newFolder);
      curNodeArr = newFolder.children;
    } else {
      curNodeArr[ind].isReadOnly = isReadOnly;
      curNodeArr = curNodeArr[ind].children;
    }
    return curNodeArr;
  };

  var indexOfTreeArray = function(arr, name) {
    return arr.reduce(function(prev, cur, ind) {
      return (cur.name === name) ? ind : prev;
    }, -1);
  };

  factory.addToTree = function(root, file) {
    var newFile = new TreeNode(file.name, file.body, file.path, file.isReadOnly);
    var curNodeArr = root;
    if (file.path !== '/') {
      var pathArr = file.path.split('/');
      pathArr.shift(); pathArr.pop();
      var rootPath = '/'

      while (pathArr.length) {
        var folderName = pathArr[0];
        curNodeArr = bubbleDown(curNodeArr, pathArr, rootPath, file.isReadOnly);
        rootPath += folderName + '/';
      }
    }
    curNodeArr.push(newFile);
  };

  factory.returnFileFromPath = function(root, fullPath) {
    var pathArr = fullPath.split('/');
    pathArr.shift();
    var curNodeArr = root;

    while(pathArr.length > 1) {
      curNodeArr = bubbleDown(curNodeArr, pathArr);
    }
    var ind = indexOfTreeArray(curNodeArr, pathArr[0]);
    return curNodeArr[ind];
  };

  factory.getBodyFromPath = function(root, fullPath) {
    var node = this.returnFileFromPath(root, fullPath);
    return node.body;
  };

  factory.saveBodyWithPath = function(root, fullPath, newBody) {
    this.returnFileFromPath(root, fullPath).body = newBody;
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

  factory.setAllChildren = function(node, bool) {
    var rec_setChildren = function(child) {
      child.isReadOnly = bool;
      child.children.forEach(rec_setChildren);
    };

    rec_setChildren(node);
  };

  factory.setOnPath = function(root, path, bool) {
    var pathArr = path.split('/');
    pathArr.shift(); pathArr.pop();
    var curNodeArr = root;

    while(pathArr.length) {
      curNodeArr = bubbleDown(curNodeArr, pathArr, null, bool);
    }
  };

  factory.checkOnPath = function(root, path, bool) {
    var setAndReturn = function(node) {
      node.isReadOnly = bool;
      return true;
    };

    var checkChildren = function(node) {
      return node.children.every(function(child) {
        return (child.isReadOnly === bool);
      });
    };

    var rec_checkChildren = function(node, pathArr) {
      if (!pathArr.length && checkChildren(node)) {
        return setAndReturn(node);
      }

      var next = indexOfTreeArray(node.children, pathArr.shift());
      if (rec_checkChildren(node.children[next], pathArr)
        && checkChildren(node)) {
        return setAndReturn(node);
      } else return false;
    };

    var pathArr = path.split('/');
    pathArr.shift(); pathArr.pop();
    if (!pathArr.length) return;
    else {
      var startNode = root[indexOfTreeArray(root, pathArr.shift())];
      rec_checkChildren(startNode, pathArr);
    }
  };

  return factory;
});
