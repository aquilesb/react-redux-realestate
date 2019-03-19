import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import configureStore from './store/configureStore';
import IndexContainer from './containers/IndexContainer';
import loadInitialData from './actions/startupActions';
import './layout/index.scss';


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

store.dispatch(loadInitialData());
