import {
  REGISTERED_TIMESLOTS_REQUEST,
  REGISTERED_TIMESLOTS_RESPONSE,
  REGISTER_SLOT,
  UNREGISTER_SLOT,
} from './actions';

const initialState = {
  fetching: false,
  data: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  let copy;

  switch (action.type) {
    case REGISTERED_TIMESLOTS_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case REGISTERED_TIMESLOTS_RESPONSE:
      return Object.assign({}, state, { data: action.data, error: action.err, fetching: false });
    case REGISTER_SLOT:
      copy = state.data.slice();
      copy.push(action.tsid);
      return Object.assign({}, state, { data: copy });
    case UNREGISTER_SLOT:
      copy = state.data.filter(x => x !== action.tsid);
      return Object.assign({}, state, { data: copy });
    default:
      return state;
  }
};

export default reducer;
