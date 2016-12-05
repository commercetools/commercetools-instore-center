angular.module('core').service('HeaderService', ['$http', '$rootScope',
  function handleService($http, $rootScope) {
    const promise = $http.get('/api/channels').then((result) => {
      $rootScope.stores = result.data.stores;
      $rootScope.selectedChannel = result.data.stores[0].id;
      $rootScope.userName = result.data.name;
    });
    return {
      promise,
      setSelectedChannel: (newSelectedChannel) => {
        $rootScope.selectedChannel = newSelectedChannel;
      },
      signout: () => {
        return $http.post('mc/signout');
      },
    };
  },
]);
