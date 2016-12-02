angular.module('login')
.controller('LoginController',
['$scope',
  'LoginService',
  'toastr',
  ($scope, LoginService, toastr) => {
    $scope.credentials = {};
    $scope.login = () => {
      LoginService.login($scope.credentials).then((data) => {
        console.log(data);
      }, (error) => {
        toastr.error(`Error login in: ${error.data.message}`);
      });
    };
  },
]);
