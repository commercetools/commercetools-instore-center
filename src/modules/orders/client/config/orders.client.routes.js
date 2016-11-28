angular.module('orders').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'views/orders.client.view.html'
      });
  },
]);
