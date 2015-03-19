'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('testView', {
    url: '/test/:testId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl'
  });
});

app.controller('TestViewCtrl', function($scope, $stateParams, Test) {
  Test.get({id: $stateParams.testId}).$promise.then(function(test) {
    console.log(test);
  });

  $scope.treedata = [
    {label: 'hi', id: 1},
    {label: 'hi', id: 6, children: [
      {label: 'hi', id: 2},
      {label: 'hi', id: 3}
    ]},
    {label: 'hi', id: 4}
  ];

  $scope.opts = {
    dirSelectable: false
  };
});