import path from 'path';

module.exports = (app) => {
  const controller = {};
  const orderService = require('../services/orders.server.service')(app);

  controller.byId = (req, res) => {
    const orderId = req.params.id;

    if (orderId) {
      orderService.byId(orderId)
        .then((order) => {
          res.json(order);
        })
        .catch(() => {
          res.status(400).send({
            message: 'Opps! something went wrong',
          });
        });
    } else {
      return res.status(400).send({
        message: 'Opps! something went wrong',
      });
    }
  };

  controller.query = (req, res) => {
    orderService.query(req.query)
      .then((queryResponse) => {
        res.json(queryResponse);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.totalOrders = (req, res) => {
    orderService.query({
      page: 1,
      perPage: 1,
      selectedChannel: req.query.selectedChannel,
    })
      .then((queryResponse) => {
        res.json({
          totalOrders: queryResponse.total,
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.totalSales = (req, res) => {
    orderService.totalSales({
      getAll: true,
      selectedChannel: req.query.selectedChannel,
    })
      .then((queryResponse) => {
        res.json({
          totalSalesCentAmount: queryResponse.totalSalesCentAmount,
          currencyCode: queryResponse.currencyCode,
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.completeOrder = (req, res) => {
    orderService.completeOrder({
      orderId: req.body.orderId,
      newStatus: req.body.newStatus,
    })
      .then((queryResponse) => {
        res.json(queryResponse);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  return controller;
};
