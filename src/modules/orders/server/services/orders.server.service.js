module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);
  const filterUtils = require('../../../commons/server/helpers/filters.server.helper')(app);

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
    const page = parseInt(params.page, 10);
    const perPage = parseInt(params.perPage, 10);
    const getAll = params.getAll;
    const selectedChannel = params.selectedChannel;
    const ordersQuery = client.orders;
    const filter = params.filter;
    const sortBy = params.sortBy ? params.sortBy : 'createdAt';
    const sortAscending = params.sortAscending;

    if (!getAll) {
      ordersQuery.where('custom(fields(isReservation=true)) AND orderState="Open"');
    }


    if (selectedChannel) {
      ordersQuery.where(`lineItems(supplyChannel(id="${selectedChannel}"))`);
    }

    if (filter) {
      ordersQuery.where(filterUtils.getFilter(filter));
    }

    if (page) {
      ordersQuery.page(page);
    }

    if (perPage) {
      ordersQuery.perPage(perPage);
    }

    if (getAll) {
      ordersQuery.all();
    }

    return ordersQuery
      .sort(sortBy, sortAscending)
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
    if (customerId) {
      ordersQuery.where(`customerId="${customerId}"`);
    }
    return ordersQuery
    .sort('createdAt', false)
    .fetch()
    .then((res) => {
      return res.body.results.map((order) => {
        return order.lineItems.map((lineItem) => {
          return {
            ...lineItem.variant,
            placedOn: order.createdAt,
            name: lineItem.name.en,
          };
        });
      }).reduce((a, b) => {
        return a.concat(b);
      });
    })
    .catch((err) => {
      logger.error(`Error getting the products from the customer: ${params}, Error: ${err}`);
    });
  };

  service.completeOrder = (params) => {
    const orderId = params.orderId;
    const newStatus = params.newStatus;
    const ordersQuery = client.orders;

    return ordersQuery.byId(orderId).fetch().then((order) => {
      return ordersQuery.byId(order.body.id)
        .update({
          version: order.body.version,
          actions: [{
            action: 'changeOrderState',
            orderState: newStatus,
          }],
        });
    });
  };


  return service;
};
