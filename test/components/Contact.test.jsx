import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../../src/components/Contact';

Enzyme.configure({ adapter: new Adapter() });

describe('Contact component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><Contact /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('should load contact element', () => {
    const mainContact = getComponent().find('.contact');
    expect(mainContact.length).toBeGreaterThan(0);
  });
  test('should load form-control inputs', () => {
    const insideBanner = getComponent().find('.form-control');
    expect(insideBanner).toHaveLength(4);
  });
  test('should load button', () => {
    const btnSuccess = getComponent().find('.btn-success');
    expect(btnSuccess.length).toBeGreaterThan(0);
  });
});
