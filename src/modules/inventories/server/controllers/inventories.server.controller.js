module.exports = (app) => {
  const controller = {};
  const inventoriesService = require('../services/inventories.server.service')(app);

  controller.query = (req, res) => {
    inventoriesService.query(req.query)
      .then((queryResponse) => {
        res.json(queryResponse);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.getProductById = (req, res) => {
    const params = {};
    params.productId = req.query.productId;
    params.sku = req.query.sku;

    inventoriesService.getProductById(params)
      .then((queryResponse) => {
        res.json(queryResponse);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  return controller;
};
