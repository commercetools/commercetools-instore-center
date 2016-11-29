angular.module('orders').service('OrderService', ['$http', 'ChannelSelector',
  function handleService($http, ChannelSelector) {
    this.loadOrders = () => {
      return $http.get(
        `/api/orders?selectedChannel=${ChannelSelector.selectedChannel}&page=1&perPage=10`
      );
    };

    this.completeOrder = (params) => {
      return $http.post('/api/orders/complete', params);
    };
  },
]);
