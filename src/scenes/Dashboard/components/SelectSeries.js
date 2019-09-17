import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSeriesForDevice } from '../../../actions/seriesActions';
import seriesSelector from '../selectors/seriesSelectors';

function SelectSeries(props) {
  const { deviceId } = props;
  const { fetchSeries } = props;
  const { series } = seriesSelector();
  console.log('DeviceId', deviceId);

  const [seriesForDevice, setSeriesForDevice] = useState([]);

  useEffect(() => {
    if (series === [] || series === undefined) {
      fetchSeries();
    }
  }, [fetchSeries, series]);


  // ZASTOSOWAC SELECTOR DO STATE'A | TO BEDZIE KOOL

  useEffect(() => {
    setSeriesForDevice(series);
  }, [series]);
}

function printSeries(seriesForDevice) {
  return seriesForDevice.map((series) => series.SeriesId);
}

const mapDispatchToProps = {
  fetchSeries: fetchSeriesForDevice,
};

export default connect(null, mapDispatchToProps)(SelectSeries);
