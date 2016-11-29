angular.module('core').factory('httpInterceptor', ($q, $rootScope) => {
  let numLoadings = 0;
  const excludedList = ['.html'];

  const isContained = (string, array) => {
    let res = false;
    for (let i = 0; i < array.length; i++) {
      if (string.indexOf(array[i]) !== -1) {
        res = true;
      }
    }
    return res;
  };
  return {
    request: (config) => {
      if (!isContained(config.url, excludedList)) {
        numLoadings++;
        // Show loader
        $rootScope.showMask = true;
      }
      return config || $q.when(config);
    },
    response: (response) => {
      if (!isContained(response.config.url, excludedList)) {
        if ((--numLoadings) === 0) {
          // Hide loader
          $rootScope.showMask = false;
        }
      }

      return response || $q.when(response);
    },
    responseError: (response) => {
      if (!isContained(response.config.url, excludedList)) {
        if (!(--numLoadings)) {
          // Hide loader
          $rootScope.showMask = false;
        }
      }

      return $q.reject(response);
    },
  };
});
