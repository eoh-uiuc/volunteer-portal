import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setActiveTimeslot } from 'services/active/actions';

class Cell extends Component {
  onClick = () => {
    const { openDialog, data, invalid } = this.props;
    if (!invalid) { openDialog(data); }
  }

  render() {
    const { invalid, data, registeredIDs } = this.props;
    if (invalid) { return <div className="cell invalid" />; }

    const { duration, cap, tsid } = data;
    const remaining = data.taken;
    const taken = cap - remaining;

    const isRegistered = registeredIDs.indexOf(tsid) >= 0;

    const dcn = duration === 1 ? 'single' : 'double';
    const rcn = isRegistered ? 'registered' : 'unregistered';
    const fcn = remaining === 0 ? 'full' : 'underfull';
    return (
      <div className={`cell ${dcn} ${rcn} ${fcn}`} onClick={this.onClick}>
        <p>{ taken }/{ cap }</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registeredIDs: state.registered.data,
});

const mapDispatchToProps = dispatch => ({
  openDialog: (data) => dispatch(setActiveTimeslot(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
