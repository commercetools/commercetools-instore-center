angular.module('commons')
  .controller('DaterangepickerCtrl', ($scope, $moment) => {
    $scope.startDate = $moment().subtract(1, 'days').format('MMMM D, YYYY');
    $scope.endDate = $moment().add(31, 'days').format('MMMM D, YYYY');
    $scope.rangeOptions = {
      ranges: {
        Today: [$moment(), $moment()],
        Yesterday: [$moment().subtract(1, 'days'), $moment().subtract(1, 'days')],
        'Last 7 Days': [$moment().subtract(6, 'days'), $moment()],
        'Last 30 Days': [$moment().subtract(29, 'days'), $moment()],
        'This Month': [$moment().startOf('month'), $moment().endOf('month')],
        'Last Month': [
          $moment().subtract(1, 'month').startOf('month'),
          $moment().subtract(1, 'month').endOf('month'),
        ],
      },
      opens: 'left',
      startDate: $moment().subtract(29, 'days'),
      endDate: $moment(),
      parentEl: '#content',
    };
  });
