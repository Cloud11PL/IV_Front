import React, { useEffect, useState } from 'react';
import DeviceWebsocket from './DeviceWebsocketConnection';

export default function InputDeviceBox(props) {
  const [deviceData, setDeviceData] = useState({});
  
  useEffect(() => {
    const { device } = props;
    setDeviceData(device);
  }, [props]);

  return (
    <div className="device__live-input-box">
      <p className="device__live-input-box__text">
        {deviceData.mqttName}
        <DeviceWebsocket mqttName={deviceData.mqttName} />
      </p>
    </div>
  );
}
