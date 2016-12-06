module.exports = (app) => {
  const channelsController = require('../controllers/channels.server.controller')(app);

  app.route('/mc/channels')
    .get(channelsController.query);
};
