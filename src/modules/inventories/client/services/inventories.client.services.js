angular.module('inventories').service('InventoryService', ['$http', 'ChannelSelector',
  function handleService($http, ChannelSelector) {
    this.loadInventories = () => {
      return $http.get(
        `/api/inventories?selectedChannel=${ChannelSelector.selectedChannel}&page=1&perPage=10`
      );
    };

    this.openProductDetail = (params) => {
      return $http.get(
        `/api/inventories/product?productId=${params.productId}&sku=${params.sku}`
      );
    };
  },
]);
