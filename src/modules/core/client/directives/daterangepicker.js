angular.module('core')
  .directive('daterangepicker', () => {
    return {
      restrict: 'A',
      scope: {
        options: '=daterangepicker',
        start: '=dateBegin',
        end: '=dateEnd',
        callback: '=callback',
      },
      link: (scope, element) => {
        element.daterangepicker(scope.options, (start, end) => {
          scope.start = start.toDate();
          scope.end = end.toDate();
          scope.callback(scope.start, scope.end);

          scope.$apply();
        });
      },
    };
  });
