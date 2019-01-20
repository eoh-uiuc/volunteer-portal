import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRegisteredTimeslots } from 'services/registered/actions';
import { getTimeslots } from 'services/timeslots/actions';
import Schedule from './Schedule';

const REFRESH_INTERVAL = 15000;

class Scheduler extends Component {
  componentDidMount() {
    this.props.getTimeslots();
    this.props.getReigstered();

    this.refreshInterval = setInterval(this.props.getTimeslots, REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    return <Schedule />;
  }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
  getTimeslots: () => dispatch(getTimeslots()),
  getReigstered: () => dispatch(getRegisteredTimeslots()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
