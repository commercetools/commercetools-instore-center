angular.module('core').controller('SidebarCtrl', ['$scope',
  ($scope) => {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true,
    };
  }]
);
