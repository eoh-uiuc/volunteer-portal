import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import activeReducer from './active/reducer';
import registeredReducer from './registered/reducer';
import userReducer from './user/reducer';
import timeslotsReducer from './timeslots/reducer';

const rootReducer = combineReducers({
  active: activeReducer,
  registered: registeredReducer,
  user: userReducer,
  timeslots: timeslotsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export default store;
