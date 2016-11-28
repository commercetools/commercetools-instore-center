'use strict';

//Events service used to communicate Events REST endpoints
angular.module('orders').service('OrderService', ['$http', 'ChannelSelector',
  function ($http, ChannelSelector) {
    this.loadOrders = () => {
      return $http.get(`/api/orders?selectedChannel=${ChannelSelector.selectedChannel}&page=1&perPage=10`);
    };
  }
]);
