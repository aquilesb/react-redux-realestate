import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import IndexContainer from '@/core/Containers/IndexContainer';
import '@/core/Layout/index.scss';
import configureStore from '@/core/Store/configureStore';
import loadInitialData from '@/core/Store/startup.actions';

const history = createBrowserHistory();

const App = store => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <IndexContainer />
    </ConnectedRouter>
  </Provider>
);

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
};

configureStore(fromJS({}), history).then((store) => {
  render();
  store.dispatch(loadInitialData());
});

