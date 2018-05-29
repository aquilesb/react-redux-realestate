import { fromJS } from 'immutable';
import * as ActionTypes from '../actions/userActions';

const initialState = fromJS({
  id: '',
  data: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_FETCH_DATA_SUCCESS:
      return state.set('data', action.payload);

    default:
      return state;
  }
};
