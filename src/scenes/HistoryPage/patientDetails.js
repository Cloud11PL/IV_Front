import React from 'react';
import DeviceSelector from './deviceSelector';
import HistorySeries from './historySeries';

export default function PatientDetails(props) {
  const { patient } = props;

  return (
    <div className="history__details">
      <h1 className="history__details--name">
        {patient.lastName} 
        {' '}
        {patient.firstName}
      </h1>
      <DeviceSelector deviceId={patient.deviceId} />
      <h1>
        History
      </h1>
      <hr />
      <HistorySeries patientId={patient._id} />
    </div>
  );
}
