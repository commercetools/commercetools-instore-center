module.exports = (app) => {
  const datatablesController = require('../controllers/datatables.server.controller')(app);

  app.route('/api/list/:entity')
    .get(datatablesController.list);
};
