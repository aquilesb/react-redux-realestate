import { fromJS } from 'immutable';
import reducer from '../../src/reducers/config';
import * as action from '../../src/actions/actionTypes';

describe('config reducer', () => {
  test('shoul returns config initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({ isProd: false }));
  });

  test('should returns isProd updated', () => {
    const dispatchedAction = {
      type: action.CONFIG_UPDATE_IS_PROD,
      isProd: true,
    };
    expect(reducer(undefined, dispatchedAction)).toEqual(fromJS({ isProd: true }));
  });
});
