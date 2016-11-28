module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

  service.query = (params) => {
    const selectedChannel = params.selectedChannel;
    const page = params.page;
    const perPage = params.perPage;
    const inventoryEntriesQuery = client.inventoryEntries;

    if (selectedChannel) {
      inventoryEntriesQuery.where(`supplyChannel(id="${selectedChannel}")`);
    }
    return inventoryEntriesQuery
      .page(page)
      .perPage(perPage)
      .fetch()
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        logger.error(`Error getting inventory entries with the params: ${params}, Error: ${err}`);
      });
  };

  return service;
};
