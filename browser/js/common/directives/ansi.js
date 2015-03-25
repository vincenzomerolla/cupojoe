app.directive('ansi', function(ansi2html) {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    link: function($scope, elem, attr) {
      var getHtml = function(text) {
        return text ? ansi2html.toHtml(text) : text;
      };

      elem.html(getHtml($scope.text));

      $scope.$watch('text', function(cur, prev) {
        elem.html(getHtml(cur));
      });
    }
  };
});