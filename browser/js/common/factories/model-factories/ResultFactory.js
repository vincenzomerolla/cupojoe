app.factory('ResultFactory', function(Result) {
  var factory = {};

  factory.submitTest = function(resultId) {
    return Result.update({id: resultId}, {status: 'Submitted'}).$promise
    .then(function(result) {
      return Result.run({id: resultId}).$promise;
    });
  };

  factory.updateTestParams = function(params, testId) {
    // params is an object with the keys being the things to change
    return Result.updateQuery({
      query: {test: testId},
      updates: params
    }).$promise;
  };

  return factory;
});