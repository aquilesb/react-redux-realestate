import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import loadInitialData from '../../src/actions/startupActions';
import * as types from '../../src/actions/actionTypes';
import agentsList from '../mockData/agents.json';
import featuredProperties from '../mockData/featuredProperties.json';
import priceTypes from '../mockData/priceType.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('Startup Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should load all data', () => {
    const newPropsPayload = {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: {
        status: 404,
        name: 'ApiError',
        message: 'An error has happened loading new properties. Try again.',
      },
    };

    fetchMock.getOnce('/api/agents/list', agentsList);
    fetchMock.getOnce('/api/properties/featured', featuredProperties);
    fetchMock.getOnce('/api/properties/recommended', featuredProperties);
    fetchMock.getOnce('/api/properties/hot', featuredProperties);
    fetchMock.getOnce('/api/properties/new', newPropsPayload);
    fetchMock.getOnce('/api/prices/list', priceTypes);

    const expectedActions = [
      { type: types.AGENTS_GET_LIST },
      { type: types.PROPERTIES_GET_FEATURED_PROP },
      { type: types.PROPERTIES_GET_RECOMMENDED },
      { type: types.PROPERTIES_GET_HOT },
      { type: types.PROPERTIES_GET_NEW },
      { type: types.SEARCH_GET_PRICE_TYPE },
      { type: types.CONFIG_UPDATE_IS_PROD, isProd: process.env.NODE_ENV === 'production' },
      { type: types.AGENTS_GET_LIST_SUCCESS, meta: undefined, payload: fromJS(agentsList) },
      {
        type: types.PROPERTIES_GET_FEATURED_PROP_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
      {
        type: types.PROPERTIES_GET_RECOMMENDED_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
      {
        type: types.PROPERTIES_GET_HOT_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
      {
        payload: {
          status: 404,
          name: 'ApiError',
          message: 'An error has happened loading new properties. Try again.',
        },
        type: 'PROPERTIES_GET_NEW_FAILURE',
        meta: {},
        error: true,
      },
      {
        type: types.SEARCH_GET_PRICE_TYPE_SUCCESS,
        meta: undefined,
        payload: fromJS(priceTypes),
      },
      { type: types.LAYOUT_HIDE_SPINNER },
      { type: types.USER_UPDATE_AUTH_PENDING, payload: false },
    ];

    const store = mockStore({});
    return store.dispatch(loadInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
