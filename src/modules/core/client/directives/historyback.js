angular.module('core')
  .directive('historyBack', ['$window', ($window) => {
    return {
      restrict: 'A',
      link: (scope, element) => {
        element.on('click', () => {
          $window.history.back();
        });
      },
    };
  }]);
