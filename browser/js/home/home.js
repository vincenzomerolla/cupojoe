'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, Test) {
  Test.query().$promise.then(function(tests) {
    $scope.testId = tests[0]._id;
  });
});