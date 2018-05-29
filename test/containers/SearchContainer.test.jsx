import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import shallowWithStore from '../helpers/shallowWithStore';
import SearchContainer from '../../src/containers/SearchContainer';
import propertyList from '../mockData/featuredProperties.json';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('SearchContainer', () => {
  let mountedComponent;
  let store;
  let state;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = shallowWithStore(<SearchContainer />, store);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    state = fromJS({
      properties: {
        searched: propertyList,
        featured: propertyList,
        hot: propertyList,
      },
      search: {
        priceTypes: [
          { type: '1', list: ['100 - 200', '200 - 300'] },
          { type: '2', list: ['100 - 200', '200 - 300'] },
        ],
        fields: {
          type: '1',
          price: '200 - 300',
          property: '1',
        },
        sortBy: 1,
        qntSearch: 10,
        totalResults: 10,
        totalLoaded: 10,
      },
    });
  });

  beforeEach(() => {
    store = mockStore(state);
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('SHOULD load search element', () => {
    const component = getComponent().find('.search');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD load inside-banner element', () => {
    const component = getComponent().find('.inside-banner');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD load SideSearchForm component', () => {
    const component = getComponent().find('.search-form');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD SideSearchForm form element dispatch an action WHEN submitted ', () => {
    const component = getComponent(true).find('.search-form');
    const params = state.getIn(['search', 'fields']).set('qnt', state.getIn(['search', 'qntSearch'])).set('index', 0).set('sortBy', state.getIn(['search', 'sortBy']))
      .toJS();
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, { data: propertyList, total: 102 });
    component.simulate('submit');

    expect(store.getActions()).toEqual([
      {
        type: 'PROPERTIES_RESET_SEARCH',
      },
      {
        type: 'SEARCH_RESET_PARAMS',
      },
      {
        type: 'PROPERTIES_SEARCH',
      },
    ]);
  });

  test('SHOULD SideSearchForm type select element dispatch an action WHEN changed ', () => {
    const component = getComponent(true).find('.search-form .type');
    component.simulate('change', { target: { value: '2' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'type',
      value: '2',
    }]);
  });

  test('SHOULD SideSearchForm price select element dispatch an action WHEN changed ', () => {
    const component = getComponent(true).find('.search-form .price');
    component.simulate('change', { target: { value: '100 - 200' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'price',
      value: '100 - 200',
    }]);
  });

  test('SHOULD SideSearchForm property select element dispatch an action WHEN changed ', () => {
    const component = getComponent(true).find('.search-form .property');
    component.simulate('change', { target: { value: '1' } });
    expect(store.getActions()).toEqual([{
      type: 'SEARCH_CHANGE_FIELD',
      field: 'property',
      value: '1',
    }]);
  });

  test('SHOULD load sort-by element', () => {
    const component = getComponent().find('.sortby-wrapper select');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD load search-result element', () => {
    const component = getComponent().find('.search .search-result');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD load infinite-scroll component', () => {
    const component = getComponent().find('.search .search-result #infinite-scroll');
    expect(component.length).toBeGreaterThan(0);
  });

  test('SHOULD load infinite-scroll itens elements', () => {
    const component = getComponent().find('.search .search-result #infinite-scroll div');
    expect(component).toHaveLength(61);
  });
});
