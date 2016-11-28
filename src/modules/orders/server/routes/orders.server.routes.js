import path from 'path';


module.exports = (app) => {
  // const logger = app.logger;
  // const config = app.config;

  const ordersController = require('../controllers/orders.server.controller')(app);

  app.route('/api/orders/totalOrders')
    .get(ordersController.totalOrders);

  app.route('/api/orders/totalSales')
    .get(ordersController.totalSales);

  app.route('/api/orders/:id')
    .get(ordersController.byId);

  app.route('/api/orders')
    .get(ordersController.query);
};
