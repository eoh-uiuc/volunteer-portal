import React, { Component } from 'react';

import { timeMap } from './Day';
import Cell from './Cell';

class Column extends Component {
  checkInTS = (time) => {
    const { timeslots } = this.props;

    for (let i = 0; i < timeslots.length; i++) {
      const t = timeslots[i];
      const idx = timeMap[t.time];
      if (idx === time) { return i; }
    }
    return -1;
  }

  render() {
    const { range, timeslots } = this.props;
    const s = [];

    let passNext = false;
    for (let i = range[0]; i <= range[1]; i++) {
      if (passNext) {
        passNext = false;
        continue;
      }

      const idx = this.checkInTS(i);
      if (idx >= 0) {
        const t = timeslots[idx];
        s.push(<Cell key={t.tsid} data={t} />);
        passNext = t.duration === 2;
      } else {
        s.push(<Cell key={`invalid_${i}`} invalid />);
      }
    }

    return <div className="slots">{ s }</div>;
  }
}

export default Column;
