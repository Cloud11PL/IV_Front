import React, { useEffect, useState } from 'react';
import DeviceWebsocket from './DeviceWebsocketConnection';
import GetSeries from './GetSeries';


export default function InputDeviceBox(props) {
  const [deviceData, setDeviceData] = useState({});
  const [isClicked, setClicked] = useState(false);
  const clicked = false;
  
  useEffect(() => {
    const { device } = props;
    setDeviceData(device);
  }, [props]);

  function handleClick() {
    console.log('Device ID =>', deviceData._id);
    console.log('Click status', clicked);
    // clicked = !clicked;
    setClicked(!isClicked);
  }

  return (
    <div className="device__live-input-box">
      <div className="device__live-input-box__text">
        {deviceData.mqttName}
        <DeviceWebsocket mqttName={deviceData.mqttName} />
        <button onClick={handleClick} type="button">Get series</button>
        
        {isClicked && <GetSeries id={deviceData._id} mqttName={deviceData.mqttName} />}
      </div>
    </div>
  );
}
