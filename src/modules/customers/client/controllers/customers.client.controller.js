angular.module('customers').controller('CustomersController', ['$scope', 'Customers',
  ($scope, Customers) => {
    $scope.loadCustomers = () => {
      Customers.query(1, 10).$promise.then((result) => {
        console.log(result);
        $scope.customers = result;
        console.log($scope.customers);
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
