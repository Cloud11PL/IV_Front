import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { fetchDevices } from '../../../actions/deviceActions';
import useDevices from './useDevices';
import useRenderDevices from './useRenderDevices';


function DeviceContainer(props) {
  const devices = useDevices();
  const [stateDevices, setDevices] = useState([]);
  const { devicesAction } = props;

  useEffect(() => {
    devicesAction();
  }, [devicesAction]);

  useEffect(() => {
    setDevices(devices);
  }, [devices, stateDevices]);
  const RenderDevices = useRenderDevices(stateDevices); 

  return (
    <div className="device_container">
      {stateDevices !== [] && RenderDevices}
    </div>
  );
}

DeviceContainer.propTypes = {
  devicesAction: propTypes.func.isRequired
};

const mapDispatchToProps = {
  devicesAction: fetchDevices
};

export default connect(null, mapDispatchToProps)(DeviceContainer);
