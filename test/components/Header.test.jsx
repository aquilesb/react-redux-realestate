import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {
  let mountedComponent;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><Header {...props} /></MemoryRouter>);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      match: {
        url: '/',
      },
    };
  });

  test('should load header element', () => {
    const header = getComponent().find('header');
    expect(header.length).toBeGreaterThan(0);
  });

  test('should load header icons', () => {
    const icons = getComponent().find('.navbar-header .icon-bar');
    expect(icons).toHaveLength(3);
  });

  test('should load header links', () => {
    const linkList = getComponent().find('.navbar-collapse ul li');
    expect(linkList).toHaveLength(5);
  });

  test('should load logo image', () => {
    const logo = getComponent().find('.container .header #logo');
    expect(logo.length).toBeGreaterThan(0);
  });

  test('should home link be active', () => {
    const link = getComponent().find('.navbar-collapse .navbar-right li.active .link-home');
    expect(link.length).toBeGreaterThan(0);
  });

  test('should home link inactive', () => {
    props.match.url = '/about';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-home');
    expect(link.length).toEqual(0);
  });

  test('should about link active', () => {
    props.match.url = '/about';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-about');
    expect(link.length).toBeGreaterThan(0);
  });

  test('should agents link active', () => {
    props.match.url = '/agents';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-agents');
    expect(link.length).toBeGreaterThan(0);
  });

  test('should agents link inactive', () => {
    props.match.url = '/';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-agents');
    expect(link.length).toEqual(0);
  });

  test('should blog link active', () => {
    props.match.url = '/blog';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-blog');
    expect(link.length).toBeGreaterThan(0);
  });

  test('should blog link inactive', () => {
    props.match.url = '/';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-blog');
    expect(link.length).toEqual(0);
  });

  test('should contact link active', () => {
    props.match.url = '/contact';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-contact');
    expect(link.length).toBeGreaterThan(0);
  });

  test('should contact link inactive', () => {
    props.match.url = '/';
    const link = getComponent(true).find('.navbar-collapse .navbar-right li.active .link-contact');
    expect(link.length).toEqual(0);
  });
});
