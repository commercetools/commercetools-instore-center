angular.module('login').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.client.view.html',
      });
  },
]);
