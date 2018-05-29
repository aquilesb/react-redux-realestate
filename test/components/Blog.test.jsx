import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Blog from '../../src/components/Blog';

Enzyme.configure({ adapter: new Adapter() });

describe('Blog component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><Blog /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('SHOULD load main blog element', () => {
    const mainBlog = getComponent().find('.blog');
    expect(mainBlog.length).toBeGreaterThan(0);
  });
  test('SHOULD load inside banner', () => {
    const insideBanner = getComponent().find('.inside-banner');
    expect(insideBanner.length).toBeGreaterThan(0);
  });
  test('SHOULD load thumbnail image', () => {
    const thumbnailLink = getComponent().find('a.thumbnail');
    expect(thumbnailLink.length).toBeGreaterThan(0);
  });
});
