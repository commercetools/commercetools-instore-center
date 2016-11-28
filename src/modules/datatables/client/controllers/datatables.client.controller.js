angular.module('datatables')
  .controller('DatatablesController', ['$scope', 'title', ($scope, title) => {
    $scope.page = {
      title: title.value,
    };
  }]);
