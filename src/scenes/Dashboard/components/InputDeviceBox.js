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
  const [isDeviceActive, setDeviceActiveness] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const dispatch = useDispatch();
  const modalTitle = 'Edit device data';

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      setShowModal(false);
    }
  });

  function deviceStatusChanged(status) {
    console.log('STATUS recieved by parent =>', status);
    setDeviceActiveness(status);
  }

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

  const percentageStyle = (value) => {
    let color;
    if (value > 80) {
      color = 'lightseagreen';
    } else if (value > 50 && value < 80) {
      color = 'MediumAquaMarine';
    } else if (value < 50 && value > 20) {
      color = 'LightSalmon';
    } else {
      color = 'LightCoral';
    }
    return { 
      backgroundImage: `conic-gradient(${color} ${value}%, lightgrey ${value}%)`
    };
  };

  const deviceChart = () => (
    <div className={isDeviceActive ? 'chart' : 'chart not_active'} style={percentageStyle(percentage)}>  
      <p className="chart__value">
        <DeviceWebsocket 
          mqttName={deviceData.mqttName} 
          statusChange={deviceStatusChanged} 
          deviceStatus={isDeviceActive}
          setPercentage={setPercentage} 
        />
      </p>
    </div>
  );

  return (
    <div className={isDeviceActive ? 'device__block__input-box' : 'device__block__input-box not_active'}>
      <div className="device__block__top">
        <button type="button" onClick={handleModalClick} className="button-menu">
          <img src="assets/vertical-menu-icon.png" className="vertical-menu" alt="menu button" />
        </button>      
        <p className="device__block__device-name">
          {`${deviceData.Device_Name}`} 
        </p>
      </div>
      {deviceChart()}
      <div className="device__block__input-box__text">
        {isDeviceActive && <p><b>Device is active</b></p>}
        {!isDeviceActive && <p><b>Device is not active</b></p>}
        <p>
          ID:
          {` ${deviceData.mqttName}`}
        </p>
        <p>
        Location:
          {` ${deviceData.Location}`}
        </p>
      </div>
      <div className="device__block__input-box--button">
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
