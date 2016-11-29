angular.module('inventories').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('inventories', {
        url: '/inventories',
        templateUrl: 'views/inventories.client.view.html',
      });
  },
]);
