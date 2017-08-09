import jwt from 'jsonwebtoken';
import * as core from '../../../core/server/controllers/core.server.controller';

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

  controller.login = (req, res, next) => {
    return loginService.login(req.body)
      .then((queryResponse) => {
        const tokenData = jwt.decode(queryResponse.token);
        return loginService.getUserInfo({ userId: tokenData.sub, token: queryResponse.token })
        .then((userInfo) => {
          const userData = { ...queryResponse, name: userInfo.firstName };
          login(userData, (err, token) => {
            if (err) {
              app.logger.error(`Error Login in customer: ${JSON.stringify(err)}`);
              return res.status(400).send({
                message: 'Issue login in customer. Please try again.',
              });
            } else {
              res.cookie('token', token, {
                maxAge: app.config.get('TOKEN:MAX_AGE_SECONDS') * 1000,
              });
              res.redirect('/');
            }
          });
        });
      })
      .catch(() => {
        core.renderAuthenticationRequired(req, res, next, true);
        // res.status(400).send({
        //   message: 'Opps! something went wrong',
        // });
      });
  };

  controller.logout = (req, res) => {
    res.clearCookie('token');
    res.send();
  };

  return controller;
};
