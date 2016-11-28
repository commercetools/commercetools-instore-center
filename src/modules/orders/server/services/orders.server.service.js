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
    const selectedChannel = params.selectedChannel;
    const ordersQuery = client.orders;

    ordersQuery.where('custom(fields(isReservation=true))');

    if (selectedChannel) {
      ordersQuery.where(`lineItems(supplyChannel(id="${selectedChannel}"))`);
    }

    return ordersQuery
      .page(page)
      .perPage(perPage)
      .sort('createdAt', false)
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

  service.getCustomerProductReservations = (params) => {
    const customerId = params.customerId;
    const ordersQuery = client.orders;
    ordersQuery.where('custom(fields(isReservation=true))');
    if (customerId) {
      ordersQuery.where(`customerId="${customerId}"`);
    }
    return ordersQuery
    .fetch()
    .then((res) => {
      return res.body.results.map((order) => {
        return order.lineItems.map((lineItem) => {
          return {
            ...lineItem.variant,
            placedOn: order.createdAt,
          };
        });
      });
    })
    .catch((err) => {
      logger.error(`Error getting the products from the customer: ${params}, Error: ${err}`);
    });
  };


  return service;
};
