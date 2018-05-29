import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import loadInitialData from '../../src/actions/startupActions';
import * as agentsActions from '../../src/actions/agentsActions';
import * as layoutActions from '../../src/actions/layoutActions';
import * as propertieActions from '../../src/actions/propertieActions';
import * as configActions from '../../src/actions/configActions';
import * as searchActions from '../../src/actions/searchActions';
import agentsList from '../mockData/agents.json';
import featuredProperties from '../mockData/featuredProperties.json';
import priceTypes from '../mockData/priceType.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('Startup Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('SHOULD load all data', () => {
    fetchMock.getOnce('/api/agents/list', agentsList);
    fetchMock.getOnce('/api/properties/featured', featuredProperties);
    fetchMock.getOnce('/api/properties/recommended', featuredProperties);
    fetchMock.getOnce('/api/properties/hot', featuredProperties);
    fetchMock.getOnce('/api/prices/list', priceTypes);

    const expectedActions = [
      { type: agentsActions.AGENTS_GET_LIST },
      { type: propertieActions.PROPERTIES_GET_FEATURED_PROP },
      { type: propertieActions.PROPERTIES_GET_RECOMMENDED },
      { type: propertieActions.PROPERTIES_GET_HOT },
      { type: searchActions.SEARCH_GET_PRICE_TYPE },
      { type: configActions.CONFIG_UPDATE_IS_PROD, isProd: process.env.NODE_ENV === 'production' },
      { type: agentsActions.AGENTS_GET_LIST_SUCCESS, meta: undefined, payload: fromJS(agentsList) },
      {
        type: propertieActions.PROPERTIES_GET_FEATURED_PROP_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties),
      },
      {
        type: propertieActions.PROPERTIES_GET_RECOMMENDED_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
      {
        type: propertieActions.PROPERTIES_GET_HOT_SUCCESS,
        meta: undefined,
        payload: fromJS(featuredProperties).slice(0, 4),
      },
      {
        type: searchActions.SEARCH_GET_PRICE_TYPE_SUCCESS,
        meta: undefined,
        payload: fromJS(priceTypes),
      },
      { type: layoutActions.LAYOUT_HIDE_SPINNER },
    ];

    const store = mockStore({});
    return store.dispatch(loadInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
