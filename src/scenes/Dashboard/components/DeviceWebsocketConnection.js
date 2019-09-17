import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:1200');

export default function DeviceWebsocketConnection(props) {
  const [currentInput, setCurrentInput] = useState(0);
  const [connectionName, setConnectionName] = useState(null);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const { mqttName } = props;
    if (mqttName !== undefined) {
      setConnectionName(mqttName);
      setConnected(true);
    }
  }, [isConnected, props]);


  // Join the room
  useEffect(() => {
    if (connectionName !== undefined && isConnected) {
      socket.emit('join', connectionName);
      return () => {
        if (isConnected) {
          console.log('Websocket Closed for some reason');
        }
      };
    }
  }, [connectionName, isConnected]);

  // Recieve message
  useEffect(() => {
    socket.on(connectionName, (data) => {
      if (data !== currentInput) {
        setCurrentInput(data);
      }
    });
  }, [connectionName, currentInput]);

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
