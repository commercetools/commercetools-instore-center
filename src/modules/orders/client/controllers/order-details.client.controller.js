angular.module('orders')
.controller('OrderDetailsController',
['$scope',
'Orders',
'$stateParams',
'toastr',
  ($scope, Orders, $stateParams, toastr) => {
    $scope.getOrder = () => {
      Orders.get({ id: $stateParams.id },
      (res) => {
        $scope.order = res;
      },
      (err) => {
        toastr.error(`Error getting the order: ${err.data.message}`);
      });
    };
  },
]);
