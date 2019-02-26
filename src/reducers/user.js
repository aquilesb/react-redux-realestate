import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/actionTypes';

const initialState = fromJS({
  id: null,
  authPending: true,
  token: null,
  data: {},
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_FETCH_DATA_SUCCESS:
      return state.set('data', payload);

    case ActionTypes.USER_LOGIN_SUCCESS:
      return state.set('id', payload.id).set('token', payload.token);

    case ActionTypes.USER_LOGOUT:
      return state.set('id', null).set('token', null).set('data', Map({}));

    case ActionTypes.USER_UPDATE_AUTH_PENDING:
      return state.set('authPending', payload);

    default:
      return state;
  }
};
