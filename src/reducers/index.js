import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import user from './user';
import layout from './layout';
import properties from './properties';
import agents from './agents';
import search from './search';
import config from './config';

const rootReducer = history => combineReducers({
  user,
  layout,
  properties,
  agents,
  search,
  config,
  router: connectRouter(history),
});

export default rootReducer;
