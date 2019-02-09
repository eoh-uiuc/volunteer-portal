import { SET_JWT } from './actions';
import { SET_UID } from './actions';

const initialState = {
  jwt: null,
  uid: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT:
      return Object.assign({}, state, { jwt: action.jwt });
    case SET_UID:
      return Object.assign({}, state, { uid: action.uid});
    default:
      return state;
  }
};

export default reducer;
