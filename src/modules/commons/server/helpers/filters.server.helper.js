import _ from 'lodash';

module.exports = (app) => {
  const config = app.config;
  const helper = {};

  function getPerPage(perPage) {
    let result;

    if (isNaN(perPage)) {
      const defaultPerPage = config.get('ENTITIES:DATATABLES:PER_PAGE');
      if (defaultPerPage) {
        result = parseInt(defaultPerPage, 10);
      } else {
        result = parseInt(20, 10);
      }
    } else {
      result = parseInt(perPage, 10);
    }

    return result;
  }

  function getPage(page) {
    if (!isNaN(page)) {
      return parseInt(page, 10);
    }
  }

  function getSortBy(sortBy) {
    let result;

    if (sortBy) {
      result = sortBy;
    } else {
      const defaultSortBy = config.get('ENTITIES:DATATABLES:SORT_BY');
      result = defaultSortBy;
    }

    return result;
  }

  function getSortAscencing(sortAscending) {
    let result;

    if (sortAscending) {
      result = sortAscending === 'true';
    } else {
      const defaultSortAscending = config.get('ENTITIES:DATATABLES:SORT_ASCENDING');
      result = defaultSortAscending;
    }

    return result;
  }

  function getSort(sortBy, sortAscending) {
    const result = {};

    result.sortBy = getSortBy(sortBy);
    result.sortAscending = getSortAscencing(sortAscending);

    return result;
  }

  function isLeafNode(node) {
    return node.value; // if value property is defined then is leaf node
  }

  function getFilter(filterParamsObject) {
    let filter = '';
    let count = 0;

    Object.keys(filterParamsObject).forEach((key) => {
      if (filterParamsObject.hasOwnProperty(key)) {
        if (count > 0) {
          filter = `${filter} and `;
        }

        if (typeof filterParamsObject[key] === 'object' && !isLeafNode(filterParamsObject[key])) {
          filter = `${filter} ${key} (${getFilter(filterParamsObject[key])})`;
        } else {
          let value;

          if (filterParamsObject[key].value) {
            value = filterParamsObject[key].value;
          } else {
            value = filterParamsObject[key];
          }

          const noCaseSensitive = filterParamsObject[key].noCaseSensitive;
          const lowercase = filterParamsObject[key].lowercase;

          if (value === 'Not defined') {
            filter = filter
                      .concat(key)
                      .concat(' is not defined');
          } else {
            if (lowercase && lowercase === true) {
              value = value.toLowerCase();
            }

            if (noCaseSensitive && noCaseSensitive === true) {
              filter = `${filter} (${key}="${value}"
                          or ${key}="${_.capitalize(value)}"
                          or ${key}="${value.toUpperCase()}")`;
            } else {
              filter = `${filter} ${key}="${value}"`;
            }
          }
        }
        count++;
      }
    });

    return filter;
  }

  function getExpandPaths(expandPaths) {
    let result;

    if (expandPaths && expandPaths.length > 0) {
      result = JSON.parse(expandPaths);
    } else {
      result = '';
    }

    return result;
  }

  helper.getFilter = (filter) => {
    return getFilter(filter.length > 0 ? JSON.parse(filter) : '');
  };

  helper.getExpandPaths = (expandPaths) => {
    return getExpandPaths(expandPaths);
  };

  return helper;
};
