import { SET_SCHEDULE_TAB } from './actions';

const initialState = {
  tab: 3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCHEDULE_TAB:
      return Object.assign({}, state, { tab: action.tab });
    default:
      return state;
  }
};

export default reducer;
