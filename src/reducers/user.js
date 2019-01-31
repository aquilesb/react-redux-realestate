import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/userActions';

const initialState = fromJS({
  id: null,
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

    default:
      return state;
  }
};
