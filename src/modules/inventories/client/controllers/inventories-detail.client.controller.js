angular.module('inventories')
.controller('InventoryDetailController',
['$scope',
'InventoryService',
'$stateParams',
'toastr',
  ($scope, InventoryService, $stateParams, toastr) => {
    $scope.openProductDetail = () => {
      const params = { productId: $stateParams.productId, sku: $stateParams.sku };
      InventoryService.openProductDetail(params).then((result) => {
        $scope.product = result.data;
      }, (error) => {
        toastr.error(`Error getting the product details: ${error.data.message}`);
      });
    };
  },
]);
