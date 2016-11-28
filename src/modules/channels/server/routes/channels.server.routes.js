module.exports = (app) => {
  const channelsController = require('../controllers/channels.server.controller')(app);

  app.route('/api/channels')
    .get(channelsController.query);
};
