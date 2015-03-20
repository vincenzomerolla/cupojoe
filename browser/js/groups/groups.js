'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('groups', {
    url: '/groups',
    templateUrl: 'js/groups/groups.html',
    controller: 'GroupCtrl'
  });
});