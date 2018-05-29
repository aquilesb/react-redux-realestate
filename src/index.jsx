import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import IndexContainer from './containers/IndexContainer';
import loadInitialData from './actions/startupActions';

const IS_PROD = process.env.NODE_ENV === 'production';
const history = createHistory();
const store = configureStore(fromJS({}), history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <IndexContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

if (IS_PROD) {
  store.dispatch(loadInitialData());
} else {
  /* eslint-disable */
  require('./layout/index.scss');
  /* eslint-enable */
  setTimeout(() => {
    store.dispatch(loadInitialData());
  }, 500);
  module.hot.accept();
}
