'use strict';

//Events service used to communicate Events REST endpoints
angular.module('inventories').service('InventoryService', ['$http', 'ChannelSelector',
  function ($http, ChannelSelector) {
    this.loadInventories = () => {
      return $http.get(`/api/inventories?selectedChannel=${ChannelSelector.selectedChannel}&page=1&perPage=10`);
    };
  }
]);
