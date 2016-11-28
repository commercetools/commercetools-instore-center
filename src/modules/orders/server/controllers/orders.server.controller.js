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
    const params = {};
    params.selectedChannel = req.query.selectedChannel;
    params.page = req.query.page;
    params.perPage = req.query.perPage;

    orderService.query(params)
      .then((queryResponse) => {
        res.json(queryResponse.results);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.totalOrders = (req, res) => {
    const params = {};

    params.page = 1;
    params.perPage = 1;
    params.startDate = req.query.startDate;
    params.endDate = req.query.endDate;

    orderService.query(params)
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
    const params = {};

    params.getAll = true;
    params.startDate = req.query.startDate;
    params.endDate = req.query.endDate;

    orderService.totalSales(params)
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

  return controller;
};