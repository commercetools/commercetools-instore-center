angular.module('core').factory('authInterceptor', ['$q', '$injector',
  ($q, $injector) => {
    return {
      responseError: (rejection) => {
        console.log(rejection);
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              $injector.get('$state').transitionTo('login');
              break;
            case 403:
              $injector.get('$state').transitionTo('home');
              break;
            default:
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      },
    };
  },
]);
