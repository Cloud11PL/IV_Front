import React, { useEffect, useState } from 'react';

export default function PatientPicker(props) {
  const { patients } = props;
  const { selectedPatient } = props;
  const { selectPatient } = props;
  // const { selectedPatient } = props;
  console.log('PatientPICKERRR');
  console.log('PATIENTS IN PICKER', patients);
  console.log(selectPatient);

  const isActive = (patient) => {
    if (selectedPatient === patient) {
      return 'history__patients--patient btn-active';
    }
    return 'history__patients--patient';
  };

  const renderPatients = () => patients.map((patient) => (
    <button type="button" key={patient._id} className={isActive(patient)} onClick={() => selectPatient(patient)}>
      {patient.lastName} 
      {' '}
      {patient.firstName}
    </button>
  ));

  return renderPatients();
}
