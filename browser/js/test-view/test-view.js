'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    url: '/test/:testId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl'
  });

  $stateProvider.state('testView.fileView', {
    url: '/file/:filePath',
    templateUrl: 'js/test-view/file-view.html',
    controller: 'FileViewCtrl'
  });
});

app.controller('TestViewCtrl', function($scope, $stateParams, Test, TestFactory, $state) {
  Test.get({id: $stateParams.testId}).$promise.then(function(test) {
    $scope.treedata = TestFactory.getTableObj(test);
  });

  $scope.opts = {
    dirSelectable: false
  };

  $scope.showFile = function(node) {
    $state.go('testView.fileView', {filePath: node.fullPath});
  };
});

app.controller('FileViewCtrl', function($scope, $stateParams, $timeout, FileFactory, TestFactory, Test) {
  var pageLoad = false;
  $scope.showStatus = false;
  $scope.isFileChanged = false;
  var filePath = $stateParams.filePath;

  $scope.fileBody = FileFactory.getBodyFromPath($scope.treedata, filePath);

  $scope.$watch('fileBody', function() {
    if (pageLoad) $scope.isFileChanged = true;
    else pageLoad = true;
  });

  $scope.saveFileChanges = function(fileBody) {
    FileFactory.saveBodyWithPath($scope.treedata, filePath, fileBody);
    var test = TestFactory.getUpdatedTestObj($scope.treedata);
    Test.update({id: $stateParams.testId}, test).$promise.then(function() {
      $scope.showStatus = true;
      $timeout(function() {
        $scope.showStatus = false;
      }, 2000);
    });
  };
});