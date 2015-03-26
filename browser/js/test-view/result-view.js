'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('resultView', {
    abstract: true,
    url: '/result/:testId/user/:userId',
    templateUrl: 'js/test-view/test-view.html',
    controller: 'TestViewCtrl',
    resolve: {
      test: function(Test, $stateParams) {
        return Test.get({id: $stateParams.testId}).$promise;
      },
      groups: function(Populate, test) {
        return Populate.query({model: 'Test', id: test._id, field: 'group'}).$promise;
      },
      user: function(User, $stateParams) {
        console.log($stateParams)
        return User.get({id: $stateParams.userId}).$promise;
      },
      isInstructor: function(user, test) {
        return user._id === test.owner;
      },
      isEdit: function($rootScope) {
        return $rootScope.toState.url === '/edit';
      },
      result: function(isEdit, UserFactory, user, test) {
        if (isEdit) return;
        else return UserFactory.getTestResult(user, test);
      }
    },
    data: {
      authenticate: true
    }
  });

  $stateProvider.state('resultView.fileView', {
    url: '/file/:filePath',
    templateUrl: 'js/test-view/directives/file-view/file-view.html',
    controller: 'FileViewCtrl'
  });

  $stateProvider.state('resultView.fileView.take', {
    url:'/take'
  });
})