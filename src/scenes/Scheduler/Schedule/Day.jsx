import React, { Component } from 'react';

import Column from './Column';
import { stationMap } from './stations';

export const times = [
  { time: '07:A', display: '7:00 AM' },
  { time: '08:A', display: '8:00 AM' },
  { time: '09:A', display: '9:00 AM' },
  { time: '10:A', display: '10:00 AM' },
  { time: '11:A', display: '11:00 AM' },
  { time: '12:P', display: '12:00 PM' },
  { time: '01:P', display: '1:00 PM' },
  { time: '02:P', display: '2:00 PM' },
  { time: '03:P', display: '3:00 PM' },
  { time: '04:P', display: '4:00 PM' },
  { time: '05:P', display: '5:00 PM' },
  { time: '06:P', display: '6:00 PM' },
  { time: '07:P', display: '7:00 PM' },
  { time: '08:P', display: '8:00 PM' },
  { time: '09:P', display: '9:00 PM' },
];

export const timeMap = {};
times.forEach((v, i) => { timeMap[v.time] = i; });

const calculateRange = (data) => {
  let minTime = times.length;
  let maxTime = -1;
  Object.keys(data).forEach(station => {
    data[station].forEach(cell => {
      const start = timeMap[cell.time];
      const end = start + cell.duration - 1;
      minTime = Math.min(minTime, start);
      maxTime = Math.max(maxTime, end);
    });
  });

  return [minTime, maxTime];
};

const checkOverlap = (data) => {
  const tm = times.map(() => false);
  let overlap = false;
  data.forEach(d => {
    let idx = timeMap[d.time];
    if (tm[idx]) { overlap = true; }
    tm[idx] = true;

    if (d.duration === 2) {
      idx += 1;
      if (tm[idx]) { overlap = true; }
      tm[idx] = true;
    }
  });
  return overlap;
};

const partitionColumns = (data) => {
  const a = [];
  const b = [];
  data.forEach(d => {
    let idx = timeMap[d.time];
    if (idx % 2 === 1) { a.push(d); }
    else { b.push(d); }
  });

  return [a, b];
}

const Time = (props) => (
  <div className="time-marker">
    <p>{props.t}</p>
  </div>
);

const StationTitle = (props) => (
  <div className={`station-title ${props.overlap ? 'double' : 'single'}`}>
    <p>{stationMap[props.title]}</p>
  </div>
);

class Day extends Component {
  render() {
    const { data } = this.props;
    const range = calculateRange(data);
    const t = [];
    for (let i = range[0]; i <= range[1]; i++) {
      t.push(<Time key={`time_${i}`} t={times[i].display} />);
    }

    const h = [];
    const c = [];
    Object.keys(data).forEach(k => {
      const overlap = checkOverlap(data[k]);
      h.push(<StationTitle key={k} title={k} overlap={overlap} />);
      if (overlap) {
        const [a, b] = partitionColumns(data[k]);
        c.push(<Column key={`${k}_a`} timeslots={a} range={range} />);
        c.push(<Column key={`${k}_b`} timeslots={b} range={range} />);
      } else {
        c.push(<Column key={k} timeslots={data[k]} range={range} />);
      }
    });

    return (
      <div className="day">
        <div className="times">{ t }</div>
        <div className="scrollable">
          <div className="station-titles">{ h }</div>
          <div className="columns">{ c }</div>
        </div>
      </div>
    );
  }
}

export default Day;
