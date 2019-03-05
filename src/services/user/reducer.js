import { SET_JWT, CLEAR_JWT } from './actions';

const initialState = {
  jwt: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT:
      return Object.assign({}, state, { jwt: action.jwt });
    case CLEAR_JWT:
      return Object.assign({}, state, { jwt: null });
    default:
      return state;
  }
};

export default reducer;
