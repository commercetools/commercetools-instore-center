angular.module('core').directive('checkImage', () => {
  return {
    link: (scope, element, attrs) => {
      element.bind('error', () => {
        element.attr('src', './images/default_product.png');
      });
    },
  };
});
