module.exports = (app) => {
  const customersController = require('../controllers/customers.server.controller')(app);

  app.route('/api/customers/totalCustomers')
    .get(customersController.totalCustomers);

  app.route('/api/customers/:id')
    .get(customersController.byId);

  app.route('/api/customers')
    .get(customersController.query);
};
