app.factory('UserFactory', function(Populate, Result) {
  var factory = {};

  factory.getTestResult = function(user, test) {
    var indexOfResult = function(arr, testId) {
      return arr.reduce(function(prev, cur, ind) {
        return (testId === cur.test) ? ind : prev;
      }, -1);
    };

    return Populate.query({model: 'User', id: user._id, field: 'takenTests'})
      .$promise.then(function(results) {
        var ind = indexOfResult(results, test._id);
        if (ind !== -1) return results[ind];
        else return Result.save({
          status: 'Started',
          test: test._id,
          user: user._id,
          publicFiles: test.publicFiles
        });
      });
  };

  return factory;
});