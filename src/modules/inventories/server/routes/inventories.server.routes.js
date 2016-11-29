module.exports = (app) => {
  const inventoriesController = require('../controllers/inventories.server.controller')(app);

  app.route('/api/inventories')
    .get(inventoriesController.query);

  app.route('/api/inventories/product')
    .get(inventoriesController.getProductById);
};
