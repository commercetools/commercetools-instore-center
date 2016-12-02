angular.module('orders').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'views/orders.client.view.html',
      }).state('order-details', {
        url: '/orders/:id',
        templateUrl: 'views/order-details.client.view.html',
      });
  },
]);
