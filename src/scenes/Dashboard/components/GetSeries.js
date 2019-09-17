import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchSeriesForDevice } from '../../../actions/seriesActions';
import useSeries from './useSeries';

function GetSeries(props) {
  const [deviceSeries, setDeviceSeries] = useState([]);
  
  const { fetchSeries } = props;
  const { id } = props;
  const { mqttName } = props;
  const series = useSeries(id);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      fetchSeries(id);
    }
  }, [fetchSeries, id]);

  useEffect(() => {
    if (series) {
      setDeviceSeries(Object.entries(series).map((e) => (e[1])));
    }
  }, [series]);

  function renderSeries() {
    return deviceSeries.map((singleSeries) => (
      <li key={singleSeries._id}>
        <Link
          to={{
          pathname: `/series/${mqttName}/${singleSeries.SeriesId}`,
          state: singleSeries 
}}
        >
          {singleSeries.time}
        </Link>

      </li>
));
  }

  return (
    <div>
      {deviceSeries.length > 0 ? <ul>{renderSeries()}</ul> : 'No Series to show'}
    </div> 
  );
}

GetSeries.propTypes = {
  fetchSeries: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};


const mapDispatchToProps = {
  fetchSeries: fetchSeriesForDevice,
};

export default connect(null, mapDispatchToProps)(GetSeries);
