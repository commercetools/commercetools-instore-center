angular.module('login')
.controller('LoginController',
['$scope',
  'LoginService',
  ($scope, LoginService) => {
    $scope.credentials = {};
    $scope.login = () => {
      LoginService.login($scope.credentials).then((data) => {
        console.log(data);
      });
    };
  },
]);
