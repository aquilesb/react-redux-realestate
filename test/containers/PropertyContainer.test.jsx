import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import shallowWithStore from '../helpers/shallowWithStore';
import PropertyContainer from '../../src/containers/PropertyContainer';
import propertyList from '../mockData/featuredProperties.json';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([]);

describe('PropertyContainer', () => {
  let mountedComponent;
  let store;
  let state;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = shallowWithStore(<PropertyContainer {...props} />, store);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      match: {
        params: {
          name: 'Brunswick+Victoria+street+vic+3056',
        },
      },
    };
    state = fromJS({
      properties: {
        featured: propertyList,
      },
    });
  });

  beforeEach(() => {
    store = mockStore(state);
  });

  test('should render successfully providing store', () => {
    const component = getComponent().find('.property-section');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should render hot-properties element', () => {
    const component = getComponent().find('.hot-properties');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should render hot-properties element rows', () => {
    const component = getComponent().find('.hot-properties .row');
    expect(component).toHaveLength(4);
  });

  test('should render advertisement element', () => {
    const component = getComponent().find('.advertisement');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should render property name element', () => {
    const component = getComponent().find('.name');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should render property images element', () => {
    const component = getComponent().find('.property-images');
    expect(component.length).toBeGreaterThan(0);

    const itens = component.find('li');
    expect(itens).toHaveLength(5);
  });

  test('should render detail element', () => {
    const component = getComponent().find('.detail');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should render price element', () => {
    const component = getComponent().find('.price');
    expect(component.length).toBeGreaterThan(0);
  });

  test('should convert price number in currency', () => {
    const price = getComponent().find('.property-info .price').props().children;
    expect('$ 234,900.00').toEqual(price.join(''));
  });

  test('should render the agent details', () => {
    const agents = getComponent().find('.profile p').props().children;
    expect('John Parker').toEqual(agents[0]);
    expect('009 229 2929').toEqual(agents[2]);
  });

  test('should render the property features', () => {
    const wrapper = getComponent().find('.listing-detail');
    expect(3).toEqual(wrapper.find('.bedroom').props().children);
    expect(2).toEqual(wrapper.find('.bathroom').props().children);
    expect(1).toEqual(wrapper.find('.parking').props().children);
    expect(1).toEqual(wrapper.find('.kitchen').props().children);
  });

  test('should render contact form', () => {
    const form = getComponent().find('.contact-form');
    expect(form.length).toBeGreaterThan(0);
    expect(form.find('.name').length).toBeGreaterThan(0);
    expect(form.find('.email').length).toBeGreaterThan(0);
    expect(form.find('.phone').length).toBeGreaterThan(0);
    expect(form.find('.text').length).toBeGreaterThan(0);
    expect(form.find('.btn-primary').length).toBeGreaterThan(0);
  });
});
