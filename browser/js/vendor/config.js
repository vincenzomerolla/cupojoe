app.config(function ($alertProvider, $datepickerProvider, $timepickerProvider, uiSelectConfig) {
  
  angular.extend($timepickerProvider.defaults, {
    iconUp: 'fa fa-angle-up',
    iconDown: 'fa fa-angle-down'
  });

  angular.extend($datepickerProvider.defaults, {
    iconLeft: 'fa fa-angle-left',
    iconRight: 'fa fa-angle-right',
    minDate: 'today'
  });

  angular.extend($alertProvider.defaults, {
    placement: 'bottom-right',
    duration: 2
  });

  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;

});