import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import propTypes from 'prop-types';
import API from '../../../_config/axios';

import options from './chartOptions';

function ChartContainer(props) {
  const [seriesForChart, setSeriesForChart] = useState([]);

  const { mqttName } = props;
  const { seriesId } = props;
  const chartOptions = options(`Chart for seried by ID of ${seriesId}`);


  function convertAPIData(series) {
    const tempSeries = [];
    series.map((singleInput) => 
      tempSeries.push({
        x: new Date(singleInput.Time).getTime(),
        y: singleInput.payload,
      }));
    setSeriesForChart([{ data: tempSeries }]);
  }

  useEffect(() => {
    async function fetchSeriesData() {
      await API.get('http://localhost:1200/series', {
        params: {
          mqttName,
          seriesId,
        }
      }).then((nodeData) => {
        convertAPIData(nodeData.data);
      });
    }
    fetchSeriesData();
  }, [mqttName, seriesId]);

  return (
    <>
      {seriesForChart.length > 0 && <Chart className="chart-window" options={chartOptions} series={seriesForChart} type="line" height="350" />}
    </>
  );
}

ChartContainer.propTypes = {
  mqttName: propTypes.string.isRequired,
  seriesId: propTypes.number.isRequired,
};

export default ChartContainer;
