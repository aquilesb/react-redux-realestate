import * as actions from '../../src/actions/configActions';

describe('Config actions', () => {
  test('SHOULD set isProd to true', () =>
    expect(actions.updateIsProd(true))
      .toEqual({ type: actions.CONFIG_UPDATE_IS_PROD, isProd: true }));

  test('SHOULD set isProd to false', () =>
    expect(actions.updateIsProd(false))
      .toEqual({ type: actions.CONFIG_UPDATE_IS_PROD, isProd: false }));
});
