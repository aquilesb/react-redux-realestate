import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { setConfig } from 'react-hot-loader'; // eslint-disable-line
import configureStore from '@/core/Store/configureStore';
import IndexContainer from '@/core/Containers/IndexContainer';
import loadInitialData from '@/core/Store/startup.actions';
import '@/core/Layout/index.scss';

setConfig({ pureSFC: true });
const history = createBrowserHistory();

const App = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <IndexContainer />
    </ConnectedRouter>
  </Provider>
);

const render = (store) => {
  ReactDOM.render(
    <App store={ store} />,
    document.getElementById('app'),
  );
};

configureStore(fromJS({}), history).then((store) => {
  render(store);
  setTimeout(() => {
    store.dispatch(loadInitialData());
  }, 500);
});

if (module.hot) {
  hot(App, { errorBoundary: false });
}
