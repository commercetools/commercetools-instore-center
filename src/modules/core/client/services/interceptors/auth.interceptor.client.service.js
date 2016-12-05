angular.module('core').factory('authInterceptor', ['$q', '$injector', '$window',
  ($q, $injector, $window) => {
    return {
      responseError: (rejection) => {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              $window.location.href = '/login';
              break;
            case 403:
              $window.location.href = '/login';
              break;
            default:
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      },
    };
  },
]);
