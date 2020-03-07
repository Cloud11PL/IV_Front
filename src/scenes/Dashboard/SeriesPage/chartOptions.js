const options = (title) => {
  const chartOptions = {
    chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        // text: `${title}`,
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        labels: {
          // text: 'Time',
          format: 'HH:mm'
        },
        title: {
          text: 'Time [HH/mm]',
        },
      },
      yaxis: {
        // max: 300
        title: {
          text: 'Weight [g]',
        },
        decimalsInFloat: 2,
        // labels: {
        //   text: 'Weight'
        // }
      },
      legend: {
        show: false
      }
  };

    return chartOptions;
};

export default options;
