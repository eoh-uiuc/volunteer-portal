import { getRegisteredTimeslots as grt } from 'services/api/timeslots';

export const REGISTERED_TIMESLOTS_REQUEST = 'REGISTERED_TIMESLOTS_REQUEST';
export const REGISTERED_TIMESLOTS_RESPONSE = 'REGISTERED_TIMESLOTS_RESPONSE';
export const REGISTER_SLOT = 'REGISTER_SLOT';
export const UNREGISTER_SLOT = 'UNREGISTER_SLOT';

function rtRequest() {
  return {
    type: REGISTERED_TIMESLOTS_REQUEST,
  };
}

function rtResponse(err, data) {
  return {
    type: REGISTERED_TIMESLOTS_RESPONSE,
    data,
    err,
  };
}

export function registerSlot(tsid) {
  return {
    type: REGISTER_SLOT,
    tsid,
  }
}

export function unregisterSlot(tsid) {
  return {
    type: UNREGISTER_SLOT,
    tsid,
  }
}

export function getRegisteredTimeslots(tsid) {
  return dispatch => {
    dispatch(rtRequest());
    grt()
      .then((data) => dispatch(rtResponse(null, data)))
      .catch(err => dispatch(rtResponse(err.message, [])));
  };
}
