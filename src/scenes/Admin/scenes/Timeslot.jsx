import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { getTimeslotDetails } from 'services/api/timeslots';

const Timeslot = (props) => {
  const { match } = props;
  const { id } = match.params;

  const [slot, setSlot] = useState(null);
  useEffect(() => {
    getTimeslotDetails(id)
      .then(x => setSlot(x))
      .catch(err => console.error(err));
  }, []);

  if (slot === null) { return <div className="timeslot container">Loading...</div>; }

  console.log(slot);

  return (
    <div className="timeslot container">
      <Typography variant="title">Time slots</Typography>
      <Typography variant="subtitle1">{id}</Typography>

      <Paper>
        <Table className="ts-table">
          <TableHead className="ts-head">
            <TableRow>
              <TableCell>NetID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Society</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="ts-body">
            {slot.registered.map(u => {
              const { uid, name, phone, society } = u;
              return (
                <TableRow key={uid}>
                  <TableCell component="td" scope="row">{uid}</TableCell>
                  <TableCell component="td" scope="row">{name}</TableCell>
                  <TableCell component="td" scope="row">{phone}</TableCell>
                  <TableCell component="td" scope="row">{society}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withRouter(Timeslot);
