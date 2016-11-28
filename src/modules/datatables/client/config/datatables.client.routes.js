angular.module('datatables').config(['$stateProvider',
  ($stateProvider) => {
    $stateProvider
      .state('entity', {
        abstract: true,
        url: '/entity',
        template: '<ui-view/>',
      })
      .state('entity.carts', {
        url: '/carts',
        templateUrl: 'views/datatables.carts.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Carts' };
          },
        },
      })
      .state('entity.cartDiscounts', {
        url: '/cartDiscounts',
        templateUrl: 'views/datatables.cartDiscounts.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Cart Discounts' };
          },
        },
      })
      .state('entity.channels', {
        url: '/channels',
        templateUrl: 'views/datatables.channels.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Channels' };
          },
        },
      })
      .state('entity.categories', {
        url: '/categories',
        templateUrl: 'views/datatables.categories.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Categories' };
          },
        },
      })
      .state('entity.customers', {
        url: '/customers',
        templateUrl: 'views/datatables.customers.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Customers' };
          },
        },
      })
      .state('entity.customerGroups', {
        url: '/v',
        templateUrl: 'views/datatables.customerGroups.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Customer Groups' };
          },
        },
      })
      .state('entity.discountCodes', {
        url: '/discountCodes',
        templateUrl: 'views/datatables.discountCodes.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Discount Codes' };
          },
        },
      })
      .state('entity.inventory', {
        url: '/inventory',
        templateUrl: 'views/datatables.inventory.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Inventory' };
          },
        },
      })
      .state('entity.orders', {
        url: '/orders',
        templateUrl: 'views/datatables.orders.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Orders' };
          },
        },
      })
      .state('entity.products', {
        url: '/products',
        templateUrl: 'views/datatables.products.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Products' };
          },
        },
      })
      .state('entity.productDiscounts', {
        url: '/productDiscounts',
        templateUrl: 'views/datatables.productDiscounts.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Products Discounts' };
          },
        },
      })
      .state('entity.productTypes', {
        url: '/productTypes',
        templateUrl: 'views/datatables.productTypes.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Product Types' };
          },
        },
      })
      .state('entity.taxCategories', {
        url: '/taxCategories',
        templateUrl: 'views/datatables.taxCategories.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Tax Categories' };
          },
        },
      })
      .state('entity.shippingMethods', {
        url: '/shippingMethods',
        templateUrl: 'views/datatables.shippingMethods.client.view.html',
        controller: 'DatatablesController',
        resolve: {
          title: () => {
            return { value: 'Shipping Methods' };
          },
        },
      });
  },
]);
