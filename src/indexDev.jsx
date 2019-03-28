import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { setConfig } from 'react-hot-loader'; // eslint-disable-line
import '@/core/Layout/index.scss';
import App from './App';

setConfig({ pureSFC: true });

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

if (module.hot) {
  hot(App, { errorBoundary: false });
}
