angular.module('orders').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'views/orders.client.view.html',
        resolve: {
          channels: ['HeaderService', (HeaderService) => {
            return HeaderService.promise;
          }],
        },
      }).state('order-details', {
        url: '/orders/:id',
        templateUrl: 'views/order-details.client.view.html',
        resolve: {
          channels: ['HeaderService', (HeaderService) => {
            return HeaderService.promise;
          }],
        },
      });
  },
]);
