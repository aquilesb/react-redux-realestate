import { fromJS } from 'immutable';
import reducer from '../Store/agents.reducer';
import * as action from '../Store/agents.actionTypes';

describe('agents reducer', () => {
  test('should returns agents initial state', () => {
    const agentsReducer = {
      list: [],
      isLoadingAgents: false,
      isLoaded: false,
    };
    expect(reducer(undefined, {})).toEqual(fromJS(agentsReducer));
  });

  test('should returns agents list updated', () => {
    const agentsReducer = {
      list: ['test'],
      isLoadingAgents: false,
      isLoaded: true,
    };
    const dispatchedAction = {
      type: action.AGENTS_GET_LIST_SUCCESS,
      payload: fromJS(['test']),
    };
    expect(reducer(undefined, dispatchedAction)).toEqual(fromJS(agentsReducer));
  });
});
