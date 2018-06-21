import * as actions from '../../src/actions/layoutActions';

describe('Layout actions', () => {
  test('should show spinner', () => {
    expect(actions.showSpinner()).toEqual({ type: actions.LAYOUT_SHOW_SPINNER });
  });

  test('should hide spinner', () => {
    expect(actions.hideSpinner()).toEqual({ type: actions.LAYOUT_HIDE_SPINNER });
  });

  test('should set login modal is open', () => {
    expect(actions.updateLoginModalIsOpen(true))
      .toEqual({ type: actions.LAYOUT_LOGIN_MODAL_UPDATE, isOpen: true });
  });

  test('should set login modal is close', () => {
    expect(actions.updateLoginModalIsOpen(false))
      .toEqual({ type: actions.LAYOUT_LOGIN_MODAL_UPDATE, isOpen: false });
  });
});
