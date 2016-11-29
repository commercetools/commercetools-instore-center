angular.module('core').service('HeaderService', ['$http',
  function handleService($http) {
    this.loadStores = () => {
      return $http.get('/api/channels');
    };
  },
]);
