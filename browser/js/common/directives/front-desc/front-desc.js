app.directive('frontDesc', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/front-desc/front-desc.html',
    scope: {
      content: '='
    }
  };
});