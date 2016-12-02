angular.module('orders')
.controller('OrdersController',
['$scope',
'OrderService',
'$state',
'toastr',
  ($scope, OrderService, $state, toastr) => {
    $scope.completeOrder = (orderId, newStatus) => {
      OrderService.completeOrder({ orderId, newStatus }).then(() => {
        toastr.success(`Order processed succesfully: -> ${newStatus}`);
        $state.reload();
      }, (error) => {
        toastr.error(`Error processing the order: ${error.data.message}`);
      });
    };
  },
]);
