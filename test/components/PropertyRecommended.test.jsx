import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import PropertyRecommended from '../../src/components/PropertyRecommended';

Enzyme.configure({ adapter: new Adapter() });

describe('PropertyRecommended component', () => {
  let mountedComponent;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><PropertyRecommended {...props} /></MemoryRouter>);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      item: fromJS({
        encodedUrl: 'encodedUrl',
        name: 'name',
        images: ['image1URL', 'image2URL'],
        price: 188,
      }),
    };
  });

  test('SHOULD load item element', () => {
    const item = getComponent().find('.item');
    expect(item.length).toBeGreaterThan(0);
  });

  test('SHOULD load img-responsive element', () => {
    const img = getComponent().find('.img-responsive');
    expect(img.length).toBeGreaterThan(0);
  });

  test('SHOULD load first link', () => {
    const link = getComponent().find('.col-lg-8 h5 a');
    const linkProps = link.props();
    expect(link.length).toBeGreaterThan(0);
    expect(linkProps.href).toEqual(`/property/${props.item.get('encodedUrl')}`);
    expect(linkProps.children).toEqual(props.item.get('name'));
  });

  test('SHOULD load second link', () => {
    const link = getComponent().find('.col-lg-8 a.more');
    const linkProps = link.props();
    expect(link.length).toBeGreaterThan(0);
    expect(linkProps.href).toEqual(`/property/${props.item.get('encodedUrl')}`);
  });
});
