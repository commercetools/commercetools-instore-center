angular.module('core')
  .controller('MainCtrl', ($scope) => {

    $scope.main = {
      title: 'Commercetools',
    };

    $scope.$on('cfpLoadingBar:started', () => {
      $('.loading-component').addClass('loading-component-hide');
    });

    $scope.$on('cfpLoadingBar:completed', () => {
       $('.loading-component').removeClass('loading-component-hide');
    });
  });
