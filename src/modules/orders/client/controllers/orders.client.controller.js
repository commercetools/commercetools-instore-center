angular.module('orders')
.controller('OrdersController',
['$scope',
'OrderService',
'$state',
  ($scope, OrderService, $state) => {
    $scope.completeOrder = (orderId, newStatus) => {
      OrderService.completeOrder({ orderId, newStatus }).then(() => {
        $state.reload();
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
