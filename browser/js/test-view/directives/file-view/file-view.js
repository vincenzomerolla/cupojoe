app.controller('FileViewCtrl', function($scope, $stateParams, $alert, FileFactory, TestFactory, Test) {
  var pageLoad = false;
  $scope.isFileChanged = false;
  var filePath = $stateParams.filePath;
  $scope.isReadOnly = true;

  $scope.file = FileFactory.returnFileFromPath($scope.treedata, filePath);
  $scope.fileBody = $scope.file.body;

  var fileType = $scope.file.name.substring($scope.file.name.lastIndexOf('.'), $scope.file.name.length);
  var mode;
  if (fileType === '.html') mode = 'HTML';
  else if (fileType === '.css') mode = 'CSS';
  else mode = 'Javascript';

  $scope.aceOptions = {
    mode: mode
  };

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