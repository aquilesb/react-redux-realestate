import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import user from './user';
import layout from './layout';
import properties from './properties';
import agents from './agents';
import search from './search';
import config from './config';

const rootReducer = combineReducers({
  user,
  layout,
  properties,
  agents,
  search,
  config,
  router: routerReducer,
});

export default rootReducer;
