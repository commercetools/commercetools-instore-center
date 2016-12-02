angular.module('inventories').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('inventories', {
        url: '/inventories',
        templateUrl: 'views/inventories.client.view.html',
      })
      .state('product-detail', {
        url: '/inventories/product/:productId/:sku',
        templateUrl: 'views/inventories-detail.client.view.html',
      }).state('check-stores', {
        url: '/inventories/checkStores/:id/:sku',
        templateUrl: 'views/inventories-check-stores.client.view.html',
      });
  },
]);
