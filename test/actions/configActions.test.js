import * as actions from '../../src/actions/configActions';
import * as types from '../../src/actions/actionTypes';

describe('Config actions', () => {
  test('should set isProd to true', () =>
    expect(actions.updateIsProd(true))
      .toEqual({ type: types.CONFIG_UPDATE_IS_PROD, isProd: true }));

  test('should set isProd to false', () =>
    expect(actions.updateIsProd(false))
      .toEqual({ type: types.CONFIG_UPDATE_IS_PROD, isProd: false }));
});
