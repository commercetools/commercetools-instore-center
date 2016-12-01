angular.module('orders').service('OrderService', ['$http',
  function handleService($http) {
    this.completeOrder = (params) => {
      return $http.post('/api/orders/complete', params);
    };
  },
]);
