import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { setConfig } from 'react-hot-loader'; // eslint-disable-line
import configureStore from './store/configureStore';
import IndexContainer from './containers/IndexContainer';
import loadInitialData from './actions/startupActions';

setConfig({ pureSFC: true });


const history = createBrowserHistory();
const store = configureStore(fromJS({}), history);

const App = () => (
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

render();

require('./layout/index.scss'); // eslint-disable-line
setTimeout(() => {
  store.dispatch(loadInitialData());
}, 500);

if (module.hot) {
  hot(App, { errorBoundary: false });
}
