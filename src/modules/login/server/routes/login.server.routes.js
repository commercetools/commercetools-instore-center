module.exports = (app) => {
  const loginController = require('../controllers/login.server.controller')(app);

  app.route('/api/login')
    .post(loginController.login);
};
