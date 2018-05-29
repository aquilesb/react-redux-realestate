import { fromJS } from 'immutable';
import reducer from '../../src/reducers/user';
import * as action from '../../src/actions/userActions';

describe('user reducer', () => {
  let initialState;

  beforeAll(() => {
    initialState = fromJS({
      id: '',
      data: {},
    });
  });


  test('should returns agents initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should returns agents list updated', () => {
    const data = { id: 'idTest', name: 'test' };
    const dispatchedAction = {
      type: action.USER_FETCH_DATA_SUCCESS,
      payload: fromJS(data),
    };

    const state = initialState.set('data', fromJS(data));
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });
});
