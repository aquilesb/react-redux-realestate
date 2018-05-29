import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import BlogDetail from '../../src/components/BlogDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('BlogDetail component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><BlogDetail /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('SHOULD load getComponent blog element', () => {
    const blog = getComponent().find('.blog');
    expect(blog.length).toBeGreaterThan(0);
  });

  test('SHOULD load inside banner', () => {
    const insideBanner = getComponent().find('.inside-banner');
    expect(insideBanner.length).toBeGreaterThan(0);
  });

  test('SHOULD load sub-title', () => {
    const subTitle = getComponent().find('.sub-title');
    expect(subTitle.length).toBeGreaterThan(0);
  });

  test('SHOULD load thumbnail image', () => {
    const thumbnailImg = getComponent().find('img.thumbnail');
    expect(thumbnailImg.length).toBeGreaterThan(0);
  });
});
