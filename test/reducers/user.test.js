import { fromJS } from 'immutable';
import reducer from '../../src/reducers/user';
import * as action from '../../src/actions/actionTypes';

describe('user reducer', () => {
  let initialState;

  beforeAll(() => {
    initialState = fromJS({
      id: null,
      token: null,
      data: {},
      authPending: true,
    });
  });


  test('should returns user initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should returns user data', () => {
    const data = { id: 'idTest', name: 'test', authPending: true };
    const dispatchedAction = {
      type: action.USER_FETCH_DATA_SUCCESS,
      payload: fromJS(data),
    };

    const state = initialState.set('data', fromJS(data));
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });
});
