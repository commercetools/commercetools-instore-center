angular.module('inventories').controller('InventoryDetailController',
['$scope',
'InventoryService',
'$stateParams',
  ($scope, InventoryService, $stateParams) => {
    $scope.openProductDetail = () => {
      const params = { productId: $stateParams.productId, sku: $stateParams.sku };
      InventoryService.openProductDetail(params).then((result) => {
        $scope.product = result.data;
        console.log(result);
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
