app.factory('ResultFactory', function(Result) {
  var factory = {};

  factory.submitTest = function(resultId) {
    return Result.update({id: resultId}, {status: 'Submitted'}).$promise
    .then(function(result) {
      return Result.run({id: resultId}).$promise;
    });
  };

  return factory;
});