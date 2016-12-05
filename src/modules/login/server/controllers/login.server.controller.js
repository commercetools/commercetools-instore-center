import jwt from 'jsonwebtoken';

module.exports = (app) => {
  const controller = {};
  const loginService = require('../services/login.server.service')(app);

  function generateToken(payload, cb) {
    jwt.sign(
      payload, app.config.get('TOKEN:SECRET'), {
        expiresIn: app.config.get('TOKEN:MAX_AGE_SECONDS'),
      }, cb);
  }

  function login(customer, cb) {
    const tokenPayload = customer;

    generateToken(tokenPayload, (err, token) => {
      if (err) {
        app.logger.error('Error with login: %s', err);
        cb(err, null);
      } else {
        cb(null, token);
      }
    });
  }

  controller.login = (req, res) => {
    loginService.login(req.body)
      .then((queryResponse) => {
        login(queryResponse, (err, token) => {
          if (err) {
            app.logger.error(`Error Login in customer: ${JSON.stringify(err)}`);
            return res.status(400).send({
              message: 'Issue login in customer. Please try again.',
            });
          } else {
            res.cookie('token', token, {
              maxAge: app.config.get('TOKEN:MAX_AGE_SECONDS') * 1000,
            });
            return loginService.getUserProjects(queryResponse)
            .then((projects) => {
              res.redirect('/');
            });
          }
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  return controller;
};
