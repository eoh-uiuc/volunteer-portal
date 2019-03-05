import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import QrReader from 'react-qr-reader';
import { checkIn, checkOut } from 'services/api/checkin';

import './styles.scss';

const DELAY = 100;

const Checkin = (props) => {
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(null);

  const { jwt } = props;
  if (jwt === null) {
    return <Redirect to="/login" />;
  }

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setError(null);
    }
  }
  const handleError = (err) => {
    console.error(err);
  }
  const closeDialog = () => setResult(null);
  const checkInClick = () => {
    checkIn(result, (new Date()).getTime().toString())
      .then(() => setResult(null))
      .catch((e) => setError(e.message));
  }
  const checkOutClick = () => {
    checkOut(result, (new Date()).getTime().toString())
      .then(() => setResult(null))
      .catch((e) => setError(e.message));
  }

  return (
    <div className="parent">
      <div className="qr-reader">
        <QrReader
          delay={DELAY}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>

      <Dialog
        open={result !== null}
        onClose={closeDialog}
      >
        <DialogTitle id="alert-dialog-title">{result}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={checkInClick} color="primary">
            Check In
          </Button>
          <Button onClick={checkOutClick} color="primary" autoFocus>
            Check Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});


export default connect(mapStateToProps)(Checkin);
