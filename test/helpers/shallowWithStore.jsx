/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
/* eslint-enable */

const shallowWithStore = (component, store) =>
  mount(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>);

export default shallowWithStore;
