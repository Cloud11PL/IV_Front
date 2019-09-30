import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import propTypes from 'prop-types';
import API from '../../../_config/axios';
import chartOptions from './chartOptions';

import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';

import { updateSingleSeries } from '../../../actions/seriesActions';

function SeriesPage({ match, location }) {
  const [seriesForChart, setSeriesForChart] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  function handleChange(e) {
    e.persist();
    setSeriesDetails((data) => ({ ...data, [e.target.id]: e.target.value }));
  }

  function handleClick() {
    setShowModal(!showModal);
  }

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    handleClick();
    dispatch(updateSingleSeries(seriesDetails));
    console.log(seriesDetails);
  }

  const seriesId = match.params.id;
  const mqttName = match.params.device;

  useEffect(() => {
    setSeriesDetails(location.state);
  }, [location.state]);

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
    <div>
      <NavBar />
      <div className="scene-container">
      We are now looking at a nice page for a device:
        <br />
        <h1>
          {`Device name: ${match.params.device}`}
        </h1>
        <h1> 
          {`Series ID: ${match.params.id}`}
        </h1>
        {seriesDetails 
        && (
        <h1>
          {`Bag type: ${seriesDetails.BagType}`}
          <button type="button" onClick={handleClick}>Edit</button>
          <Modal open={showModal} onClose={handleClick} className="modal">
            <label>Bag type:</label>
            <input 
              placeholder={seriesDetails.BagType}
              id="BagType"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </Modal>
          <br />
          {`Status: ${seriesDetails.isDone ? 'Finished' : 'Not finished'}`}
        </h1>
      )}
        {seriesForChart.length > 0 && <Chart className="chart-window" options={chartOptions} series={seriesForChart} type="line" height="350" />}
      </div>
    </div>
  );
}

SeriesPage.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.node,
      device: propTypes.node,
    }).isRequired,
  }).isRequired,
  location: propTypes.shape({
    state: propTypes.shape({
      BagType: propTypes.string.isRequired,
      Device_Id: propTypes.string.isRequired,
      _id: propTypes.string.isRequired,
      time: propTypes.string.isRequired,
      isDone: propTypes.bool.isRequired,
      SeriesId: propTypes.number.isRequired,
    }).isRequired
  }).isRequired
};

export default withRouter(SeriesPage);
