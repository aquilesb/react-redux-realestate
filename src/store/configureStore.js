import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const createStoreWithMiddleware = history =>
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    apiMiddleware,
  )(createStore);

const configureStore = (initialState, history) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable */
    const { devToolsEnhancer } = require('redux-devtools-extension');
    /* eslint-enable */
    return createStoreWithMiddleware(history)(rootReducer, initialState, devToolsEnhancer());
  }
  return createStoreWithMiddleware(history)(rootReducer, initialState);
};

export default configureStore;
