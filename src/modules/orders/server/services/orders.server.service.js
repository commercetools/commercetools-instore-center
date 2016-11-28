module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

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
    const page = params.page;
    const perPage = params.perPage;
    const getAll = params.getAll;
    const selectedChannel = params.selectedChannel;
    const ordersQuery = client.orders;

    ordersQuery.where('custom(fields(isReservation="true"))');

    if (page) {
      ordersQuery.page(page);
    }

    if (perPage) {
      ordersQuery.page(perPage);
    }

    if (getAll) {
      ordersQuery.all();
    }

    if (selectedChannel) {
      ordersQuery.where(`lineItems(supplyChannel(id="${selectedChannel}"))`);
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
