'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    abstract: true,
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
    templateUrl: 'js/test-view/directives/file-view/file-view.html',
    controller: 'FileViewCtrl'
  });

  $stateProvider.state('testView.fileView.edit', {
    url:'/edit',
    resolve: {
      blah: function($state, isInstructor) {
        if (!isInstructor) return $state.go('home');
        return;
      }
    }
  });

  $stateProvider.state('testView.fileView.take', {
    url:'/take'
  });
});

app.controller('TestViewCtrl', function($scope, test, TestFactory, $state, user) {
  $scope.isEdit = ($state.current.url === '/edit');
  $scope.test = test;
  $scope.treedata = TestFactory.getTableObj(test);

  $scope.opts = {
    dirSelectable: false
  };

  $scope.showFile = function(node) {
    if ($scope.isEdit) $state.go('testView.fileView.edit', {filePath: node.fullPath});
    else $state.go('testView.fileView.take', {filePath: node.fullPath});
  };

  $scope.clickCheckbox = function(node) {
    console.log(node.path);
    TestFactory.updateReadOnlyStatus($scope.treedata, node);
  };
});