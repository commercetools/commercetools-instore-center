module.exports = (app) => {
  const controller = {};
  const customersService = require('../services/customers.server.service')(app);
  const ordersService = require('../../../orders/server/services/orders.server.service')(app);

  controller.byId = (req, res) => {
    const customerId = req.params.id;

    if (customerId) {
      customersService.byId(customerId)
        .then((customer) => {
          ordersService.getCustomerProductReservations({ customerId })
          .then((products) => {
            res.json({ ...customer, products });
          });
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

    params.page = req.query.page;
    params.perPage = req.query.perPage;

    customersService.query(params)
      .then((queryResponse) => {
        res.json(queryResponse);
      })
      .catch(() => {
        res.status(400).send({
          message: 'Opps! something went wrong',
        });
      });
  };

  controller.totalCustomers = (req, res) => {
    const params = {};

    params.page = 1;
    params.perPage = 1;
    params.startDate = req.query.startDate;
    params.endDate = req.query.endDate;


    customersService.query(params)
      .then((queryResponse) => {
        res.json({
          totalCustomers: queryResponse.total,
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
