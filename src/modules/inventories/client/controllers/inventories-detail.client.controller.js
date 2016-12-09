angular.module('inventories')
.controller('InventoryDetailController',
['$scope',
'InventoryService',
'$stateParams',
'toastr',
'$rootScope',
  ($scope, InventoryService, $stateParams, toastr, $rootScope) => {
    $scope.openProductDetail = () => {
      const params = { productId: $stateParams.productId,
                       sku: $stateParams.sku,
                       selectedChannel: $rootScope.selectedChannel,
                     };
      InventoryService.openProductDetail(params).then((result) => {
        $scope.data = result.data;
      }, (error) => {
        toastr.error(`Error getting the product details: ${error.data.message}`);
      });
    };
  },
]);
