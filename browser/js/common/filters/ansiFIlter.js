app.filter('ansi', function(ansi2html) {
  return function(input) {
    return input ? ansi2html.toHtml(input) : input;
  };
});