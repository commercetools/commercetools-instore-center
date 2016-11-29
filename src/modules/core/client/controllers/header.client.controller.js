angular.module('core').controller('HeaderController', ['$scope',
'HeaderService', 'ChannelSelector', '$state',
  ($scope, HeaderService, ChannelSelector, $state) => {
    $scope.loadStores = () => {
      HeaderService.loadStores().then((result) => {
        $scope.stores = result.data;
        $scope.selectedChannel = result.data[0].id;
        ChannelSelector.selectedChannel = result.data[0].id;
      }, (error) => {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    };

    $scope.updateChannel = () => {
      ChannelSelector.selectedChannel = $scope.selectedChannel;
      $state.reload();
    };
  },
]);
