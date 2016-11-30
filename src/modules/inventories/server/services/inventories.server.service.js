
module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);

  const findVariant = (product, sku) => {
    return product.masterVariant.sku === sku ?
    product.masterVariant :
    product.variants.filter((variant) => {
      return variant.sku === sku;
    })[0];
  };

  service.query = (params) => {
    const selectedChannel = params.selectedChannel;
    const page = parseInt(params.page, 10);
    const perPage = parseInt(params.perPage, 10);
    const inventoryEntriesQuery = client.inventoryEntries;
    const productProjectionQuery = client.productProjections;
    const filter = params.filter;
    const sortBy = params.sortBy;

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
            if (body.results[0]) {
              const chosenVariant = findVariant(body.results[0], inventory.sku);
              return { ...inventory,
                       name: body.results[0].name.en,
                       price: chosenVariant.prices[0],
                       image: chosenVariant.images[0],
                       productId: body.results[0].id,
                     };
            }
            return null;
          });
        })).then((results) => {
          return { results,
            offset: res.body.offset,
            count: res.body.count,
            total: res.body.total,
          };
        });
      })
      .catch((err) => {
        logger.error(`Error getting inventory entries with the params: ${params}, Error: ${err}`);
      });
  };

  service.getProductById = (params) => {
    const productId = params.productId;
    const sku = params.sku;
    const productProjectionQuery = client.productProjections;

    return productProjectionQuery
      .staged(false)
      .byId(productId)
      .fetch()
      .then((product) => {
        const chosenVariant = findVariant(product.body, sku);
        return { ...chosenVariant, name: product.body.name, description: product.body.description };
      })
      .catch((err) => {
        logger.error(`Error getting product info with the params: ${params}, Error: ${err}`);
      });
  };

  return service;
};
