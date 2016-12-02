module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);
  const filterUtils = require('../../../commons/server/helpers/filters.server.helper')(app);

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
    const page = parseInt(params.page, 10);
    const perPage = parseInt(params.perPage, 10);
    const customersQuery = client.customers;
    const filter = params.filter;
    const sortBy = params.sortBy ? params.sortBy : 'createdAt';
    const sortAscending = params.sortAscending;

    if (startDate) {
      customersQuery.where(`createdAt >= "${startDate}"`);
    }

    if (endDate) {
      customersQuery.where(`createdAt <= "${endDate}"`);
    }

    if (filter) {
      customersQuery.where(filterUtils.getFilter(filter));
    }

    return customersQuery
      .page(page)
      .perPage(perPage)
      .sort(sortBy, sortAscending)
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
