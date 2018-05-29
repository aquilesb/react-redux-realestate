import { fromJS } from 'immutable';
import reducer from '../../src/reducers/agents';
import * as action from '../../src/actions/agentsActions';

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
