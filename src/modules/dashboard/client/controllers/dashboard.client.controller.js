angular.module('dashboard')
  .controller('DashboardCtrl', ($scope, $http, $moment, Customers, Orders) => {
    $scope.customers = 0;
    $scope.orders = 0;
    $scope.salesCentAmount = 0;
    $scope.startDate = $moment().subtract(7, 'days').startOf('day').toDate();
    $scope.endDate = $moment().startOf('day').toDate();
    $scope.rangeOptions = {
      ranges: {
        Today: [$moment(), $moment()],
        Yesterday: [$moment().subtract(1, 'days'), $moment().subtract(1, 'days')],
        'Last 7 Days': [$moment().subtract(7, 'days'), $moment()],
        'Last 30 Days': [$moment().subtract(29, 'days'), $moment()],
        'This Month': [$moment().startOf('month'), $moment().endOf('month')],
        'Last Month': [
          $moment().subtract(1, 'month').startOf('month'),
          $moment().subtract(1, 'month').endOf('month'),
        ],
      },
      opens: 'left',
      startDate: $moment().startOf('day').subtract(7, 'days'),
      endDate: $moment().startOf('day'),
      parentEl: '#content',
    };

    $scope.refreshData = (startDate, endDate) => {
      Customers.totalCustomers({
        startDate,
        endDate,
      }).$promise.then((res) => {
        $scope.customers = res.totalCustomers;
      });

      Orders.totalOrders({
        startDate,
        endDate,
      }).$promise.then((res) => {
        $scope.orders = res.totalOrders;
      });

      Orders.totalSales({
        startDate,
        endDate,
      }).$promise.then((res) => {
        $scope.salesCentAmount = res.totalSalesCentAmount;
        $scope.salesCurrencyCode = res.currencyCode;
      });
      // getSales($scope.startDate, $scope.startDate);
    };

    $scope.page = {
      title: 'Dashboard',
      subtitle: 'Place subtitle here...',
    };

    $scope.getUsers = () => {
      $scope.data = [];
      const url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=3&callback=JSON_CALLBACK';

      $http.jsonp(url).success((data) => {
        $scope.data = data;
      });
    };

    $scope.refreshData($scope.startDate, $scope.endDate);
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
  })

  .controller('ActualStatisticsCtrl', ($scope) => {
    $scope.easypiechart = {
      percent: 100,
      options: {
        animate: {
          duration: 3000,
          enabled: true,
        },
        barColor: '#418bca',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4,
      },
    };
    $scope.easypiechart2 = {
      percent: 75,
      options: {
        animate: {
          duration: 3000,
          enabled: true,
        },
        barColor: '#e05d6f',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4,
      },
    };
    $scope.easypiechart3 = {
      percent: 46,
      options: {
        animate: {
          duration: 3000,
          enabled: true,
        },
        barColor: '#16a085',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4,
      },
    };
  })

  .controller('BrowseUsageCtrl', ($scope) => {
    $scope.donutData = [
      { label: 'Chrome', value: 25, color: '#00a3d8' },
      { label: 'Safari', value: 20, color: '#2fbbe8' },
      { label: 'Firefox', value: 15, color: '#72cae7' },
      { label: 'Opera', value: 5, color: '#d9544f' },
      { label: 'Internet Explorer', value: 10, color: '#ffc100' },
      { label: 'Other', value: 25, color: '#1693A5' },
    ];

    $scope.oneAtATime = true;

    $scope.status = {
      isFirstOpen: true,
      tab1: {
        open: true,
      },
      tab2: {
        open: false,
      },
      tab3: {
        open: false,
      },
    };
  })

  .controller('RealtimeLoadCtrl', ($scope, $interval) => {
    const random = new Rickshaw.Fixtures.RandomData(50);
    const updateInterval = 800;
    $scope.options1 = {
      renderer: 'area',
      height: 133,
    };

    $scope.seriesData = [[], []];

    for (let i = 0; i < 50; i++) {
      random.addData($scope.seriesData);
    }


    $interval(() => {
      random.removeData($scope.seriesData);
      random.addData($scope.seriesData);
    }, updateInterval);

    $scope.series1 = [{
      name: 'Series 1',
      color: 'steelblue',
      data: $scope.seriesData[0],
    }, {
      name: 'Series 2',
      color: 'lightblue',
      data: $scope.seriesData[1],
    }];

    $scope.features1 = {
      hover: {
        xFormatter: (x) => {
          return new Date(x * 1000).toUTCString();
        },
        yFormatter: (y) => {
          return `${Math.floor(y)}%`;
        },
      },
    };
  })

  .controller('ProjectProgressCtrl', ($scope, DTOptionsBuilder, DTColumnDefBuilder) => {
    $scope.projects = [
      {
        title: 'Graphic layout for client',
        priority: {
          value: 1,
          title: 'High Priority',
        },
        status: 42,
        chart: {
          data: [1, 3, 2, 3, 5, 6, 8, 5, 9, 8],
          color: '#cd97eb',
        },
      },
      {
        title: 'Make website responsive',
        priority: {
          value: 3,
          title: 'Low Priority',
        },
        status: 89,
        chart: {
          data: [2, 5, 3, 4, 6, 5, 1, 8, 9, 10],
          color: '#a2d200',
        },
      },
      {
        title: 'Clean html/css/js code',
        priority: {
          value: 1,
          title: 'High Priority',
        },
        status: 23,
        chart: {
          data: [5, 6, 8, 2, 1, 6, 8, 4, 3, 5],
          color: '#ffc100',
        },
      },
      {
        title: 'Database optimization',
        priority: {
          value: 2,
          title: 'Normal Priority',
        },
        status: 56,
        chart: {
          data: [2, 9, 8, 7, 5, 9, 2, 3, 4, 2],
          color: '#16a085',
        },
      },
      {
        title: 'Database migration',
        priority: {
          value: 3,
          title: 'Low Priority',
        },
        status: 48,
        chart: {
          data: [3, 5, 6, 2, 8, 9, 5, 4, 3, 2],
          color: '#1693A5',
        },
      },
      {
        title: 'Email server backup',
        priority: {
          value: 2,
          title: 'Normal Priority',
        },
        status: 10,
        chart: {
          data: [7, 8, 6, 4, 3, 5, 8, 9, 10, 7],
          color: '#3f4e62',
        },
      },
    ];

    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();
    $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4).notSortable(),
    ];
  });
