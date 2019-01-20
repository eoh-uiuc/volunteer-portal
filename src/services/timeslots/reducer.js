import {
  TIMESLOT_REQUEST,
  TIMESLOT_RESPONSE,
} from './actions';

const initialState = {
  fetching: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMESLOT_REQUEST:
      return Object.assign({}, state, { fetching: true, error: null });
    case TIMESLOT_RESPONSE:
      return Object.assign({}, state, {
        fetching: false,
        error: action.err,
        data: action.data,
      });
    default:
      return state;
  }
};

export default reducer;