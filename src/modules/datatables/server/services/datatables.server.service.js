import { SphereClient } from 'sphere-node-sdk';
import _ from 'lodash';

module.exports = (app) => {
  const service = {};
  const config = app.config;
  const logger = app.logger;


  const client = new SphereClient({
    config: {
      client_id: config.get('COMMERCE_TOOLS:CLIENT_ID'),
      client_secret: config.get('COMMERCE_TOOLS:CLIENT_SECRET'),
      project_key: config.get('COMMERCE_TOOLS:PROJECT_KEY'),
    },
    host: config.get('COMMERCE_TOOLS:API_HOST'),
    oauth_host: config.get('COMMERCE_TOOLS:OAUTH_URL'),
  });

  service.query = (params) => {
    const entity = params.entity;
    const filter = params.filter;
    const expandPaths = params.expandPaths;
    const page = params.page;
    const perPage = params.perPage;
    const sortBy = params.sort.sortBy;
    const sortAscending = params.sort.sortAscending;

    if (!entity) {
      return Promise.reject('The entity has not been set');
    } else {
      const query = client[entity]
                      .where(filter)
                      .page(page)
                      .perPage(perPage)
                      .sort(sortBy, sortAscending);

      if (expandPaths && expandPaths.length > 0) {
        _.each(expandPaths, (expandPath) => {
          query.expand(expandPath);
        });
      }

      return query
        .fetch()
        .then((res) => {
          return res.body;
        })
        .catch((err) => {
          logger.error(`Error getting the records with the params: ${params}, Error: ${err}`);
          return Promise.reject();
        });
    }
  };

  return service;
};
