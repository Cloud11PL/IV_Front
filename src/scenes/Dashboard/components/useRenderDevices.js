import React from 'react';
import InputDeviceBox from './InputDeviceBox';

export default function useRenderDevices(devices) {
  if (devices === undefined) {
    return ('eh');
  }

  return (
    devices.map((device) => <InputDeviceBox key={device._id} device={device} />)
  );
}
