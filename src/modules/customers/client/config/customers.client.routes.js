angular.module('customers').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'views/customers.client.view.html',
      })
      .state('customer-detail', {
        url: '/customers/:id',
        templateUrl: 'views/customers-detail.client.view.html',
      });
  },
]);
