app.factory('TestFactory', function(FileFactory) {
  var factory = {};

  factory.getTableObj = function(test) {
    var rtn = FileFactory.getTableObj(test.privateFiles);
    FileFactory.addToTableObj(rtn, test.publicFiles);
    return rtn;
  };

  return factory;
});