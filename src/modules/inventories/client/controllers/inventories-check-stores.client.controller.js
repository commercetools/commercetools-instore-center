angular.module('inventories')
.controller('InventoriesCheckStoresController',
['$scope',
'InventoryService',
'$stateParams',
'toastr',
  ($scope, InventoryService, $stateParams, toastr) => {
    $scope.checkStores = () => {
      const params = { currentId: $stateParams.id, sku: $stateParams.sku };
      InventoryService.checkStores(params).then((result) => {
        $scope.stores = result.data;
      }, (error) => {
        toastr.error(`Error getting the stores: ${error.data.message}`);
      });
    };
  },
]);
