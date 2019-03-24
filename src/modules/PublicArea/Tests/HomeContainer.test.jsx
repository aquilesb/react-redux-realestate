import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import shallowWithStore from '@/core/Tests/Helpers/shallowWithStore';
import propertyList from '@/modules/Properties/Tests/properties.mock.json';
import HomeContainer from '../Containers/HomeContainer';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([]);

describe('AgentsContainer', () => {
  let mountedComponent;
  let store;
  let state;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = shallowWithStore(<HomeContainer />, store);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    state = fromJS({
      properties: {
        featured: propertyList,
        recommended: propertyList,
      },
      layout: {
        loginModalOpen: false,
      },
      search: {
        priceTypes: [{ type: '1', list: ['100 - 200'] }],
        fields: {
          type: '1',
        },
      },
    });
  });

  beforeEach(() => {
    store = mockStore(state);
  });

  it('should render successfully providing store', () => {
    const component = getComponent().find('.home');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should load buy select element', () => {
    const component = getComponent().find('select.buy');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should buy select element has to have 3 options', () => {
    const component = getComponent().find('select.buy option');
    expect(component).toHaveLength(3);
  });

  it('should buy select element dispatch change field action', () => {
    const component = getComponent(true).find('select.buy');
    component.simulate('change', { target: { value: 'hello' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'type',
      value: 'hello',
    }]);
  });

  it('should load price select element', () => {
    const component = getComponent().find('select.price');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should price select element has to have 2 options', () => {
    const component = getComponent().find('select.price option');
    expect(component).toHaveLength(2);
  });

  it('should price select element dispatch change field action', () => {
    const component = getComponent(true).find('select.price');
    component.simulate('change', { target: { value: '172' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'price',
      value: '172',
    }]);
  });

  it('should load property select element', () => {
    const component = getComponent().find('select.property');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should property select element has to have 4 options', () => {
    const component = getComponent().find('select.property option');
    expect(component).toHaveLength(4);
  });

  it('should property select element dispatch change field action', () => {
    const component = getComponent(true).find('select.property');
    component.simulate('change', { target: { value: '2' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'property',
      value: '2',
    }]);
  });

  it('should load content-container element', () => {
    const component = getComponent().find('.content-container');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should load feature properties list element', () => {
    const component = getComponent().find('.properties-listing #featured-properties-list');
    expect(component.length).toBeGreaterThan(0);
    const componentItem = component.find('li');
    expect(componentItem).toHaveLength(10);
  });

  it('should load recommended properties list element', () => {
    const component = getComponent().find('.recommended #recommended-properties-list');
    expect(component.length).toBeGreaterThan(0);
    const componentItem = component.find('li');
    expect(componentItem).toHaveLength(10);
  });
});
