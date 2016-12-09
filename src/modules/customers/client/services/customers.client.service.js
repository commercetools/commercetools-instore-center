angular.module('customers').factory('Customers', ['$resource',
  ($resource) => {
    return $resource('api/customers/:selectedChannel/:id', {}, {
      update: {
        method: 'PUT',
      },
      totalCustomers: {
        method: 'GET',
        url: 'api/customers/totalCustomers',
      },
      query: {
        method: 'GET',
        isArray: true,
        url: 'api/customers',
      },
    });
  },
]);
