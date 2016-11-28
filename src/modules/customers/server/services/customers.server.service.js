import { SphereClient } from 'sphere-node-sdk';

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

  service.byId = (customerId) => {
    return client.customers.byId(customerId)
      .fetch()
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        logger.error(`Error getting customer ${customerId}, Error: ${err}`);
        return Promise.reject();
      });
  };

  service.query = (params) => {
    const startDate = params.startDate;
    const endDate = params.endDate;
    const page = params.page;
    const perPage = params.perPage;
    const customersQuery = client.customers;

    if (startDate) {
      customersQuery.where(`createdAt >= "${startDate}"`);
    }

    if (endDate) {
      customersQuery.where(`createdAt <= "${endDate}"`);
    }

    return customersQuery
      .page(page)
      .perPage(perPage)
      .fetch()
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        logger.error(`Error getting customers with the params: ${params}, Error: ${err}`);
      });
  };

  return service;
};
