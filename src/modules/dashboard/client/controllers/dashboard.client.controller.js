angular.module('dashboard')
  .controller('DashboardCtrl', ($scope) => {
    $scope.page = {
      title: 'Dashboard',
    };
  })
  .controller('StatisticsChartCtrl', ($scope) => {
    $scope.dataset = [{
      data: [
        [1, 15],
        [2, 40],
        [3, 35],
        [4, 39],
        [5, 42],
        [6, 50],
        [7, 46],
        [8, 49],
        [9, 59],
        [10, 60],
        [11, 58],
        [12, 74]],
      label: 'Sales&nbsp;',
      points: {
        show: true,
        radius: 4,
      },
      splines: {
        show: true,
        tension: 0.45,
        lineWidth: 4,
        fill: 0,
      },
    }, {
      data: [
        [1, 50],
        [2, 80],
        [3, 90],
        [4, 85],
        [5, 99],
        [6, 125],
        [7, 114],
        [8, 96],
        [9, 130],
        [10, 145],
        [11, 139],
        [12, 160]],
      label: 'Products in Stock',
      bars: {
        show: true,
        barWidth: 0.6,
        lineWidth: 0,
        fillColor: { colors: [{ opacity: 0.3 }, { opacity: 0.8 }] },
      },
    }];

    $scope.options = {
      colors: ['#213e48', '#20ad92'],
      series: {
        shadowSize: 0,
      },
      legend: {
        backgroundOpacity: 0,
        margin: -7,
        position: 'ne',
        noColumns: 2,
      },
      xaxis: {
        tickLength: 0,
        font: {
          color: '#fff',
        },
        position: 'bottom',
        ticks: [
          [1, 'JAN'],
          [2, 'FEB'],
          [3, 'MAR'],
          [4, 'APR'],
          [5, 'MAY'],
          [6, 'JUN'],
          [7, 'JUL'],
          [8, 'AUG'],
          [9, 'SEP'],
          [10, 'OCT'],
          [11, 'NOV'],
          [12, 'DEC'],
        ],
      },
      yaxis: {
        tickLength: 0,
        font: {
          color: '#fff',
        },
      },
      grid: {
        borderWidth: {
          top: 0,
          right: 0,
          bottom: 1,
          left: 1,
        },
        borderColor: 'rgba(255,255,255,.3)',
        margin: 0,
        minBorderMargin: 0,
        labelMargin: 20,
        hoverable: true,
        clickable: true,
        mouseActiveRadius: 6,
      },
      tooltip: true,
      tooltipOpts: {
        content: '%s: %y',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20,
        },
      },
    };
  });
