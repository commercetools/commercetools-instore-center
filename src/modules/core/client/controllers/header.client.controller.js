angular.module('core').controller('HeaderController', ['$scope', 'HeaderService', 'ChannelSelector',
  function ($scope, HeaderService, ChannelSelector) {
    $scope.loadStores = () => {
      HeaderService.loadStores().then(function (result) {
        $scope.stores = result.data;
        $scope.selectedChannel = result.data[0].id;
        ChannelSelector.selectedChannel = result.data[0].id;
      }, function (error) {
        // TODO Modals.showErrorWindow('Error Removing line item', error.data.message);
      });
    }

    $scope.updateChannel = () => {
      ChannelSelector.selectedChannel = $scope.selectedChannel;
    }
  }
]);
