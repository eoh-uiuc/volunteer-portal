import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import QrReader from 'react-qr-reader';
import { checkIn, checkOut } from 'services/api/checkin';

import './styles.scss';


class Checkin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        delay: 300,
        result: "No result"
      };
      this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
      if (data) {
        this.setState({
          result: data
        });
      }
    }
    handleError(err) {
      console.error(err);
    }

  render() {
    const { jwt } = this.props;
    if (jwt === null) {
      return <Redirect to="/login" />;
    }


    var today = new Date();
    var dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return (
        <div className="parent">
            <div className="QrReader">
                <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%" }}
                />
                <div>
                  <p>{this.state.result}</p>
                  <p>"Current Time: "{dateTime}</p>
                  <p>"User netID: {this.state.result}</p>
                </div>
            </div>
            <div className="Buttons">
              <Button variant="contained" color="primary" onClick={() => {checkIn(this.state.result, dateTime)}}>
                Check In for shift
              </Button>
              <Button variant="contained" color="secondary" onClick={() => {checkOut(this.state.result, dateTime)}}>
                Check Out of shift
              </Button>

            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});


export default connect(mapStateToProps)(Checkin);
