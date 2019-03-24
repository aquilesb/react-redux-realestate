import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import { apiMiddleware } from 'redux-api-middleware';
import featuredProperties from '@/modules/Properties/Tests/properties.mock.json';
import {
  PROPERTIES_RESET_SEARCH,
  PROPERTIES_SEARCH,
  PROPERTIES_SEARCH_SUCCESS,
} from '@/modules/Properties/Store/properties.actionTypes';
import * as actions from '../Store/search.actions';
import * as types from '../Store/search.actionTypes';
import priceType from './priceType.mock.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('SearchActions', () => {
  let initialStateSearch;

  beforeAll(() => {
    initialStateSearch = fromJS({
      search: {
        fields: {
          property: '2',
          type: '1',
          price: '$300,000 - $350,000',
        },
        qntSearch: 10,
        timesSearched: 3,
        sortBy: 1,
      },
      properties: {
      },
    }).setIn(['router', 'location', 'pathname'], '/search');
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should change Sort By and load search again', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', 0).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, { data: featuredProperties, total: 102 });
    const expectedActions = [
      { type: types.SEARCH_CHANGE_SORT_BY, sortBy: 2 },
      { type: PROPERTIES_RESET_SEARCH },
      { type: types.SEARCH_RESET_PARAMS },
      { type: PROPERTIES_SEARCH },
      {
        type: types.SEARCH_CHANGE_PARAMS,
        timesSearched: 4,
        totalLoaded: 40,
        totalResults: 102,
      },
      {
        type: PROPERTIES_SEARCH_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
    ];
    const event = {
      target: {
        value: 2,
      },
    };
    const store = mockStore(initialStateSearch);
    return store.dispatch(actions.changeSortBy(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should update Search Parameters', () => {
    const state = fromJS({
      search: {
        timesSearched: 2,
        qntSearch: 10,
      },
    });

    const expectedActions = [
      {
        type: types.SEARCH_CHANGE_PARAMS,
        timesSearched: 3,
        totalLoaded: 30,
        totalResults: 40,
      },
    ];

    const store = mockStore(state);
    return store.dispatch(actions.updateSearchParams(40)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should update Search Parameters totalLoaded higher than totalResults', () => {
    const state = fromJS({
      search: {
        timesSearched: 2,
        qntSearch: 10,
      },
    });

    const expectedActions = [
      {
        type: types.SEARCH_CHANGE_PARAMS,
        timesSearched: 3,
        totalLoaded: 15,
        totalResults: 15,
      },
    ];

    const store = mockStore(state);
    return store.dispatch(actions.updateSearchParams(15)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should reset search parameters', () => {
    expect(actions.resetSearchParams()).toEqual({ type: types.SEARCH_RESET_PARAMS });
  });

  test('should change search field value', () => {
    expect(actions.changeSearchField('type', 3)).toEqual({ type: types.SEARCH_CHANGE_FIELD, field: 'type', value: 3 });
  });

  test('should load price types', () => {
    fetchMock.getOnce('/api/prices/list', priceType);

    const expectedActions = [
      { type: types.SEARCH_GET_PRICE_TYPE },
      { type: types.SEARCH_GET_PRICE_TYPE_SUCCESS, payload: fromJS(priceType) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPriceTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load price types', () => {
    const error = {
      name: 'ApiError',
      status: 404,
    };
    fetchMock.getOnce('/api/prices/list', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: error,
    });

    const expectedActions = [
      { type: types.SEARCH_GET_PRICE_TYPE },
      {
        type: types.SEARCH_GET_PRICE_TYPE_FAILURE,
        meta: {},
        error: true,
        payload: error,
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPriceTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
