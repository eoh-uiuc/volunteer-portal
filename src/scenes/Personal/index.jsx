import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QRCode from 'qrcode.react';
import { removeTimeslot } from 'services/active/actions';
import { stationMap } from 'scenes/Scheduler/Schedule/stations';
import { times, timeMap } from 'scenes/Scheduler/Schedule/Day';

import './styles.scss';

const dateCmp = (a, b) => {
  if (a.day !== b.day) {
    return new Date(a.day) - new Date(b.day);
  }
  const ai = timeMap[a.time];
  const bi = timeMap[b.time];
  return ai - bi;
}

class Personal extends Component {
  getRegistered = () => {
    const { registeredIDs, timeslots } = this.props;
    const regs = [];

    Object.keys(timeslots).forEach(d => {
      const day = timeslots[d];
      Object.keys(day).forEach(t => {
        const times = day[t];
        times.forEach(x => {
          if (registeredIDs.indexOf(x.tsid) >= 0) {
            regs.push(x);
          }
        })
      });
    });

    return regs;
  }

  render() {
    const { jwt, removeTime } = this.props;
    if (jwt === null) {
      return <Redirect to="/login" />;
    }

    const cards = [];
    const regs = this.getRegistered();
    regs.sort(dateCmp);
    regs.forEach(data => {
      const position = stationMap[data.position];
      const day = data.day;
      const time = times[timeMap[data.time]].display;
      const duration = data.duration === 1 ? '1 Hour' : '2 Hours';

      cards.push(
        <Card className="time-card" key={data.tsid}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {position}
            </Typography>
            <Typography variant="h5" component="h2">
              {day}, {time} ({duration})
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => removeTime(data.tsid)}
            >
              Unregister
            </Button>
          </CardActions>
        </Card>
      );
    });

    if (cards.length === 0) {
      cards.push(
        <Card className="time-card" key="singleton">
          <CardContent>
            <Typography variant="h5" component="h2">
              Not registered for any timeslots :(
            </Typography>
          </CardContent>
        </Card>
      )
    }
    var uid = "uid string";

    return (
      <div className="time-cards">
        <div className="QR">
          <QRCode value= {jwt} size={300} />
        </div>
        { cards }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registeredIDs: state.registered.data,
  timeslots: state.timeslots.data,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => ({
  removeTime: (tsid) => dispatch(removeTimeslot(tsid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
