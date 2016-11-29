
module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

  service.query = (params) => {
    const selectedChannel = params.selectedChannel;
    const page = params.page;
    const perPage = params.perPage;
    const inventoryEntriesQuery = client.inventoryEntries;
    const productProjectionQuery = client.productProjections;


    if (selectedChannel) {
      inventoryEntriesQuery.where(`supplyChannel(id="${selectedChannel}")`);
    }
    return inventoryEntriesQuery
      .page(page)
      .perPage(perPage)
      .fetch()
      .then((res) => {
        return Promise.all(res.body.results.map((inventory) => {
          return productProjectionQuery
          .staged(false)
          .filterByQuery(`variants.sku:"${inventory.sku}"`)
          .search()
          .then(({ body }) => {
            return { ...inventory,
                     name: body.results[0].name.en,
                     price: body.results[0].masterVariant.prices[0],
                     image: body.results[0].masterVariant.images[0],
                   };
          });
        })).then((result) => {
          return result;
        });
      })
      .catch((err) => {
        logger.error(`Error getting inventory entries with the params: ${params}, Error: ${err}`);
      });
  };

  return service;
};
