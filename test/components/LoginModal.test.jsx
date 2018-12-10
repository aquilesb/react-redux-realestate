import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../helpers/shallowWithStore';
import LoginModal from '../../src/components/LoginModal';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([]);

describe('LoginModal', () => {
  let mountedComponent;
  let store;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = shallowWithStore(<LoginModal login={() => {}} />, store);
    }
    return mountedComponent;
  };
  beforeAll(() => {
    const state = fromJS({});
    store = mockStore(state);
  });

  it('should render LoginModal successfully', () => {
    const component = getComponent().find('.login-modal');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render email element', () => {
    const component = getComponent().find('.email');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render email login button', () => {
    const component = getComponent().find('.btn-success');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render email register button', () => {
    const component = getComponent().find('.btn-info');
    expect(component.length).toBeGreaterThan(0);
  });
});
