'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    url: '/test/:testId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl'
  });

  $stateProvider.state('testView.file', {
    url: '/file/:fileId',
    templateUrl: 'js/test-view/file-view.html',
    controller: 'FileViewCtrl'
  });
});

app.controller('TestViewCtrl', function($scope, $stateParams, Test, TestFactory) {
  Test.get({id: $stateParams.testId}).$promise.then(function(test) {
    $scope.treedata = TestFactory.getTableObj(test);
  });

  $scope.opts = {
    dirSelectable: false
  };
});

app.controller('FileViewCtrl', function($scope, $stateParams) {
  
});