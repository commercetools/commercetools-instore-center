angular.module('core').controller('HomeController', ['$scope', '$log', 'Orders', 'Customers',
  function ($scope, $log, Orders, Customers) {
    var controller = this;

    controller.totalOrders = 0;
    controller.totalCustomers = 0;

    function setTotalOrders() {
      Orders.totalOrders({},
        (res) => {
          controller.totalOrders = res.totalOrders;
        },
        (err) => {
          $log.error(err);
        })
    }

    function setTotalCustomers() {
      Customers.totalCustomers({},
        (res) => {
          controller.totalCustomers = res.totalCustomers;
        },
        (err) => {
          $log.error(err);
        })
    }

    controller.init = () => {
      setTotalOrders();
      setTotalCustomers();
    };

    controller.init();
  },
]);
