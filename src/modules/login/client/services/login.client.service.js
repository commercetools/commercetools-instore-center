angular.module('login').service('LoginService', ['$http',
  function handleService($http) {
    this.login = (params) => {
      return $http.post('/api/login', params);
    };
  },
]);
