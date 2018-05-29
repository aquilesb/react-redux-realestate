import React from 'react';
import { fromJS } from 'immutable';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import PropertyListItem from '../../src/components/PropertyListItem';
import { format2Money } from '../../src/utils/formatUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('PropertyListItem component', () => {
  let mountedComponent;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><PropertyListItem {...props} /></MemoryRouter>);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      item: fromJS({
        id: 123,
        encodedUrl: 'encodedUrl',
        status: 'sell',
        name: 'name',
        images: ['imageURL1', 'imageURL1'],
        price: 173,
        features: {
          bedroom: 3,
          bathroom: 2,
          parking: 1,
          kitchen: 2,
        },
      }),
    };
  });

  test('SHOULD load properties-wrapper element', () => {
    const propertiesWrapper = getComponent().find('.properties-wrapper');
    expect(propertiesWrapper.length).toBeGreaterThan(0);
  });

  test('SHOULD load property image element', () => {
    const propertyImg = getComponent().find('.properties-wrapper .properties .image-holder .img-responsive');
    expect(propertyImg.length).toBeGreaterThan(0);
  });

  test('SHOULD load link-property element', () => {
    const linkProperty = getComponent().find('.properties-wrapper .properties h4 .link-property');
    expect(linkProperty.length).toBeGreaterThan(0);
  });

  test('SHOULD link-property element creates the url and text ', () => {
    const elProps = getComponent(true).find('.properties-wrapper .properties h4 a.link-property').props();
    const { href, children } = elProps;
    expect(href).toEqual(`/property/${props.item.get('encodedUrl')}`);
    expect(children).toEqual(props.item.get('name'));
  });

  test('SHOULD price element shows the formatted price', () => {
    const status = getComponent().find('.properties-wrapper .properties .image-holder .status').props().children;
    expect(status).toEqual('');
  });

  test('SHOULD status element shows nothing', () => {
    const elPrice = getComponent().find('p.price');
    const priceText = getComponent().find('p.price').props().children;
    expect(elPrice.length).toBeGreaterThan(0);
    expect(priceText.join('')).toEqual(`Price: $${format2Money(props.item.get('price'))}`);
  });

  test('SHOULD status element shows the status', () => {
    props.item = props.item.set('status', 'buy');
    const status = getComponent(true).find('.properties-wrapper .properties .image-holder .status').props().children;
    expect(status).toEqual('buy');
  });

  test('SHOULD bed room feature render the text ', () => {
    const { children } = getComponent(true).find('.listing-detail .bedroom').props();
    expect(children).toEqual(props.item.getIn(['features', 'bedroom']));
  });

  test('SHOULD baths feature render the text ', () => {
    const { children } = getComponent(true).find('.listing-detail .bathroom').props();
    expect(children).toEqual(props.item.getIn(['features', 'bathroom']));
  });

  test('SHOULD parking feature render the text ', () => {
    const { children } = getComponent(true).find('.listing-detail .parking').props();
    expect(children).toEqual(props.item.getIn(['features', 'parking']));
  });

  test('SHOULD kitchen feature render the text ', () => {
    const { children } = getComponent(true).find('.listing-detail .kitchen').props();
    expect(children).toEqual(props.item.getIn(['features', 'kitchen']));
  });

  test('SHOULD btn-primary element creates the url ', () => {
    const { href } = getComponent(true).find('a.btn-primary').props();
    expect(href).toEqual(`/property/${props.item.get('encodedUrl')}`);
  });

});
