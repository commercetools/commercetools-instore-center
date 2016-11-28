angular.module('core')
  .directive('morrisLineChart', function(){

    return {
      restrict: 'A',
      scope: {
        lineData: '=',
        lineXkey: '@',
        lineYkeys: '@',
        lineLabels: '@',
        lineColors: '@'
      },
      link: function (scope, elem, attrs){
        var colors,
            morris;
        if (scope.lineColors === void 0 || scope.lineColors === '') {
          colors = null;
        } else {
          colors = JSON.parse(scope.lineColors);
        }
        scope.$watch('lineData', function(){
          if(scope.lineData){
            if(!morris) {
              morris = new Morris.Line({
                element: elem,
                data: scope.lineData,
                xkey: scope.lineXkey,
                ykeys: JSON.parse(scope.lineYkeys),
                labels: JSON.parse(scope.lineLabels),
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                resize: true
              });
            } else {
              morris.setData(scope.lineData);
            }
          }
        });
      }
    };
  })

  .directive('morrisAreaChart', function(){

    return {
      restrict: 'A',
      scope: {
        lineData: '=',
        lineXkey: '@',
        lineYkeys: '@',
        lineLabels: '@',
        lineColors: '@',
        lineWidth: '@',
        fillOpacity: '@',
        showGrid: '@'
      },
      link: function (scope, elem, attrs){
        var colors,
            morris;
        if (scope.lineColors === void 0 || scope.lineColors === '') {
          colors = null;
        } else {
          colors = JSON.parse(scope.lineColors);
        }
        scope.$watch('lineData', function(){
          if(scope.lineData){
            if(!morris) {
              morris = new Morris.Area({
                element: elem,
                data: scope.lineData,
                xkey: scope.lineXkey,
                ykeys: JSON.parse(scope.lineYkeys),
                labels: JSON.parse(scope.lineLabels),
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                lineWidth: scope.lineWidth || '0',
                fillOpacity: scope.fillOpacity || '0.8',
                grid: scope.showGrid || false,
                resize: true
              });
            } else {
              morris.setData(scope.lineData);
            }
          }
        });
      }
    };
  })

  .directive('morrisBarChart', function(){
    return {
      restrict: 'A',
      scope: {
        barData: '=',
        barXkey: '@',
        barYkeys: '@',
        barLabels: '@',
        barColors: '@'
      },
      link: function(scope, elem, attrs){

        var colors,
            morris;
        if (scope.barColors === void 0 || scope.barColors === '') {
          colors = null;
        } else {
          colors = JSON.parse(scope.barColors);
        }

        scope.$watch('barData', function(){
          if(scope.barData){
            if(!morris) {
              morris = new Morris.Bar({
                element: elem,
                data: scope.barData,
                xkey: scope.barXkey,
                ykeys: JSON.parse(scope.barYkeys),
                labels: JSON.parse(scope.barLabels),
                barColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                xLabelMargin: 2,
                resize: true
              });
            } else {
              morris.setData(scope.barData);
            }
          }
        });
      }
    };
  })

  .directive('morrisDonutChart', function(){
    return {
      restrict: 'A',
      scope: {
        donutData: '=',
        donutColors: '@'
      },
      link: function(scope, elem, attrs){
        var colors,
            morris;
        if (scope.donutColors === void 0 || scope.donutColors === '') {
          colors = null;
        } else {
          colors = JSON.parse(scope.donutColors);
        }

        scope.$watch('donutData', function(){
          if(scope.donutData){
            if(!morris) {
              morris = new Morris.Donut({
                element: elem,
                data: scope.donutData,
                colors: colors || ['#0B62A4', '#3980B5', '#679DC6', '#95BBD7', '#B0CCE1', '#095791', '#095085', '#083E67', '#052C48', '#042135'],
                resize: true
              });
            } else {
              morris.setData(scope.donutData);
            }
          }
        });
      }
    };
  });
