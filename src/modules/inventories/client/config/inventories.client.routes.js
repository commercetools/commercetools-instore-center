angular.module('inventories').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('inventories', {
        url: '/inventories',
        templateUrl: 'views/inventories.client.view.html',
        resolve: {
          channels: ['HeaderService', (HeaderService) => {
            return HeaderService.promise;
          }],
        },
      })
      .state('product-detail', {
        url: '/inventories/product/:productId/:sku',
        templateUrl: 'views/inventories-detail.client.view.html',
        resolve: {
          channels: ['HeaderService', (HeaderService) => {
            return HeaderService.promise;
          }],
        },
      }).state('check-stores', {
        url: '/inventories/checkStores/:id/:sku',
        templateUrl: 'views/inventories-check-stores.client.view.html',
      });
  },
]);
