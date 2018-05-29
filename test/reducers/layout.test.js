import { fromJS } from 'immutable';
import reducer from '../../src/reducers/layout';
import * as action from '../../src/actions/layoutActions';

describe('layout reducer', () => {
  let initialState;

  beforeAll(() => {
    initialState = fromJS({
      layoutLoaded: false,
      loginModalOpen: false,
    });
  });

  test('shoul returns layout initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

  test('should hide spinner', () => {
    const dispatchedAction = {
      type: action.LAYOUT_HIDE_SPINNER,
    };

    const state = initialState.set('layoutLoaded', true);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should show spinner', () => {
    const dispatchedAction = {
      type: action.LAYOUT_SHOW_SPINNER,
    };

    const state = initialState.set('layoutLoaded', false);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should show login modal', () => {
    const dispatchedAction = {
      type: action.LAYOUT_LOGIN_MODAL_UPDATE,
      isOpen: true,
    };

    const state = initialState.set('loginModalOpen', true);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should hide login modal', () => {
    const dispatchedAction = {
      type: action.LAYOUT_LOGIN_MODAL_UPDATE,
      isOpen: false,
    };

    const state = initialState.set('loginModalOpen', false);
    initialState = initialState.set('loginModalOpen', true);
    expect(reducer(initialState, dispatchedAction)).toEqual(state);
  });
});
