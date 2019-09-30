import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DeviceWebsocket from './DeviceWebsocketConnection';
import GetSeries from './GetSeries';
import Modal from '../../components/Modal';

import { updateDeviceData } from '../../../actions/deviceActions';


export default function InputDeviceBox(props) {
  const [deviceData, setDeviceData] = useState({});
  const [isClicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const modalTitle = 'Edit device data';

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      setShowModal(false);
    }
  });

  function handleChange(e) {
    e.persist();
    setDeviceData((data) => ({ ...data, [e.target.id]: e.target.value }));
  }

  function handleModalClick() {
    setShowModal(!showModal);
  }
  
  useEffect(() => {
    const { device } = props;
    setDeviceData(device);
  }, [props]);

  function handleClick() {
    console.log('Device ID =>', deviceData._id);
    setClicked(!isClicked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleModalClick();
    dispatch(updateDeviceData(deviceData));
    console.log(deviceData);
  }

  return (
    <div className="device__live-input-box">
      <div className="device__live__top">
        <button type="button" onClick={handleModalClick} className="button-menu">
          <img src="assets/vertical-menu-icon.png" className="vertical-menu" alt="menu button" />
        </button>      
        <p className="device__live--device_name">
          {`${deviceData.Device_Name}`} 
        </p>
      </div>
      <div className="chart x-60">
        <p className="chart__value">
          
          <DeviceWebsocket mqttName={deviceData.mqttName} />
        
        </p>
      </div> 
      <div className="device__live-input-box__text">
        {`ID: ${deviceData.mqttName}`}
        <br />
        <br />
        {`Location: ${deviceData.Location}`}
        <Modal modalTitle={modalTitle} open={showModal} onClose={handleModalClick} className="modal">
          <div className="modal__content--input">
            <label>Device name: </label>
            <input 
              placeholder={deviceData.Device_Name}
              id="Device_Name"
              onChange={handleChange}
            />
          </div>
          <div className="modal__content--input">
            <label>Location: </label>
            <input 
              placeholder={deviceData.Location}
              id="Location"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </Modal>
        <div 
          className={isClicked ? 'button__container button__container--clicked' : 'button__container'}
        >
          <button 
            onClick={handleClick} 
            type="button"
            className="button__series"
            
          >
            {isClicked ? 'Hide series list' : 'Show series list'}
          </button>
        </div>
        {isClicked && <GetSeries id={deviceData._id} mqttName={deviceData.mqttName} />}
      </div>
    </div>
  );
}
