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
    $state.go('testView.fileView', {filePath: node.path + node.name});
  };
});

app.controller('FileViewCtrl', function($scope, $stateParams, FileFactory) {
  $scope.fileBody = FileFactory.getBodyFromPath($scope.treedata, $stateParams.filePath);
});