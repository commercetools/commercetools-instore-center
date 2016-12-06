angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').transitionTo('dashboard', null, {
        location: false,
      });
    });

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.client.view.html',
        resolve: {
          channels: ['HeaderService', (HeaderService) => {
            return HeaderService.promise;
          }],
        },

      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/404.client.view.html',
        data: {
          ignoreState: true,
        },
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: 'modules/core/client/views/400.client.view.html',
        data: {
          ignoreState: true,
        },
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
        },
      });
  },
]);
