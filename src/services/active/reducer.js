import { SET_ACTIVE_TIMESLOT, CLOSE_ACTIVE } from './actions';

const initialState = {
  fetching: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TIMESLOT:
      return Object.assign({}, state, { data: action.data });
    case CLOSE_ACTIVE:
      return Object.assign({}, state, { data: null });
    default:
      return state;
  }
};

export default reducer;
