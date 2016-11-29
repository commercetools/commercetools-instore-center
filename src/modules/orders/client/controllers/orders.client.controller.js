angular.module('orders').controller('OrdersController', ['$scope', 'OrderService',
  ($scope, OrderService) => {
    $scope.loadOrders = () => {
      OrderService.loadOrders().then((result) => {
        $scope.orders = result.data;
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };

    $scope.completeOrder = (orderId, newStatus) => {
      OrderService.completeOrder({ orderId, newStatus }).then((result) => {
        $scope.loadOrders();
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
