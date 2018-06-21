import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import About from '../../src/components/About';

Enzyme.configure({ adapter: new Adapter() });

describe('About component', () => {
  let mountedAbout;
  const about = (isNew = false) => {
    if (!mountedAbout || isNew) {
      mountedAbout = mount(<MemoryRouter><About /></MemoryRouter>);
    }
    return mountedAbout;
  };

  test('should load about image', () => {
    const thumbnailImg = about().find('img.thumbnail');
    expect(thumbnailImg.length).toBeGreaterThan(0);
  });
  test('should load inside banner', () => {
    const insideBanner = about().find('.inside-banner');
    expect(insideBanner.length).toBeGreaterThan(0);
  });
  test('should load thumbnail image', () => {
    const thumbnailImg = about().find('img.thumbnail');
    expect(thumbnailImg.length).toBeGreaterThan(0);
  });
});
