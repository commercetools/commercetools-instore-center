module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

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
