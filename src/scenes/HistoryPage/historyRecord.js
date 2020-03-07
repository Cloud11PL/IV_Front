import React from 'react';
import propTypes from 'prop-types';

function HistoryRecord(props) {
  const { time } = props;
  const { series } = props;

  return (
    <div className="history__record">
      <p className="hisotry__record--time">{time}</p>
      <div>Picker</div>
    </div>
  );
}

export default HistoryRecord;
