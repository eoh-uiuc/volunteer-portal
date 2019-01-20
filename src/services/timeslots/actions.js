import { getAllTimeslots } from 'services/api/timeslots';

export const TIMESLOT_REQUEST = 'TIMESLOT_REQUEST';
export const TIMESLOT_RESPONSE = 'TIMESLOT_RESPONSE';

function requestTimeslots() {
  return {
    type: TIMESLOT_REQUEST,
  };
}

function receiveTimeslots(err, data) {
  return {
    type: TIMESLOT_RESPONSE,
    err,
    data,
  };
}

export function getTimeslots() {
  return dispatch => {
    dispatch(requestTimeslots());
    getAllTimeslots()
      .then(data => dispatch(receiveTimeslots(null, data)))
      .catch(err => dispatch(receiveTimeslots(err.message, null)));
  };
}
