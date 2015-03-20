app.config(function ($datepickerProvider, $timepickerProvider) {
  angular.extend($timepickerProvider.defaults, {
    iconUp: 'fa fa-angle-up',
    iconDown: 'fa fa-angle-down'
  });
  angular.extend($datepickerProvider.defaults, {
    iconLeft: 'fa fa-angle-left',
    iconRight: 'fa fa-angle-right',
    minDate: 'today'
  });
})