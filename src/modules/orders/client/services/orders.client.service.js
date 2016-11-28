angular.module('orders').factory('Orders', ['$resource',
  ($resource) => {
    return $resource('api/orders/:id', {}, {
      update: {
        method: 'PUT',
      },
      totalOrders: {
        method: 'GET',
        url: 'api/orders/totalOrders',
      },
      totalSales: {
        method: 'GET',
        url: 'api/orders/totalSales',
      },
    });
  },
]);
