angular.module('inventories').controller('InventoriesController', ['$scope', 'InventoryService',
  function ($scope, InventoryService) {
    $scope.loadInventories = () => {
      InventoryService.loadInventories().then(function (result) {
        $scope.inventories = result.data;
        console.log($scope.inventories);
      }, function (error) {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    }
  }
]);
