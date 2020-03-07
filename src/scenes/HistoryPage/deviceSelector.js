import React, {
 useEffect, useState
} from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch } from 'react-redux';
import { fetchDevices } from '../../actions/deviceActions';

import useDevices from './useDevices';

export default function DeviceSelector(props) {
  const [value, setValue] = useState('');
  const devices = useDevices();
  const dispatch = useDispatch();
  const { deviceId } = props;

  useEffect(() => {
    if (!devices.length > 0) {
      dispatch(fetchDevices());
    }
  });

  const onChange = (event, { newValue }) => {
    console.log(newValue);
    setValue(newValue);
  };

  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.Device_Name}
        {' '}
        {suggestion.Location}
      </span>
    );
  }

  function onSuggestionSelected(event, { suggestion }) {
    console.log(suggestion);
  }

  const getDeviceName = () => {
    console.log(devices);
    console.log(deviceId);
    if (deviceId !== undefined) {
      const device = devices.filter((device) => device._id === deviceId)[0];
      return `${device.Device_Name} | ${device.Location}`;
    }

    return 'Select device...';
  };

  const inputProps = {
    placeholder: getDeviceName(),
    value,
    onChange,
  };

  function getSuggestionValue(suggestion) {
    return `${suggestion.Device_Name} | ${suggestion.location}`;
  }

  function onSuggestionsClearRequested() {
    console.log('onSuggestionsClearRequested');
  }

  function onSuggestionsFetchRequested({ value }) {
    console.log(value);
  }

  const onButtonClick = () => {
    // input.current.focus();
    console.log('XD');
  };

  return (
    <div className="history__details--device">
      <h1>Select the device</h1>
      {devices.length > 0 && (
        <Autosuggest 
          suggestions={devices}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
      )}
      <button type="button" onClick={onButtonClick}>Apply</button>
    </div>
  );
}
