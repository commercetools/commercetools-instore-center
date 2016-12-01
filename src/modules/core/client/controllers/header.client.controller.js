
angular.module('core').controller('HeaderController', [
  '$scope',
  'HeaderService',
  '$state',
  ($scope, HeaderService, $state) => {
    $scope.updateChannel = () => {
      HeaderService.setSelectedChannel($scope.selectedChannel);
      $state.reload();
    };
  },
]);
