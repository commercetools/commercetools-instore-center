module.exports = (app) => {
  const controller = {};
  const channelsService = require('../services/channels.server.service')(app);

  controller.query = (req, res) => {
    const params = {};

    params.roles = req.query.roles;

    channelsService.query(params)
      .then((queryResponse) => {
        res.json({ stores: queryResponse.results, name: req.user.name });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  return controller;
};
