angular.module('inventories').controller('InventoriesController', ['$scope', 'InventoryService',
  ($scope, InventoryService) => {
    $scope.loadInventories = () => {
      InventoryService.loadInventories().then((result) => {
        $scope.inventories = result.data;
        console.log($scope.inventories);
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    }
  }
]);
