import { fromJS } from 'immutable';
import * as Actions from './agents.actionTypes';

const initialState = fromJS({
  isLoadingAgents: false,
  isLoaded: false,
  list: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.AGENTS_GET_LIST_SUCCESS:
      return state.set('list', action.payload).set('isLoadingAgents', false).set('isLoaded', true);

    case Actions.AGENTS_GET_LIST:
      return state.set('isLoadingAgents', true);

    case Actions.AGENTS_GET_LIST_FAILURE:
      return state.set('isLoadingAgents', false).set('isLoaded', true);

    default:
      return state;
  }
};
