import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import MainSpinner from '../../src/components/MainSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('MainSpinner component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><MainSpinner /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('should load spinner element', () => {
    const spinner = getComponent().find('.main-spinner-container .spinner');
    expect(spinner.length).toBeGreaterThan(0);
  });
  test('should load double-bounce1', () => {
    const doubleBounce1 = getComponent().find('.main-spinner-container .spinner .double-bounce1');
    expect(doubleBounce1.length).toBeGreaterThan(0);
  });
  test('should load button', () => {
    const doubleBounce2 = getComponent().find('.main-spinner-container .spinner .double-bounce2');
    expect(doubleBounce2.length).toBeGreaterThan(0);
  });
});
