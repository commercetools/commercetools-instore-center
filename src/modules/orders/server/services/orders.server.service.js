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

  service.byId = (orderId) => {
    return client.orders.byId(orderId)
      .fetch()
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        logger.error(`Error getting order ${orderId}, Error: ${err}`);
        return Promise.reject();
      });
  };

  service.query = (params) => {
    const startDate = params.startDate;
    const endDate = params.endDate;
    const page = params.page;
    const perPage = params.perPage;
    const getAll = params.getAll;
    const ordersQuery = client.orders;

    if (startDate) {
      ordersQuery.where(`createdAt >= "${startDate}"`);
    }

    if (endDate) {
      ordersQuery.where(`createdAt <= "${endDate}"`);
    }

    if (page) {
      ordersQuery.page(page);
    }

    if (perPage) {
      ordersQuery.page(perPage);
    }

    if (getAll) {
      ordersQuery.all();
    }

    return ordersQuery
      .fetch()
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        logger.error(`Error getting orders with the params: ${params}, Error: ${err}`);
      });
  };

  service.totalSales = (params) => {
    return service.query(params).then((res) => {
      return res.results;
    })
    .then((orders) => {
      if (orders.length > 0) {
        return {
          totalSalesCentAmount: orders.reduce((previousValue, order) => {
            return previousValue + order.totalPrice.centAmount;
          }, 0),
          currencyCode: orders[0].totalPrice.currencyCode,
        };
      } else {
        return {
          totalSalesCentAmount: 0,
          currencyCode: '',
        };
      }
    })
    .catch((err) => {
      logger.error(`Error getting the total sales: ${params}, Error: ${err}`);
    });
  };

  return service;
};
