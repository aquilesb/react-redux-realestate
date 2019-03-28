import React, { StrictMode, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import IndexContainer from '@/core/Containers/IndexContainer';
import configureStore from '@/core/Store/configureStore';
import loadInitialData from '@/core/Store/startup.actions';

const history = createBrowserHistory();

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (store) {
      const state = store.getState();
      if (!state.getIn(['agents', 'isLoading']) && !state.getIn(['agents', 'isLoaded'])) {
        store.dispatch(loadInitialData());
      }
    }
  }, [store]);

  if (!store) {
    configureStore(fromJS({}), history).then((newStore) => {
      setStore(newStore);
    });
    return null;
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IndexContainer />
        </ConnectedRouter>
      </Provider>
    </StrictMode>
  );
};

export default App;
