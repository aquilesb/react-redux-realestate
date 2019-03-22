import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import InsideBanner from '../../src/components/InsideBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('InsideBanner component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><InsideBanner title="Inside Banner" /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('should load inside-banner element', () => {
    const insideBanner = getComponent().find('.inside-banner');
    expect(insideBanner.length).toBeGreaterThan(0);
  });
  test('should load form-control inputs', () => {
    const link = getComponent().find('.inside-banner .container .pull-right a');
    expect(link.length).toBeGreaterThan(0);
  });
  test('should load button', () => {
    const h2 = getComponent().find('.inside-banner .container h2');
    expect(h2.length).toBeGreaterThan(0);
  });
});
