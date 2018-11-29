import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import { apiMiddleware } from 'redux-api-middleware';
import * as actions from '../../src/actions/searchActions';
import * as propertyActions from '../../src/actions/propertieActions';
import featuredProperties from '../mockData/featuredProperties.json';
import priceType from '../mockData/priceType.json';

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
      { type: actions.SEARCH_CHANGE_SORT_BY, sortBy: 2 },
      { type: propertyActions.PROPERTIES_RESET_SEARCH },
      { type: actions.SEARCH_RESET_PARAMS },
      { type: propertyActions.PROPERTIES_SEARCH },
      {
        type: actions.SEARCH_CHANGE_PARAMS,
        timesSearched: 4,
        totalLoaded: 40,
        totalResults: 102,
      },
      {
        type: propertyActions.PROPERTIES_SEARCH_SUCCESS,
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
        type: actions.SEARCH_CHANGE_PARAMS,
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
        type: actions.SEARCH_CHANGE_PARAMS,
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
    expect(actions.resetSearchParams()).toEqual({ type: actions.SEARCH_RESET_PARAMS });
  });

  test('should change search field value', () => {
    expect(actions.changeSearchField('type', 3)).toEqual({ type: actions.SEARCH_CHANGE_FIELD, field: 'type', value: 3 });
  });

  test('should load price types', () => {
    fetchMock.getOnce('/api/prices/list', priceType);

    const expectedActions = [
      { type: actions.SEARCH_GET_PRICE_TYPE },
      { type: actions.SEARCH_GET_PRICE_TYPE_SUCCESS, payload: fromJS(priceType) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPriceTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load price types', () => {
    const error = 'test.body.error.message';
    fetchMock.getOnce('/api/prices/list', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.SEARCH_GET_PRICE_TYPE },
      {
        type: actions.SEARCH_GET_PRICE_TYPE_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPriceTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
