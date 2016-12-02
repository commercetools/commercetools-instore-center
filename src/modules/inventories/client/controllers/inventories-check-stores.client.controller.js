angular.module('inventories')
.controller('InventoriesCheckStoresController',
['$scope',
'InventoryService',
'$stateParams',
  ($scope, InventoryService, $stateParams) => {
    $scope.checkStores = () => {
      const params = { currentId: $stateParams.id, sku: $stateParams.sku };
      InventoryService.checkStores(params).then((result) => {
        $scope.stores = result.data;
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
