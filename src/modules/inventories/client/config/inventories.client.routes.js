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
      });
  },
]);
