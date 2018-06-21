import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginModal from '../../src/components/LoginModal';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginModal', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<LoginModal />);
    }
    return mountedComponent;
  };

  it('should render LoginModal successfully', () => {
    const component = getComponent().find('.login-modal');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render email element', () => {
    const component = getComponent().find('.email');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render email phone', () => {
    const component = getComponent().find('.phone');
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
