module.exports = (app) => {
  const loginController = require('../controllers/login.server.controller')(app);

  app.route('/mc/login')
    .post(loginController.login);

  app.route('/mc/signout')
    .post(loginController.logout);
};
