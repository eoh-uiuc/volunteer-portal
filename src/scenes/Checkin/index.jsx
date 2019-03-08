import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withAdmin } from 'components/Auth';
import { checkIn, checkOut } from 'services/api/checkin';

import './styles.scss';

const DELAY = 100;

const Checkin = () => {
  const [ result, setResult ] = useState(null);
  const [ status, setStatus ] = useState(null);
  const [ error, setError ] = useState(null);

  const handleScan = (data) => {
    if (status !== null) { return; }

    if (data) {
      setResult(data);
      setError(null);
    }
  }
  const handleError = (err) => {
    console.error(err);
  }
  const checkInClick = () => {
    checkIn(result, (new Date()).getTime().toString())
      .then(() => {
        setResult(null);
        setStatus('Volunteer checked in!');
      })
      .catch((e) => setError(e.message));
  }
  const checkOutClick = () => {
    checkOut(result, (new Date()).getTime().toString())
      .then(() => {
        setResult(null);
        setStatus('Volunteer checked out!');
      })
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
        onClose={() => setResult(null)}
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


      <Dialog
        open={status !== null}
        onClose={() => setStatus(null)}
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatus(null)} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withAdmin(Checkin, true);
