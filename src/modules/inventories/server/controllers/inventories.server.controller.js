module.exports = (app) => {
  const controller = {};
  const inventoriesService = require('../services/inventories.server.service')(app);

  controller.query = (req, res) => {
    const params = {};

    params.selectedChannel = req.query.selectedChannel;
    params.page = req.query.page;
    params.perPage = req.query.perPage;

    inventoriesService.query(params)
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
