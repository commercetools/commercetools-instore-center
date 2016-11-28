angular.module('orders').controller('OrdersController', ['$scope', 'OrderService',
  function ($scope, OrderService) {
    $scope.loadOrders = () => {
      OrderService.loadOrders().then(function (result) {
        $scope.orders = result.data;
        console.log(result);
      }, function (error) {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    }
  }
]);
