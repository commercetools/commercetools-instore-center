// Init the application configuration module for AngularJS application
const ApplicationConfiguration = (function applicationConfiguration() {
  // Init module configuration options
  const applicationModuleName = 'cean';
  const applicationModuleVendorDependencies = [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'picardy.fontawesome',
    'ui.bootstrap',
    'ui.router',
    'ui.utils',
    'angular-loading-bar',
    'angular-momentjs',
    'toastr',
    'angularBootstrapNavTree',
    'oc.lazyLoad',
    'ui.select',
    'ui.tree',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.edit',
    'ui.grid.moveColumns',
    'ngTable',
    'smart-table',
    'angular-flot',
    'angular-rickshaw',
    'easypiechart',
    'uiGmapgoogle-maps',
    'ngTagsInput',
    'pascalprecht.translate',
    'ngMaterial',
    'angular-intro',
  ];

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }

  return {
    applicationModuleName,
    applicationModuleVendorDependencies,
    registerModule,
  };
}());


// Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName,
  ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  ($locationProvider, $httpProvider) => {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('httpInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
  },
]);

angular.module(ApplicationConfiguration.applicationModuleName)
  .run(($rootScope, $state, $timeout) => {
    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state,
          params,
          href: $state.href(state, params),
        };
      }
    }

    // Record previous state
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
      storePreviousState(fromState, fromParams);

      event.targetScope.$watch('$viewContentLoaded', () => {
        angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

        $timeout(() => {
          angular.element('#wrap').css('visibility', 'visible');

          if (!angular.element('.dropdown').hasClass('open')) {
            angular.element('.dropdown').find('>ul').slideUp();
          }
        }, 0);
      });
      $rootScope.containerClass = toState.containerClass;
    });
  })
  .config(['uiSelectConfig', (uiSelectConfig) => {
    uiSelectConfig.theme = 'bootstrap';
  }])
  .config(['$translateProvider', ($translateProvider) => {
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json',
    });
    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
  }]);

// Then define the init function for starting up the application
angular.element(document).ready(() => {
  // Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      const scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  // Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
