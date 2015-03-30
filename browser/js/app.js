'use strict';
var app = angular.module('cupojoe', [
  'ngAnimate',
  'ngResource',
  'ui.router', 
  'fsaPreBuilt', 
  'ui.router', 
  'mgcrea.ngStrap',
  'treeControl',
  'ui.ace',
  'ngTagsInput',
  'ui.select',
  'cgBusy', 
  'ngSanitize',
  'ansiToHtml',
  'btford.markdown'
]);

app.controller('rootCtrl', function($scope, $q) {
  $scope.load = {
    promise: $q.when('hi'),
    message: 'Loading...'
  };
});

app.config(function ($urlRouterProvider, $locationProvider, $animateProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');

    $animateProvider.classNameFilter(/^btn$/);
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };


    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        $rootScope.toState = toState;

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            var destination = user ? toState.name : 'home';
            $state.go(destination, toParams);
        });

    });

});