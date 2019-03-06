import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withAdmin } from 'components/Auth';
import { closeActive, addTimeslot, removeTimeslot } from 'services/active/actions';
import { stationMap } from './stations';
import { times, timeMap } from './Day';

const AdminDetails = withAdmin(props => {
  const { tsid, close } = props;
  return (
    <DialogContent className="admin">
      <Link to={`/admin/timeslot/${tsid}`}>
        <Button color="secondary" variant="contained" onClick={close}>
          View Admin Details
        </Button>
      </Link>
    </DialogContent>
  );
}, false);

class Details extends Component {
  register = () => {
    const { addTime, close, data } = this.props;
    addTime(data.tsid);
    close();
  }

  unregister = () => {
    const { removeTime, close, data } = this.props;
    removeTime(data.tsid);
    close();
  }

  render() {
    const { close, data, registeredIDs } = this.props;
    const open = data !== null;

    let position, day, time, duration, remaining, tsid;
    let canRegister, isRegistered;
    if (data) {
      position = stationMap[data.position];
      day = data.day;
      time = times[timeMap[data.time]].display;
      duration = data.duration === 1 ? '1 Hour' : '2 Hours';
      remaining = data.taken;
      tsid = data.tsid;

      isRegistered = registeredIDs.indexOf(data.tsid) >= 0;
      canRegister = remaining > 0 && !isRegistered;
    }

    return (
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent className="details">
          <div className="left">
            <p>Position</p>
            <p>Date</p>
            <p>Start Time</p>
            <p>Duration</p>
            <p>Spots Remaining</p>
          </div>
          <div className="right">
            <p>{position}</p>
            <p>{day}</p>
            <p>{time}</p>
            <p>{duration}</p>
            <p>{remaining}</p>
          </div>
        </DialogContent>
        <AdminDetails tsid={tsid} close={close} />
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.register} color="primary" variant="contained" disabled={!canRegister}>
            Register
          </Button>
          <Button onClick={this.unregister} color="secondary" variant="contained" disabled={!isRegistered}>
            Unregister
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.active.fetching,
  data: state.active.data,
  error: state.active.error,
  registeredIDs: state.registered.data,
});

const mapDispatchToProps = dispatch => ({
  addTime: (tsid) => dispatch(addTimeslot(tsid)),
  removeTime: (tsid) => dispatch(removeTimeslot(tsid)),
  close: () => dispatch(closeActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
