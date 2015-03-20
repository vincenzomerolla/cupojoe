'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('newTest', {
    url: '/test/new/',
    templateUrl: 'js/new-test/new-test.html',
    controller: 'NewTestCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  });

});

app.controller('NewTestCtrl', function($scope, $state, user, Test, Session) {
  
  console.log(user)


  var test;
  test = $scope.test = new Test();
  test.owner = user._id;
  test.status = 'Pending';

  function saveTest() {
    test.$save()
      .then(function() {
        $state.go('home');
      })
  }

  $scope.saveTest = saveTest;

 
});

