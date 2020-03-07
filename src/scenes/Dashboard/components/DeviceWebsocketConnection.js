import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:1200');

export default function DeviceWebsocketConnection(props) {
  const [currentInput, setCurrentInput] = useState(0);
  const [connectionName, setConnectionName] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const [currentPercentageInput, setCurrentPercentageInput] = useState(0);
  const { statusChange } = props;
  const { deviceStatus } = props;
  const { setPercentage } = props;
  // const timeout = 10 * 1000;
  const deviceNotActiveStyle = {
    textAlign: 'center',
    'font-size': '1.4rem',
  };
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
      console.log(data);
      if (deviceStatus !== true) {
        statusChange(true);
      }
      // const timer = setTimeout(() => {
      //   statusChange(false);
      //   console.log('Times out');
      // }, timeout);
      // console.log(data);
      if (data === 'Disconnected') {
        statusChange(false);
        setPercentage(10);
      }
      if (data.current !== currentInput) {
        console.log('Current', data.current);
        console.log('Max', data.max);
        const percent = Math.floor((Number(data.current) / Number(data.max)) * 100);
        console.log(percent);

        setCurrentInput(data.current);
        setPercentage(percent);
        setCurrentPercentageInput(percent);
      }
      // return () => clearTimeout(timer);
    });
  }, [connectionName, currentInput, deviceStatus, setPercentage, statusChange]);

  const inputToDisplay = () => {
    if (currentInput === 0 || !deviceStatus) {
      return <p style={deviceNotActiveStyle}>Device is not active</p>;
    }
    return (
      <p className="device__live-input-box__text__input">
        {currentPercentageInput}
        {' '}
        %
      </p>
    );
  };

  return (
    inputToDisplay()
  );
}
