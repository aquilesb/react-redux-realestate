import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import * as actions from '../Store/agents.actions';
import * as types from '../Store/agents.actionTypes';
import agentsList from './agents.mock.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('AgentActions actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should load agents', () => {
    fetchMock.getOnce('/api/agents/list', agentsList);

    const expectedActions = [
      { type: types.AGENTS_GET_LIST },
      { type: types.AGENTS_GET_LIST_SUCCESS, payload: fromJS(agentsList) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAgents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load agents', () => {
    const error = {
      name: 'ApiError',
      status: 404,
    };
    fetchMock.getOnce('/api/agents/list', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: error,
    });

    const expectedActions = [
      { type: types.AGENTS_GET_LIST },
      {
        type: types.AGENTS_GET_LIST_FAILURE,
        error: true,
        meta: {},
        payload: error,
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAgents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
