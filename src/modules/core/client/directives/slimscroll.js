angular.module('core')
  .directive('slimscroll', function () {
    return {
      restrict: 'A',
      link: function ($scope, $elem, $attr) {
        var off = [];
        var option = {};

        var refresh = function () {
          if ($attr.slimscroll) {
            option = $scope.$eval($attr.slimscroll);
          } else if ($attr.slimscrollOption) {
            option = $scope.$eval($attr.slimscrollOption);
          }

          angular.element($elem).slimScroll({ destroy: true });

          angular.element($elem).slimScroll(option);
        };

        var registerWatch = function () {
          if ($attr.slimscroll && !option.noWatch) {
            off.push($scope.$watchCollection($attr.slimscroll, refresh));
          }

          if ($attr.slimscrollWatch) {
            off.push($scope.$watchCollection($attr.slimscrollWatch, refresh));
          }

          if ($attr.slimscrolllistento) {
            off.push($scope.$on($attr.slimscrolllistento, refresh));
          }
        };

        var destructor = function () {
          angular.element($elem).slimScroll({ destroy: true });
          off.forEach(function (unbind) {
            unbind();
          });
          off = null;
        };

        off.push($scope.$on('$destroy', destructor));

        registerWatch();
      }
    };
  });
