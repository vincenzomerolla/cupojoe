'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    url: '/test/:testId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl'
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