import geolib from 'geolib';

module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const client = require('../../../sphere/server/client/sphere.server.client')(app);
  const filterUtils = require('../../../commons/server/helpers/filters.server.helper')(app);

  const findVariant = (product, sku) => {
    return product.masterVariant.sku === sku ?
    product.masterVariant :
    product.variants.filter((variant) => {
      return variant.sku === sku;
    })[0];
  };

  service.query = (params) => {
    const selectedChannel = params.selectedChannel;
    const sku = params.sku;
    const page = parseInt(params.page, 10) || 1;
    const perPage = parseInt(params.perPage, 10) || 50;
    const inventoryEntriesQuery = client.inventoryEntries;
    const productProjectionQuery = client.productProjections;
    const filter = params.filter;
    const sortBy = params.sortBy;
    const sortAscending = params.sortAscending;
    const expandParameter = params.expandParameter;

    if (selectedChannel) {
      inventoryEntriesQuery.where(`supplyChannel(id="${selectedChannel}")`);
    }

    if (sku) {
      inventoryEntriesQuery.where(`sku="${sku}"`);
    }

    if (expandParameter) {
      inventoryEntriesQuery.expand(expandParameter);
    }

    if (sortBy) {
      inventoryEntriesQuery.sort(sortBy, sortAscending);
    }

    if (filter) {
      inventoryEntriesQuery.where(filterUtils.getFilter(filter));
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
            } else {
              return inventory;
            }
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
        logger.error(`Error getting inventory entries with the params:
          ${params}, Error: ${err}`);
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
        logger.error(`Error getting product info with the params: ${params},
          Error: ${err}`);
      });
  };

  service.getAvailableProducts = (params) => {
    const selectedChannel = params.selectedChannel;
    const inventoryEntriesQuery = client.inventoryEntries;

    return inventoryEntriesQuery
      .where(`availableQuantity > 0 AND supplyChannel(id="${selectedChannel}")`)
      .fetch()
      .then((result) => {
        return result.body.total;
      })
      .catch((err) => {
        logger.error(`Error getting the available products, Error: ${err}`);
      });
  };

  service.checkStores = (params) => {
    params.expandParameter = 'supplyChannel';
    const currentId = params.currentId;
    return service
      .query(params)
      .then((result) => {
        const currentInventory = result.results.filter((inventory) => {
          return inventory.id === currentId;
        })[0];
        return result.results.map((inventory) => {
          let distance = 'Not available';
          if (currentInventory.supplyChannel
              && inventory.supplyChannel) {
            distance = Math.floor(geolib.getDistance({
              latitude: currentInventory.supplyChannel.obj.custom.fields.latitude,
              longitude: currentInventory.supplyChannel.obj.custom.fields.longitude,
            }, {
              latitude: inventory.supplyChannel.obj.custom.fields.latitude,
              longitude: inventory.supplyChannel.obj.custom.fields.longitude,
            }) / 1000);
          }
          return { ...inventory,
                   distance,
                 };
        }).sort((inv1, inv2) => {
          if (inv1.distance < inv2.distance) {
            return -1;
          }
          if (inv1.distance > inv2.distance) {
            return 1;
          }
          return 0;
        });
      })
      .catch((err) => {
        logger.error(`Error getting the available products, Error: ${err}`);
      });
  };

  return service;
};
