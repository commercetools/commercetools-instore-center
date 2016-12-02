module.exports = (app) => {
  const inventoriesController = require('../controllers/inventories.server.controller')(app);

  app.route('/api/inventories')
    .get(inventoriesController.query);

  app.route('/api/inventories/product')
    .get(inventoriesController.getProductById);

  app.route('/api/inventories/products')
    .get(inventoriesController.getAvailableProducts);

  app.route('/api/inventories/checkStores')
    .get(inventoriesController.checkStores);
};
