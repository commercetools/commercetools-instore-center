angular.module('customers').controller('CustomerDetailController',
['$scope',
'Customers',
'$stateParams',
  ($scope, Customers, $stateParams) => {
    $scope.openCustomerDetail = () => {
      Customers.get({ id: $stateParams.id }, (data) => {
        $scope.customer = data;
        console.log(data);
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };
  },
]);
