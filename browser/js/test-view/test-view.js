'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    url: '/test/:testId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl',
    resolve: {
      test: function(Test, $stateParams) {
        return Test.get({id: $stateParams.testId}).$promise;
      },
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      isInstructor: function(user, test) {
        return user._id === test.owner;
      },
    },
    data: {
      authenticate: true
    }
  });

  $stateProvider.state('testView.fileView', {
    url: '/file/:filePath',
    templateUrl: 'js/test-view/file-view.html',
    controller: 'FileViewCtrl'
  });
});

app.controller('TestViewCtrl', function($scope, $stateParams, test, TestFactory, $state, user) {
  $scope.test = test;
  $scope.treedata = TestFactory.getTableObj(test);

  $scope.opts = {
    dirSelectable: false
  };

  $scope.showFile = function(node) {
    $state.go('testView.fileView', {filePath: node.fullPath});
  };
});