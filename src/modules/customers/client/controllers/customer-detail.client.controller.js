angular.module('customers').controller('CustomerDetailController',
['$scope',
'Customers',
'$stateParams',
'toastr',
'$rootScope',
  ($scope, Customers, $stateParams, toastr, $rootScope) => {
    $scope.selectedSortMethod = 'placedOn-desc';
    $scope.openCustomerDetail = () => {
      Customers.get({ id: $stateParams.id,
                      selectedChannel: $rootScope.selectedChannel,
                    }, (data) => {
        $scope.data = data;
      }, (error) => {
        toastr.error(`Error getting the customer details: ${error.data.message}`);
      });
    };

    $scope.sortData = (sort) => {
      const sortFilters = sort.split('-');
      const mult = sortFilters[1] === 'asc' ? 1 : -1;
      $scope.data.products.sort((a, b) => {
        if (a[sortFilters[0]] > b[sortFilters[0]]) {
          return 1 * mult;
        }
        if (a[sortFilters[0]] < b[sortFilters[0]]) {
          return -1 * mult;
        }
        return 0;
      });
    };
  },
]);
