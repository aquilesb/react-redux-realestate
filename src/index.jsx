import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router/immutable';
import configureStore from './store/configureStore';
import IndexContainer from './containers/IndexContainer';
import loadInitialData from './actions/startupActions';

const IS_PROD = process.env.NODE_ENV === 'production';
const history = createHistory();
const store = configureStore(fromJS({}), history);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <IndexContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  );
};

render();

if (IS_PROD) {
  store.dispatch(loadInitialData());
} else {
  require('./layout/index.scss'); // eslint-disable-line
  setTimeout(() => {
    store.dispatch(loadInitialData());
  }, 500);

  if (module.hot) {
    module.hot.accept(() => {
      render();
    });
  }
}
