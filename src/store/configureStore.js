import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'connected-react-router/immutable';
import reduxApiMiddlewareError from '../middlewares/redux-api-middleware-error';
import authApiInjector from '../middlewares/authApiInjector';
import rootReducer from '../reducers';

const configureStore = (initialState, history) => {
  let composeEnhancer;
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { // eslint-disable-line
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  } else {
    composeEnhancer = compose;
  }
  return createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(
      thunk,
      routerMiddleware(history),
      authApiInjector,
      apiMiddleware,
      reduxApiMiddlewareError,
    )),
  );
};

export default configureStore;
