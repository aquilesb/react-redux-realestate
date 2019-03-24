import { fromJS } from 'immutable';
import reducer from '../Store/agents.reducer';
import * as action from '../Store/agents.actionTypes';

describe('agents reducer', () => {
  test('should returns agents initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({ list: [] }));
  });

  test('should returns agents list updated', () => {
    const dispatchedAction = {
      type: action.AGENTS_GET_LIST_SUCCESS,
      payload: fromJS(['test']),
    };
    expect(reducer(undefined, dispatchedAction)).toEqual(fromJS({ list: ['test'] }));
  });
});
