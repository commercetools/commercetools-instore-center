angular.module('core')
  .directive('setupConfirmationList', () => {
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
  }).directive('setupConfirmationPage', () => {
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
          scope.completeOrder(e.target.dataset.id, e.target.dataset.status);
        });

        element.on('canceled.bs.confirmation', (e) => {
          $(e.target).confirmation('destroy');
        });
      },
    };
  });
