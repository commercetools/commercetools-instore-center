angular.module('customers').controller('CustomerDetailController',
['$scope',
'Customers',
'$stateParams',
'toastr',
  ($scope, Customers, $stateParams, toastr) => {
    $scope.openCustomerDetail = () => {
      Customers.get({ id: $stateParams.id }, (data) => {
        $scope.customer = data;
      }, (error) => {
        toastr.error(`Error getting the customer details: ${error.data.message}`);
      });
    };
  },
]);
