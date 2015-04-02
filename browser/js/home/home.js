'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.getLoggedInUser();
          }
        }
    });
});

app.controller('HomeCtrl', function($scope, user, $window, AUTH_EVENTS) {
  $scope.isLoggedIn = !!user;

  var setLogin = function(bool) {
    $scope.isLoggedIn = bool;    
  };

  $scope.$on(AUTH_EVENTS.loginSuccess, function() {
    setLogin(true);
  });
  $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
    setLogin(false);
  });

  $scope.login = function() {
    $window.location.href = '/auth/github';
  };

  $scope.github = {
    img: 'images/Octocat/Octocat.png',
    title: 'Github Integration',
    body: 'Upload tests from your existing Github repositories, making the whole process seamless and easy.'
  };

  $scope.docker = {
    img: 'images/Docker/docker.png',
    title: 'Docker Images',
    body: 'Docker images help us run your test quickly and safely, so you don\'t have to worry about pesky security flaws.'
  };

  $scope.main = {
    img: 'images/computer/computer.png',
    title: 'TDD All Day',
    body: 'Write assessments that depend on Mocha or Jasmine tests so that your students learn how Test Driven Development works. Tests run right in the browser, so they can take your tests anytime, anywhere.'
  }
});