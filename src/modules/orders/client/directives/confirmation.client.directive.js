angular.module('core')
  .directive('setupConfirmation', () => {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        $('[data-toggle=confirmation]').confirmation({
          rootSelector: '[data-toggle=confirmation]',
          // other options
        });
        element.on('click', (e) => {
          $(e.target).confirmation('show');
        });

        element.on('confirmed.bs.confirmation', (e) => {
          scope.completeOrder(e.target.id, 'Complete');
        });

        element.on('canceled.bs.confirmation', (e) => {
          scope.completeOrder(e.target.id, 'Cancelled');
        });
      },
    };
  });
