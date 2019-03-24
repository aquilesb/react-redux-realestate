import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import agentsList from '@/modules/Agents/Tests/agents.mock.json';
import featuredProperties from '@/modules/Properties/Tests/properties.mock.json';
import priceTypes from '@/modules/Search/Tests/priceType.mock.json';
import { AGENTS_GET_LIST, AGENTS_GET_LIST_SUCCESS } from '@/modules/Agents/Store/agents.actionTypes';
import { LAYOUT_HIDE_SPINNER } from '@/modules/Layout/Store/layout.actionTypes';
import { USER_UPDATE_AUTH_PENDING } from '@/modules/User/Store/user.actionTypes';
import { SEARCH_GET_PRICE_TYPE, SEARCH_GET_PRICE_TYPE_SUCCESS } from '@/modules/Search/Store/search.actionTypes';
import {
  PROPERTIES_GET_FEATURED_PROP,
  PROPERTIES_GET_RECOMMENDED,
  PROPERTIES_GET_HOT,
  PROPERTIES_GET_NEW,
  PROPERTIES_GET_FEATURED_PROP_SUCCESS,
  PROPERTIES_GET_RECOMMENDED_SUCCESS,
  PROPERTIES_GET_HOT_SUCCESS,
} from '@/modules/Properties/Store/properties.actionTypes';
import loadInitialData from '../../Store/startup.actions';

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
      { type: AGENTS_GET_LIST },
      { type: PROPERTIES_GET_FEATURED_PROP },
      { type: PROPERTIES_GET_RECOMMENDED },
      { type: PROPERTIES_GET_HOT },
      { type: PROPERTIES_GET_NEW },
      { type: SEARCH_GET_PRICE_TYPE },
      { type: AGENTS_GET_LIST_SUCCESS, meta: undefined, payload: fromJS(agentsList) },
      {
        type: PROPERTIES_GET_FEATURED_PROP_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
      {
        type: PROPERTIES_GET_RECOMMENDED_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
      {
        type: PROPERTIES_GET_HOT_SUCCESS,
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
        type: SEARCH_GET_PRICE_TYPE_SUCCESS,
        meta: undefined,
        payload: fromJS(priceTypes),
      },
      { type: LAYOUT_HIDE_SPINNER },
      { type: USER_UPDATE_AUTH_PENDING, payload: false },
    ];

    const store = mockStore({});
    return store.dispatch(loadInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
