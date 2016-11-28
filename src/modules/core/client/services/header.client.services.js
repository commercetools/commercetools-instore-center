'use strict';

//Events service used to communicate Events REST endpoints
angular.module('core').service('HeaderService', ['$http',
  function ($http) {
    this.loadStores = () => {
      return $http.get('/api/channels');
    };
  }
]);
