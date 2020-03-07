import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../_config/axios';

import { fetchBagTypes } from '../../actions/bagTypeActions';
import useBagTypes from './useBagTypes';

import Modal from '../components/Modal';
import BagSelector from './bagSelector';

export default function HistorySeries(props) {
  const { patientId } = props;

  const dispatch = useDispatch();

  const bagTypes = useBagTypes();

  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [today, setToday] = useState([]);
  const [pastWeek, setPastWeek] = useState([]);
  const [pastMonth, setPastMonth] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [seriesForEditing, setSeriesForEditing] = useState({});


  const PAST_DAY = 60 * 60 * 1000 * 24;
  const WEEK = PAST_DAY * 7;
  const MONTH = PAST_DAY * 30;

  useEffect(() => {
    if (!bagTypes.length > 0) {
      dispatch(fetchBagTypes());
    }
  });

  useEffect(() => {
    if (patientId !== undefined) {
      const fetchSeriesForPatient = async () => {
        setIsLoading(true);
        await API.get('http://localhost:1200/seriesPatient', {
          params: {
            patientId
          }
        }).then((res) => {
          console.log(res.data);
          setSeries(res.data);
        });
      };
    fetchSeriesForPatient();
    }      
    return () => { setIsLoading(false); };
  }, [patientId]);

  useEffect(() => {
    // if (series.length > 0) {
      const time = new Date();
      const todaySeries = [];
      const week = [];
      const month = [];
      series.forEach((series) => {
        console.log('series.time', series.time);
        console.log('time', time);
        const now = Date.parse(time);
        const serTime = Date.parse(series.time);
        if (now - serTime < PAST_DAY) {
          todaySeries.push(series);
        } else if (now - serTime < MONTH && now - serTime > WEEK) {
          month.push(series);
        } else {
          week.push(series);
        }
      });
      setToday(todaySeries);
      setPastWeek(week);
      setPastMonth(month);
    // }
  }, [MONTH, PAST_DAY, WEEK, series]);

  const getBagType = (objectId) => {
    if (objectId === undefined) {
      return '';
    }
    const bags = bagTypes.filter((bag) => bag._id === objectId);
    console.log(bags[0]);
    return bags;
  };

  const updateSeriesData = (newData) => {
    const backup = [...series];
    console.log(backup);
    const single = backup.filter((single) => single._id === newData._id)[0];
    console.log(single);
    const index = backup.findIndex((series) => series === single);
    backup[index] = newData;
    setSeries(backup);
  };

  const getBagTypeCells = (objectId, seriesId) => {
    const correctBag = getBagType(objectId);
    console.log(correctBag);
    if (correctBag.length > 0) {
      return (
        <>
          <td>{correctBag[0].type}</td>
          <td>
            {correctBag[0].volume}
            {' '}
            ml
          </td>
          <td>
            {correctBag[0].dosage}
            {' '}
            %
          </td>
          <td>
            <BagSelector seriesId={seriesId} bagId={objectId} updateSeriesData={updateSeriesData} />
          </td>
        </>
      );
    } 
    return (
      <>
        <td>Undefined</td>
        <td>Undefined</td>
        <td>Undefined</td>
        <td>
          <BagSelector seriesId={seriesId} bagId={objectId} updateSeriesData={updateSeriesData} />
        </td>
      </>
    );
  };

  function handleChange(e) {
    e.persist();
    // setSeriesDetails((data) => ({ ...data, [e.target.id]: e.target.value }));
  }

  function handleClick() {
    setShowModal(!showModal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleClick();
    // dispatch(updateSingleSeries(seriesDetails));
    // console.log(seriesDetails);
  }

  const updateBag = (series) => {
    setSeriesForEditing(series);
    setShowModal(true);
    console.log(series);
  };

  const renderTime = (gotTime) => {
    const time = new Date(gotTime);
    
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
  };

  const renderList = (data) => {
    const list = () => data.map((singleSeries) => (
      <tbody key={singleSeries._id}>
        <tr>
          <td>{renderTime(singleSeries.time)}</td>
          {getBagTypeCells(singleSeries.bagType, singleSeries._id)}
          {/* <td><button type="button" onClick={() => updateBag(singleSeries)}>Edit</button></td> */}
        </tr>
      </tbody>
  ));

    return (
      <table>
        {list()}
      </table>
    );
  };

  const isData = (array, title) => {
    if (array.length > 0) {
      return (
        <div>
          <h1>{title}</h1>
          <hr className="small" />
          {renderList(array)}
        </div>
      );
    }
    return (
      <div>
        <h1>{title}</h1>
        <hr className="small" />
        <p>No data available...</p>
      </div>
    );
  };

  return (
    <>
      {isData(today, 'Today')}
      {isData(pastWeek, 'Past week')}
      {isData(pastMonth, 'Past month')}
      <Modal open={showModal} onClose={handleClick} className="modal">
        <label>Bag type:</label>
        {/* <h1>{() => getBagType(seriesForEditing.bagType)[0].type}</h1> */}
        <input 
          // placeholder={getBagType(seriesForEditing.bagType)[0].type}
          id="bagType"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </Modal>
    </>
  );
}
