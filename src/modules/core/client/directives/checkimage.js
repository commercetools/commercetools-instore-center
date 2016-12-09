angular.module('core').directive('checkImage', () => {
  return {
    link: (scope, element) => {
      element.bind('error', () => {
        element.attr('src', './images/default_product.svg');
      });
    },
  };
});
