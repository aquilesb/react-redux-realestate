import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import * as actions from '../../src/actions/agentsActions';
import agentsList from '../mockData/agents.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('AgentActions actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('SHOULD load agents', () => {
    fetchMock.getOnce('/api/agents/list', agentsList);

    const expectedActions = [
      { type: actions.AGENTS_GET_LIST },
      { type: actions.AGENTS_GET_LIST_SUCCESS, payload: fromJS(agentsList) },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAgents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('SHOULD not load agents', () => {
    const error = 'test.body.error.message';
    fetchMock.getOnce('/api/agents/list', {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: { error },
    });

    const expectedActions = [
      { type: actions.AGENTS_GET_LIST },
      {
        type: actions.AGENTS_GET_LIST_FAILURE,
        error: true,
        meta: {},
        payload: { error },
      },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAgents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
