import { fromJS, List } from 'immutable';
import * as Actions from '../actions/propertieActions';

const initialState = fromJS({
  featured: [],
  searched: [],
  hot: [],
  recommended: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.PROPERTIES_GET_FEATURED_PROP_SUCCESS:
      return state.set('featured', action.payload);

    case Actions.PROPERTIES_SEARCH_SUCCESS:
      return state.set('searched', state.get('searched').concat(action.payload));

    case Actions.PROPERTIES_RESET_SEARCH:
      return state.set('searched', List([]));

    case Actions.PROPERTIES_GET_RECOMMENDED_SUCCESS:
      return state.set('recommended', action.payload);

    case Actions.PROPERTIES_GET_HOT_SUCCESS:
      return state.set('hot', action.payload);

    case Actions.PROPERTIES_GET_NEW_SUCCESS:
      return state.set('new', action.payload);

    case Actions.PROPERTIES_GET_NEW_FAILURE:
      return state.set('new', action.payload);

    default:
      return state;
  }
};
