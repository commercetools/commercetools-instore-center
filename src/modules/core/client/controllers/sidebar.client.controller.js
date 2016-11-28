angular.module('core').controller('SidebarCtrl', ['$scope', function ($scope) {
  $scope.oneAtATime = false;

  $scope.status = {
    isFirstOpen: true,
    isSecondOpen: true,
    isThirdOpen: true,
  };
}]);
