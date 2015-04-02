app.controller('FileViewCtrl', function($scope, $stateParams, $alert, FileFactory, TestFactory, result, Result) {
  var pageLoad = false;
  $scope.isFileChanged = false;
  var filePath = $stateParams.filePath;
  $scope.isReadOnly = true;

  if (filePath) {
    $scope.file = FileFactory.returnFileFromPath($scope.treedata, filePath);
    $scope.fileBody = $scope.file.body;
    if ($scope.isEdit) {
      $scope.isReadOnly = $scope.file.isReadOnly;
    } else {
      $scope.isReadOnly = $scope.file.isReadOnly || $scope.result.status === 'Submitted';
    }

    var fileType = $scope.file.name.substring($scope.file.name.lastIndexOf('.'), $scope.file.name.length);
    var mode;
    if (fileType === '.html') mode = 'html';
    else if (fileType === '.css') mode = 'css';
    else if (fileType === '.js') mode = 'javascript';

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