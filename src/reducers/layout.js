import { fromJS } from 'immutable';
import * as Actions from '../actions/actionTypes';

const initialState = fromJS({
  layoutLoaded: false,
  loginModalOpen: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.LAYOUT_HIDE_SPINNER:
      return state.set('layoutLoaded', true);

    case Actions.LAYOUT_SHOW_SPINNER:
      return state.set('layoutLoaded', false);

    case Actions.LAYOUT_LOGIN_MODAL_UPDATE:
      return state.set('loginModalOpen', action.isOpen);

    default:
      return state;
  }
};
