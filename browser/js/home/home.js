'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state) {
  $scope.github = {
    img: 'images/Octocat/Octocat.png',
    title: 'Github Integration',
    body: 'Upload tests from your existing Github repositories, making the whole process seamless and easy.'
  };

  $scope.docker = {
    img: 'images/Docker/large_v-trans.png',
    title: 'Docker Images',
    body: 'Docker images help us run your test quickly and safely, so you don\'t have to worry about pesky security flaws.'
  };
});