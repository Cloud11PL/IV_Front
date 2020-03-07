import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import NavBar from '../components/NavBar';

import PatientPicker from './patientPicker';
import PatientDetails from './patientDetails';

import usePatients from './usePatients';
import useDevices from './useDevices';

import { fetchPatients } from '../../actions/patientActions';
import { fetchDevices } from '../../actions/deviceActions';

// { match, location }
function HistoryPage() {
  const dispatch = useDispatch();
  const patients = usePatients();
  const devices = useDevices();
  // const bagTypes = useBagTypes();
  const [selectedPatient, setSelectedPatient] = useState({});
  const [patientsFromStore, setPatientsFromStore] = useState([]);
  const [devicesFromStore, setDevicesFromStore] = useState([]);

  useEffect(() => {
    if (patients.length > 0) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  useEffect(() => {
    if (!patients.length > 0) {
      console.log(devices);
      dispatch(fetchPatients());
    }
  }, [devices, devices.length, dispatch, patients.length]);

  useEffect(() => {
    if (!devices.length > 0) {
      console.log(patients);
      dispatch(fetchDevices());
    }
  }, [devices.length, dispatch, patients, patients.length]);

  useEffect(() => {
    setPatientsFromStore(patients);
  }, [patients]);

  useEffect(() => {
    setDevicesFromStore(devices);
  }, [devices]);

  const selectPatient = (patient) => {
    console.log(patient);
    setSelectedPatient(patient);
  };

  const renderDetails = () => {
    if (selectedPatient) {
      return <PatientDetails patient={selectedPatient} />;
    }

    return <h1>Loading...</h1>;
  };

  return (
    <div>
      <NavBar />
      <div className="scene-container">
        <h1>Patient history</h1>
        <div className="history__container">
          <div className="history__patients">
            {patients.length > 0 && <PatientPicker patients={patients} selectedPatient={selectedPatient} selectPatient={selectPatient} />}
          </div>
          {renderDetails()}
        </div>
      </div>
    </div>
  );
}

// SeriesPage.propTypes = {
//   match: propTypes.shape({
//     params: propTypes.shape({
//       id: propTypes.node,
//       device: propTypes.node,
//     }).isRequired,
//   }).isRequired,
//   location: propTypes.shape({
//     state: propTypes.shape({
//       bagType: propTypes.string.isRequired,
//       Device_Id: propTypes.string.isRequired,
//       _id: propTypes.string.isRequired,
//       time: propTypes.string.isRequired,
//       isDone: propTypes.bool.isRequired,
//       SeriesId: propTypes.number.isRequired,
//     }).isRequired
//   }).isRequired
// };

export default withRouter(HistoryPage);
