angular.module('customers').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'views/customers.client.view.html',
      });
  },
]);
