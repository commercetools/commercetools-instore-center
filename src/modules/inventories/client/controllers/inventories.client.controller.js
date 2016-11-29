angular.module('inventories').controller('InventoriesController', ['$scope', 'InventoryService',
  ($scope, InventoryService) => {
    $scope.loadInventories = () => {
      InventoryService.loadInventories().then((result) => {
        $scope.inventories = result.data;
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
