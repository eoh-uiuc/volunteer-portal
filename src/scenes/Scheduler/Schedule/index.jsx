import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Day from './Day';
import Details from './Details';
import './styles.scss';

class Schedule extends Component {
  constructor() {
    super();

    this.state = {
      value: 3,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { timeslots } = this.props;

    if (timeslots === null) {
      return <div>Loading</div>;
    }

    return (
      <div className="schedule">
        {value === 0 && <Day data={timeslots['03/05/2019']} />}
        {value === 1 && <Day data={timeslots['03/06/2019']} />}
        {value === 2 && <Day data={timeslots['03/07/2019']} />}
        {value === 3 && <Day data={timeslots['03/08/2019']} />}
        {value === 4 && <Day data={timeslots['03/09/2019']} />}
        {value === 5 && <Day data={timeslots['03/10/2019']} />}

        <div className="date-nav">
          <Tabs value={value} onChange={this.handleChange} centered>
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
}

const mapStateToProps = (state) => ({
  timeslots: state.timeslots.data,
});

export default connect(mapStateToProps)(Schedule);
