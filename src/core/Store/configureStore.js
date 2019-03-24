import Promise from 'promise-polyfill';
import { combineReducers } from 'redux-immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { reducer as form } from 'redux-form/immutable';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reduxApiMiddlewareError from '@/core/Middlewares/redux-api-middleware-error';
import authApiInjector from '@/core/Middlewares/authApiInjector';
import { decapitalizeFirstLetter } from '@/core/Helpers/formatHelper';

const createReducers = (history) => {
  const moduleList = [
    'Agents',
    'Layout',
    'Properties',
    'Search',
    'User',
  ];

  const modulesPromise = moduleList.map(moduleItem => import(/* webpackChunkName: "[request]" */ `@/modules/${moduleItem}/Store/${moduleItem.toLowerCase()}.reducer.js`));

  return Promise.all(modulesPromise).then((results) => {
    const modules = moduleList.map((moduleItem, index) => ({
      [decapitalizeFirstLetter(moduleItem)]: results[index].default,
    }))
      .reduce((result, next) => ({
        ...result,
        ...next,
      }), {});
    const reducers = combineReducers({
      ...modules,
      form,
      router: connectRouter(history),
    });
    return Promise.resolve(reducers);
  });
};


const configureStore = (initialState, history) => {
  let composeEnhancer;
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { // eslint-disable-line
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  } else {
    composeEnhancer = compose;
  }

  return createReducers(history).then((rootReducer) => {
    const store = createStore(
      rootReducer,
      initialState,
      composeEnhancer(applyMiddleware(
        thunk,
        routerMiddleware(history),
        authApiInjector,
        apiMiddleware,
        reduxApiMiddlewareError,
      )),
    );
    return Promise.resolve(store);
  });
};

export default configureStore;
