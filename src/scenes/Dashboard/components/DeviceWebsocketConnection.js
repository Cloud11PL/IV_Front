import React, { useState } from 'react';
import io from 'socket.io-client';

export default function DeviceWebsocketConnection(props) {
  const [currentInput, setCurrentInput] = useState(0);

  const { mqttName } = props;

  if (mqttName !== undefined) {
    const socket = io.connect('http://localhost:1200');
    socket.emit('join', `${mqttName}`);
    socket.on(`${mqttName}`, (data) => {
      console.log(data);
      setCurrentInput(data);
    });
  }

  const inputToDisplay = () => {
    if (currentInput === 0) {
      return 'Device is not active.';
    }
    return currentInput;
  };

  return (
    <p className="device__live-input-box__text__input">
      {inputToDisplay()}
    </p>
  );
}
