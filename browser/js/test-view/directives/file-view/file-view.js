app.controller('FileViewCtrl', function($scope, $stateParams, $alert, FileFactory, TestFactory, result, Result) {
  var pageLoad = false;
  $scope.isFileChanged = false;
  var filePath = $stateParams.filePath;
  $scope.isReadOnly = true;

  if (filePath) {
    $scope.file = FileFactory.returnFileFromPath($scope.treedata, filePath);
    $scope.fileBody = $scope.file.body;
    $scope.isReadOnly = $scope.file.isReadOnly;

    var fileType = $scope.file.name.substring($scope.file.name.lastIndexOf('.'), $scope.file.name.length);
    var mode;
    if (fileType === '.html') mode = 'HTML';
    else if (fileType === '.css') mode = 'CSS';
    else mode = 'Javascript';

    $scope.aceOptions = {
      mode: mode
    };
  } else {
    $scope.file = null;
  }

  $scope.$watch('fileBody', function() {
    if (pageLoad) $scope.isFileChanged = true;
    else pageLoad = true;
  });

  $scope.saveFileChanges = function(fileBody) {
    FileFactory.saveBodyWithPath($scope.treedata, filePath, fileBody);
    var testObj = TestFactory.getUpdatedTestObj($scope.treedata);
    Result.update({id: result._id}, {publicFiles: testObj.publicFiles})
    .$promise.then(function() {
      $scope.isFileChanged = false;
      $alert({title: 'File changes saved', type: 'success'});
    });
  };
});