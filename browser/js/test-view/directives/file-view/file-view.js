app.controller('FileViewCtrl', function($scope, $stateParams, $alert, FileFactory, TestFactory, Test) {
  var pageLoad = false;
  $scope.isFileChanged = false;
  var filePath = $stateParams.filePath;

  $scope.fileBody = FileFactory.getBodyFromPath($scope.treedata, filePath);

  $scope.$watch('fileBody', function() {
    if (pageLoad) $scope.isFileChanged = true;
    else pageLoad = true;
  });

  $scope.saveFileChanges = function(fileBody) {
    FileFactory.saveBodyWithPath($scope.treedata, filePath, fileBody);
    var testObj = TestFactory.getUpdatedTestObj($scope.treedata);
    Test.update({id: $stateParams.testId}, testObj).$promise.then(function() {
      $scope.isFileChanged = false;
      $alert({title: 'Changes saved', type: 'success'});
    });
  };
});