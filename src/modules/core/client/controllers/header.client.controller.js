
angular.module('core').controller('HeaderController', [
  '$scope',
  'HeaderService',
  '$state',
  '$http',
  '$window',
  ($scope, HeaderService, $state, $http, $window) => {
    $scope.updateChannel = () => {
      HeaderService.setSelectedChannel($scope.selectedChannel);
      $state.reload();
    };

    $scope.signout = () => {
      HeaderService.signout().then(() => {
        $window.location.href = '/login';
      });
    };
  },
]);
