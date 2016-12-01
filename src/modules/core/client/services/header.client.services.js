angular.module('core').service('HeaderService', ['$http', '$rootScope',
  function handleService($http, $rootScope) {
    const promise = $http.get('/api/channels').then((result) => {
      $rootScope.stores = result.data;
      $rootScope.selectedChannel = result.data[0].id;
    });
    return {
      promise,
      setSelectedChannel: (newSelectedChannel) => {
        $rootScope.selectedChannel = newSelectedChannel;
      },
    };
  },
]);
