module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

  service.query = (params) => {
    const role = 'ProductDistribution';
    const channelsQuery = client.channels;

    if (role) {
      channelsQuery.where(`roles contains any ("${role}")`);
    }
    return channelsQuery
      .all()
      .fetch()
      .then((res) => {
        return res.body.results.map((store) => {
          return { id: store.id, name: store.name ? store.name.en : store.key };
        });
      })
      .catch((err) => {
        logger.error(`Error getting channels with the params: ${params}, Error: ${err}`);
      });
  };

  return service;
};
