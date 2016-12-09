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
    params.selectedChannel = req.query.selectedChannel;
    params.seed = req.query.productId;

    return inventoriesService.getProductById(params)
      .then((queryResponse) => {
        return inventoriesService.getRecommendedProducts(params)
        .then((recommendedProducts) => {
          res.json({ ...queryResponse, recommendedProducts });
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.getAvailableProducts = (req, res) => {
    const params = {};
    params.selectedChannel = req.query.selectedChannel;
    inventoriesService.getAvailableProducts(params)
      .then((totalProducts) => {
        res.json({ totalProducts });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.checkStores = (req, res) => {
    const params = {};
    params.currentId = req.query.currentId;
    params.sku = req.query.sku;

    inventoriesService.checkStores(params)
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
