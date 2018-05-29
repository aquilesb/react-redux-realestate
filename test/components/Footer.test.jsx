import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer component', () => {
  let mountedComponent;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><Footer /></MemoryRouter>);
    }
    return mountedComponent;
  };

  test('SHOULD load footer element', () => {
    const footer = getComponent().find('footer');
    expect(footer.length).toBeGreaterThan(0);
  });

  test('SHOULD load page links', () => {
    const pageLinks = getComponent().find('.page-links li a');
    expect(pageLinks).toHaveLength(4);
  });

  test('SHOULD load newsletter wrapper', () => {
    const newsletterWrapper = getComponent().find('.newsletter-wrapper');
    expect(newsletterWrapper.length).toBeGreaterThan(0);
  });

  test('SHOULD load follow-us', () => {
    const followUs = getComponent().find('.follow-us');
    expect(followUs.length).toBeGreaterThan(0);
  });

  test('SHOULD load contact us', () => {
    const contactUs = getComponent().find('.contact-us');
    expect(contactUs.length).toBeGreaterThan(0);
  });

  test('SHOULD load contact us icons', () => {
    const contactUsIcons = getComponent().find('.contact-us p span.glyphicon');
    expect(contactUsIcons).toHaveLength(3);
  });

  test('SHOULD load copyright', () => {
    const copyright = getComponent().find('.copyright');
    expect(copyright.length).toBeGreaterThan(0);
  });
});
