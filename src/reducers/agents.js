import { fromJS } from 'immutable';
import * as Actions from '../actions/agentsActions';

const initialState = fromJS({
  list: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.AGENTS_GET_LIST_SUCCESS:
      return state.set('list', action.payload);

    default:
      return state;
  }
};
