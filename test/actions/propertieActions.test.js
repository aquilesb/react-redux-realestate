import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import * as actions from '../../src/actions/propertieActions';
import * as searchActions from '../../src/actions/searchActions';
import featuredProperties from '../mockData/featuredProperties.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('Propertie actions', () => {
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
    }).set('router', { location: { pathname: '/search' } });
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should load featured properties', () => {
    fetchMock.getOnce('/api/properties/featured', featuredProperties);

    const expectedActions = [
      { type: actions.PROPERTIES_GET_FEATURED_PROP },
      { type: actions.PROPERTIES_GET_FEATURED_PROP_SUCCESS, payload: fromJS(featuredProperties) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getFeaturedProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load featured properties', () => {
    const error = 'test.body.error.message';
    fetchMock.getOnce('/api/properties/featured', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });
    const expectedActions = [
      { type: actions.PROPERTIES_GET_FEATURED_PROP },
      {
        type: actions.PROPERTIES_GET_FEATURED_PROP_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getFeaturedProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should load recommended properties', () => {
    fetchMock.getOnce('/api/properties/recommended', featuredProperties);

    const expectedActions = [
      { type: actions.PROPERTIES_GET_RECOMMENDED },
      {
        type: actions.PROPERTIES_GET_RECOMMENDED_SUCCESS,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
    ];

    const store = mockStore({ properties: { recommended: [] } });
    return store.dispatch(actions.getRecommendedProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load recommended properties', () => {
    const error = 'test.body.error.message';
    fetchMock.getOnce('/api/properties/recommended', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.PROPERTIES_GET_RECOMMENDED },
      {
        type: actions.PROPERTIES_GET_RECOMMENDED_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getRecommendedProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should load hot properties', () => {
    fetchMock.getOnce('/api/properties/hot', featuredProperties);

    const expectedActions = [
      { type: actions.PROPERTIES_GET_HOT },
      { type: actions.PROPERTIES_GET_HOT_SUCCESS, payload: fromJS(featuredProperties).slice(0, 4) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getHotProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load hot properties', () => {
    const error = 'test.body.error.message';
    fetchMock.getOnce('/api/properties/hot', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.PROPERTIES_GET_HOT },
      {
        type: actions.PROPERTIES_GET_HOT_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getHotProps()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should load the infinite search not from search page', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', initialStateSearch.getIn(['search', 'timesSearched'])).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, { data: featuredProperties, total: 102 });
    jest.mock('react-router-redux', () => jest.fn());

    const state = initialStateSearch.set('router', { location: { pathname: '/' } });

    const expectedActions = [
      { type: actions.PROPERTIES_SEARCH },
      {
        type: searchActions.SEARCH_CHANGE_PARAMS,
        timesSearched: 4,
        totalLoaded: 40,
        totalResults: 102,
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            '/search',
          ],
          method: 'push',
        },
      },
      {
        type: actions.PROPERTIES_SEARCH_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
    ];

    const store = mockStore(state);
    return store.dispatch(actions.doInifiteSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should load the infinite search from search page', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', initialStateSearch.getIn(['search', 'timesSearched'])).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, { data: featuredProperties, total: 102 });

    const expectedActions = [
      { type: actions.PROPERTIES_SEARCH },
      {
        type: searchActions.SEARCH_CHANGE_PARAMS,
        timesSearched: 4,
        totalLoaded: 40,
        totalResults: 102,
      },
      {
        type: actions.PROPERTIES_SEARCH_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
    ];

    const store = mockStore(initialStateSearch);
    return store.dispatch(actions.doInifiteSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load the infinite search', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', initialStateSearch.getIn(['search', 'timesSearched'])).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();

    const error = 'test.body.error.message';
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.PROPERTIES_SEARCH },
      {
        type: actions.PROPERTIES_SEARCH_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore(initialStateSearch);
    return store.dispatch(actions.doInifiteSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should search property', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', 0).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, { data: featuredProperties, total: 102 });

    const event = {
      preventDefault: () => jest.fn(),
    };

    const expectedActions = [
      { type: actions.PROPERTIES_RESET_SEARCH },
      { type: searchActions.SEARCH_RESET_PARAMS },
      { type: actions.PROPERTIES_SEARCH },
      {
        type: searchActions.SEARCH_CHANGE_PARAMS,
        timesSearched: 4,
        totalLoaded: 40,
        totalResults: 102,
      },
      {
        type: actions.PROPERTIES_SEARCH_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
    ];

    const store = mockStore(initialStateSearch);
    return store.dispatch(actions.onSearchProperty(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not search property', () => {
    const params = initialStateSearch.getIn(['search', 'fields']).set('qnt', initialStateSearch.getIn(['search', 'qntSearch'])).set('index', 0).set('sortBy', initialStateSearch.getIn(['search', 'sortBy']))
      .toJS();
    const error = 'test.body.error.message';
    fetchMock.getOnce(`/api/search/?${queryString.stringify(params)}`, {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.PROPERTIES_RESET_SEARCH },
      { type: searchActions.SEARCH_RESET_PARAMS },
      { type: actions.PROPERTIES_SEARCH },
      {
        type: actions.PROPERTIES_SEARCH_FAILURE,
        meta: {},
        error: true,
        payload: { error },
      },
    ];

    const store = mockStore(initialStateSearch);
    return store.dispatch(actions.onSearchProperty()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
