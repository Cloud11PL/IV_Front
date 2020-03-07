import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';
import ChartContainer from './ChartContainer';


import { updateSingleSeries } from '../../../actions/seriesActions';

import useBagTypes from '../../HistoryPage/useBagTypes';
import { fetchBagTypes } from '../../../actions/bagTypeActions';

function SeriesPage({ match, location }) {
  const [seriesDetails, setSeriesDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const seriesId = match.params.id;
  const mqttName = match.params.device;
  
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

  const bagTypes = useBagTypes();

  useEffect(() => {
    if (!bagTypes.length > 0) {
      dispatch(fetchBagTypes());
    }
  });

  useEffect(() => {
    setSeriesDetails(location.state);
  }, [location.state]);

  function getBagType(objectId) {
    if (objectId === undefined) {
      return 'No bags set.';
    }
    const bags = bagTypes.filter((bag) => bag._id === objectId);
    console.log(bags[0]);
    return `${bags[0].type} ${bags[0].volume}ML ${bags[0].dosage}%`;
  }

  return (
    <div>
      <NavBar />
      <div className="scene-container">
        <div className="scene-container_device-info">
          <h1>
            Device name: 
          </h1>
          <p>{match.params.device}</p>
        </div>
        <div className="scene-container_device-info">
          <h1>
            Series ID: 
          </h1>
          <p>{match.params.id}</p>
        </div>

        {seriesDetails 
        && (
          <>
            <div className="scene-container_device-info">
              <h1>
                Bag type: 
              </h1>
              <p>{getBagType(seriesDetails.bagType)}</p>
              <button type="button" onClick={handleClick}>Edit</button>
            </div>
            <Modal open={showModal} onClose={handleClick} className="modal">
              <label>Bag type:</label>
              <input 
                placeholder={seriesDetails.bagType}
                id="bagType"
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </Modal>
            <div className="scene-container_device-info">
              <h1>
              Series status: 
              </h1>
              <p>{seriesDetails.isDone ? 'Finished' : 'Not finished'}</p>
            </div>
          </>
      )}
        {<ChartContainer mqttName={mqttName} seriesId={seriesId} />}
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
      bagType: propTypes.string.isRequired,
      Device_Id: propTypes.string.isRequired,
      _id: propTypes.string.isRequired,
      time: propTypes.string.isRequired,
      isDone: propTypes.bool.isRequired,
      SeriesId: propTypes.number.isRequired,
    }).isRequired
  }).isRequired
};

export default withRouter(SeriesPage);
