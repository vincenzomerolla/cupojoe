'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function ($scope) {

    // Images of beautiful Fullstack people.
    $scope.people = [
      {
        fullName: 'Colin VanLang',
        image: 'images/colin.png',
        github: {
          username: 'covlllp',
          url: '//github.com/covlllp',
        },
        linkedin: {
          url: '//linkedin.com/in/colinvanlang'
        }


      },

      {
        fullName: 'Vincenzo Merolla',
        image: 'images/vincenzo.png',
        github: {
          username: 'vincenzomerolla',
          url: '//github.com/vincenzomerolla'
        },
        linkedin: {
          url: '//linkedin.com/in/vincenzomerolla'
        }
        
      }


      
      
    ];

});