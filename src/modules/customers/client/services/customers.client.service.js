angular.module('customers').factory('Customers', ['$resource',
  function ($resource) {
    return $resource('api/customers/:id', {}, {
      update: {
        method: 'PUT'
      },
      totalCustomers: {
        method: 'GET',
        url: 'api/customers/totalCustomers'
      }
    });
  }
]);
