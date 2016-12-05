angular.module('paginator')
  .controller('PaginatorController', ['$scope', '$http', '$rootScope', '$location',
  ($scope, $http, $rootScope, $location) => {
    $scope.itemsPerPage = 10;
    $scope.filterTextField = null;
    $scope.filterTextLabel = 'Filter by';

    function getMatchFields(fields, key) {
      let matchFields;

      if (fields && fields.length > 0) {
        matchFields = [];

        fields.forEach((field) => {
          const arr = field.split('.');
          if (arr[0] === key) {
            arr.splice(0, 1);

            if (arr.length > 0) {
              matchFields.push(arr.join('.'));
            }
          }
        });
      }

      return matchFields;
    }

    function keyMatch(fields, key) {
      let result = false;

      if (fields && fields.length > 0) {
        fields.forEach((field) => {
          if (field === key) {
            result = true;
          }
        });
      }

      return result;
    }

    function getFilter(predicate, composeFields, noCaseSensitiveFields, lowercaseFields) {
      const filter = {};

      Object.keys(predicate).forEach((key) => {
        if (predicate.hasOwnProperty(key)) {
          let noCaseSensitiveMatchedFields = null;
          let lowercaseMatchedFields = null;

          if (typeof predicate[key] === 'object') {
            noCaseSensitiveMatchedFields = getMatchFields(noCaseSensitiveFields, key);
            lowercaseMatchedFields = getMatchFields(lowercaseFields, key);

            filter[key] = getFilter(predicate[key], composeFields,
                          noCaseSensitiveMatchedFields, lowercaseMatchedFields);
          } else {
            const isNoCaseSensitive = keyMatch(noCaseSensitiveFields, key);
            const isLowercase = keyMatch(lowercaseFields, key);

            filter[key] = {
              value: predicate[key].trim(),
              noCaseSensitive: isNoCaseSensitive,
              lowercase: isLowercase,
            };
          }
        }
      });

      return filter;
    }


    $scope.getPage = (tableState) => {
      const pagination = tableState.pagination;
      const sort = tableState.sort;
      const search = tableState.search;

      // This is NOT the page number, but the index of item in the list that you
      // want to use to display the table.
      $scope.start = pagination.start || 0;
      // Number of entries showed per page.
      $scope.perPage = pagination.number || $scope.itemsPerPage;
      $scope.page = Math.floor($scope.start / $scope.perPage) + 1;
      $scope.sortBy = sort.predicate || $scope.paginatorDefaultSort || 'createdAt';
      $scope.sortAscending = typeof sort.reverse === 'undefined' ? false : !sort.reverse;
      $scope.sortPredicateObject = sort;
      $scope.predicateObject = search && search.predicateObject;
      $scope.filter = search && search.predicateObject ?
        getFilter(search.predicateObject, $scope.composeFields, $scope.noCaseSensitveFields,
                  $scope.lowercaseFields) : '';

      $http.get(`/api/${$scope.entity}`, {
        params: {
          page: $scope.page,
          perPage: $scope.perPage,
          selectedChannel: $rootScope.selectedChannel,
          filter: JSON.stringify($scope.filter),
          sortBy: $scope.sortBy,
          sortAscending: $scope.sortAscending,
          expandPaths: JSON.stringify($scope.expandPaths),
        },
      })
      .then((response) => {
        tableState.pagination.totalItemCount = response.data.total;
        tableState.pagination.numberOfPages = Math.ceil(response.data.total / $scope.perPage);
        tableState.pagination.start = $scope.start;
        tableState.search.predicateObject = $scope.predicateObject;
        tableState.sort = $scope.sortPredicateObject;
        $scope.rowsDisplayed = response.data.results;
      })
      .catch((err) => {
        $scope.rowsDisplayed = [];
        console.log('Error: %s', err);
      });
    };

    $scope.setItemsPerPage = (value) => {
      $scope.itemsPerPage = value;
    };

    $scope.setTextFilter = (value, label) => {
      $scope.filterTextField = value;
      $scope.filterTextLabel = label;
    };

    $scope.redirect = (url) => {
      $location.path(url);
    };

    $scope.clearSearch = () => {
      $('#filter-text-tmp').val('');
      $('#filter-text').val('').trigger('change');
    };
  }])
  .directive('paginatorEntity', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        scope.entity = attrs.paginatorEntity;
      },
    };
  })
  .directive('paginatorDefaultSort', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        scope.paginatorDefaultSort = attrs.paginatorDefaultSort;
      },
    };
  })
  .directive('pageSelect', () => {
    return {
      restrict: 'E',
      template: `<input type="text" class="select-page col-md-5" ng-model="inputPage"
                    ng-change="selectPage(inputPage)">`,
      link: (scope) => {
        scope.$watch('currentPage', (c) => {
          scope.inputPage = c;
        });
      },
    };
  })
  .directive('lowerCase', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        if (typeof attrs.lowerCase !== 'undefined' && attrs.stSearch) {
          scope.lowercaseFields = scope.lowercaseFields || [];
          scope.lowercaseFields.push(attrs.stSearch);
        }
      },
    };
  })
  .directive('noCaseSensitive', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        if (typeof attrs.noCaseSensitive !== 'undefined' && attrs.stSearch) {
          scope.noCaseSensitveFields = scope.noCaseSensitveFields || [];
          scope.noCaseSensitveFields.push(attrs.stSearch);
        }
      },
    };
  })
  .directive('expandPaths', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        if (attrs.expandPaths) {
          scope.expandPaths = [];

          const fields = attrs.expandPaths.split(',');

          fields.forEach((field) => {
            scope.expandPaths.push(field.trim());
          });
        }
      },
    };
  })
  .directive('textFilterLabel', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        scope.filterTextLabel = attrs.textFilterLabel;
      },
    };
  })
  .directive('textFilterField', () => {
    return {
      restrict: 'A',
      controller: 'PaginatorController',
      link: (scope, element, attrs) => {
        scope.filterTextField = attrs.textFilterField;
      },
    };
  })
  .filter('imageUrlFilter', () => {
    return (input, size) => {
      if (input) {
        const regex = /^(.+)\.([0-9a-z]+)$/i;
        const parts = input.match(regex);

        return `${parts[1]}-${size}.${parts[2]}`;
      }
    };
  });
