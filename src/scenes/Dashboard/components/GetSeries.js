import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchSeriesForDevice } from '../../../actions/seriesActions';
import { fetchBagTypes } from '../../../actions/bagTypeActions';
import useSeries from './useSeries';
import useBagTypes from '../../HistoryPage/useBagTypes';

function GetSeries(props) {
  const [deviceSeries, setDeviceSeries] = useState([]);
  
  const { fetchSeries } = props;
  const { id } = props;
  const { mqttName } = props;
  const series = useSeries(id);

  const dispatch = useDispatch();
  const bagTypes = useBagTypes();

  useEffect(() => {
    if (!bagTypes.length > 0) {
      dispatch(fetchBagTypes());
    }
  });

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

  function getBagType(objectId) {
    if (objectId === undefined) {
      return 'No bags set.';
    }
    const bags = bagTypes.filter((bag) => bag._id === objectId);
    console.log(bags[0]);
    return `${bags[0].type} ${bags[0].volume}ML ${bags[0].dosage}%`;
  }

  function renderSeries() {
    return deviceSeries.reverse().map((singleSeries) => {
      console.log(singleSeries);
      const date = new Date(singleSeries.time);
      return (
        <li key={singleSeries._id} className="series-list__item">  
          <Link
            className="series-list__item__link"
            to={{
          pathname: `/series/${mqttName}/${singleSeries.SeriesId}`,
          state: singleSeries 
}}
          >
            {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${singleSeries.bagType ? getBagType(singleSeries.bagType) : 'Not specified'}`}
          </Link>

        </li>
      );
    });
  }

  return (
    <div>
      {deviceSeries.length > 0 ? <ul className="series-list">{renderSeries()}</ul> : 'No Series to show'}
    </div> 
  );
}

GetSeries.propTypes = {
  fetchSeries: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  mqttName: propTypes.string.isRequired,
};


const mapDispatchToProps = {
  fetchSeries: fetchSeriesForDevice,
};

export default connect(null, mapDispatchToProps)(GetSeries);
