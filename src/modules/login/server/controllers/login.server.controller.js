module.exports = (app) => {
  const controller = {};
  const loginService = require('../services/login.server.service')(app);

  controller.login = (req, res) => {
    loginService.login(req.body)
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
