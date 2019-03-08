import React from 'react';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { setScheduleTab } from 'services/ui/actions';

import Day from './Day';
import Details from './Details';
import './styles.scss';

const Schedule = (props) => {
  const handleChange = (event, value) => {
    props.setScheduleTab(value);
  };

  const { timeslots, tab } = props;

  if (timeslots === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="schedule">
      {tab === 0 && <Day data={timeslots['03/05/2019']} />}
      {tab === 1 && <Day data={timeslots['03/06/2019']} />}
      {tab === 2 && <Day data={timeslots['03/07/2019']} />}
      {tab === 3 && <Day data={timeslots['03/08/2019']} />}
      {tab === 4 && <Day data={timeslots['03/09/2019']} />}
      {tab === 5 && <Day data={timeslots['03/10/2019']} />}

      <div className="date-nav">
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="March 5th" />
          <Tab label="March 6th" />
          <Tab label="March 7th" />
          <Tab label="March 8th" />
          <Tab label="March 9th" />
          <Tab label="March 10th" />
        </Tabs>
      </div>

      <Details />
    </div>
  );
}

const mapStateToProps = (state) => ({
  timeslots: state.timeslots.data,
  tab: state.ui.tab,
});

const mapDispatchToProps = {
  setScheduleTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
