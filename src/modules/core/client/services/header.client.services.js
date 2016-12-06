angular.module('core').service('HeaderService', ['$http', '$rootScope',
  function handleService($http, $rootScope) {
    return {
      fetchData: () => {
        return $http.get('/mc/channels')
        .then((result) => {
          $rootScope.stores = result.data.stores;
          $rootScope.selectedChannel = result.data.stores[0].id;
          $rootScope.userName = result.data.name;
        });
      },
      setSelectedChannel: (newSelectedChannel) => {
        $rootScope.selectedChannel = newSelectedChannel;
      },
      signout: () => {
        return $http.post('mc/signout');
      },
    };
  },
]);
