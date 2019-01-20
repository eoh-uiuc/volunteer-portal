import {
  addTimeslot as addTimeslotAPI,
  removeTimeslot as removeTimeslotAPI,
} from 'services/api/timeslots';

import { registerSlot, unregisterSlot } from 'services/registered/actions';
import { getTimeslots } from 'services/timeslots/actions';

export const SET_ACTIVE_TIMESLOT = 'SET_ACTIVE_TIMESLOT';
export const CLOSE_ACTIVE = 'CLOSE_ACTIVE';
export const ADD_TIMESLOT_REQUEST = 'ADD_TIMESLOT_REQUEST';
export const ADD_TIMESLOT_RESPONSE = 'ADD_TIMESLOT_RESPONSE';
export const REMOVE_TIMESLOT_REQUEST = 'REMOVE_TIMESLOT_REQUEST';
export const REMOVE_TIMESLOT_RESPONSE = 'REMOVE_TIMESLOT_RESPONSE';

export function setActiveTimeslot(data) {
  return {
    type: SET_ACTIVE_TIMESLOT,
    data,
  };
}

export function closeActive() {
  return {
    type: CLOSE_ACTIVE,
  };
}

function addTimeslotRequest() {
  return {
    type: ADD_TIMESLOT_REQUEST,
  };
}

function addTimeslotResponse(err) {
  return {
    type: ADD_TIMESLOT_RESPONSE,
    err,
  };
}

export function addTimeslot(tsid) {
  return dispatch => {
    dispatch(addTimeslotRequest());
    addTimeslotAPI(tsid)
      .then(() => {
        dispatch(addTimeslotResponse(null));
        dispatch(registerSlot(tsid));
        dispatch(getTimeslots());
      })
      .catch(err => dispatch(addTimeslotResponse(err.message)));
  };
}

function removeTimeslotRequest() {
  return {
    type: REMOVE_TIMESLOT_REQUEST,
  };
}

function removeTimeslotResponse(err) {
  return {
    type: REMOVE_TIMESLOT_RESPONSE,
    err,
  };
}

export function removeTimeslot(tsid) {
  return dispatch => {
    dispatch(removeTimeslotRequest());
    removeTimeslotAPI(tsid)
      .then(() => {
        dispatch(removeTimeslotResponse(null));
        dispatch(unregisterSlot(tsid));
        dispatch(getTimeslots());
      })
      .catch(err => dispatch(removeTimeslotResponse(err.message)));
  };
}
